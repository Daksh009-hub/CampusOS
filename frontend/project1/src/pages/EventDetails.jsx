
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

import { dummyEvents } from '../data/events';

function EventDetails() {
  const { id } = useParams();

  const event = dummyEvents.find(
    (item) => item.id === Number(id)
  );

  // Event not found
  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050816] px-6 text-center text-white">
        <CalendarDays size={48} className="text-cyan-400" />

        <h1 className="mt-5 text-3xl font-bold">
          Event Not Found
        </h1>

        <p className="mt-3 text-slate-400">
          The event you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Event Hero */}
        <section className="relative mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#10172A] to-[#080D1C] p-8 md:p-14">

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />

          <div className="relative z-10">

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-400">
                {event.club}
              </span>

              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-400">
                {event.category}
              </span>
            </div>

            <h1 className="mt-7 text-3xl font-extrabold leading-tight md:text-5xl">
              {event.name}
            </h1>

            <p className="mt-5 max-w-2xl leading-8 text-slate-400">
              {event.description}
            </p>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">

              <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-white/[0.03] p-4">
                <CalendarDays className="shrink-0 text-cyan-400" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Event Date</p>
                  <p className="mt-1 font-semibold">{event.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-white/[0.03] p-4">
                <Clock3 className="shrink-0 text-cyan-400" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Event Time</p>
                  <p className="mt-1 font-semibold">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-white/[0.03] p-4">
                <MapPin className="shrink-0 text-cyan-400" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Venue</p>
                  <p className="mt-1 font-semibold">{event.venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-white/[0.03] p-4">
                <Users className="shrink-0 text-cyan-400" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Organized By</p>
                  <p className="mt-1 font-semibold">{event.club}</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* About Event */}
        <section className="py-12">

          <div className="flex items-center gap-3">
            <Sparkles size={23} className="text-cyan-400" />
            <h2 className="text-2xl font-bold">About This Event</h2>
          </div>

          <p className="mt-5 max-w-3xl leading-8 text-slate-400">
            {event.description}
          </p>

          {/* Registration Button - UI only for now */}
          <button
            type="button"
            disabled
            className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold text-white opacity-70"
          >
            Registration Coming Soon
            <ArrowUpRight size={18} />
          </button>

        </section>

      </div>
    </div>
  );
}

export default EventDetails;
