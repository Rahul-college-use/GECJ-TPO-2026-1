import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllStudentsDirectory = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBranch, setActiveBranch] = useState('All');

  // CHANGE THIS: Replace with your actual backend server URL
  const BACKEND_URL = "http://localhost:3000"; 

  const mockData = [
    { id: "21105110001", name: "Abhishek Singh", branch: "CSE", batch: "2021-25", status: "Placed", cgpa: "8.4" },
    { id: "21105110045", name: "Anjali Kumari", branch: "Civil", batch: "2021-25", status: "Available", cgpa: "7.9" },
    { id: "21105110012", name: "Vikash Raj", branch: "ME", batch: "2022-26", status: "Placed", cgpa: "8.1" },
    { id: "21105110022", name: "Sneha Bharti", branch: "ECE", batch: "2021-25", status: "Available", cgpa: "7.5" },
    { id: "21105110033", name: "Rahul Verma", branch: "EE", batch: "2021-25", status: "Placed", cgpa: "8.0" },
  ];

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch('/get/students', {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        setStudents(data && data.length > 0 ? data : mockData);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents(mockData); 
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  const branches = ['All', 'CSE', 'Civil', 'ME', 'ECE', 'EE'];

  const filteredStudents = students.filter(student => {
    const matchesBranch = activeBranch === 'All' || student.branch === activeBranch;
    const search = searchTerm.toLowerCase();
    const nameMatch = student.name?.toLowerCase().includes(search);
    const idMatch = student.reg_no?.toString().toLowerCase().includes(search);
    return matchesBranch && (nameMatch || idMatch);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-slate-500 font-bold animate-pulse text-xs uppercase tracking-widest">Fetching GECJ Records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student <span className="text-blue-600">Directory</span></h1>
            <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">GEC Jehanabad Enrollment Records</p>
          </div>

          <div className="relative w-full md:w-96">
            <span className="absolute left-4 top-3.5 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search by name or registration..."
              className="w-full bg-white border border-slate-200 pl-12 pr-4 py-3 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Branch Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {branches.map(branch => (
            <button
              key={branch}
              onClick={() => setActiveBranch(branch)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeBranch === branch 
                  ? 'bg-blue-900 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {console.log("Rendering branch tab:", branch, "Active:", activeBranch)}
              {branch}
            </button>
          ))}
        </div>

        {/* Student Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                
                {/* Profile Image with Backend path check */}
                <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center text-xl font-black group-hover:ring-4 group-hover:ring-blue-50 transition-all duration-500">
                  {student.photo ? (
                    <img 
                      src={`${BACKEND_URL}${student.photo}`} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.innerText = student.name?.charAt(0) || '?';
                      }}
                    />
                  ) : (
                    <span className="text-blue-700">{student.name?.charAt(0) || '?'}</span>
                  )}
                </div>

                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                  student.status === 'Placed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {student.status}
                </span>
              </div>

              <h3 className="text-slate-800 font-black text-lg leading-tight mb-1">{student.name}</h3>
              <p className="text-slate-400 text-xs font-bold mb-4">Reg: {student.reg_no}</p>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Branch</p>
                  <p className="text-xs font-black text-slate-700 uppercase">{student.dept}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">CGPA</p>
                  <p className="text-xs font-black text-blue-600">{student.cgpa} / 10</p>
                </div>
              </div>

              <Link
                to={`/StudentFullProfile/${student._id}`}
                className="w-full mt-4 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all text-center block shadow-lg active:scale-95"
              >
                View Full Profile
              </Link>
            </div>
          ))}
        </div>

        {/* Fallback for No Results omitted for brevity... */}
      </div>
    </div>
  );
};

export default AllStudentsDirectory;