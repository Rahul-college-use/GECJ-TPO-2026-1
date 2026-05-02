import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const faculty = [
    {
      name: "Dr. Arun Kumar Singh",
      designation: "Principal",
      dept: "Administration",
      education: "Ph.D. from IIT Kanpur",
      specialization: "Structural Engineering",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Principal"
    },
    {
      name: "Prof. S.K. Sharma",
      designation: "Head of Department",
      dept: "Computer Science & Eng.",
      education: "M.Tech, BIT Mesra",
      specialization: "Data Mining & AI",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=CSE_HOD"
    },
    {
      name: "Dr. Meera Jha",
      designation: "Assistant Professor",
      dept: "Applied Science",
      education: "Ph.D. in Physics, BHU",
      specialization: "Quantum Mechanics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Pioneering <span className="text-blue-500">Excellence</span> <br /> 
            in Engineering.
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Government Engineering College, Jehanabad is dedicated to producing world-class engineers through rigorous academics and innovative research.
          </p>
        </div>
      </section>

      {/* 2. COLLEGE DETAILS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Our Legacy</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 mb-8">Established to Empower Bihar's Youth.</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                GEC Jehanabad, established by the Department of Science & Technology, Government of Bihar, stands as a testament to the state's commitment to technical education.
              </p>
              <p>
                Located in the historic land of Jehanabad, the college provides a serene yet technologically advanced environment for students to master the art of engineering. Our curriculum is aligned with AKU Patna standards, ensuring global relevance.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 border-t border-slate-100 pt-10">
              <div>
                <p className="text-3xl font-black text-slate-900">2019</p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-1">Founded</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">5+</p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-1">Branches</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">1000+</p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-1">Students</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] rotate-3 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Campus" 
              className="rounded-[2.5rem] shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. FACULTY / PROFESSORS SECTION */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Meet the <span className="text-blue-600">Visionaries</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">Our Distinguished Faculty Members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {faculty.map((prof, index) => (
              <div key={index} className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
                  <img 
                    src={prof.image} 
                    alt={prof.name} 
                    className="relative w-full h-full rounded-full border-2 border-white shadow-md bg-slate-50"
                  />
                </div>
                
                <h3 className="text-xl font-black text-slate-800 leading-tight">{prof.name}</h3>
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-1 mb-4">{prof.designation}</p>
                
                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</span>
                    <span className="text-sm font-bold text-slate-700">{prof.dept}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Education</span>
                    <span className="text-sm font-bold text-slate-700">{prof.education}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Specialization</span>
                    <span className="text-sm font-bold text-slate-700 italic">"{prof.specialization}"</span>
                  </div>
                </div>

                <button className="mt-8 w-full py-3 bg-slate-50 text-slate-500 text-[10px] font-black uppercase rounded-xl hover:bg-blue-600 hover:text-white transition-all tracking-widest">
                  View Publications
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-blue-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to join our community?</h2>
            <p className="text-blue-200 mb-10 font-medium">Explore our admission portal or reach out to the TPO cell for industry collaborations.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-blue-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-50 transition-all">
                Contact Us
              </Link>
              <Link to="/directory" className="px-8 py-4 bg-blue-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all border border-blue-700">
                View Students
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;