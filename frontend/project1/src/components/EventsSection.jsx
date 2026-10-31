
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const dummyEvents = [
  {
    id: 1,
    name: 'Web Dev Bootcamp',
    date: '15 Nov 2026',
    time: '10:00 AM',
    venue: 'Room No. 100, UIET',
    club: 'GDGC',
  },
  {
    id: 2,
    name: 'Startup Pitch Desk',
    date: '18 Nov 2026',
    time: '02:00 PM',
    venue: 'MV Sadan',
    club: 'E-Cell',
  },
  {
    id: 3,
    name: 'AutoCAD Workshop',
    date: '20 Nov 2026',
    time: '11:00 AM',
    venue: 'Mechanical Block',
    club: 'SAE',
  },
  {
    id: 4,
    name: 'Circuit Design 101',
    date: '22 Nov 2026',
    time: '01:00 PM',
    venue: 'Room No. 100, UIET',
    club: 'Elektron',
  },
  {
    id: 5,
    name: 'Genesis Ideathon',
    date: '25 Nov 2026',
    time: '09:30 AM',
    venue: 'Main Campus',
    club: 'Genesis',
  },
];

function EventCard({ event }) {
  return (
    <article className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#10172A] to-[#080D1C] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

      {/* Event Heading */}
      <div className="relative flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-white transition duration-300 group-hover:text-cyan-400">
          {event.name}
        </h3>

        <span className="shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {event.club}
        </span>
      </div>

      {/* Event Details */}
      <div className="relative mt-auto space-y-4 text-sm text-slate-400">

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="shrink-0 text-cyan-400" />
          <span>{event.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 size={18} className="shrink-0 text-cyan-400" />
          <span>{event.time}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} className="shrink-0 text-cyan-400" />
          <span>{event.venue}</span>
        </div>

      </div>

      {/* Bottom Link */}
      <div className="relative flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm font-semibold text-cyan-400">
          Event Details
        </span>

        <ArrowUpRight
          size={19}
          className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

function EventsSection() {
  const events = dummyEvents;

  return (
    <section
      id="events"
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
            WHAT'S HAPPENING
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-white md:text-5xl">
            Upcoming{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Events
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            Discover workshops, competitions and exciting activities
            happening across the UIET campus.
          </p>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

        </div>

        {/* Events Grid */}
        {events.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-700 bg-[#10172A] py-16 text-center">
            <CalendarDays size={36} className="mx-auto text-slate-500" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              No upcoming events at the moment
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Check back later for updates from your campus clubs.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

        )}

      </div>
    </section>
  );
}

export default EventsSection;
