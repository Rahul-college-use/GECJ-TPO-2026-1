import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); 
    const adminId = localStorage.getItem("admin");

    useEffect(() => {
        if (adminId) {
            navigate('/AdminDashboard'); 
        }
    }, [adminId, navigate]);

    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const formHandler = async (e) => {
        e.preventDefault();

        if (role === 'student') {
            // alert("Student Login functionality not implemented yet");
                try {
                const res = await fetch('https://api-gecj-test4.vercel.app/api/student/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                });
                
                const data = await res.json();
                // console.log("Login Response:", res, data);
                
                if (data.message === "True") {
                    localStorage.setItem("student", formData.email);
                    localStorage.setItem("StudentToken", data.token);
                    window.location.href = "/";
                } else {
                    // localStorage.removeItem("admin");
                    alert("Student Login Failed");
                }
            } catch (err) {
                // console.error("Login Error:", err);
                alert("Could not connect to the server.");
            }

            //////////


        } else {
            try {
                const res = await fetch('https://api-gecj-test4.vercel.app/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                });
                
                const data = await res.json();
                // console.log("Login Response:", res, data);
                
                if (data.message === "True") {
                    localStorage.setItem("admin", formData.email);
                    localStorage.setItem("adminToken", data.token);
                    window.location.href = "/";
                } else {
                    // localStorage.removeItem("admin");
                    alert("Admin Login Failed");
                }
            } catch (err) {
                // console.error("Login Error:", err);
                alert("Could not connect to the server.");
            }
        }
    };

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side: Branding */}
                <div className="md:w-1/2 bg-blue-900 p-12 text-white flex flex-col justify-center">
                    <Link to="/" className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-white rounded-lg p-1 mr-3">
                            <img src="https://i.ibb.co/xq1r0k76/logo.png" alt="GECJ Logo" className="object-contain" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">GEC<span className="text-blue-400">J</span></span>
                    </Link>
                    <h2 className="text-3xl font-bold mb-4">Training & Placement Portal</h2>
                    <p className="text-blue-100 text-sm leading-relaxed mb-8">
                        Access your placement dashboard and track your career progress.
                    </p>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">✓</div>
                            <span>Exclusive Job Opportunities</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="md:w-1/2 p-8 sm:p-12">
                    <div className="mb-8 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-slate-800">Account Login</h3>
                        <p className="text-slate-500 text-sm mt-2">Enter your credentials to continue</p>
                    </div>

                    {/* Role Switcher */}
                    <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
                        <button
                            type="button"
                            onClick={() => { setRole('student'); setFormData({ email: '', password: '' }) }}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'student' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => { setRole('admin'); setFormData({ email: '', password: '' }) }}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'admin' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
                        >
                            Admin/TPO
                        </button>
                    </div>

                    <form onSubmit={formHandler} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                {role === 'student' ? 'Registration Number' : 'Admin Email'}
                            </label>
                            <input
                                required
                                name="email"
                                value={formData.email}
                                onChange={inputHandler}
                                type={role === 'student' ? "text" : "email"}
                                placeholder={role === 'student' ? "e.g., 21105..." : "admin@gecjehanabad.ac.in"}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                            <input
                                required
                                name="password"
                                value={formData.password}
                                onChange={inputHandler}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-[0.98]">
                            SIGN IN
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Not registered? <Link to="/registerStudent" className="text-blue-700 font-bold hover:underline">Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;