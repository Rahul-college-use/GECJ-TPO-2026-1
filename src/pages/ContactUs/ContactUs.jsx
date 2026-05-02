import React, { useState } from 'react';

const ContactUs = () => {

  // 🔹 State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  // 🔹 Handle Input Change
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Handle Submit
  const formHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    // 🔹 Reset Form
    setFormData({
      name: "",
      email: "",
      subject: "General Inquiry",
      message: ""
    });
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">Get in Touch</h2>
          <h3 className="text-4xl font-black text-slate-900">
            Contact <span className="text-blue-900">Administration</span>
          </h3>
          <div className="h-1.5 w-20 bg-orange-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">

          {/* 🔹 Left: Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <form onSubmit={formHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="Rahul Kumar"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="rahul@example.com"
                  required
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={changeHandler}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Admission Related</option>
                  <option>Placement / TPO</option>
                  <option>Exam Cell</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={changeHandler}
                  rows="5"
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              {/* Button */}
              <button className="md:col-span-2 bg-blue-900 text-white font-black py-4 rounded-xl hover:bg-blue-800 transition shadow-lg uppercase tracking-widest">
                Send Message
              </button>

            </form>
          </div>

          {/* 🔹 Right: Contact Info */}
          <div className="lg:col-span-5 space-y-8">

            <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-6">Campus Address</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="text-2xl">📍</span>
                    <p className="text-blue-100 text-sm">
                      Government Engineering College, Jehanabad<br />
                      Near Kako, Jehanabad, Bihar - 804408
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-2xl">📞</span>
                    <p className="text-blue-100 text-sm">
                      +91-XXXXXXXXXX (Office)<br />
                      +91-XXXXXXXXXX (TPO)
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-2xl">✉️</span>
                    <p className="text-blue-100 text-sm">
                      principal@gecjehanabad.ac.in<br />
                      tpo@gecjehanabad.ac.in
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            </div>

            {/* Map */}
            <div className="w-full h-64 bg-slate-200 rounded-3xl border-4 border-white shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3613.171328533437!2d85.1517633!3d25.0960611!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2c5dae570dc3b%3A0x6e7fa82d66742bf7!2sGEC%20JEHANABAD%20(Government%20Engineering%20College%20Jehanabad)!5e0!3m2!1sen!2sin!4v1772954236328!5m2!1sen!2sin"
                className="w-full h-full"
                loading="lazy"
                title="GEC Jehanabad Map"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;