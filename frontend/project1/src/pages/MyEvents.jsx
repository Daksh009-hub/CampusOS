import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  MapPin,
  Clock,
  Loader2,
  ArrowLeft,
  Plus,
  CalendarCheck,
  CalendarX,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const bannerStyles = {
  GDGC: 'from-blue-700 via-indigo-700 to-cyan-500',
  'E-Cell': 'from-purple-800 via-fuchsia-700 to-pink-500',
  SAE: 'from-orange-700 via-red-700 to-amber-500',
  Elektron: 'from-cyan-800 via-blue-700 to-indigo-500',
  Genesis: 'from-emerald-800 via-teal-700 to-cyan-500',
  Individual: 'from-slate-800 via-slate-700 to-slate-600',
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

function MyEvents({ userId, userEmail, onLogout }) {
  const activeUserId = userId || localStorage.getItem('campusUserId');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterTab, setFilterTab] = useState('all');

  // Fetch only events created by this logged-in user
  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!activeUserId) {
        setError('Please login to view your events.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${API_URL}/events?createdBy=${encodeURIComponent(activeUserId)}`
        );
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to fetch your events.');
        }

        setEvents(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [activeUserId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((e) => {
    if (!e.eventDate) return true;
    return new Date(e.eventDate) >= today;
  });

  const pastEvents = events.filter((e) => {
    if (!e.eventDate) return false;
    return new Date(e.eventDate) < today;
  });

  const displayedEvents =
    filterTab === 'upcoming'
      ? upcomingEvents
      : filterTab === 'past'
      ? pastEvents
      : [...events].sort(
          (a, b) =>
            new Date(b.createdAt || b.eventDate) -
            new Date(a.createdAt || a.eventDate)
        );

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar
        isLoggedIn={Boolean(activeUserId)}
        userEmail={userEmail || localStorage.getItem('campusEmail')}
        onLogout={onLogout}
      />

      <main className="mx-auto max-w-7xl px-6 pt-6 pb-20">
        {/* Navigation link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-10 border-b border-slate-800/80 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white md:text-5xl">
              My{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Events
              </span>
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage and view all events uploaded and organized by you on CampusOS.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        {!loading && !error && events.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFilterTab('all')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filterTab === 'all'
                  ? 'bg-cyan-400 text-[#050816] shadow-lg shadow-cyan-400/20'
                  : 'border border-slate-700 bg-slate-800/60 text-slate-300 hover:border-cyan-400/50'
              }`}
            >
              All Events ({events.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterTab('upcoming')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filterTab === 'upcoming'
                  ? 'bg-cyan-400 text-[#050816] shadow-lg shadow-cyan-400/20'
                  : 'border border-slate-700 bg-slate-800/60 text-slate-300 hover:border-cyan-400/50'
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterTab('past')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filterTab === 'past'
                  ? 'bg-cyan-400 text-[#050816] shadow-lg shadow-cyan-400/20'
                  : 'border border-slate-700 bg-slate-800/60 text-slate-300 hover:border-cyan-400/50'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-cyan-400" size={40} />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
            <p className="font-semibold">{error}</p>
            <Link
              to="/login"
              className="mt-3 inline-block text-sm text-cyan-400 hover:underline"
            >
              Go to Login →
            </Link>
          </div>
        )}

        {/* No Events Uploaded At All */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-800 bg-[#10172A]/60 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <CalendarX size={32} />
            </div>

            <h3 className="text-2xl font-bold text-white">No Events Uploaded Yet</h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              You haven't posted any events yet. Organize your first workshop, hackathon, or meetup and share it with the UIET community!
            </p>

            <Link
              to="/organize-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
            >
              <Plus size={18} />
              Create an Event
            </Link>
          </div>
        )}

        {/* No Events in Selected Filter Tab */}
        {!loading && !error && events.length > 0 && displayedEvents.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-[#10172A]/40 py-12 text-center text-slate-400">
            <p>No {filterTab} events found in your uploaded events.</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && displayedEvents.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {displayedEvents.map((event) => {
              const isEventPast =
                event.eventDate && new Date(event.eventDate) < today;

              return (
                <Link
                  to={`/events/${event._id}`}
                  key={event._id}
                  className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] transition duration-300 hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-950/30"
                >
                  {/* Event Banner */}
                  <div
                    className={`relative flex h-52 flex-col justify-between overflow-hidden ${
                      event.imageUrl
                        ? 'bg-[#080D1C]'
                        : `bg-gradient-to-br ${
                            bannerStyles[event.club] ||
                            'from-blue-700 to-purple-700'
                          }`
                    } p-6`}
                  >
                    {event.imageUrl ? (
                      <>
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1226] via-[#0b1226]/50 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/20" />
                        <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-white/20" />
                      </>
                    )}

                    <div className="relative z-10 flex justify-between gap-2">
                      <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {event.eventType || 'General'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {isEventPast ? (
                          <span className="rounded-full bg-slate-900/60 px-2.5 py-0.5 text-xs text-slate-300 backdrop-blur">
                            Completed
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-semibold text-green-300 backdrop-blur">
                            Upcoming
                          </span>
                        )}

                        <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                          {event.club || 'Individual'}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                        CampusOS Event
                      </p>

                      <h3 className="max-w-sm text-2xl font-extrabold text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Event Information */}
                  <div className="p-6">
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
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyEvents;
