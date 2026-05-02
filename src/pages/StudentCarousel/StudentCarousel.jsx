import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentsCarousel = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New: Search State
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const navigate = useNavigate();

  // 1. Fetch Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch('/get/students');
        const data = await res.json();
        setStudentsData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching students:", err);
        setStudentsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // 2. Responsive Resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Search & Filter Logic
  // This filters students by Name, Reg No (_id), Branch (dept), and Skills
  const filteredStudents = studentsData.filter((student) => {
    const search = searchTerm.toLowerCase();
    return (
      student.name?.toLowerCase().includes(search) ||
      student.reg_no?.toString().toLowerCase().includes(search) ||
      student.dept?.toLowerCase().includes(search) ||
      student.skills?.some(skill => skill.toLowerCase().includes(search))
    );
  });

  // 4. Auto-Slide Logic (Only if results exist)
  useEffect(() => {
    if (filteredStudents.length <= itemsToShow) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, filteredStudents.length, itemsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStudents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length);
  };

  // 5. Visibility Logic based on Filtered Data
  const getVisibleStudents = () => {
    if (filteredStudents.length === 0) return [];
    const visible = [];
    // If we have fewer results than itemsToShow, just show what we have
    const count = Math.min(itemsToShow, filteredStudents.length);
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % filteredStudents.length;
      visible.push(filteredStudents[index]);
    }
    return visible;
  };

  const visibleStudents = getVisibleStudents();

  if (loading) return (
    <div className="py-20 text-center bg-slate-50">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Loading Talent Pool...</p>
    </div>
  );

  return (
    <div className="w-full py-12 md:py-20 bg-slate-50 overflow-hidden">
      
      {/* Search Header Section */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our <span className="text-blue-600">Talent Pool</span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Real-Time Search Input */}
        <div className="relative group">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0); // Reset index to show first result when searching
            }}
            placeholder="Search by Name, Reg No, Branch or Skills..."
            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 transition-all shadow-sm group-hover:shadow-md text-slate-700 font-medium"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative w-full px-4 md:px-16 flex items-center justify-center">
        {/* Navigation buttons only show if there are enough items to scroll */}
        {filteredStudents.length > itemsToShow && (
          <button onClick={prevSlide} className="absolute left-2 md:left-6 z-30 p-3 md:p-4 bg-white shadow-xl rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 active:scale-90">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}

        <div className={`grid gap-6 md:gap-10 w-full transition-all duration-500 ease-in-out
          ${itemsToShow === 1 ? 'grid-cols-1' : itemsToShow === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>

          {visibleStudents.map((student, index) => (
            <div key={`${student._id}-${index}`} className="group bg-white rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    src={student.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                    alt={student.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/initials/svg?seed=" + student.name }}
                  />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">{student.name}</h3>
              <p className="text-blue-600 font-bold text-[10px] md:text-xs tracking-widest uppercase mb-4 mt-1">{student.dept || 'Engineering'}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[32px]">
                {student.skills?.slice(0, 3).map((skill, i) => (
                  <span key={i} className="bg-slate-50 text-slate-500 px-3 py-1 text-[9px] font-bold uppercase rounded-lg border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="w-full flex gap-2 mt-auto">
                <a href={student.linkedIn || "#"} target="_blank" rel="noopener noreferrer" className="flex-1 bg-slate-50 text-slate-700 py-3 rounded-2xl text-[10px] font-black uppercase text-center hover:bg-blue-100 transition-all">
                  LinkedIn
                </a>
                <button onClick={() => navigate(`/StudentFullProfile/${student._id}`)} className="flex-1 bg-blue-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-blue-100 active:scale-95 transition-all">
                  Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length > itemsToShow && (
          <button onClick={nextSlide} className="absolute right-2 md:right-6 z-30 p-3 md:p-4 bg-white shadow-xl rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 active:scale-90">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>

      {/* Empty Search Results */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-bold animate-in fade-in">
          No students found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default StudentsCarousel;