
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Globe,
  Loader2,
  CalendarDays,
  MapPin,
  Clock,
  ExternalLink,
  CalendarCheck,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Format event date
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

// Event Card
function EventCard({ event, isPast }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10">

      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-blue-600/30">
          <CalendarDays size={48} className="text-purple-300" />
        </div>
      )}

      <div className="p-5">

        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">
            {event.eventType || 'General'}
          </span>

          {isPast ? (
            <span className="rounded-full bg-gray-500/20 px-3 py-1 text-xs text-gray-400">
              Completed
            </span>
          ) : (
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">
              Upcoming
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-white transition group-hover:text-purple-300">
          {event.title}
        </h3>

        <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-400">
          {event.description}
        </p>

        <div className="space-y-3 border-t border-white/10 pt-4 text-sm text-gray-400">

          <div className="flex items-center gap-3">
            <CalendarDays size={16} className="shrink-0 text-purple-400" />
            {formatDate(event.eventDate)}
          </div>

          {event.time && (
            <div className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-purple-400" />
              {event.time}
            </div>
          )}

          {event.venue && (
            <div className="flex items-center gap-3">
              <MapPin size={16} className="shrink-0 text-purple-400" />
              {event.venue}
            </div>
          )}

        </div>

        {!isPast && event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Register Now
            <ExternalLink size={16} />
          </a>
        )}

      </div>
    </div>
  );
}

