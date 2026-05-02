import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', isExternal: false, isHash: false },
    { name: 'About Us', href: '#about', isExternal: false, isHash: true },
    { name: 'Recruiters', href: '#recruiters', isExternal: false, isHash: true },
    { name: 'Students', href: '#students', isExternal: false, isHash: true },
    { name: 'Contact', href: '#contact', isExternal: false, isHash: true },
    { name: 'College Website', href: 'https://www.gecjehanabad.ac.in', isExternal: true, isHash: false },
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Brand Logo - Links to Top of Home */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center group cursor-pointer">
            <div className="w-10 h-10 rounded flex items-center justify-center mr-3">
              <img src="https://i.ibb.co/xq1r0k76/logo.png" alt="GECJ Logo" className="object-contain" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter group-hover:text-blue-900 transition-colors">
              GEC<span className="text-blue-700">JEHANABAD</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              link.isExternal || link.isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel={link.isExternal ? "noopener noreferrer" : ""}
                  className={`text-[13px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    link.isExternal ? 'text-orange-600 hover:text-orange-700' : 'text-slate-600 hover:text-blue-900'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-[13px] font-bold uppercase tracking-wider text-slate-600 hover:text-blue-900 transition-all"
                >
                  {link.name}
                </Link>
              )
            ))}
            
            {/* Login Button - Fixed Link */}
            <Link 
              to="/login" 
              className="ml-4 bg-blue-900 text-white px-6 py-2 rounded font-bold text-sm hover:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              LOGIN
            </Link>
          </div>

          {/* 3. Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 p-2 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 shadow-xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-bold p-2 rounded-md ${
                link.isExternal ? 'text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="block w-full mt-4 bg-blue-900 text-white py-3 rounded font-bold shadow-md text-center"
          >
            LOGIN
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;