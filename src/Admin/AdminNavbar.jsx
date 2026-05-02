import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const adminEmail = localStorage.getItem("admin");

  const handleLogout =async () => {
    await fetch('/api/admin/logout', { method: 'POST', });
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  window.location.href = "/";
  };

  // 1. Define your Admin-specific links
  const adminLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Student', path: '/add-student' },
    { name: 'Placed Record', path: '/placed-record' },
    { name: 'All Students', path: '/all-student' },
  ];

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
      
      {/* Left: Navigation Links */}
      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center gap-6">
          {adminLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-6">
        {/* Simple Search Input */}
        <div className="hidden md:block relative">
          <input 
            type="text" 
            placeholder="Search Record..." 
            className="bg-slate-50 border border-slate-200 text-xs px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-lg transition-all"
          >
            <div className="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center font-bold text-xs uppercase">
              {adminEmail?.charAt(0) || 'A'}
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase">
                Admin: {adminEmail}
              </div>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;