function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-800 bg-[#080D1C]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <div className="py-14">

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
