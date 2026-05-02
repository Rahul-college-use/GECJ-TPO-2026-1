import React from 'react';

const AboutTPO = () => {
  return (
    <section id="tpo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Officer Profile (4/12) */}
          {/* On mobile: centered | On desktop: sticky sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 mb-12 lg:mb-0">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              
              {/* Officer Image Container */}
              <div className="aspect-[3/4] rounded-3xl bg-slate-200 overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center">
                <img 
                  /* Use local path when ready: src="./assets/images/tpo-officer.jpg" */
                  src="https://i.ibb.co/2sZz8cM/tpo.jpg" 
                  alt="Prof.Prof. Sudhir Kumar & Alka Ranjan - TPO GEC Jehanabad" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  loading="lazy" 
                />
              </div>
              
              {/* Responsive Experience Badge */}
              {/* Standard position on mobile, offset on desktop */}
              <div className="absolute bottom-4 right-4 lg:-bottom-6 lg:-right-6 bg-orange-500 text-white p-5 lg:p-6 rounded-2xl shadow-xl border-4 border-white z-10">
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-90">Industry</p>
                <p className="text-xl lg:text-2xl font-black whitespace-nowrap">5+ Years</p>
              </div>
            </div>
            
            {/* Officer Credentials */}
            <div className="mt-10 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-black text-slate-800 leading-tight">
                Prof. Sudhir Kumar & Alka Ranjan
              </h3>
              <p className="text-blue-700 font-bold uppercase text-xs lg:text-sm tracking-[0.2em] mt-2 mb-6">
                Training & Placement Officer
              </p>
              
              {/* Contact Information Cards */}
              <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                <a 
                  href="mailto:tpo@gecj.in" 
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <span className="w-8 h-8 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors">
                    ✉
                  </span>
                  <span className="text-sm font-bold text-slate-600">tpo@gecj.in</span>
                </a>
                
                <a 
                  href="tel:+919199855936" 
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <span className="w-8 h-8 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors">
                    📞
                  </span>
                  <span className="text-sm font-bold text-slate-600">+91 9199855936</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Content (8/12) */}
          <div className="lg:col-span-8">
            {/* Heading Section */}
            <div className="mb-12">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.4em] mb-4">
                The Bridge to Industry
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Empowering Students for <br />
                <span className="text-blue-900 underline decoration-orange-400 underline-offset-[12px] decoration-4">
                  Global Careers
                </span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                The Training and Placement Office (TPO) at GEC Jehanabad serves as a vital interface 
                between the academic world and the industrial sector. Our primary goal is to provide 
                students with the technical skills, professional mindset, and recruitment opportunities 
                required to excel in their chosen engineering fields.
              </p>
            </div>

            {/* Core Functions Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Skill Development", 
                  icon: "⚡", 
                  desc: "Workshops on Python, Data Structures, AI/ML, and soft skills to meet Industry 4.0 standards." 
                },
                { 
                  title: "Campus Recruitment", 
                  icon: "🤝", 
                  desc: "Facilitating end-to-end recruitment drives for top MNCs and core engineering firms." 
                },
                { 
                  title: "Industrial Internships", 
                  icon: "🏭", 
                  desc: "Mandatory training programs in partnership with Bihar's leading industrial sectors." 
                },
                { 
                  title: "Career Counseling", 
                  icon: "🧭", 
                  desc: "One-on-one guidance sessions to help students choose between Placements, GATE, or PSUs." 
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all group cursor-default"
                >
                  <span className="text-4xl mb-6 block group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* TPO Message / Quote */}
            <div className="mt-12 p-8 md:p-12 bg-blue-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              {/* Decorative Quote Mark */}
              <span className="absolute -top-4 -right-2 text-[12rem] font-serif text-white/10 leading-none select-none">
                "
              </span>
              
              <div className="relative z-10">
                <p className="text-xl md:text-2xl italic font-medium leading-relaxed mb-6">
                  "Our mission is to ensure that every student of GEC Jehanabad becomes a 
                  competent engineer who contributes to the nation's technical progress through 
                  innovation and integrity."
                </p>
                <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutTPO;