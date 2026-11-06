
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialFormData = {
  title: '',
  description: '',
  eventDate: '',
  imageUrl: '',
  venue: '',
  club: '',
  eventType: 'Workshop',
  registrationLink: '',
};

function OrganizeEvent({ userId }) {
  const [formData, setFormData] = useState(initialFormData);
  const [clubs, setClubs] = useState([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [clubsError, setClubsError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch actual clubs from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(`${API_URL}/clubs`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to fetch clubs.');
        }

        setClubs(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setClubsError(err.message || 'Unable to load clubs.');
      } finally {
        setClubsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const inputClass =
    'w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId) {
      setError('Please login again. Your user ID is missing.');
      return;
    }

    if (!formData.eventDate) {
      setError('Please select an event date and time.');
      return;
    }

    try {
      setLoading(true);

      const eventData = {
        ...formData,
        eventDate: new Date(formData.eventDate).toISOString(),
        time: formData.eventDate.split('T')[1],
        createdBy: userId,
      };

      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to create event.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/"
          className="text-sm text-slate-400 transition hover:text-cyan-400"
        >
          ← Back to Home
        </Link>

        <div className="mb-10 mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Club Management
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Organize an Event
          </h1>

          <p className="mt-3 text-slate-400">
            Create an event and share it with the UIET community.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-cyan-400/30 bg-[#10172A] p-10 text-center">
            <div className="text-5xl text-cyan-400">✓</div>

            <h2 className="mt-5 text-2xl font-bold">
              Event Created Successfully!
            </h2>

            <p className="mt-3 text-slate-400">
              Your event has been saved to the database.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData(initialFormData);
                setError('');
              }}
              className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold"
            >
              Create Another Event
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-7 rounded-3xl border border-slate-800 bg-[#10172A] p-6 shadow-2xl shadow-blue-950/20 sm:p-10"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your event..."
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Select Club *
              </label>

              <select
                name="club"
                value={formData.club}
                onChange={handleChange}
                required
                disabled={clubsLoading || clubs.length === 0}
                className={inputClass}
              >
                <option value="">
                  {clubsLoading ? 'Loading clubs...' : 'Choose a club'}
                </option>

                {clubs.map((club) => (
                  <option key={club._id} value={club.name}>
                    {club.name}
                  </option>
                ))}
              </select>

              {clubsError && (
                <p className="mt-2 text-sm text-red-400">{clubsError}</p>
              )}

              {!clubsLoading && !clubsError && clubs.length === 0 && (
                <p className="mt-2 text-sm text-slate-400">
                  No clubs are currently available.
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Date & Time *
              </label>

              <input
                type="datetime-local"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Venue
              </label>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter event venue"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Type
              </label>

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Seminar">Seminar</option>
                <option value="Hackathon">Hackathon</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Registration Link
              </label>

              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://example.com/register"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Banner Image URL
              </label>

              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/event-banner.jpg"
                className={inputClass}
              />

              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Event banner preview"
                  className="mt-5 max-h-64 w-full rounded-xl border border-slate-700 object-cover"
                />
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || clubsLoading || clubs.length === 0}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting Event...' : 'Submit Event →'}
            </button>

            <p className="text-center text-xs text-slate-500">
              Event details will be saved using the existing backend API.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrganizeEvent;