// Section Heading
function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-7">
      <div className="mb-2 flex items-center gap-3">
        <div className="rounded-xl bg-purple-500/15 p-2 text-purple-400">
          <Icon size={21} />
        </div>

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="text-sm text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ClubDetails() {
  const { slug } = useParams();

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetch Club Details
  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        setError('');
        setClub(null);
        setEvents([]);

        const response = await fetch(`${API_URL}/clubs/${slug}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Unable to load club details'
          );
        }

        setClub(result.data);

      } catch (err) {
        console.error('CLUB FETCH ERROR:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchClub();
    }
  }, [slug]);

  // 2. Fetch Events for This Club
  useEffect(() => {
    if (!club?.name) return;

    const fetchEvents = async () => {
      try {
        setEventsLoading(true);

        const response = await fetch(
          `${API_URL}/events?club=${encodeURIComponent(club.name)}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || 'Unable to load events'
          );
        }

        setEvents(
          Array.isArray(result.data) ? result.data : []
        );

      } catch (err) {
        console.error('EVENT FETCH ERROR:', err);
        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, [club?.name]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070B18]">
        <div className="text-center">
          <Loader2
            className="mx-auto mb-4 animate-spin text-purple-500"
            size={40}
          />

          <p className="text-gray-400">
            Loading club details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !club) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#070B18] px-4 text-center">

        <h2 className="mb-3 text-3xl font-bold text-white">
          Club Not Found
        </h2>

        <p className="mb-6 text-gray-400">
          {error || 'The requested club could not be found.'}
        </p>

        <Link
          to="/"
          className="rounded-xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-500"
        >
          Back to Home
        </Link>

      </div>
    );
  }

  // 3. Separate Upcoming and Past Events
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => {
      if (!event.eventDate) return false;

      const date = new Date(event.eventDate);

      return !Number.isNaN(date.getTime()) && date >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.eventDate) - new Date(b.eventDate)
    );

  const pastEvents = events
    .filter((event) => {
      if (!event.eventDate) return false;

      const date = new Date(event.eventDate);

      return !Number.isNaN(date.getTime()) && date < today;
    })
    .sort(
      (a, b) =>
        new Date(b.eventDate) - new Date(a.eventDate)
    );

  // Social Links
  const socialLinks = [
    { key: 'website', label: 'Website' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'github', label: 'GitHub' },
    { key: 'email', label: 'Email' },
  ];

  return (
    <div className="min-h-screen bg-[#070B18] text-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-[#070B18] to-blue-900/20" />

        {club.bannerUrl && (
          <img
            src={club.bannerUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        )}

        <div className="relative mx-auto max-w-7xl px-5 pt-6 pb-12 md:px-10 md:pt-8 md:pb-16">

          <Link
            to="/clubs"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-300"
          >
            <ArrowLeft size={18} />
            Back to Clubs
          </Link>

          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">

            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-purple-500/10 md:h-36 md:w-36">

              {club.logoUrl ? (
                <img
                  src={club.logoUrl}
                  alt={club.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Sparkles
                  size={48}
                  className="text-purple-400"
                />
              )}

            </div>

            <div>

              <span className="mb-4 inline-block rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-300">
                {club.category || 'Technical Club'}
              </span>

              <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                {club.name}
              </h1>

              {club.fullName && (
                <p className="mb-2 text-lg text-purple-300">
                  {club.fullName}
                </p>
              )}

              <p className="max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                {club.description}
              </p>

            </div>

          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-20 px-5 py-16 md:px-10">

        {/* ABOUT SECTION */}
        <section>

          <SectionHeading
            icon={Sparkles}
            title="About the Club"
            subtitle="Get to know our community and what we do."
          />

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">

            <p className="whitespace-pre-line text-base leading-8 text-gray-300">
              {club.longDescription || club.description}
            </p>

          </div>
        </section>

        {/* CLUB EVENTS SECTION */}
        <section>

          <SectionHeading
            icon={CalendarDays}
            title="Club Events"
            subtitle="Discover what's happening in our community."
          />

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2
                className="animate-spin text-purple-500"
                size={32}
              />
            </div>
          ) : (
            <>

              {/* UPCOMING EVENTS */}
              <div className="mb-12">

                <div className="mb-6 flex items-center gap-3">

                  <CalendarCheck
                    className="text-green-400"
                    size={22}
                  />

                  <h3 className="text-xl font-bold">
                    Upcoming Events
                  </h3>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    {upcomingEvents.length}
                  </span>

                </div>

                {upcomingEvents.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#111827]/60 py-10 text-center">

                    <CalendarDays
                      className="mx-auto mb-3 text-gray-500"
                      size={35}
                    />

                    <p className="text-gray-400">
                      No upcoming events at the moment.
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Stay tuned for updates!
                    </p>

                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {upcomingEvents.map((event) => (
                      <EventCard
                        key={event._id}
                        event={event}
                        isPast={false}
                      />
                    ))}

                  </div>
                )}

              </div>

              {/* PAST EVENTS */}
              <div>

                <div className="mb-6 flex items-center gap-3">

                  <CalendarDays
                    className="text-gray-400"
                    size={22}
                  />

                  <h3 className="text-xl font-bold">
                    Past Events
                  </h3>

                  <span className="rounded-full bg-gray-500/10 px-3 py-1 text-xs text-gray-400">
                    {pastEvents.length}
                  </span>

                </div>

                {pastEvents.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#111827]/60 py-10 text-center">

                    <CalendarDays
                      className="mx-auto mb-3 text-gray-500"
                      size={35}
                    />

                    <p className="text-gray-400">
                      No past events available.
                    </p>

                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {pastEvents.map((event) => (
                      <EventCard
                        key={event._id}
                        event={event}
                        isPast={true}
                      />
                    ))}

                  </div>
                )}

              </div>

            </>
          )}

        </section>

        {/* SOCIAL LINKS */}
        {club.socialLinks && (
          <section>

            <SectionHeading
              icon={Globe}
              title="Connect With Us"
              subtitle="Follow our journey and stay connected."
            />

            <div className="flex flex-wrap gap-4">

              {socialLinks.map(({ key, label }) => {

                const value = club.socialLinks[key];

                if (!value) return null;

                const href =
                  key === 'email'
                    ? `mailto:${value}`
                    : value.startsWith('http')
                      ? value
                      : `https://${value}`;

                return (
                  <a
                    key={key}
                    href={href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
                  >

                    {label}

                    <ArrowUpRight size={16} />

                  </a>
                );
              })}

            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default ClubDetails;
