
import { useState } from 'react';
import { Link } from 'react-router-dom';

function OrganizeEvent() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Workshop',
    date: '',
    time: '',
    venue: '',
    description: '',
    deadline: '',
  });

  const [banner, setBanner] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...formData,
      banner,
    });

    alert('Event form submitted! Backend integration is pending.');
  };

  return (
    <div className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/"
          className="text-sm text-slate-400 hover:text-cyan-400"
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
            Create and publish an exciting event for the UIET community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl border border-slate-800 bg-[#10172A] p-6 md:p-10"
        >

          <div>
            <h2 className="text-xl font-bold">Event Information</h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter the basic details of your event.
            </p>
          </div>

          {/* Event Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Event Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter event name"
              className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Event Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 outline-none focus:border-cyan-400"
            >
              <option>Workshop</option>
              <option>Hackathon</option>
              <option>Competition</option>
              <option>Technical Session</option>
              <option>Seminar</option>
              <option>Ideathon</option>
              <option>Other</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Start Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Venue *
            </label>
            <input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              placeholder="Enter event venue"
              className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Event Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe your event..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Registration Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Banner */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Event Banner / Poster
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBanner(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-slate-700 bg-[#080D1C] p-3 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-[#050816]"
            />
            {banner && (
              <p className="mt-2 text-sm text-cyan-400">
                Selected: {banner.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white transition hover:scale-[1.01]"
          >
            Submit Event for Approval →
          </button>

          <p className="text-center text-xs text-slate-500">
            Events should be reviewed before appearing publicly.
          </p>

        </form>
      </div>
    </div>
  );
}

export default OrganizeEvent;
