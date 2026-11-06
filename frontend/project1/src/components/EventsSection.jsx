
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Clock, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const bannerStyles = {
  GDGC: 'from-blue-700 via-indigo-700 to-cyan-500',
  'E-Cell': 'from-purple-800 via-fuchsia-700 to-pink-500',
  SAE: 'from-orange-700 via-red-700 to-amber-500',
  Elektron: 'from-cyan-800 via-blue-700 to-indigo-500',
  Genesis: 'from-emerald-800 via-teal-700 to-cyan-500',
};

function formatDate(date) {
  if (!date) return 'Date to be announced';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date to be announced';
  }

  return parsedDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch real events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_URL}/events`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Failed to fetch events'
          );
        }

        setEvents(
          Array.isArray(result.data) ? result.data : []
        );

      } catch (err) {
        console.error('EVENTS FETCH ERROR:', err);
        setError('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Show only upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => {
      if (!event.eventDate) return false;

      const eventDate = new Date(event.eventDate);

      return (
        !Number.isNaN(eventDate.getTime()) &&
        eventDate >= today
      );
    })
    .sort(
      (a, b) =>
        new Date(a.eventDate) - new Date(b.eventDate)
    );

  return (
    <section id="events" className="py-24">

      {/* Section Heading */}
      <div className="mb-14 text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          What's happening?
        </p>

        <h2 className="text-4xl font-extrabold text-white md:text-5xl">
          Upcoming{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Events
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Discover workshops, competitions and exciting activities
          happening across the UIET campus.
        </p>

        <div className="mx-auto mt-7 h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">

          <Loader2
            size={35}
            className="animate-spin text-cyan-400"
          />

          <p className="mt-4 text-slate-400">
            Loading upcoming events...
          </p>

        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="py-10 text-center text-red-400">
          {error}
        </p>
      )}

      {/* Empty State */}
      {!loading && !error && upcomingEvents.length === 0 && (
        <p className="py-10 text-center text-slate-400">
          No upcoming events at the moment.
        </p>
      )}

      {/* Events Grid */}
      {!loading && !error && upcomingEvents.length > 0 && (

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {upcomingEvents.map((event) => (

            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] transition duration-300 hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-950/30"
            >

              {/* Event Banner */}
              <div
                className={`relative flex h-52 flex-col justify-between overflow-hidden bg-gradient-to-br ${
                  bannerStyles[event.club] ||
                  'from-blue-700 to-purple-700'
                } p-6`}
              >

                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/20" />

                <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-white/20" />

                <div className="relative z-10 flex justify-between gap-2">

                  <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {event.eventType || 'General'}
                  </span>

                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {event.club || 'CampusOS'}
                  </span>

                </div>

                <div className="relative z-10">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                    CampusOS presents
                  </p>

                  <h3 className="max-w-sm text-2xl font-extrabold text-white">
                    {event.title}
                  </h3>

                </div>

              </div>

              {/* Event Information */}
              <div className="p-6">

                <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-400">
                  {event.description}
                </p>

                <div className="space-y-3 text-sm text-slate-400">

                  <p className="flex items-center gap-3">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-cyan-400"
                    />
                    {formatDate(event.eventDate)}
                  </p>

                  {event.time && (
                    <p className="flex items-center gap-3">
                      <Clock
                        size={17}
                        className="shrink-0 text-cyan-400"
                      />
                      {event.time}
                    </p>
                  )}

                  {event.venue && (
                    <p className="flex items-center gap-3">
                      <MapPin
                        size={17}
                        className="shrink-0 text-cyan-400"
                      />
                      {event.venue}
                    </p>
                  )}

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
