import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const StudentFullProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- NEW STATES FOR EDITING ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/get/studentProfile/id/${id}`);
        const data = await res.json();
        setStudent(data);
        setFormData(data); // Initialize form with fetched data
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Array Changes (Skills)
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    setFormData({ ...formData, skills: skillsArray });
  };

  // Save Data to Backend
  const handleSave = async () => {
    try {
      const res = await fetch(`/update/studentProfile/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStudent(formData);
        setIsEditing(false);
        alert("Profile Updated Successfully!");
      }
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center italic">Loading...</div>;
  if (!student) return <div className="text-center mt-20">Student not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Edit Toggle */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 underline underline-offset-4 decoration-blue-600">My Profile</span>
          </div>
          
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              isEditing ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isEditing ? "✓ Save Profile" : "✎ Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
              <img
                src={student.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4"
                alt="Profile"
              />
              
              {isEditing ? (
                <div className="space-y-3">
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg text-center font-bold" placeholder="Full Name" />
                  <input name="session" value={formData.session} onChange={handleChange} className="w-full p-2 border rounded-lg text-center text-sm" placeholder="Session" />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-black text-slate-800">{student.name}</h1>
                  <p className="text-blue-600 font-bold text-xs uppercase mt-1">{student.session}</p>
                </>
              )}
            </div>

            {/* Editable Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6">Contact Details</h3>
              <div className="space-y-4">
                <input 
                  name="email" 
                  disabled={!isEditing} 
                  value={isEditing ? formData.email : student.email} 
                  onChange={handleChange}
                  className={`w-full text-sm font-bold bg-transparent ${isEditing ? 'border-b border-blue-200 pb-1 outline-none' : 'border-none'}`}
                />
                <input 
                  name="phone" 
                  disabled={!isEditing} 
                  value={isEditing ? formData.phone : student.phone} 
                  onChange={handleChange}
                  className={`w-full text-sm font-bold bg-transparent ${isEditing ? 'border-b border-blue-200 pb-1 outline-none' : 'border-none'}`}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Professional Summary Edit */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">Professional Summary</h3>
              {isEditing ? (
                <textarea 
                  name="summary" 
                  rows="4"
                  value={formData.summary} 
                  onChange={handleChange}
                  className="w-full p-4 border rounded-2xl text-slate-600 text-sm font-medium outline-none focus:border-blue-400"
                />
              ) : (
                <p className="text-slate-600 leading-relaxed font-medium">{student.summary || "No summary provided."}</p>
              )}
            </div>

            {/* Technical Stack Edit (Comma Separated) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">Technical Stack</h3>
              {isEditing ? (
                <input 
                  placeholder="Enter skills separated by commas (e.g. React, Node, SQL)"
                  value={formData.skills?.join(', ')} 
                  onChange={handleSkillsChange}
                  className="w-full p-3 border rounded-xl text-sm outline-none"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {student.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-black uppercase rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFullProfile;