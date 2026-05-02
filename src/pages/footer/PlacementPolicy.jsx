import React from 'react';

const PlacementPolicy = () => {
  const policies = [
    {
      title: "1. Eligibility Criteria",
      content: "All students graduating from GEC Jehanabad with a minimum CGPA of 6.0 and no active backlogs are eligible to register for the campus placement process."
    },
    {
      title: "2. 'One Student, One Job' Policy",
      content: "To ensure equal opportunities, once a student is selected by a company, they will be out of the placement process. However, a student may be allowed to upgrade if a 'Dream Company' offers a package 2x higher than the current offer."
    },
    {
      title: "3. Discipline & Conduct",
      content: "Attendance is mandatory for all pre-placement talks (PPT). Any student who registers for a drive but fails to show up without prior notice will be debarred from the next 2 upcoming drives."
    },
    {
      title: "4. Dress Code",
      content: "Students must be in full college formal uniform during the entire recruitment process (Aptitude tests, Interviews, and GDs). Non-compliance will lead to immediate disqualification."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Placement <span className="text-blue-700">Policy</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Training & Placement Cell, Government Engineering College, Jehanabad
          </p>
          <div className="mt-4 h-1 w-24 bg-blue-700 mx-auto rounded-full"></div>
        </div>

        {/* Policy Content Cards */}
        <div className="space-y-6">
          {policies.map((policy, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {policy.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {policy.content}
              </p>
            </div>
          ))}
        </div>

        {/* Download Section */}
        <div className="mt-12 bg-blue-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need the full PDF version?</h2>
          <p className="mb-6 opacity-90">Download the official signed placement guidelines for the academic year 2025-26.</p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center mx-auto space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Full Policy PDF</span>
          </button>
        </div>

        {/* Contact Footer */}
        <div className="mt-10 text-center text-slate-500 text-sm">
          <p>For any queries, contact the TPO cell at: <span className="font-semibold">tpo@gecjehanabad.ac.in</span></p>
        </div>

      </div>
    </div>
  );
};

export default PlacementPolicy;