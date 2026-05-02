import React from 'react';


const Recruiters = () => {
  const partners = [
    { name: "TATA Consultancy Services", logo: "TCS" },
    { name: "Infosys", logo: "INFY" },
    { name: "Wipro", logo: "WIPRO" },
    { name: "Cognizant", logo: "CTS" },
    { name: "HCL Technologies", logo: "HCL" },
    { name: "Accenture", logo: "ACN" },
    { name: "Capgemini", logo: "CAP" },
    { name: "Prism Cement", logo: "PRISM" },
  ];

  // Correct way to handle navigation in React
  const handleDownload = () => {
    // If using React Router, use navigate('/brochure')
    // For a simple demo/file link:
    window.location.href = './Brochure/Brochure'; // Adjust the path as needed
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-3">
            Our Placement Cell
          </h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">
            Top Industry <span className="text-blue-900">Recruiters</span>
          </h3>
          <div className="h-1.5 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Placement Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-inner">
          <div className="text-center group">
            <p className="text-4xl font-black text-blue-900 group-hover:scale-110 transition-transform">4.5 LPA</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-2">Average Package</p>
          </div>
          <div className="text-center border-x border-slate-200 group">
            <p className="text-4xl font-black text-blue-900 group-hover:scale-110 transition-transform">12 LPA</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-2">Highest Package</p>
          </div>
          <div className="text-center border-r border-slate-200 group">
            <p className="text-4xl font-black text-blue-900 group-hover:scale-110 transition-transform">50+</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-2">Hiring Partners</p>
          </div>
          <div className="text-center group">
            <p className="text-4xl font-black text-blue-900 group-hover:scale-110 transition-transform">85%</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-2">Placement Rate</p>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((company, index) => (
            <div 
              key={index} 
              className="h-32 flex items-center justify-center p-8 border border-slate-100 rounded-xl hover:shadow-xl hover:border-blue-200 transition-all duration-300 group bg-white cursor-pointer"
            >
              <div className="text-xl font-bold text-slate-400 group-hover:text-blue-900 transition-colors tracking-tighter">
                {company.logo}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center p-12 bg-blue-900 rounded-[2.5rem] text-white relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-4 italic">Want to hire from GECJ?</h4>
            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-sm leading-relaxed">
              Our Training and Placement Cell (TPO) provides full support for campus drives, 
              internships, and industrial visits. Join us in shaping the next generation of engineers.
            </p>
            <button 
              onClick={handleDownload}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-extrabold transition-all shadow-lg active:scale-95"
            >
              DOWNLOAD PLACEMENT BROCHURE
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Recruiters;