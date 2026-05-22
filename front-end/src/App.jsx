import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import api from './api/api';
import Login from './components/Login';
import Logout from './components/Logout';
import EmployeeForm from './pages/Employee';
import PostForm from './pages/Post';
import EmployeeDepartmentReport from './pages/Report';

function NavLink({ to, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link
            to={to}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
        >
            {children}
        </Link>
    );
}

function Layout({ isAuth, setIsAuth, children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {isAuth && (
                <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="font-bold text-white tracking-tight">HR Portal</span>
                        </div>

                        {/* Nav */}
                        <nav className="flex items-center gap-1">
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/employees">Employees</NavLink>
                            <NavLink to="/posts">Posts</NavLink>
                            <div className="ml-3 pl-3 border-l border-slate-700">
                                <Logout setIsAuth={setIsAuth} />
                            </div>
                        </nav>
                    </div>
                </header>
            )}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

export default function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function verifySession() {
            try {
                const res = await api.get("/auth/verify");
                setIsAuth(res.data.isAuthenticated);
            } catch {
                setIsAuth(false);
            } finally {
                setChecking(false);
            }
        }
        verifySession();
    }, []);

    if (checking) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="flex items-center gap-3 text-slate-400">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="text-sm font-medium">Loading...</span>
            </div>
        </div>
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    isAuth ? <Navigate to="/dashboard" /> : <Login setIsAuth={setIsAuth} />
                } />
                <Route path="/dashboard" element={
                    isAuth
                        ? <Layout isAuth={isAuth} setIsAuth={setIsAuth}><EmployeeDepartmentReport /></Layout>
                        : <Navigate to="/" />
                } />
                <Route path="/employees" element={
                    isAuth
                        ? <Layout isAuth={isAuth} setIsAuth={setIsAuth}><EmployeeForm /></Layout>
                        : <Navigate to="/" />
                } />
                <Route path="/posts" element={
                    isAuth
                        ? <Layout isAuth={isAuth} setIsAuth={setIsAuth}><PostForm /></Layout>
                        : <Navigate to="/" />
                } />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}