
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[550px] items-center overflow-hidden py-24 md:py-32"
    >
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold tracking-wider text-cyan-400">
          <Sparkles size={16} />
          UIET STUDENT COMMUNITY
        </span>

        {/* Main Heading */}
        <h1 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl">
          Welcome to
          <span className="mt-2 block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CampusOS
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Discover student clubs, explore exciting campus events
          and connect with communities—all in one place.
          Your campus, your community.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-4">

          <a
            href="#clubs"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
          >
            Explore Clubs
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          <a
            href="#events"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] px-7 py-3.5 font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
          >
            <CalendarDays size={19} />
            View Events
          </a>

        </div>

        {/* Bottom Tagline */}
        <p className="mt-10 text-xs font-medium tracking-[0.2em] text-slate-500 sm:text-sm">
          CONNECT <span className="text-cyan-400">•</span> EXPLORE{' '}
          <span className="text-cyan-400">•</span> GROW
        </p>

      </div>
    </section>
  );
}

export default HeroSection;
