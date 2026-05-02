import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("admin");

  // Protect the Route
  useEffect(() => {
    if (!adminEmail) {
      navigate('/login');
    }
  }, [adminEmail, navigate]);

  const students = [
    { id: 1, name: "Rahul Kumar", reg: "21105123001", branch: "CSE", status: "Placed", company: "TCS" },
    { id: 2, name: "Suman Singh", reg: "21105123045", branch: "Civil", status: "Pending", company: "-" },
    { id: 3, name: "Ankit Raj", reg: "21105123012", branch: "ME", status: "Placed", company: "Wipro" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
     

      <div className="flex-1 flex flex-col min-w-0">
        

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Placement Dashboard</h1>
            <p className="text-slate-500 text-sm">Welcome back, {adminEmail}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Registered", value: "482", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Placed Students", value: "124", color: "text-green-600", bg: "bg-green-50" },
              { label: "Active Drives", value: "08", color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Placement Rate", value: "25.7%", color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <h3 className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <div className={`w-2 h-2 rounded-full ${stat.color.replace('text', 'bg')}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Students Table Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 tracking-tight">Recent Placement Activity</h3>
              <button className="text-blue-600 text-xs font-bold hover:underline">Download CSV</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Reg. No</th>
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{student.name}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs font-mono">{student.reg}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs font-bold uppercase">{student.branch}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                          student.status === 'Placed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-sm font-medium">{student.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;