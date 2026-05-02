import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const adminEmail = localStorage.getItem("admin");

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  const adminLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Student', path: '/add-student' },
    { name: 'Placed Record', path: '/placed-record' },
    { name: 'All Students', path: '/all-student' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      
      <div className="h-16 flex items-center justify-between px-4 md:px-8">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {adminLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <input 
            type="text" 
            placeholder="Search..." 
            className="hidden sm:block bg-slate-50 border px-3 py-1 rounded-lg text-xs"
          />

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center text-xs">
                {adminEmail?.charAt(0) || 'A'}
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow">
                <div className="px-3 py-2 text-xs text-slate-400">
                  {adminEmail}
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 text-sm hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden px-4 pb-4 space-y-2">
          {adminLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenu(false)}
              className="block text-sm font-semibold text-slate-700 py-2 border-b"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
};

export default AdminNavbar;