
import {
  Code2,
  Rocket,
  Car,
  Cpu,
  Dna,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';

import { Link } from 'react-router-dom';

const clubIcons = {
  GDGC: Code2,
  'E-Cell': Rocket,
  Ecell: Rocket,
  SAE: Car,
  Elektron: Cpu,
  Genesis: Dna,
};

function ClubCard({ name, description, slug, bannerUrl, category }) {
  const Icon = clubIcons[name] || Lightbulb;

  // Use the actual slug received from the backend
  const targetRoute = `/clubs/${slug}`;

  return (
    <Link
      to={targetRoute}
      className="group block"
    >
      <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/50 hover:bg-white/10">

        {/* Club Banner */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40">
          {bannerUrl ? (
            <img
              src={bannerUrl}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Icon size={55} className="text-purple-300" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Club Information */}
        <div className="p-5">
          {category && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
              {category}
            </p>
          )}

          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              {name}
            </h3>

            <ArrowUpRight
              size={20}
              className="text-gray-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-300"
            />
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
            {description || 'Explore this club and discover its activities.'}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
