
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Loader2,
  ExternalLink,
} from 'lucide-react';

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
    month: 'long',
    year: 'numeric',
  });
}

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch event details from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_URL}/events/${id}`);
        const result = await response.json();

        console.log('EVENT DETAILS API:', result);

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Unable to fetch event details'
          );
        }

        setEvent(result.data);

      } catch (err) {
        console.error('EVENT DETAILS ERROR:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <Loader2
            size={40}
            className="mx-auto animate-spin text-cyan-400"
          />
          <p className="mt-4 text-slate-400">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  // Error / Not Found state
  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050816] px-6 text-center text-white">

        <h1 className="text-4xl font-bold">
          Event Not Found
        </h1>

        <p className="mt-3 text-slate-400">
          {error || 'The event you are looking for does not exist.'}
        </p>

        <Link
          to="/"
          className="mt-7 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-[#050816] transition hover:bg-cyan-400"
        >
          Back to Home
        </Link>

      </div>
    );
  }

  const bannerStyle =
    bannerStyles[event.club] || 'from-blue-700 to-purple-700';

  const eventInfo = [
    {
      icon: CalendarDays,
      label: 'Event Date',
      value: formatDate(event.eventDate),
    },
    {
      icon: Clock,
      label: 'Event Time',
      value: event.time || 'To be announced',
    },
    {
      icon: MapPin,
      label: 'Venue',
      value: event.venue || 'To be announced',
    },
    {
      icon: Users,
      label: 'Organized By',
      value: event.club || 'CampusOS',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-[#080D1C]">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <Link to="/" className="text-2xl font-extrabold">
            Campus<span className="text-cyan-400">OS</span>
          </Link>

          <Link
            to="/#events"
            className="text-sm font-semibold text-slate-400 transition hover:text-cyan-400"
          >
            ← All Events
          </Link>

        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Hero Banner */}
        <section
          className={`relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${bannerStyle} p-8 md:p-14`}
        >

          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
          )}

          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/20" />

          <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full border border-white/20" />

          <div className="relative z-10">

            <div className="mb-6 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur">
                {event.club || 'CampusOS'}
              </span>

              <span className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur">
                {event.eventType || 'General'}
              </span>

            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              CampusOS Event
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              {event.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              {event.description}
            </p>

          </div>
        </section>

        {/* Event Information */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {eventInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 transition hover:border-cyan-500/50"
              >

                <Icon size={30} className="text-cyan-400" />

                <p className="mt-4 text-sm text-slate-400">
                  {item.label}
                </p>

                <p className="mt-2 break-words font-semibold text-white">
                  {item.value}
                </p>

              </div>
            );
          })}

        </section>

        {/* About Event Section */}
        <section className="mt-5">

          <div className="rounded-3xl border border-slate-800 bg-[#10172A]/60 p-8 md:p-10">

            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Event Overview
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              About This Event
            </h2>

            <p className="mt-6 whitespace-pre-line leading-8 text-slate-400">
              {event.description}
            </p>

            

            
          </div>

        </section>

        {/* Registration Section */}
        <section className="mt-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-blue-950/60 to-cyan-950/30 p-8 text-center md:p-12">

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Be Part of It
          </p>

          <h2 className="mt-4 text-3xl font-extrabold">
            Ready to Join This Event?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Don't miss this opportunity to learn, participate
            and connect with the UIET community.
          </p>

          {event.registrationLink ? (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white transition hover:scale-105"
            >
              Register Now
              <ExternalLink size={18} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-8 cursor-not-allowed rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white opacity-70"
            >
              Registration Coming Soon
            </button>
          )}

        </section>

        {/* Back Link */}
        <div className="py-12 text-center">

          <Link
            to="/#events"
            className="font-semibold text-cyan-400 transition hover:text-white"
          >
            ← Explore More Events
          </Link>

        </div>

      </main>
    </div>
  );
}

export default EventDetails;
