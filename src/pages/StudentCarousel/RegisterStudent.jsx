import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        reg_no: '',
        email: '',
        phone: '',
        dept: '',
        session: '',
        password: '',
        confirmPassword: ''
    });

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        setLoading(true);
        try {
            const res = await fetch('/api/student/pendingregister', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                alert("Registration Successful! Please Login.");
                navigate('/login');
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            alert("Connection error. Check your backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Branding Panel */}
                <div className="md:w-1/3 bg-blue-900 p-10 text-white flex flex-col justify-between">
                    <div>
                        <Link to="/" className="flex items-center mb-10">
                            <span className="text-2xl font-black tracking-tighter text-white">GEC<span className="text-blue-400">J</span></span>
                        </Link>
                        <h2 className="text-3xl font-bold leading-tight">Join the Talent Pool</h2>
                        <p className="text-blue-200 mt-4 text-sm">Create your professional profile and get noticed by top recruiters.</p>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">GEC Jehanabad • TPO Portal</p>
                    </div>
                </div>

                {/* Registration Form */}
                <div className="md:w-2/3 p-8 sm:p-12">
                    <h3 className="text-2xl font-black text-slate-800 mb-2">Student Registration</h3>
                    <p className="text-slate-500 text-sm mb-8">Fill in your academic details to get started.</p>

                    <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                            <input required name="name" onChange={inputHandler} type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reg. No</label>
                            <input required name="reg_no" onChange={inputHandler} type="text" placeholder="e.g. 21105..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Department</label>
                            <select required name="dept" onChange={inputHandler} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all bg-white">
                                <option value="">Select Dept</option>
                                <option value="CSE">Computer Science</option>
                                <option value="ECE">ECE</option>
                                <option value="EE">Electrical</option>
                                <option value="ME">Mechanical</option>
                                <option value="CE">Civil</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session</label>
                            <input required name="session" onChange={inputHandler} type="text" placeholder="2022-26" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                            <input required name="phone" onChange={inputHandler} type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <input required name="email" onChange={inputHandler} type="email" placeholder="student@gecjehanabad.ac.in" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                            <input required name="password" onChange={inputHandler} type="password"  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</label>
                            <input required name="confirmPassword" onChange={inputHandler} type="password"  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all" />
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <button disabled={loading} type="submit" className="w-full bg-blue-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[2px] hover:bg-blue-800 transition-all shadow-xl active:scale-[0.98]">
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-6">
                                Already have an account? <Link to="/login" className="text-blue-700 font-black hover:underline">SIGN IN</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;