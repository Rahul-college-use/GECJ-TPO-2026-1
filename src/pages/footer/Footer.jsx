import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800 pb-12">

        {/* Column 1: About GECJ TPO */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center text-white font-black text-xl ">
              <img src="https://i.ibb.co/xq1r0k76/logo.png" alt="" />
            </div>
            <h4 className="text-xl font-black text-white tracking-tighter uppercase">
              GEC <span className="text-blue-500">Jehanabad</span>
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Training & Placement Office is committed to providing excellent career
            opportunities for our students and fostering strong industry relationships
            built on technical excellence.
          </p>
          {/* Social Links */}
          <div className="flex gap-4">
            {['LinkedIn', 'Twitter', 'Facebook'].map((platform) => (
              <a key={platform} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <span className="sr-only">{platform}</span>
                <div className="w-4 h-4 bg-current rounded-sm opacity-70"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:pl-10">
          <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-blue-600 pl-3">
            Quick Links
          </h5>
          <ul className="space-y-3 text-sm font-medium">
            {[
              { name: 'About Us', href: '#about' },
              { name: 'Contact', href: '#contact' },
              { name: 'Statistics', href: '#recruiters' }, // Maps to your recruiters/stats section
              { name: 'Website', href: 'https://www.gecjehanabad.ac.in', isExternal: true },
              { name: 'Placement Policy', href: '/placement-policy' }
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel={link.isExternal ? "noopener noreferrer" : ""}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="h-px w-0 bg-blue-400 group-hover:w-3 transition-all"></span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div>
          <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-orange-500 pl-3">
            Contact Us
          </h5>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="text-blue-500">📍</span>
              <span>GEC Jehanabad, (Hulasganj)<br />Jehanabad, Bihar - 804407</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">📞</span>
              <a href="tel:+919199855936" className="hover:text-white">+91 9199855936</a>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">✉️</span>
              <a href="mailto:tpo@gecj.in" className="hover:text-white underline decoration-slate-700 underline-offset-4">tpo@gecj.in</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Location Summary/Quick Connect */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-800">
          <h5 className="text-white font-bold text-sm mb-4">Official Notice</h5>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            For internship inquiries or campus drive scheduling, please reach out directly to the TPO cell during office hours.
          </p>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 to-orange-500"></div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
        <p>© {currentYear} GEC Jehanabad - Training & Placement Office.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;