import { useState, useEffect } from "react";
import api from "../api/api";

export default function EmployeeDepartmentReport() {
    const [groupedByDepartment, setGroupedByDepartment] = useState({});
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    async function fetchEmployees() {
        try {
            const response = await api.get('/employee/getAll');
            const data = response.data;
            setTotalEmployees(data.length);
            groupEmployeesByDepartment(data);
        } catch (error) {
            console.error("Error occurred when fetching employees", error);
            alert("Failed to fetch employee records");
        } finally {
            setLoading(false);
        }
    }

    function groupEmployeesByDepartment(data) {
        const grouped = data.reduce((acc, employee) => {
            const dept = employee.Department || "Unassigned";
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(employee);
            return acc;
        }, {});
        setGroupedByDepartment(grouped);
    }

    const deptCount = Object.keys(groupedByDepartment).length;

    // Accent colors cycling per department
    const accentColors = [
        "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        "bg-violet-500/10 text-violet-400 border-violet-500/20",
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Department Report</h1>
                <p className="text-slate-400 text-sm mt-1">Overview of employees grouped by department</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Employees</p>
                    <p className="text-3xl font-bold text-white">{totalEmployees}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Departments</p>
                    <p className="text-3xl font-bold text-white">{deptCount}</p>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center gap-3 text-slate-400 py-16 justify-center">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="text-sm">Loading report...</span>
                </div>
            ) : deptCount === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                    <p className="text-slate-500 text-sm">No employee records found.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(groupedByDepartment).map(([department, deptEmployees], i) => {
                        const color = accentColors[i % accentColors.length];
                        return (
                            <div key={department} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                                {/* Dept header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-white text-sm">{department}</h3>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>
                                        {deptEmployees.length}
                                    </span>
                                </div>
                                {/* Employee list */}
                                <ul className="space-y-2">
                                    {deptEmployees.map((employee, index) => (
                                        <li key={employee.EmployeeID || index} className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-semibold text-slate-400">
                                                    {employee.FirstName?.[0]}{employee.LastName?.[0]}
                                                </span>
                                            </div>
                                            <span className="text-sm text-slate-300">
                                                {employee.FirstName} {employee.LastName}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}