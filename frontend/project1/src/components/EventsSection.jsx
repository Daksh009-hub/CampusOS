
import { Link } from 'react-router-dom';
import dummyEvents from '../data/events';
const bannerStyles = {
  GDGC: 'from-blue-700 via-indigo-700 to-cyan-500',
  'E-Cell': 'from-purple-800 via-fuchsia-700 to-pink-500',
  SAE: 'from-orange-700 via-red-700 to-amber-500',
  Elektron: 'from-cyan-800 via-blue-700 to-indigo-500',
  Genesis: 'from-emerald-800 via-teal-700 to-cyan-500',
};

function EventsSection() {
  return (
    <section id="events" className="py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          What's happening?
        </p>

        <h2 className="text-4xl font-extrabold text-white md:text-5xl">
          Upcoming <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">Events</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Discover workshops, competitions and exciting activities
          happening across the UIET campus.
        </p>

        <div className="mx-auto mt-7 h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
      </div>

      {dummyEvents.length === 0 ? (
        <p className="text-center text-slate-400">
          No upcoming events at the moment.
        </p>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {dummyEvents.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] transition duration-300 hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-950/30"
            >
              {/* Event Banner */}
              <div
                className={`relative flex h-52 flex-col justify-between overflow-hidden bg-gradient-to-br ${
                  bannerStyles[event.club] || 'from-blue-700 to-purple-700'
                } p-6`}
              >
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/20" />
                <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-white/20" />

                <div className="relative z-10 flex justify-between">
                  <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {event.category}
                  </span>

                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {event.club}
                  </span>
                </div>

                <div className="relative z-10">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                    CampusOS presents
                  </p>
                  <h3 className="max-w-sm text-2xl font-extrabold text-white">
                    {event.name}
                  </h3>
                </div>
              </div>

              {/* Event Information */}
              <div className="p-6">
                <div className="space-y-3 text-sm text-slate-400">
                  <p>
                    <span className="mr-3 text-cyan-400">▦</span>
                    {event.date} · {event.time}
                  </p>

                  <p>
                    <span className="mr-3 text-cyan-400">⌖</span>
                    {event.venue}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
                  <span className="font-semibold text-cyan-400 transition group-hover:text-white">
                    View Event Details
                  </span>

                  <span className="text-xl text-cyan-400 transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventsSection;
