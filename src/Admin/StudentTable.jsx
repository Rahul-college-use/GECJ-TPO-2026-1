import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentTable = () => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("admin");

  // --- STATE MANAGEMENT ---
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ branch: 'All', session: 'All' });
  const itemsPerPage = 10;

  // --- FETCH DATA & AUTH PROTECTION ---
  useEffect(() => {
    // 1. Check Authentication
    if (!adminEmail) {
      navigate('/login');
      return;
    }

    // 2. Fetch Students from Backend
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch('/get/students');
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [adminEmail, navigate]);

  // --- 1. FILTER LOGIC ---
  const filteredData = students.filter(student => {
    const branchMatch = filters.branch === 'All' || student.dept === filters.branch;
    const sessionMatch = filters.session === 'All' || student.session === filters.session;
    return branchMatch && sessionMatch;
  });

  // --- 2. PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Constants for Filters
  const branches = ['All', 'CSE', 'Civil', 'ME', 'ECE', 'EE'];
  const sessions = ['All', '2021-25', '2022-26', '2023-27', '2024-28'];

  const handleView = (id) => navigate(`/StudentFullProfile/${id}`);
  
  const handleEdit = (id) => navigate(`/edit-student/${id}`);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const res = await fetch(`/api/delete/student/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setStudents(students.filter(s => s._id !== id));
          alert("Student record deleted successfully.");
        }
      } catch (err) {
        alert("Server error during deletion.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & FILTERS */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Database <span className="text-blue-600">Manager</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">GEC Jehanabad Enrollment Portal</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Branch Filter */}
            <select 
              value={filters.branch}
              onChange={(e) => {setFilters({...filters, branch: e.target.value}); setCurrentPage(1)}}
              className="bg-slate-50 border border-slate-200 text-[10px] font-black uppercase rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {branches.map(b => <option key={b} value={b}>{b === 'All' ? 'All Branches' : b}</option>)}
            </select>

            {/* Session Filter */}
            <select 
              value={filters.session}
              onChange={(e) => {setFilters({...filters, session: e.target.value}); setCurrentPage(1)}}
              className="bg-slate-50 border border-slate-200 text-[10px] font-black uppercase rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {sessions.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sessions' : s}</option>)}
            </select>
          </div>
        </div>

        {/* DATA TABLE CONTAINER */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-8 py-5">Full Name</th>
                  <th className="px-6 py-5">Reg. Number</th>
                  <th className="px-6 py-5">Branch</th>
                  <th className="px-6 py-5">Session</th>
                  <th className="px-6 py-5 text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentItems.map((student) => (
                  <tr key={student._id} className="hover:bg-slate-50/80 transition-all duration-200">
                    <td className="px-8 py-4 font-bold text-slate-700 text-sm italic">{student.name}</td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500 font-semibold">{student.reg_no}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border border-blue-100">
                        {student.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-[11px] font-bold uppercase">{student.session}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
                          onClick={() => handleView(student._id)}
                        >
                          View
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase hover:bg-green-600 hover:text-white transition-all border border-slate-100"
                          onClick={() => handleEdit(student._id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition-all border border-slate-100"
                          onClick={() => handleDelete(student._id, student.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {filteredData.length === 0 && (
            <div className="py-20 text-center border-t border-slate-50">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">No matching records found</p>
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          <div className="p-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center bg-slate-50/30 gap-4">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
              >
                Prev
              </button>
              <button 
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;