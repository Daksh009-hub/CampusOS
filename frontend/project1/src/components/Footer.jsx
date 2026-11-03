
function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Clubs', href: '#clubs' },
    { name: 'Events', href: '#events' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/' },
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { name: 'Email', href: 'mailto:contact@campusos.com' },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-800 bg-[#080D1C]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold">
              <span className="text-white">Campus</span>
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                OS
              </span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Your campus, your community. Discover clubs, explore
              events and connect with the vibrant UIET student
              community—all in one place.
            </p>

            <span className="mt-6 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-xs font-semibold text-cyan-400">
              Built for the UIET Community
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:translate-x-1 hover:text-cyan-400"
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Connect With Us
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Stay connected with the CampusOS community.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-700 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-6 text-center sm:flex-row">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CampusOS. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Made with <span className="text-cyan-400">♥</span> for UIET Students
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
