
import {
  Code2,
  Rocket,
  Car,
  Cpu,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';

const clubIcons = {
  GDGC: Code2,
  'E-Cell': Rocket,
  SAE: Car,
  Elektron: Cpu,
  Genesis: Lightbulb,
};

function ClubCard({ name, description }) {
  const Icon = clubIcons[name] || Lightbulb;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#10172A] to-[#080D1C] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/10">

      {/* Background Glow */}
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

      {/* Club Icon */}
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 text-cyan-400 transition duration-300 group-hover:scale-110 group-hover:border-cyan-400/50">
        <Icon size={28} strokeWidth={1.8} />
      </div>

      {/* Club Name */}
      <h3 className="relative text-xl font-bold text-white transition duration-300 group-hover:text-cyan-400">
        {name}
      </h3>

      {/* Description */}
      <p className="relative mt-3 min-h-12 text-sm leading-6 text-slate-400">
        {description}
      </p>

      {/* View Details */}
      <a
        href="#events"
        className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition duration-300 hover:text-white"
      >
        View Details
        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </a>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

    </article>
  );
}

export default ClubCard;
