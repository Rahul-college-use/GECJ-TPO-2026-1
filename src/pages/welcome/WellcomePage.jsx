import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0);
  const achievements = [
    {
      title: "100% Placement in CSE",
      description: "Our 2025 batch saw record-breaking placements in top MNCs including TCS, Infosys, and Wipro.",
      icon: "🎓"
    },
    {
      title: "Smart India Hackathon Winners",
      description: "GECJ Team 'Techno-Vision' secured 1st prize in the Hardware edition of SIH 2025.",
      icon: "🏆"
    },
    {
      title: "New Research Lab Inauguration",
      description: "State-of-the-art AI and Robotics lab now open for all engineering disciplines.",
      icon: "🔬"
    }
  ];

  // Auto-play for Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Brief About Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm">Welcome to GECJ</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2 mb-6 leading-tight">
              Shaping the Future of <br /> 
              <span className="text-blue-900">Technical Excellence</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              Government Engineering College, Jehanabad (GECJ) is a premier technical institution 
              established by the Department of Science & Technology, Govt. of Bihar. 
              We are committed to providing world-class engineering education and fostering 
              innovation through rigorous academic and research programs.
            </p>
            <div className="flex gap-4">
              <button onClick={()=>{
                navigate('/aboutpage')
              }} className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-900/20">
                Read More
              </button>
              <button className="border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
                View Faculty
              </button>
            </div>
          </div>

          {/* College Visual Placeholder */}
          <div className="relative">
            <div className="w-full h-[400px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
               {/* Replace with actual college building image */}
               <img 
                src="https://i.ibb.co/fGXH4WqH/campus.png" 
                alt="GECJ Campus" 
                className="w-full h-full object-cover"
               />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-blue-900 p-6 rounded-2xl text-white shadow-xl">
              <p className="text-3xl font-black">2019</p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Established</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Achievement Carousel Section */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-black text-slate-800 mb-12 uppercase tracking-tighter">
            College <span className="text-blue-900 underline decoration-blue-200 underline-offset-8">Achievements</span>
          </h3>

          <div className="relative max-w-4xl mx-auto bg-slate-50 rounded-3xl p-10 md:p-16 border border-slate-200 overflow-hidden">
            <div className="transition-all duration-500 transform">
              <span className="text-5xl mb-6 block">{achievements[activeSlide].icon}</span>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">{achievements[activeSlide].title}</h4>
              <p className="text-slate-600 text-lg leading-relaxed">{achievements[activeSlide].description}</p>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {achievements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    activeSlide === idx ? "w-8 bg-blue-900" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default WelcomePage;