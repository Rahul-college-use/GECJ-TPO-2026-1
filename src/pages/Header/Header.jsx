import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white border-b-4 border-blue-900 py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center gap-6">
          
          {/* Institution Logo */}
          <div className="flex-shrink-0">
            {/* FIX: Added 'overflow-hidden' and ensured the <img> 
              scales correctly within the h-16 w-16 box.
            */}
            <div className="h-16 w-16 bg-transparent rounded-lg flex items-center justify-center  overflow-hidden">
              <img 
                src='https://i.ibb.co/xq1r0k76/logo.png'
                alt="GEC Jehanabad Logo" 
                className="h-full w-full object-contain p-1" 
                /* object-contain ensures the logo isn't stretched */
              />
            </div>
          </div>

          {/* College Name & Tagline */}
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
              GOVERNMENT ENGINEERING COLLEGE <br className="md:hidden" />
              <span className="text-blue-900 md:ml-2">JEHANABAD</span>
            </h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[2px] w-12 bg-orange-500"></div> 
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                Excellence in Engineering & Research
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;