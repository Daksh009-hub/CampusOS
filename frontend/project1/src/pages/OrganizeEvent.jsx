
import { useState } from 'react';
import { Link } from 'react-router-dom';

function OrganizeEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    imageUrl: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Event Data:', formData);

    setSubmitted(true);
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
              Event Submitted!
            </h2>

            <p className="mt-3 text-slate-400">
              Your event form has been submitted in this demo.
              Backend integration is pending.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: '',
                  description: '',
                  eventDate: '',
                  imageUrl: '',
                });
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

            {/* Event Title */}
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

            {/* Description */}
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

            {/* Event Date */}
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

            {/* Image URL */}
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

              <p className="mt-2 text-xs text-slate-500">
                Paste a publicly accessible image URL.
              </p>

              {formData.imageUrl && (
                <div className="mt-5">
                  <p className="mb-2 text-sm text-slate-400">
                    Banner Preview
                  </p>

                  <img
                    src={formData.imageUrl}
                    alt="Event banner preview"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = 'block';
                    }}
                    className="max-h-64 w-full rounded-xl border border-slate-700 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01]"
            >
              Submit Event for Approval →
            </button>

            <p className="text-center text-xs text-slate-500">
              Events require admin approval before public publishing.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrganizeEvent;
