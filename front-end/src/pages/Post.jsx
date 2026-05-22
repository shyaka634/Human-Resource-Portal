import { useState } from "react";
import api from "../api/api";

export default function PostForm() {
    const [PostName, setPostName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handlePost(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/post/register", { PostName });
            alert("Registered post successfully");
            setPostName("");
        } catch (error) {
            console.error("Error occurred when registering post:", error);
            alert("Failed to register post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Register Post</h1>
                <p className="text-slate-400 text-sm mt-1">Add a new job post to the system</p>
            </div>

            {/* Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <form onSubmit={handlePost} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Post Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Software Engineer"
                            required
                            value={PostName}
                            onChange={(e) => setPostName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Registering...
                            </span>
                        ) : "Register Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}