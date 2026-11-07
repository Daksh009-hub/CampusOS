import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialFormData = {
  title: '',
  description: '',
  eventDate: '',
  venue: '',
  club: 'Individual',
  eventType: 'Workshop',
  registrationLink: '',
};

function OrganizeEvent({ userId }) {
  const activeUserId = userId || localStorage.getItem('campusUserId');
  const [formData, setFormData] = useState(initialFormData);
  const [timeValue, setTimeValue] = useState('');
  const [timePeriod, setTimePeriod] = useState('AM');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [clubs, setClubs] = useState([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [clubsError, setClubsError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch DB clubs and filter by logged-in user's joined clubs
  useEffect(() => {
    const fetchClubsAndUser = async () => {
      try {
        setClubsLoading(true);

        const [clubsRes, userRes] = await Promise.all([
          fetch(`${API_URL}/clubs`),
          activeUserId
            ? fetch(`${API_URL}/users/${activeUserId}`)
            : Promise.resolve(null),
        ]);

        const clubsResult = await clubsRes.json();
        const userResult = userRes ? await userRes.json() : null;

        const dbClubs =
          clubsResult.success && Array.isArray(clubsResult.data)
            ? clubsResult.data
            : [];

        const userJoined =
          userResult?.success && Array.isArray(userResult.data?.joinedClubs)
            ? userResult.data.joinedClubs
            : [];

        // Normalize club names (remove spaces/dashes, lowercase) for accurate matching
        const userClubNames = userJoined.map((jc) => {
          const raw = typeof jc === 'string' ? jc : jc.name || '';
          return raw.toLowerCase().replace(/[^a-z0-9]/g, '');
        });

        // Filter DB clubs that match the user's joined clubs
        const matchedClubs = dbClubs.filter((c) => {
          const nameNorm = (c.name || '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
          const slugNorm = (c.slug || '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
          return (
            userClubNames.includes(nameNorm) || userClubNames.includes(slugNorm)
          );
        });

        setClubs(matchedClubs);
      } catch (err) {
        setClubsError(err.message || 'Unable to load clubs.');
      } finally {
        setClubsLoading(false);
      }
    };

    fetchClubsAndUser();
  }, [activeUserId]);

  const inputClass =
    'w-full rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeChange = (e) => {
    // Only allow numbers and colon (reject any letters/symbols)
    let val = e.target.value.replace(/[^0-9:]/g, '');

    // Prevent multiple colons
    const parts = val.split(':');
    if (parts.length > 2) {
      val = parts[0] + ':' + parts.slice(1).join('');
    }

    // Auto-add colon after 2 digits if typing sequentially
    if (
      val.length === 2 &&
      !val.includes(':') &&
      e.nativeEvent?.inputType !== 'deleteContentBackward'
    ) {
      val = val + ':';
    }

    // Limit to HH:MM format (max 5 characters)
    if (val.length > 5) {
      val = val.slice(0, 5);
    }

    setTimeValue(val);
  };

  const handleTimeBlur = () => {
    if (!timeValue) return;
    const parts = timeValue.split(':');
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

    setTimeValue(`${hh}:${mm}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    const fileInput = document.getElementById('bannerUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const activeUserId = userId || localStorage.getItem('campusUserId');
    if (!activeUserId) {
      setError('Please login again. Your user ID is missing.');
      return;
    }

    if (!formData.eventDate) {
      setError('Please select an event date.');
      return;
    }

    if (!timeValue.trim()) {
      setError('Please enter the event time.');
      return;
    }

    if (!formData.venue || !formData.venue.trim()) {
      setError('Please enter the event venue.');
      return;
    }

    try {
      setLoading(true);

      const cleanTime = timeValue.trim();
      const finalTime = cleanTime
        ? (/am|pm/i.test(cleanTime) ? cleanTime : `${cleanTime} ${timePeriod}`)
        : '';

      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('description', formData.description);
      postData.append('eventDate', new Date(`${formData.eventDate}T12:00:00Z`).toISOString());
      postData.append('time', finalTime);
      postData.append('venue', formData.venue || '');
      postData.append('club', formData.club || '');
      postData.append('eventType', formData.eventType || 'General');
      postData.append('registrationLink', formData.registrationLink || '');
      postData.append('createdBy', activeUserId);

      // Append image uploaded from laptop
      if (imageFile) {
        postData.append('image', imageFile);
      }

      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        // Notice: Do NOT set Content-Type header when sending FormData!
        // The browser sets multipart/form-data with boundary automatically.
        body: postData,
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
              Your event has been uploaded and saved to the database.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData(initialFormData);
                setTimeValue('');
                setTimePeriod('AM');
                setImageFile(null);
                setImagePreview('');
                setError('');
              }}
              className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
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
                Organizing Club *
              </label>

              <select
                name="club"
                value={formData.club}
                onChange={handleChange}
                required
                disabled={clubsLoading}
                className={inputClass}
              >
                <option value="Individual">Individual</option>
                {clubs.map((club) => (
                  <option key={club._id || club.slug} value={club.name}>
                    {club.name}
                  </option>
                ))}
              </select>

              {clubsError && (
                <p className="mt-2 text-sm text-red-400">
                  {clubsError}
                </p>
              )}
            </div>

            {/* Event Date and Time */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Event Date *
                </label>

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Event Time *
                </label>

                <div className="flex rounded-xl border border-slate-700 bg-[#080D1C] transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                  <input
                    type="text"
                    name="timeValue"
                    value={timeValue}
                    onChange={handleTimeChange}
                    onBlur={handleTimeBlur}
                    placeholder="10:30"
                    maxLength={5}
                    inputMode="numeric"
                    required
                    className="w-full bg-transparent px-4 py-3.5 text-white outline-none placeholder:text-slate-600 font-medium"
                  />

                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="border-l border-slate-700 bg-[#080D1C] px-4 py-3.5 font-bold text-cyan-400 outline-none cursor-pointer rounded-r-xl transition hover:bg-slate-800"
                  >
                    <option value="AM" className="bg-[#080D1C] text-white">AM</option>
                    <option value="PM" className="bg-[#080D1C] text-white">PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Venue *
              </label>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter event venue"
                required
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

            {/* Event Banner Section (Upload from Laptop) */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Event Banner / Poster
              </label>

              {/* Upload from Laptop / Device */}
              <div className="relative rounded-2xl border-2 border-dashed border-slate-700 bg-[#080D1C] p-6 text-center transition hover:border-cyan-400">
                <input
                  type="file"
                  id="bannerUpload"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={handleFileChange}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />

                <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <div className="rounded-full bg-cyan-400/10 p-3 text-cyan-400">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Click to browse or drag & drop photo from your laptop
                  </p>
                  <p className="text-xs text-slate-400">
                    PNG, JPG, JPEG, WEBP (Uploaded automatically to Cloudinary)
                  </p>
                </div>
              </div>

              {/* Live Preview */}
              {imagePreview && (
                <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-700 bg-black/40">
                  <div className="flex items-center justify-between border-b border-slate-800 bg-[#080D1C]/80 px-4 py-2 text-xs text-slate-400">
                    <span className="flex items-center gap-2">
                      <ImageIcon size={14} className="text-cyan-400" />
                      {imageFile ? imageFile.name : 'Photo Selected'}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300"
                    >
                      <X size={14} /> Remove
                    </button>
                  </div>
                  <img
                    src={imagePreview}
                    alt="Event banner preview"
                    className="max-h-64 w-full object-cover"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || clubsLoading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Uploading & Creating Event...' : 'Submit Event →'}
            </button>

            <p className="text-center text-xs text-slate-500">
              Event details and image will be securely saved to the database and Cloudinary.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrganizeEvent;
