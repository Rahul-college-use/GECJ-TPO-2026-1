import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminStudentProfile = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

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

  // ✅ COMPRESS + BASE64 (40KB)
  const compressAndConvertToBase64 = (file, maxSizeKB = 40) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let width = img.width;
          let height = img.height;

          const maxWidth = 600;
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.7;
          let base64;

          do {
            base64 = canvas.toDataURL("image/jpeg", quality);
            quality -= 0.05;
          } while ((base64.length * 3) / 4 / 1024 > maxSizeKB && quality > 0.1);

          resolve(base64);
        };

        img.onerror = reject;
      };

      reader.onerror = reject;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Max 2MB allowed");
        return;
      }

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

    let base64Photo = null;

    if (formData.photo) {
      try {
        base64Photo = await compressAndConvertToBase64(formData.photo, 40);
      } catch (err) {
        alert("Photo processing failed");
        return;
      }
    }

    const jsonData = {
      ...formData,
      photo: base64Photo
    };

    try {
      const response = await fetch('https://api-gecj-test4.vercel.app/api/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });

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
      alert("Backend error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORM SECTION */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900">
              Register New <span className="text-blue-600">Student</span>
            </h1>
            <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
              <InputField label="Department" name="dept" value={formData.dept} onChange={handleChange} required />
              <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <InputField label="Registration No" name="reg_no" value={formData.reg_no} onChange={handleChange} required />
              <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <InputField label="LinkedIn URL" name="linkedIn" value={formData.linkedIn} onChange={handleChange} required />

            {/* Skills */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400">Skills</label>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 rounded">
                    {skill}
                    <button onClick={() => removeSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
              <input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={addSkill}
                className="w-full p-3 border rounded"
                placeholder="Press Enter"
              />
            </div>

            {/* Photo */}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />

            <button className="w-full bg-blue-900 text-white py-4 rounded-xl">
              Save Profile
            </button>
          </form>
        </div>

        {/* PREVIEW */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl text-center shadow">
            {previewUrl && (
              <img src={previewUrl} className="w-32 h-32 rounded-full mx-auto object-cover" />
            )}
            <h3 className="mt-4 font-bold">{formData.name || "Student Name"}</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-xs font-bold">{label}</label>
    <input {...props} className="w-full p-3 border rounded-xl" />
  </div>
);

export default AdminStudentProfile;