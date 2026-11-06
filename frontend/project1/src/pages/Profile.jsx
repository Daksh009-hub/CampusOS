
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  GraduationCap,
  Building2,
  Edit3,
  Check,
  X,
  ArrowLeft,
  ShieldCheck,
  Award,
  Sparkles,
  Hash,
  FileText,
  Loader2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Profile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError('Please login to view your profile.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to fetch profile.');
        }

        setProfile(result.data);
        setFormData({
          name: result.data.name || '',
          rollNumber: result.data.rollNumber || '',
          department: result.data.department || '',
          year: result.data.year || '',
          bio: result.data.bio || '',
        });
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to update profile.');
      }

      const updatedProfile = result.data || {
        ...profile,
        ...formData,
      };

      setProfile(updatedProfile);
      setFormData({
        name: updatedProfile.name || '',
        rollNumber: updatedProfile.rollNumber || '',
        department: updatedProfile.department || '',
        year: updatedProfile.year || '',
        bio: updatedProfile.bio || '',
      });

      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || '',
      rollNumber: profile.rollNumber || '',
      department: profile.department || '',
      year: profile.year || '',
      bio: profile.bio || '',
    });

    setIsEditing(false);
    setError('');
  };

  const getInitials = (name) => {
    return name
      ? name.split(' ').map((part) => part[0]).join('').toUpperCase()
      : 'ST';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-cyan-400">
        <Loader2 className="animate-spin" size={35} />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center px-5 text-center text-white">
        <p className="text-red-400 mb-5">{error}</p>
        <Link to="/login" className="text-cyan-400 hover:text-white">
          Go to Login →
        </Link>
      </div>
    );
  }

  const joinedClubs = Array.isArray(profile.joinedClubs)
    ? profile.joinedClubs
    : [];

  const eventsAttended = Array.isArray(profile.eventsAttended)
    ? profile.eventsAttended.length
    : Number(profile.eventsAttended) || 0;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">

        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/20 transition"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                <X size={16} /> Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-400">
            {successMessage}
          </div>
        )}

        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] p-6 sm:p-8 shadow-2xl">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-extrabold shadow-xl">
              {getInitials(profile.name)}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl font-extrabold sm:text-3xl">
                  {profile.name || 'Student'}
                </h1>

                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                  <ShieldCheck size={14} />
                  {profile.role || 'Student Member'}
                </span>
              </div>

              <p className="flex items-center justify-center gap-2 text-sm text-slate-400 sm:justify-start">
                <Mail size={16} className="text-cyan-400" />
                {profile.email}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-300 sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <Building2 size={15} className="text-cyan-400" />
                  {profile.department || 'Department not added'}
                </span>

                <span className="flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-cyan-400" />
                  {profile.year || 'Year not added'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="grid gap-8 md:grid-cols-3">

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-6">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <User className="text-cyan-400" size={20} />
                Academic Information
              </h2>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { name: 'name', label: 'Student Name' },
                      { name: 'rollNumber', label: 'Roll Number' },
                      { name: 'department', label: 'Department' },
                      { name: 'year', label: 'Year / Program' },
                    ].map((field) => (
                      <div key={field.name} className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          required={field.name !== 'rollNumber'}
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      rows="4"
                      value={formData.bio || ''}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        label: 'Student Name',
                        value: profile.name,
                        icon: User,
                      },
                      {
                        label: 'Roll / Reg No.',
                        value: profile.rollNumber,
                        icon: Hash,
                      },
                      {
                        label: 'Department',
                        value: profile.department,
                        icon: Building2,
                      },
                      {
                        label: 'Academic Year',
                        value: profile.year,
                        icon: GraduationCap,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="rounded-xl border border-slate-800 bg-[#080D1C] p-4"
                        >
                          <span className="mb-1 flex items-center gap-1 text-xs text-slate-400">
                            <Icon size={12} />
                            {item.label}
                          </span>
                          <p className="font-semibold text-white">
                            {item.value || 'Not added'}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
                    <span className="mb-1 flex items-center gap-1 text-xs text-slate-400">
                      <FileText size={12} />
                      Bio & Overview
                    </span>
                    <p className="leading-relaxed text-slate-300">
                      {profile.bio || 'No bio added yet.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Joined Clubs */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Award className="text-cyan-400" size={20} />
                Joined Clubs
              </h2>

              {joinedClubs.length > 0 ? (
                <div className="space-y-3">
                  {joinedClubs.map((club, index) => (
                    <div
                      key={club._id || club.name || club || index}
                      className="rounded-xl border border-slate-800 bg-[#080D1C] p-3 text-xs"
                    >
                      <span className="font-semibold text-white">
                        {typeof club === 'string'
                          ? club
                          : club.name || 'Club'}
                      </span>

                      {club.role && (
                        <span className="mt-2 block text-cyan-400">
                          {club.role}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  You haven't joined any clubs yet.
                </p>
              )}
            </div>

            {/* Campus Activity */}
            <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="text-cyan-400" size={20} />
                Campus Activity
              </h2>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-3">
                  <span className="text-2xl font-extrabold text-cyan-400">
                    {eventsAttended}
                  </span>
                  <span className="mt-1 block text-[11px] text-slate-400">
                    Events Attended
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-3">
                  <span className="text-2xl font-extrabold text-cyan-400">
                    {joinedClubs.length}
                  </span>
                  <span className="mt-1 block text-[11px] text-slate-400">
                    Clubs Joined
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;
