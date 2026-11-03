import React, { useState } from 'react';
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
  Camera,
  ShieldCheck,
  Award,
  Sparkles,
  Hash,
  FileText
} from 'lucide-react';

function Profile() {
 
  const [profile, setProfile] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@uiet.ac.in',
    role: 'Student Member',
    department: 'Computer Science & Engineering',
    year: '3rd Year (B.Tech)',
    rollNumber: '252302042',
    bio: 'Passionate web developer and open-source enthusiast interested in full-stack web applications, competitive programming, and active participation in campus hackathons.',
    avatarUrl: '', // Fallback initials avatar "AS"
    joinedClubs: [
      { name: 'GDGC UIET', role: 'Technical Lead', color: 'text-cyan-400 border-cyan-500/30' },
      { name: 'E-Cell UIET', role: 'Member', color: 'text-blue-400 border-blue-500/30' },
      { name: 'Elektron Club', role: 'Core Member', color: 'text-purple-400 border-purple-500/30' }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate backend API response update
    setTimeout(() => {
      setProfile({ ...formData });
      setSaving(false);
      setIsEditing(false);
      setSuccessMessage('Profile details updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 600);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'ST';
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
        
        {/* Navigation & Actions Header */}
        <div className="flex items-center justify-between">
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg hover:from-blue-500 hover:to-cyan-400 transition disabled:opacity-50"
              >
                {saving ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Check size={16} /> Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm font-medium text-emerald-400">
            {successMessage}
          </div>
        )}

        {/* Profile Card Header */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] p-6 sm:p-8 shadow-2xl">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar Box */}
            <div className="relative group shrink-0">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-extrabold text-white shadow-xl overflow-hidden">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{getInitials(profile.name)}</span>
                )}
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => alert('Photo upload placeholder')}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 text-white opacity-0 group-hover:opacity-100 transition"
                >
                  <Camera size={22} />
                </button>
              )}
            </div>

            {/* Student Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                  {profile.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                  <ShieldCheck size={14} /> {profile.role}
                </span>
              </div>

              <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                {profile.email}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Building2 size={15} className="text-cyan-400" />
                  {profile.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-cyan-400" />
                  {profile.year}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Main Academic Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="text-cyan-400" size={20} /> Academic Information
              </h2>

              {!isEditing ? (
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                        <User size={12} /> Student Name
                      </span>
                      <p className="font-semibold text-white">{profile.name}</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                        <Hash size={12} /> Roll / Reg No.
                      </span>
                      <p className="font-semibold text-white">{profile.rollNumber}</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                        <Building2 size={12} /> Department
                      </span>
                      <p className="font-semibold text-white">{profile.department}</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                        <GraduationCap size={12} /> Academic Year
                      </span>
                      <p className="font-semibold text-white">{profile.year}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
                    <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                      <FileText size={12} /> Bio & Overview
                    </span>
                    <p className="text-slate-300 leading-relaxed">{profile.bio}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Student Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Roll Number</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Year / Program</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Bio</label>
                    <textarea
                      name="bio"
                      rows="3"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Affiliations Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="text-cyan-400" size={20} /> Joined Clubs
              </h2>
              <div className="space-y-3">
                {profile.joinedClubs.map((club, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#080D1C] p-3 text-xs"
                  >
                    <span className="font-semibold text-white">{club.name}</span>
                    <span className={`px-2.5 py-1 rounded-md border ${club.color} font-medium`}>
                      {club.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="text-cyan-400" size={20} /> Campus Activity
              </h2>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-3">
                  <span className="text-2xl font-extrabold text-cyan-400">5</span>
                  <span className="block text-[11px] text-slate-400 mt-1">Events Attended</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-3">
                  <span className="text-2xl font-extrabold text-cyan-400">3</span>
                  <span className="block text-[11px] text-slate-400 mt-1">Clubs Joined</span>
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
