import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const StudentFullProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api-gecj-test4.vercel.app/get/studentProfile/id/${id}`);
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // 1. Show Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Handle Student Not Found
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-bold">Student profile not found.</p>
      </div>
    );
  }

  const deptmap = {
    CSE:"Computer Science",
    EE :"Electronic",
    ECE:"Electronics and Communication ",
    CE :"Civil",
    ME : "Mechanical "

  }

  const deptname = deptmap[student.dept] 
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Top Navigation / Breadcrumbs */}
        <div className="mb-6 flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/all-students" className="hover:text-blue-600">Directory</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-800 underline underline-offset-4 decoration-blue-600">Profile</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: Profile Summary (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
              <div className="relative w-32 h-35 mx-auto mb-6">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-10"></div>
                <img
                  src={student.photo ? `{https://api-gecj-test4.vercel.app/}${student.photo}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                  alt="Profile"
                  className="relative w-full h-full rounded-full border-4 border-white shadow-xl bg-slate-50"
                />
              </div>
              <h1 className="text-2xl font-black text-slate-800 leading-tight">{student.name}</h1>
              <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mt-1">{student.dept}</p>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">{student.session}</p>

              <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Registration</span>
                  <span className="text-slate-700 font-mono font-bold">{student.reg_no}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">CGPA</span>
                  <span className="text-green-600 font-black">{student.cgpa} / 10</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all">
                Download Resume PDF
              </button>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 italic font-serif">@</div>
                  <p className="text-sm font-bold text-slate-700 truncate">{student.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">☏</div>
                  <p className="text-sm font-bold text-slate-700">{student.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">🔗</div>
                  <a href={student.linkedIn} className="text-sm font-bold text-slate-700 hover:text-blue-500" title={`click go to ${student.name} LinkedIn Profile`}>{student.name} LinkedIn</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Professional Details (8/12) */}
          <div className="lg:col-span-8 space-y-8">
           
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">Professional Summary</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {/* {console.log(deptmap[student.dept])} */}
                {`Ambitious and dedicated ${deptname} Engineering Student (${student.session}) with a solid understanding of core engineering principles and a keen interest in technology and innovation. Equipped with analytical thinking, problem-solving abilities, and hands-on project experience. Capable of working independently as well as collaboratively in dynamic environments. Eager to leverage technical knowledge and skills to contribute effectively to organizational goals while continuously learning and growing.`}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">Technical Stack</h3>
              <div className="flex flex-wrap gap-3">
                {student.skills?.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-black uppercase border border-slate-100 rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">Academic Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {student.projects?.map((proj, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                    <h4 className="font-black text-slate-800 text-lg mb-2 group-hover:text-blue-600">{proj.title}</h4>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">{proj.desc}</p>
                    <div className="mt-4 flex items-center text-blue-600 text-[10px] font-black uppercase cursor-pointer">
                      View Project Case Study →
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFullProfile;