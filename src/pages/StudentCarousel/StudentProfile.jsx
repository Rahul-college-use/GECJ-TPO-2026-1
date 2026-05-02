import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:3000";

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading Profile...</div>;
  if (!student) return <div className="min-h-screen flex items-center justify-center font-bold">Student Not Found</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header / Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors uppercase text-xs tracking-widest"
          >
            ← Back to Home
          </button>
          <div className="text-blue-600 font-black text-xl">STUDENT HUB</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full border-8 border-slate-50 shadow-xl overflow-hidden mb-6 ring-4 ring-blue-500">
              <img 
                src={`${API_BASE}${student.photo}`} 
                alt={student.name} 
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = "https://via.placeholder.com/300"}
              />
            </div>
            <h1 className="text-3xl font-black text-slate-800">{student.name}</h1>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mt-1">{student.dept}</p>
            
            <div className="w-full border-t border-slate-50 mt-8 pt-8 space-y-4">
              <div className="flex items-center gap-4 text-slate-600">
                <span className="bg-blue-50 p-2 rounded-lg text-blue-600">✉️</span>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Email Address</p>
                  <p className="text-sm font-medium">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <span className="bg-blue-50 p-2 rounded-lg text-blue-600">📞</span>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Phone Number</p>
                  <p className="text-sm font-medium">{student.phone || 'Not Provided'}</p>
                </div>
              </div>
            </div>

            {/* Resume Button */}
            <a 
              href={student.resume || "#"} 
              className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex justify-center items-center gap-2 shadow-xl"
            >
              📄 View Resume
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Details & Projects */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Academic Section */}
          <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Current CGPA</p>
                <p className="text-2xl font-black text-blue-600">{student.cgpa || '8.5'}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Graduation Year</p>
                <p className="text-2xl font-black text-slate-800">{student.gradYear || '2025'}</p>
              </div>
            </div>
          </section>

          {/* Skills & Certificates */}
          <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Technical Expertise
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {student.skills?.map((skill, i) => (
                <span key={i} className="px-5 py-2 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl uppercase tracking-wider border border-blue-100">
                  {skill}
                </span>
              ))}
            </div>
            
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Certificates</h3>
            <div className="space-y-3">
              {student.certificates?.length > 0 ? student.certificates.map((cert, i) => (
                <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-slate-700">{cert.name}</span>
                  <a href={cert.link} className="text-blue-600 text-xs font-black uppercase underline">Verify</a>
                </div>
              )) : (
                <p className="text-slate-400 text-sm italic">No certificates listed yet.</p>
              )}
            </div>
          </section>

          {/* Projects Section */}
          <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.projects?.map((project, i) => (
                <div key={i} className="group p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-black text-lg mb-2">{project.title}</h4>
                    <p className="text-slate-400 text-xs mb-6 line-clamp-2">{project.description}</p>
                    <a 
                      href={project.link} 
                      className="inline-block bg-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 transition-all"
                    >
                      View Live Project ↗
                    </a>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-black italic">0{i+1}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;