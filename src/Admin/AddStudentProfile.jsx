import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminStudentProfile = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  // Protect the Route properly using Navigate
  useEffect(() => {
    const adminId = localStorage.getItem("admin");
    if (!adminId) {
      navigate('/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    dept: '',
    phone: '',
    email: '',
    reg_no: '',
    session: '',
    linkedIn: '',
    skills: [],
    photo: null
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      const skill = currentSkill.trim();
      if (!formData.skills.includes(skill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, skill]
        }));
      }
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Mapping all fields to FormData
    Object.keys(formData).forEach(key => {
      if (key === 'skills') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('/api/students/register', {
        method: 'POST',
        body: data
      });
      // console.log(response)

      const result = await response.json();

      if (response.ok) {
        alert("Student Profile Created Successfully");
        setFormData({
          name: '', dept: '', phone: '', email: '',
          reg_no: '', session: '', linkedIn: '', skills: [], photo: null
        });
        setPreviewUrl(null);
      } else {
        alert(result.message || "Registration Failed");
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORM SECTION */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Register New <span className="text-blue-600">Student</span></h1>
            <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Rahul kumar" required/>
              <InputField label="Department" name="dept" value={formData.dept} onChange={handleChange} placeholder="e.g. CSE" required/>
              <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="student@gecj.ac.in" required/>
              <InputField label="Registration No" name="reg_no" value={formData.reg_no} onChange={handleChange} placeholder="23152152001"required />
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session</label>
                <select 
                  name="session" 
                  value={formData.session} 
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-slate-700"
                >
                  <option value="">Select Year</option>
                  <option value={`${year-4}-${year}`}>{year-4}-{year}</option>
                  <option value={`${year-3}-${year+1}`}>{year-3}-{year+1}</option>
                  <option value={`${year-2}-${year+2}`}>{year-2}-{year+2}</option>
                  <option value={`${year-1}-${year+3}`}>{year-1}-{year+3}</option>
                </select>
              </div>

              <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" required/>
            </div>

            <InputField label="LinkedIn URL" name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="https://linkedin.com/in/..." required />

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Skills (Press Enter to Add)</label>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                {formData.skills.map(skill => (
                  <span key={skill} className="px-4 py-1.5 bg-white text-blue-600 text-[10px] font-black uppercase rounded-xl shadow-sm border border-blue-50 flex items-center gap-2 animate-in zoom-in-50">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 font-bold">×</button>
                  </span>
                ))}
              </div>
              <input 
                type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={addSkill}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                placeholder="Type skill and hit Enter..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-3xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-slate-500 font-bold">Click to upload photo</p>
                    <p className="text-xs text-slate-400 uppercase font-black">SVG, PNG, JPG (MAX. 800 x 800px)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange}  name='photo'/>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-600 transition-all active:scale-[0.98]">
              Finalize & Save Profile
            </button>
          </form>
        </div>

        {/* PREVIEW CARD */}
        <div className="lg:col-span-4">
          <div className="sticky top-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">Live Preview</h2>
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-10"></div>
                <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-slate-200">{formData.name ? formData.name.charAt(0) : '?'}</span>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 leading-tight">{formData.name || "Student Name"}</h3>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.15em] mt-2 mb-6">{formData.dept || "Department Name"}</p>
              
              <div className="w-full border-t border-slate-50 pt-6 space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                  <span>Reg No</span>
                  <span className="text-slate-700">{formData.reg_no || "---"}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                  <span>Session</span>
                  <span className="text-slate-700">{formData.session || "---"}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {formData.skills.slice(0, 5).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-bold uppercase rounded-lg border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    <input 
      {...props} 
      className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium text-slate-700" 
    />
  </div>
);

export default AdminStudentProfile;