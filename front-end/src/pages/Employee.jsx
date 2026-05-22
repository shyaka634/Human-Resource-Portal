import { useState, useEffect } from "react";
import api from "../api/api";

const inputClass =
    "w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

const selectClass =
    "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

export default function EmployeeForm() {
    const [postID, setPostID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [hiredDate, setHiredDate] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("");
    const [department, setDepartment] = useState("");
    const [address, setAddress] = useState("");
    const [posts, setPosts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
        fetchEmployees();
    }, []);

    async function fetchPosts() {
        try {
            const response = await api.get("/post/getAll");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts", error);
            alert("Failed to fetch posts");
        }
    }

    async function fetchEmployees() {
        try {
            const response = await api.get("/employee/getAll");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees", error);
            alert("Failed to fetch employees");
        }
    }

    async function handleEmployee(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const employeeData = {
                PostID: postID, FirstName: firstName, LastName: lastName,
                Gender: gender, DateOfBirth: dateOfBirth, Email: email,
                PhoneNumber: phoneNumber, Position: position, HiredDate: hiredDate,
                Salary: salary, Status: status, Department: department, Address: address,
            };

            if (editingId) {
                await api.put(`/employee/update/${editingId}`, employeeData);
                alert("Employee updated successfully");
                setEditingId(null);
            } else {
                await api.post("/employee/register", employeeData);
                alert("Employee registered successfully");
            }
            fetchEmployees();
            clearForm();
        } catch (error) {
            console.error("Error saving employee", error);
            alert("Failed to save employee");
        } finally {
            setLoading(false);
        }
    }

    function handleEdit(item) {
        setEditingId(item.EmployeeID);
        setPostID(item.PostID); setFirstName(item.FirstName); setLastName(item.LastName);
        setGender(item.Gender); setDateOfBirth(item.DateOfBirth); setEmail(item.Email);
        setPhoneNumber(item.PhoneNumber); setPosition(item.Position); setHiredDate(item.HiredDate);
        setSalary(item.Salary); setStatus(item.Status); setDepartment(item.Department); setAddress(item.Address);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function deleteEmployee(EmployeeID) {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await api.delete(`/employee/delete/${EmployeeID}`);
            alert("Employee deleted successfully");
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee", error);
            alert("Failed to delete employee");
        }
    }

    function handleCancelEdit() {
        setEditingId(null);
        clearForm();
    }

    function clearForm() {
        setPostID(""); setFirstName(""); setLastName(""); setGender("");
        setDateOfBirth(""); setEmail(""); setPhoneNumber(""); setPosition("");
        setHiredDate(""); setSalary(""); setStatus(""); setDepartment(""); setAddress("");
    }

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    {editingId ? "Edit Employee" : "Register Employee"}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    {editingId ? "Update the employee's information below" : "Fill in the details to add a new employee"}
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-10">
                <form onSubmit={handleEmployee}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Post */}
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Post</label>
                            <select required value={postID} onChange={(e) => setPostID(e.target.value)} className={selectClass}>
                                <option value="">Select Post</option>
                                {posts.map((post) => (
                                    <option key={post.PostID} value={post.PostID}>{post.PostName}</option>
                                ))}
                            </select>
                        </div>

                        {/* First Name */}
                        <div>
                            <label className={labelClass}>First Name</label>
                            <input type="text" placeholder="Enter First Name" required value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className={labelClass}>Last Name</label>
                            <input type="text" placeholder="Enter Last Name" required value={lastName}
                                onChange={(e) => setLastName(e.target.value)} className={inputClass} />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className={labelClass}>Gender</label>
                            <select required value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className={labelClass}>Date of Birth</label>
                            <input type="date" required value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)} className={inputClass} />
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelClass}>Email</label>
                            <input type="email" placeholder="Enter Email" required value={email}
                                onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className={labelClass}>Phone Number</label>
                            <input type="text" placeholder="Enter Phone Number" required value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} className={inputClass} />
                        </div>

                        {/* Position */}
                        <div>
                            <label className={labelClass}>Position</label>
                            <input type="text" placeholder="Enter Position" required value={position}
                                onChange={(e) => setPosition(e.target.value)} className={inputClass} />
                        </div>

                        {/* Hired Date */}
                        <div>
                            <label className={labelClass}>Hired Date</label>
                            <input type="date" required value={hiredDate}
                                onChange={(e) => setHiredDate(e.target.value)} className={inputClass} />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className={labelClass}>Salary</label>
                            <input type="number" placeholder="Enter Salary" required value={salary}
                                onChange={(e) => setSalary(e.target.value)} className={inputClass} />
                        </div>

                        {/* Status */}
                        <div>
                            <label className={labelClass}>Status</label>
                            <select required value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Not Active">Not Active</option>
                            </select>
                        </div>

                        {/* Department */}
                        <div>
                            <label className={labelClass}>Department</label>
                            <input type="text" placeholder="Enter Department" required value={department}
                                onChange={(e) => setDepartment(e.target.value)} className={inputClass} />
                        </div>

                        {/* Address */}
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Address</label>
                            <input type="text" placeholder="Enter Address" required value={address}
                                onChange={(e) => setAddress(e.target.value)} className={inputClass} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Saving...
                                </span>
                            ) : editingId ? "Update Employee" : "Register Employee"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold rounded-lg py-2.5 text-sm transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Employee Records</h2>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                        {employees.length} total
                    </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">#</th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Name</th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Department</th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Post</th>
                                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-slate-500 py-12 text-sm">
                                        No employee records found
                                    </td>
                                </tr>
                            ) : (
                                employees.map((item, index) => (
                                    <tr key={item.EmployeeID || index} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="px-5 py-3.5 text-slate-500 font-medium">{index + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-slate-700 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-bold text-slate-300">
                                                        {item.FirstName?.[0]}{item.LastName?.[0]}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-white">
                                                    {item.FirstName} {item.LastName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-400 hidden sm:table-cell">{item.Department}</td>
                                        <td className="px-5 py-3.5 text-slate-400 hidden md:table-cell">
                                            {posts.find((post) => Number(post.PostID) === Number(item.PostID))?.PostName || (
                                                <span className="text-slate-600">Unknown</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(item)}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg px-3 py-1.5 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteEmployee(item.EmployeeID)}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg px-3 py-1.5 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}