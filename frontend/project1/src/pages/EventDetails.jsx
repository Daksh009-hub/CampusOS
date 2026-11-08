
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Loader2,
  ExternalLink,
  Edit2,
  Trash2,
  Upload,
  X,
  AlertTriangle,
  Image as ImageIcon,
  ArrowLeft,
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
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('campusUserId');

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit & Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState('');
  const [editFormData, setEditFormData] = useState({});
  const [editTimeValue, setEditTimeValue] = useState('');
  const [editTimePeriod, setEditTimePeriod] = useState('AM');
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const [clubs, setClubs] = useState([]);

  // Check if current logged-in user is the creator
  const creatorId = event?.createdBy?._id || event?.createdBy;
  const isOwner = Boolean(
    currentUserId && creatorId && String(creatorId) === String(currentUserId)
  );

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

  // Open Edit Modal with pre-filled event data
  const handleOpenEdit = async () => {
    let tv = '';
    let tp = 'AM';
    if (event?.time) {
      const match = event.time.match(/^(.*?)\s*(AM|PM)?$/i);
      if (match) {
        tv = match[1]?.trim() || '';
        tp = match[2]?.toUpperCase() || 'AM';
      }
    }

    let dStr = '';
    if (event?.eventDate) {
      try {
        dStr = new Date(event.eventDate).toISOString().split('T')[0];
      } catch (e) {
        dStr = '';
      }
    }

    setEditFormData({
      title: event.title || '',
      description: event.description || '',
      eventDate: dStr,
      venue: event.venue || '',
      club: event.club || '',
      eventType: event.eventType || 'Workshop',
      registrationLink: event.registrationLink || '',
    });
    setEditTimeValue(tv);
    setEditTimePeriod(tp);
    setEditImageFile(null);
    setEditImagePreview(event.imageUrl || '');
    setEditError('');
    setIsEditing(true);

    if (clubs.length === 0) {
      try {
        const [clubsRes, userRes] = await Promise.all([
          fetch(`${API_URL}/clubs`),
          currentUserId
            ? fetch(`${API_URL}/users/${currentUserId}`)
            : Promise.resolve(null),
        ]);

        const clubsJson = await clubsRes.json();
        const userJson = userRes ? await userRes.json() : null;

        const dbClubs =
          clubsJson.success && Array.isArray(clubsJson.data)
            ? clubsJson.data
            : [];

        const userJoined =
          userJson?.success && Array.isArray(userJson.data?.joinedClubs)
            ? userJson.data.joinedClubs
            : [];

        const userClubNames = userJoined.map((jc) => {
          const raw = typeof jc === 'string' ? jc : jc.name || '';
          return raw.toLowerCase().replace(/[^a-z0-9]/g, '');
        });

        const matchedClubs = dbClubs.filter((c) => {
          const nameNorm = (c.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const slugNorm = (c.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          return userClubNames.includes(nameNorm) || userClubNames.includes(slugNorm);
        });

        setClubs(matchedClubs);
      } catch (err) {
        console.error('Failed to load clubs', err);
      }
    }
  };

  // Handle Edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Edit Time changes with numeric restriction
  const handleEditTimeChange = (e) => {
    let val = e.target.value.replace(/[^0-9:]/g, '');
    const parts = val.split(':');
    if (parts.length > 2) {
      val = parts[0] + ':' + parts.slice(1).join('');
    }
    if (
      val.length === 2 &&
      !val.includes(':') &&
      e.nativeEvent?.inputType !== 'deleteContentBackward'
    ) {
      val = val + ':';
    }
    if (val.length > 5) {
      val = val.slice(0, 5);
    }
    setEditTimeValue(val);
  };

  const handleEditTimeBlur = () => {
    if (!editTimeValue) return;
    const parts = editTimeValue.split(':');
    let hh = parts[0];
    let mm = parts[1];

    if (hh) {
      let hNum = parseInt(hh, 10);
      if (isNaN(hNum) || hNum < 1) hNum = 12;
      if (hNum > 12) hNum = 12;
      hh = String(hNum).padStart(2, '0');
    }

    if (mm !== undefined && mm !== '') {
      let mNum = parseInt(mm, 10);
      if (isNaN(mNum) || mNum < 0) mNum = 0;
      if (mNum > 59) mNum = 59;
      mm = String(mNum).padStart(2, '0');
    } else {
      mm = '00';
    }

    setEditTimeValue(`${hh}:${mm}`);
  };

  // Handle file picker in edit modal
  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle saving edits
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditError('');
    setSavingEdit(true);

    try {
      const cleanTime = editTimeValue.trim();
      const finalTime = cleanTime
        ? (/am|pm/i.test(cleanTime) ? cleanTime : `${cleanTime} ${editTimePeriod}`)
        : '';

      const postData = new FormData();
      postData.append('title', editFormData.title);
      postData.append('description', editFormData.description);
      if (editFormData.eventDate) {
        postData.append(
          'eventDate',
          new Date(`${editFormData.eventDate}T12:00:00Z`).toISOString()
        );
      }
      postData.append('time', finalTime);
      postData.append('venue', editFormData.venue || '');
      postData.append('club', editFormData.club || '');
      postData.append('eventType', editFormData.eventType || 'General');
      postData.append('registrationLink', editFormData.registrationLink || '');
      postData.append('userId', currentUserId);

      if (editImageFile) {
        postData.append('image', editImageFile);
      }

      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'x-user-id': currentUserId,
        },
        body: postData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update event');
      }

      setEvent(result.data);
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message || 'Failed to update event.');
    } finally {
      setSavingEdit(false);
    }
  };

  // Handle deleting event
  const handleDeleteEvent = async () => {
    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/events/${id}?userId=${currentUserId}`,
        {
          method: 'DELETE',
          headers: {
            'x-user-id': currentUserId,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete event');
      }

      navigate('/#events');
    } catch (err) {
      alert(err.message || 'Error deleting event');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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

          <Link
            to="/#events"
            className="group flex items-center gap-3 text-2xl font-extrabold transition hover:opacity-95"
          >
            <ArrowLeft
              size={22}
              className="text-slate-400 transition group-hover:-translate-x-1 group-hover:text-cyan-400"
            />
            <span>
              Campus<span className="text-cyan-400">OS</span>
            </span>
          </Link>

        </div>
      </nav>

      {/* Full-Width Hero Banner */}
      <section
        className={`relative flex min-h-[420px] flex-col justify-end overflow-hidden border-b border-white/10 ${
          event.imageUrl ? 'bg-[#080D1C]' : `bg-gradient-to-br ${bannerStyle}`
        }`}
      >
        {event.imageUrl ? (
          <>
            {/* Full clarity user uploaded image */}
            <img
              src={event.imageUrl}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Soft dark gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/75 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/90 via-[#050816]/40 to-transparent" />
          </>
        ) : (
          <>
            {/* Decorative rings only when no image is uploaded */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#050816] to-purple-900/30" />
            <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full border border-white/10" />
          </>
        )}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                {event.club || 'CampusOS'}
              </span>

              <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-300 backdrop-blur-md">
                {event.eventType || 'General'}
              </span>
            </div>

            {/* Creator Edit & Delete Action Buttons */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105"
                >
                  <Edit2 size={15} className="text-cyan-400" />
                  Edit Event
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/50 px-4 py-2 text-xs font-bold text-red-300 backdrop-blur-md transition hover:bg-red-900/60 hover:scale-105"
                >
                  <Trash2 size={15} />
                  Delete Event
                </button>
              </div>
            )}
          </div>

          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            {event.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            {event.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-10">

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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#10172A] p-7 shadow-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 mx-auto mb-5">
                <AlertTriangle size={32} />
              </div>

              <h3 className="text-xl font-bold text-white text-center">
                Delete This Event?
              </h3>

              <p className="mt-3 text-center text-sm text-slate-400 leading-6">
                Are you sure you want to delete <span className="font-semibold text-white">"{event.title}"</span>? This action cannot be undone.
              </p>

              <div className="mt-7 flex gap-3">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDeleteEvent}
                  className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl">
              {/* Fixed Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-6 sm:px-8 sm:py-5">
                <div>
                  <h3 className="text-2xl font-bold text-white">Edit Event</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Update details for this event
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form with Scrollable Body and Fixed Footer */}
              <form onSubmit={handleSaveEdit} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-5 overflow-y-auto p-6 sm:px-8">
                  {editError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                      {editError}
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Organizing Club *
                      </label>
                      <select
                        name="club"
                        value={editFormData.club || 'Individual'}
                        onChange={handleEditChange}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                      >
                        <option value="Individual">Individual</option>
                        {clubs.map((c) => (
                          <option key={c._id || c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={editFormData.eventType}
                        onChange={handleEditChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                      >
                        <option value="Workshop">Workshop</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Competition">Competition</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Technical">Technical</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time with AM/PM */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={editFormData.eventDate}
                        onChange={handleEditChange}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Event Time *
                      </label>
                      <div className="flex rounded-xl border border-slate-700 bg-[#080D1C] focus-within:border-cyan-400">
                        <input
                          type="text"
                          name="timeValue"
                          value={editTimeValue}
                          onChange={handleEditTimeChange}
                          onBlur={handleEditTimeBlur}
                          placeholder="10:30"
                          maxLength={5}
                          inputMode="numeric"
                          required
                          className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-600 font-medium"
                        />
                        <select
                          value={editTimePeriod}
                          onChange={(e) => setEditTimePeriod(e.target.value)}
                          className="border-l border-slate-700 bg-[#080D1C] px-3 font-bold text-cyan-400 outline-none rounded-r-xl"
                        >
                          <option value="AM" className="bg-[#080D1C] text-white">AM</option>
                          <option value="PM" className="bg-[#080D1C] text-white">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Venue *
                      </label>
                      <input
                        type="text"
                        name="venue"
                        value={editFormData.venue}
                        onChange={handleEditChange}
                        placeholder="e.g. Audi 1, Block 2"
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Registration Link
                      </label>
                      <input
                        type="url"
                        name="registrationLink"
                        value={editFormData.registrationLink}
                        onChange={handleEditChange}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Banner Photo upload */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Update Event Banner / Poster (Optional)
                    </label>
                    <div className="relative rounded-xl border border-dashed border-slate-700 bg-[#080D1C] p-4 text-center hover:border-cyan-400 transition">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleEditFileChange}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      />
                      <div className="flex flex-col items-center justify-center space-y-1 pointer-events-none text-xs text-slate-400">
                        <Upload size={18} className="text-cyan-400" />
                        <span className="font-semibold text-white">
                          {editImageFile ? editImageFile.name : 'Click to choose new photo from laptop'}
                        </span>
                        <span>PNG, JPG, JPEG, WEBP</span>
                      </div>
                    </div>

                    {editImagePreview && (
                      <div className="mt-3 relative h-28 overflow-hidden rounded-xl border border-slate-800">
                        <img
                          src={editImagePreview}
                          alt="Banner Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Fixed Footer */}
                <div className="flex shrink-0 justify-end gap-3 border-t border-slate-800 bg-[#080D1C]/80 p-4 sm:px-8">
                  <button
                    type="button"
                    disabled={savingEdit}
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-105 disabled:opacity-50"
                  >
                    {savingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default EventDetails;
