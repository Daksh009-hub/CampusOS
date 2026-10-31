
import ClubCard from './ClubCard';
import { Sparkles } from 'lucide-react';

const clubs = [
  {
    name: 'GDGC',
    description: 'Technology, coding and developer events.',
  },
  {
    name: 'E-Cell',
    description: 'Entrepreneurship, startups and innovation.',
  },
  {
    name: 'SAE',
    description: 'Automotive engineering and practical projects.',
  },
  {
    name: 'Elektron',
    description: 'Electronics, technology and student activities.',
  },
  {
    name: 'Genesis',
    description: 'Student community and creative activities.',
  },
];

function ClubsSection() {
  return (
    <section
      id="clubs"
      className="relative scroll-mt-28 overflow-hidden py-20"
    >

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10">

        {/* Section Heading */}
        <div className="mb-12 text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold tracking-wider text-cyan-400">
            <Sparkles size={16} />
            FIND YOUR COMMUNITY
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-white md:text-5xl">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Clubs
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            Find your passion, connect with like-minded people,
            develop new skills and make your campus journey memorable.
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

        </div>

        {/* Club Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {clubs.map((club) => (
            <ClubCard
              key={club.name}
              name={club.name}
              description={club.description}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default ClubsSection;
