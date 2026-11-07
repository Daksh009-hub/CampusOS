import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Building2,
  Search,
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  X,
  Check,
  AlertCircle,
  Loader2,
  Filter,
  UserPlus,
  AlertTriangle,
  Key,
  Eye,
  EyeOff,
  ExternalLink,
  Globe,
  Sparkles,
  Upload,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CLUB_CATEGORIES = [
  'Technical',
  'Cultural',
  'Entrepreneurship',
  'Literary',
  'Sports',
  'Social',
  'Media',
  'Other',
];

const initialAddUserForm = {
  name: '',
  email: '',
  password: '',
  rollNumber: '',
  department: '',
  year: '',
  role: 'lead',
  clubName: '',
  clubRole: '',
};

const initialClubForm = {
  name: '',
  fullName: '',
  description: '',
  longDescription: '',
  website: '',
  email: '',
  linkedin: '',
  instagram: '',
  github: '',
};

function AdminDashboard({ userId, userEmail, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'clubs'

  const [users, setUsers] = useState([]);
  const [dbClubs, setDbClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Users Tab Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClubFilter, setSelectedClubFilter] = useState('ALL');

  // Clubs Tab Search
  const [clubSearchQuery, setClubSearchQuery] = useState('');

  // Manage Clubs Modal State (for Users)
  const [selectedUser, setSelectedUser] = useState(null);
  const [editClubsList, setEditClubsList] = useState([]);
  const [editRole, setEditRole] = useState('lead');
  const [newClubName, setNewClubName] = useState('');
  const [newClubRole, setNewClubRole] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // Add User Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [addUserData, setAddUserData] = useState(initialAddUserForm);
  const [showPassword, setShowPassword] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [addUserError, setAddUserError] = useState('');
  const [addUserSuccess, setAddUserSuccess] = useState('');

  // Delete User Confirmation State
  const [userToDelete, setUserToDelete] = useState(null);
  const [deletingUser, setDeletingUser] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Reset Password Modal State
  const [userToResetPassword, setUserToResetPassword] = useState(null);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');

  // Add Club Modal State
  const [isAddClubOpen, setIsAddClubOpen] = useState(false);
  const [addClubData, setAddClubData] = useState(initialClubForm);
  const [addLogoFile, setAddLogoFile] = useState(null);
  const [addLogoPreview, setAddLogoPreview] = useState('');
  const [addBannerFile, setAddBannerFile] = useState(null);
  const [addBannerPreview, setAddBannerPreview] = useState('');
  const [addingClub, setAddingClub] = useState(false);
  const [addClubError, setAddClubError] = useState('');
  const [addClubSuccess, setAddClubSuccess] = useState('');

  // Edit Club Modal State
  const [clubToEdit, setClubToEdit] = useState(null);
  const [editClubData, setEditClubData] = useState(initialClubForm);
  const [editLogoFile, setEditLogoFile] = useState(null);
  const [editLogoPreview, setEditLogoPreview] = useState('');
  const [editBannerFile, setEditBannerFile] = useState(null);
  const [editBannerPreview, setEditBannerPreview] = useState('');
  const [savingClub, setSavingClub] = useState(false);
  const [editClubError, setEditClubError] = useState('');
  const [editClubSuccess, setEditClubSuccess] = useState('');

  // Delete Club Confirmation State
  const [clubToDelete, setClubToDelete] = useState(null);
  const [deletingClub, setDeletingClub] = useState(false);
  const [deleteClubError, setDeleteClubError] = useState('');

  // Fetch all users and database clubs
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      const [usersRes, clubsRes] = await Promise.all([
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/clubs`),
      ]);

      const usersJson = await usersRes.json();
      const clubsJson = await clubsRes.json();

      if (!usersRes.ok || !usersJson.success) {
        throw new Error(usersJson.message || 'Failed to fetch users');
      }

      setUsers(Array.isArray(usersJson.data) ? usersJson.data : []);
      setDbClubs(
        clubsJson.success && Array.isArray(clubsJson.data) ? clubsJson.data : []
      );
    } catch (err) {
      setError(err.message || 'Error loading admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- Manage User Clubs Handlers ---
  const handleOpenManageModal = (user) => {
    setSelectedUser(user);
    const clubsCopy = Array.isArray(user.joinedClubs)
      ? user.joinedClubs.map((c) => ({
          name: typeof c === 'string' ? c : c.name || '',
          role: typeof c === 'string' ? 'Member' : c.role || 'Member',
        }))
      : [];
    setEditClubsList(clubsCopy);
    setEditRole(user.role || 'student');
    setNewClubName('');
    setNewClubRole('');
    setSaveSuccess('');
    setSaveError('');
  };

  const handleCloseManageModal = () => {
    setSelectedUser(null);
    setSaveSuccess('');
    setSaveError('');
  };

  const handleAddClubToUser = (e) => {
    e.preventDefault();
    if (!newClubName.trim()) {
      setSaveError('Please enter a club name.');
      return;
    }

    const clubName = newClubName.trim();
    const clubRole = newClubRole.trim() || 'Lead';

    const exists = editClubsList.some(
      (c) => c.name.toLowerCase() === clubName.toLowerCase()
    );
    if (exists) {
      setSaveError(`User is already part of ${clubName}.`);
      return;
    }

    setEditClubsList((prev) => [...prev, { name: clubName, role: clubRole }]);
    setNewClubName('');
    setNewClubRole('');
    setSaveError('');
  };

  const handleRemoveClubFromUser = (indexToRemove) => {
    setEditClubsList((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleRoleChange = (index, newRole) => {
    setEditClubsList((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, role: newRole } : item
      )
    );
  };

  const handleSaveUserClubs = async () => {
    if (!selectedUser?._id) return;

    try {
      setSaving(true);
      setSaveError('');
      setSaveSuccess('');

      const response = await fetch(
        `${API_URL}/users/${selectedUser._id}/clubs`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            joinedClubs: editClubsList,
            role: editRole,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update user clubs');
      }

      setSaveSuccess('Clubs and designations saved successfully!');

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === selectedUser._id
            ? { ...u, joinedClubs: editClubsList, role: editRole }
            : u
        )
      );

      setTimeout(() => {
        handleCloseManageModal();
      }, 1000);
    } catch (err) {
      setSaveError(err.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  // --- Add User Handlers ---
  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setAddUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!addUserData.name.trim() || !addUserData.email.trim() || !addUserData.password) {
      setAddUserError('Name, email, and password are required.');
      return;
    }

    try {
      setAddingUser(true);
      setAddUserError('');
      setAddUserSuccess('');

      const joinedClubs = [];
      if (addUserData.clubName.trim()) {
        joinedClubs.push({
          name: addUserData.clubName.trim(),
          role: addUserData.clubRole.trim() || 'Member',
        });
      }

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: addUserData.name.trim(),
          email: addUserData.email.trim(),
          password: addUserData.password,
          rollNumber: addUserData.rollNumber.trim(),
          department: addUserData.department.trim(),
          year: addUserData.year.trim(),
          role: addUserData.role,
          joinedClubs,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to create user');
      }

      setAddUserSuccess('User account created successfully!');
      setUsers((prev) => [result.data, ...prev]);

      setTimeout(() => {
        setIsAddUserOpen(false);
        setAddUserData(initialAddUserForm);
        setAddUserSuccess('');
      }, 1000);
    } catch (err) {
      setAddUserError(err.message || 'Failed to create user.');
    } finally {
      setAddingUser(false);
    }
  };

  // --- Delete User Handlers ---
  const handleConfirmDelete = async () => {
    if (!userToDelete?._id) return;

    try {
      setDeletingUser(true);
      setDeleteError('');

      const response = await fetch(`${API_URL}/users/${userToDelete._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete user');
      }

      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      setUserToDelete(null);
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete user.');
    } finally {
      setDeletingUser(false);
    }
  };

  // --- Reset Password Handlers ---
  const handleOpenResetPasswordModal = (user) => {
    setUserToResetPassword(user);
    setNewResetPassword('');
    setShowResetPassword(false);
    setResetPasswordError('');
    setResetPasswordSuccess('');
  };

  const handleCloseResetPasswordModal = () => {
    setUserToResetPassword(null);
    setNewResetPassword('');
    setResetPasswordError('');
    setResetPasswordSuccess('');
  };

  const handleSaveResetPassword = async (e) => {
    e.preventDefault();
    if (!userToResetPassword?._id) return;

    if (!newResetPassword || newResetPassword.trim().length < 4) {
      setResetPasswordError('Password must be at least 4 characters long.');
      return;
    }

    try {
      setResettingPassword(true);
      setResetPasswordError('');
      setResetPasswordSuccess('');

      const response = await fetch(
        `${API_URL}/users/${userToResetPassword._id}/reset-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: newResetPassword.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to reset password');
      }

      setResetPasswordSuccess('Password reset successfully!');

      setTimeout(() => {
        handleCloseResetPasswordModal();
      }, 1000);
    } catch (err) {
      setResetPasswordError(err.message || 'Failed to reset password.');
    } finally {
      setResettingPassword(false);
    }
  };

  // --- Club Management Handlers ---
  const handleAddClubChange = (e) => {
    const { name, value } = e.target;
    setAddClubData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddLogoFile(file);
      setAddLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAddLogo = () => {
    setAddLogoFile(null);
    setAddLogoPreview('');
  };

  const handleAddBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddBannerFile(file);
      setAddBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAddBanner = () => {
    setAddBannerFile(null);
    setAddBannerPreview('');
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    if (!addClubData.name.trim() || !addClubData.description.trim()) {
      setAddClubError('Club Name and Short Description are required.');
      return;
    }

    try {
      setAddingClub(true);
      setAddClubError('');
      setAddClubSuccess('');

      const formData = new FormData();
      formData.append('name', addClubData.name.trim());
      formData.append('fullName', addClubData.fullName.trim() || addClubData.name.trim());
      formData.append('category', 'Technical');
      formData.append('description', addClubData.description.trim());
      formData.append('longDescription', addClubData.longDescription.trim());
      formData.append(
        'socialLinks',
        JSON.stringify({
          website: addClubData.website.trim(),
          email: addClubData.email.trim(),
          linkedin: addClubData.linkedin.trim(),
          instagram: addClubData.instagram.trim(),
          github: addClubData.github.trim(),
        })
      );

      if (addLogoFile) {
        formData.append('logo', addLogoFile);
      }
      if (addBannerFile) {
        formData.append('banner', addBannerFile);
      }

      const res = await fetch(`${API_URL}/clubs`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to create club');
      }

      setAddClubSuccess('Club registered successfully!');
      setDbClubs((prev) =>
        [...prev, result.data].sort((a, b) => a.name.localeCompare(b.name))
      );

      setTimeout(() => {
        setIsAddClubOpen(false);
        setAddClubData(initialClubForm);
        setAddLogoFile(null);
        setAddLogoPreview('');
        setAddBannerFile(null);
        setAddBannerPreview('');
        setAddClubSuccess('');
      }, 1000);
    } catch (err) {
      setAddClubError(err.message || 'Error creating club.');
    } finally {
      setAddingClub(false);
    }
  };

  const handleOpenEditClub = (club) => {
    setClubToEdit(club);
    setEditClubData({
      name: club.name || '',
      fullName: club.fullName || '',
      description: club.description || '',
      longDescription: club.longDescription || '',
      website: club.socialLinks?.website || '',
      email: club.socialLinks?.email || '',
      linkedin: club.socialLinks?.linkedin || '',
      instagram: club.socialLinks?.instagram || '',
      github: club.socialLinks?.github || '',
    });
    setEditLogoFile(null);
    setEditLogoPreview(club.logoUrl || '');
    setEditBannerFile(null);
    setEditBannerPreview(club.bannerUrl || '');
    setEditClubError('');
    setEditClubSuccess('');
  };

  const handleEditClubChange = (e) => {
    const { name, value } = e.target;
    setEditClubData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditLogoFile(file);
      setEditLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveEditLogo = () => {
    setEditLogoFile(null);
    setEditLogoPreview('');
  };

  const handleEditBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditBannerFile(file);
      setEditBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveEditBanner = () => {
    setEditBannerFile(null);
    setEditBannerPreview('');
  };

  const handleSaveEditClub = async (e) => {
    e.preventDefault();
    if (!clubToEdit?._id) return;
    if (!editClubData.name.trim() || !editClubData.description.trim()) {
      setEditClubError('Club Name and Short Description are required.');
      return;
    }

    try {
      setSavingClub(true);
      setEditClubError('');
      setEditClubSuccess('');

      const formData = new FormData();
      formData.append('name', editClubData.name.trim());
      formData.append('fullName', editClubData.fullName.trim() || editClubData.name.trim());
      formData.append('category', clubToEdit?.category || 'Technical');
      formData.append('description', editClubData.description.trim());
      formData.append('longDescription', editClubData.longDescription.trim());
      formData.append(
        'socialLinks',
        JSON.stringify({
          website: editClubData.website.trim(),
          email: editClubData.email.trim(),
          linkedin: editClubData.linkedin.trim(),
          instagram: editClubData.instagram.trim(),
          github: editClubData.github.trim(),
        })
      );

      if (editLogoFile) {
        formData.append('logo', editLogoFile);
      } else {
        formData.append('logoUrl', editLogoPreview);
      }

      if (editBannerFile) {
        formData.append('banner', editBannerFile);
      } else {
        formData.append('bannerUrl', editBannerPreview);
      }

      const res = await fetch(`${API_URL}/clubs/${clubToEdit._id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to update club');
      }

      setEditClubSuccess('Club updated successfully!');
      setDbClubs((prev) =>
        prev.map((c) => (c._id === clubToEdit._id ? result.data : c))
      );

      setTimeout(() => {
        setClubToEdit(null);
        setEditClubSuccess('');
      }, 1000);
    } catch (err) {
      setEditClubError(err.message || 'Error updating club.');
    } finally {
      setSavingClub(false);
    }
  };

  const handleConfirmDeleteClub = async () => {
    if (!clubToDelete?._id) return;

    try {
      setDeletingClub(true);
      setDeleteClubError('');

      const res = await fetch(`${API_URL}/clubs/${clubToDelete._id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete club');
      }

      setDbClubs((prev) => prev.filter((c) => c._id !== clubToDelete._id));
      setClubToDelete(null);
    } catch (err) {
      setDeleteClubError(err.message || 'Error deleting club.');
    } finally {
      setDeletingClub(false);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.rollNumber || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedClubFilter !== 'ALL') {
      const isMember = (u.joinedClubs || []).some((c) => {
        const cName = typeof c === 'string' ? c : c.name || '';
        return cName.toLowerCase() === selectedClubFilter.toLowerCase();
      });
      if (!isMember) return false;
    }

    return true;
  });

  // Filtered Clubs
  const filteredClubs = dbClubs.filter((club) => {
    const query = clubSearchQuery.toLowerCase();
    return (
      (club.name || '').toLowerCase().includes(query) ||
      (club.fullName || '').toLowerCase().includes(query) ||
      (club.description || '').toLowerCase().includes(query)
    );
  });

  const totalUsers = users.length;
  const totalClubs = dbClubs.length;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar
        isLoggedIn={true}
        userEmail={userEmail}
        onLogout={onLogout}
        role="admin"
      />

      <main className="mx-auto max-w-7xl px-6 pt-6 pb-20">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 border-b border-slate-800/80 pb-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
                <ShieldCheck size={14} className="text-purple-400" />
                Super-Admin Console
              </div>

              <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                Super-Admin{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Manage campus accounts, club designations, and registered student organizations.
              </p>
            </div>

            {/* Dynamic Action Button according to active tab */}
            {activeTab === 'users' ? (
              <button
                type="button"
                onClick={() => {
                  setAddUserData(initialAddUserForm);
                  setAddUserError('');
                  setAddUserSuccess('');
                  setIsAddUserOpen(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
              >
                <UserPlus size={18} />
                Add New User
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAddClubData(initialClubForm);
                  setAddClubError('');
                  setAddClubSuccess('');
                  setIsAddClubOpen(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:scale-105"
              >
                <Plus size={18} />
                Add New Club
              </button>
            )}
          </div>

          {/* Quick Stats Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              onClick={() => setActiveTab('users')}
              className={`cursor-pointer rounded-2xl border p-5 shadow-lg transition hover:border-blue-500/50 ${
                activeTab === 'users'
                  ? 'border-blue-500/60 bg-[#121c38] ring-1 ring-blue-500/40'
                  : 'border-slate-800 bg-[#10172A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">Total Users</p>
                <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
                  <Users size={20} />
                </div>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-white">{totalUsers}</p>
              <p className="mt-1 text-xs text-slate-500">
                Registered campus accounts • Click to manage
              </p>
            </div>

            <div
              onClick={() => setActiveTab('clubs')}
              className={`cursor-pointer rounded-2xl border p-5 shadow-lg transition hover:border-purple-500/50 ${
                activeTab === 'clubs'
                  ? 'border-purple-500/60 bg-[#1e1338] ring-1 ring-purple-500/40'
                  : 'border-slate-800 bg-[#10172A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">Registered Clubs</p>
                <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400">
                  <Building2 size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-purple-400">{totalClubs}</p>
              <p className="mt-1 text-xs text-slate-500">
                Clubs in database • Click to add & edit
              </p>
            </div>
          </div>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'border border-slate-800 bg-[#10172A] text-slate-400 hover:text-white'
            }`}
          >
            <Users size={17} />
            Users & Roles Management
            <span className="ml-1 rounded-full bg-black/40 px-2 py-0.5 text-xs text-blue-200">
              {totalUsers}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clubs')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
              activeTab === 'clubs'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'border border-slate-800 bg-[#10172A] text-slate-400 hover:text-white'
            }`}
          >
            <Building2 size={17} />
            Clubs Directory Management
            <span className="ml-1 rounded-full bg-black/40 px-2 py-0.5 text-xs text-purple-200">
              {totalClubs}
            </span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-cyan-400" size={40} />
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
            <AlertCircle className="mx-auto mb-2 text-red-400" size={32} />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: USERS MANAGEMENT                                  */}
        {/* ======================================================== */}
        {!loading && !error && activeTab === 'users' && (
          <div>
            {/* Search & Filter Controls */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user by name, email, or roll no..."
                  className="w-full rounded-xl border border-slate-700 bg-[#080D1C] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <Filter size={16} className="text-slate-400" />
                <select
                  value={selectedClubFilter}
                  onChange={(e) => setSelectedClubFilter(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                >
                  <option value="ALL">All Clubs</option>
                  {dbClubs.map((club) => (
                    <option key={club._id || club.slug} value={club.name}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="border-b border-slate-800 bg-[#080D1C]/80 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">User</th>
                      <th scope="col" className="px-6 py-4">Role</th>
                      <th scope="col" className="px-6 py-4">Joined Clubs & Designations</th>
                      <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                          No users found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const userClubs = Array.isArray(user.joinedClubs)
                          ? user.joinedClubs
                          : [];
                        const isSelf = user._id === userId || user.email === userEmail;

                        return (
                          <tr
                            key={user._id}
                            className="transition hover:bg-slate-800/30"
                          >
                            {/* User Avatar + Details */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white shadow-md">
                                  {(user.name || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-white">
                                      {user.name}
                                    </p>
                                    {isSelf && (
                                      <span className="rounded-md bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
                                        YOU
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-400">
                                    {user.email}
                                  </p>
                                  {user.rollNumber && (
                                    <p className="text-[11px] text-slate-500">
                                      Roll: {user.rollNumber}{' '}
                                      {user.department ? `• ${user.department}` : ''}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* System Role Badge */}
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                                  user.role === 'admin'
                                    ? 'border border-purple-500/30 bg-purple-500/10 text-purple-300'
                                    : user.role === 'lead'
                                    ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                                    : 'border border-slate-700 bg-slate-800 text-slate-400'
                                }`}
                              >
                                {user.role || 'student'}
                              </span>
                            </td>

                            {/* Joined Clubs */}
                            <td className="px-6 py-4">
                              {userClubs.length === 0 ? (
                                <span className="text-xs italic text-slate-500">
                                  No clubs assigned
                                </span>
                              ) : (
                                <div className="flex flex-wrap gap-1.5">
                                  {userClubs.map((club, idx) => {
                                    const cName =
                                      typeof club === 'string' ? club : club.name;
                                    const cRole =
                                      typeof club === 'string'
                                        ? 'Member'
                                        : club.role || 'Member';

                                    return (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[#080D1C] px-2.5 py-1 text-xs text-slate-300"
                                      >
                                        <span className="font-bold text-cyan-400">
                                          {cName}:
                                        </span>{' '}
                                        <span className="text-slate-300">
                                          {cRole}
                                        </span>
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </td>

                            {/* Action Buttons */}
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenManageModal(user)}
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20 hover:scale-105"
                                >
                                  <Edit2 size={13} />
                                  Manage Clubs
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleOpenResetPasswordModal(user)}
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20 hover:scale-105"
                                  title="Reset user password"
                                >
                                  <Key size={13} />
                                  Reset Password
                                </button>

                                {!isSelf && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteError('');
                                      setUserToDelete(user);
                                    }}
                                    className="inline-flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                                    title="Delete user account"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CLUBS DIRECTORY MANAGEMENT                        */}
        {/* ======================================================== */}
        {!loading && !error && activeTab === 'clubs' && (
          <div>
            {/* Search Controls */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={clubSearchQuery}
                  onChange={(e) => setClubSearchQuery(e.target.value)}
                  placeholder="Search club by name or description..."
                  className="w-full rounded-xl border border-slate-700 bg-[#080D1C] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Clubs Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#10172A] shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="border-b border-slate-800 bg-[#080D1C]/80 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">Club Organization</th>
                      <th scope="col" className="px-6 py-4">Category</th>
                      <th scope="col" className="px-6 py-4">Short Description</th>
                      <th scope="col" className="px-6 py-4">Public Page</th>
                      <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredClubs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                          No campus clubs found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredClubs.map((club) => (
                        <tr
                          key={club._id || club.slug}
                          className="transition hover:bg-slate-800/30"
                        >
                          {/* Club Identity */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {club.logoUrl ? (
                                <img
                                  src={club.logoUrl}
                                  alt={club.name}
                                  className="h-10 w-10 rounded-xl object-cover border border-slate-700"
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 font-extrabold text-white text-sm">
                                  {(club.name || 'C').substring(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-white flex items-center gap-2">
                                  {club.name}
                                </p>
                                <p className="text-xs text-slate-400 line-clamp-1">
                                  {club.fullName || club.name}
                                </p>
                                <span className="text-[10px] font-mono text-cyan-400">
                                  slug: {club.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category Badge */}
                          <td className="px-6 py-4">
                            <span className="inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-300">
                              {club.category || 'Technical'}
                            </span>
                          </td>

                          {/* Short Description */}
                          <td className="px-6 py-4 max-w-xs">
                            <p className="line-clamp-2 text-xs text-slate-300">
                              {club.description || 'No description provided.'}
                            </p>
                          </td>

                          {/* Public Page Link */}
                          <td className="px-6 py-4">
                            <Link
                              to={`/clubs/${club.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                            >
                              View Page <ExternalLink size={12} />
                            </Link>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditClub(club)}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20 hover:scale-105"
                                title="Edit Club Details"
                              >
                                <Edit2 size={13} />
                                Edit Club
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setDeleteClubError('');
                                  setClubToDelete(club);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                                title="Delete Club"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 1: ADD NEW USER                                    */}
        {/* ======================================================== */}
        {isAddUserOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl">
              {/* Modal Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-6 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-cyan-500/10 p-2.5 text-cyan-400">
                    <UserPlus size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Add New Campus User
                    </h3>
                    <p className="text-xs text-slate-400">
                      Create a user account with custom role and club designation
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCreateUser} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:px-8">
                  {addUserError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                      {addUserError}
                    </div>
                  )}

                  {addUserSuccess && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                      {addUserSuccess}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={addUserData.name}
                        onChange={handleAddUserChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={addUserData.email}
                        onChange={handleAddUserChange}
                        placeholder="e.g. rahul@uiet.ac.in"
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Password & Role */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={addUserData.password}
                          onChange={handleAddUserChange}
                          placeholder="Temporary login password"
                          required
                          minLength={4}
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-cyan-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Account Role
                      </label>
                      <select
                        name="role"
                        value={addUserData.role}
                        onChange={handleAddUserChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      >
                        <option value="lead">Lead (Club Lead)</option>
                        <option value="student">Student (Standard User)</option>
                        <option value="admin">Admin (Super Admin)</option>
                      </select>
                    </div>
                  </div>

                  {/* Roll Number & Department */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Roll / Reg Number
                      </label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={addUserData.rollNumber}
                        onChange={handleAddUserChange}
                        placeholder="e.g. 252302042"
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={addUserData.department}
                        onChange={handleAddUserChange}
                        placeholder="e.g. Computer Science"
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Academic Year */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Academic Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={addUserData.year}
                      onChange={handleAddUserChange}
                      placeholder="e.g. 3rd Year"
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Initial Club Assignment */}
                  <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Initial Club Assignment (Optional)
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-slate-400">
                          Club Name
                        </label>
                        <input
                          type="text"
                          name="clubName"
                          value={addUserData.clubName}
                          onChange={handleAddUserChange}
                          placeholder="e.g. GDGC, E-Cell"
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">
                          Designation / Role
                        </label>
                        <input
                          type="text"
                          name="clubRole"
                          value={addUserData.clubRole}
                          onChange={handleAddUserChange}
                          placeholder="e.g. President / Web Lead"
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-800 p-6 sm:px-8">
                  <button
                    type="button"
                    onClick={() => setIsAddUserOpen(false)}
                    disabled={addingUser}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={addingUser}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:opacity-50"
                  >
                    {addingUser ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Creating...
                      </>
                    ) : (
                      <>
                        <Check size={16} /> Create User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 2: DELETE USER CONFIRMATION                        */}
        {/* ======================================================== */}
        {userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0B132B] p-6 shadow-2xl sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-red-500/10 p-3 text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Delete User</h3>
                  <p className="text-xs text-slate-400">This action cannot be undone</p>
                </div>
              </div>

              {deleteError && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                  {deleteError}
                </div>
              )}

              <p className="text-sm text-slate-300">
                Are you sure you want to permanently delete{' '}
                <span className="font-bold text-white">{userToDelete.name}</span>{' '}
                (<span className="text-cyan-400">{userToDelete.email}</span>)?
              </p>

              <div className="mt-7 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  disabled={deletingUser}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deletingUser}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 disabled:opacity-50"
                >
                  {deletingUser ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} /> Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 3: RESET PASSWORD MODAL                            */}
        {/* ======================================================== */}
        {userToResetPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-[#0B132B] p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-500/10 p-2.5 text-amber-400">
                    <Key size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Reset Password</h3>
                    <p className="text-xs text-slate-400">{userToResetPassword.name} • {userToResetPassword.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseResetPasswordModal}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveResetPassword} className="space-y-4">
                {resetPasswordError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                    {resetPasswordError}
                  </div>
                )}
                {resetPasswordSuccess && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-xs text-green-400">
                    {resetPasswordSuccess}
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      value={newResetPassword}
                      onChange={(e) => setNewResetPassword(e.target.value)}
                      placeholder="Enter new temporary password"
                      required
                      minLength={4}
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showResetPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handleCloseResetPasswordModal}
                    disabled={resettingPassword}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resettingPassword}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 hover:scale-105 disabled:opacity-50"
                  >
                    {resettingPassword ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Check size={16} /> Save Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 4: MANAGE CLUBS & DESIGNATIONS MODAL               */}
        {/* ======================================================== */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl">
              {/* Modal Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-6 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white">
                    {(selectedUser.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Manage Clubs & Role
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedUser.name} • {selectedUser.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseManageModal}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:px-8">
                {saveError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {saveError}
                  </div>
                )}

                {saveSuccess && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                    {saveSuccess}
                  </div>
                )}

                {/* Account System Role Selection */}
                <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    System Account Role
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="rounded-xl border border-slate-700 bg-[#080D1C] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                    >
                      <option value="student">Student (Standard User)</option>
                      <option value="lead">Lead (Club Lead)</option>
                      <option value="admin">Admin (Full System Access)</option>
                    </select>
                    <span className="text-xs text-slate-500">
                      Only Admins have access to this dashboard.
                    </span>
                  </div>
                </div>

                {/* Currently Assigned Clubs */}
                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Assigned Clubs & Designations ({editClubsList.length})
                  </h4>

                  {editClubsList.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-800 bg-[#10172A]/50 p-6 text-center text-sm text-slate-400">
                      No clubs currently assigned to this user. Add one below.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {editClubsList.map((clubItem, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#10172A] p-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                              {clubItem.name}
                            </p>
                            <input
                              type="text"
                              value={clubItem.role}
                              onChange={(e) =>
                                handleRoleChange(index, e.target.value)
                              }
                              placeholder="Designation / Role"
                              className="mt-1 w-full rounded-lg border border-slate-700 bg-[#080D1C] px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveClubFromUser(index)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                            title="Remove club"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add New Club Form */}
                <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                  <h4 className="mb-3 text-sm font-semibold text-white">
                    Assign a New Club
                  </h4>

                  <form
                    onSubmit={handleAddClubToUser}
                    className="grid gap-3 sm:grid-cols-5"
                  >
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={newClubName}
                        onChange={(e) => setNewClubName(e.target.value)}
                        placeholder="Club Name (e.g. GDGC, TPO Cell)"
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={newClubRole}
                        onChange={(e) => setNewClubRole(e.target.value)}
                        placeholder="e.g. President / Web Lead"
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-1 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-[#050816] transition hover:bg-cyan-400"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Modal Fixed Footer */}
              <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-800 p-6 sm:px-8">
                <button
                  type="button"
                  onClick={handleCloseManageModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveUserClubs}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Check size={16} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 5: ADD NEW CLUB MODAL                              */}
        {/* ======================================================== */}
        {isAddClubOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl">
              {/* Modal Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-6 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-500/10 p-2.5 text-purple-400">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Add New Campus Club
                    </h3>
                    <p className="text-xs text-slate-400">
                      Register a student society or club in the database
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddClubOpen(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCreateClub} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:px-8">
                  {addClubError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                      {addClubError}
                    </div>
                  )}

                  {addClubSuccess && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                      {addClubSuccess}
                    </div>
                  )}

                  {/* Club Short Name & Full Organization Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Club Short Name / Acronym *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={addClubData.name}
                        onChange={handleAddClubChange}
                        placeholder="e.g. GDGC, E-Cell"
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-purple-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Full Organization Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={addClubData.fullName}
                        onChange={handleAddClubChange}
                        placeholder="e.g. Google Developer Group on Campus"
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Short Description * (1-2 sentences for cards & search)
                    </label>
                    <textarea
                      name="description"
                      value={addClubData.description}
                      onChange={handleAddClubChange}
                      rows={2}
                      placeholder="Brief tagline or description of the club..."
                      required
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Detailed Description (for Club Page)
                    </label>
                    <textarea
                      name="longDescription"
                      value={addClubData.longDescription}
                      onChange={handleAddClubChange}
                      rows={3}
                      placeholder="Detailed overview of what the club does, activities, and workshops..."
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  {/* Laptop Uploads for Logo and Banner */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Club Logo Upload */}
                    <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                      <label className="mb-2 block text-xs font-semibold text-slate-300">
                        Club Logo (Upload from Laptop)
                      </label>
                      {addLogoPreview ? (
                        <div className="relative flex items-center gap-3 rounded-xl border border-slate-700 bg-[#080D1C] p-3">
                          <img
                            src={addLogoPreview}
                            alt="Logo preview"
                            className="h-14 w-14 rounded-xl object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {addLogoFile ? addLogoFile.name : 'Selected Logo'}
                            </p>
                            <p className="text-[11px] text-slate-400">Image selected</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveAddLogo}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                            title="Remove logo"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#080D1C]/60 p-4 transition hover:border-purple-400 hover:bg-purple-500/5">
                          <Upload size={22} className="mb-1 text-purple-400" />
                          <span className="text-xs font-semibold text-white">Choose Logo file</span>
                          <span className="text-[11px] text-slate-500">Square PNG, JPG or WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddLogoChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Club Banner Upload */}
                    <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                      <label className="mb-2 block text-xs font-semibold text-slate-300">
                        Club Banner (Upload from Laptop)
                      </label>
                      {addBannerPreview ? (
                        <div className="relative flex items-center gap-3 rounded-xl border border-slate-700 bg-[#080D1C] p-3">
                          <img
                            src={addBannerPreview}
                            alt="Banner preview"
                            className="h-14 w-24 rounded-lg object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {addBannerFile ? addBannerFile.name : 'Selected Banner'}
                            </p>
                            <p className="text-[11px] text-slate-400">Cover banner selected</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveAddBanner}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                            title="Remove banner"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#080D1C]/60 p-4 transition hover:border-purple-400 hover:bg-purple-500/5">
                          <Upload size={22} className="mb-1 text-purple-400" />
                          <span className="text-xs font-semibold text-white">Choose Banner file</span>
                          <span className="text-[11px] text-slate-500">Landscape cover image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddBannerChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Social & Contact Links */}
                  <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-purple-400">
                      Social & Contact Links (Optional)
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Official Website</label>
                        <input
                          type="url"
                          name="website"
                          value={addClubData.website}
                          onChange={handleAddClubChange}
                          placeholder="https://..."
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Contact Email</label>
                        <input
                          type="email"
                          name="email"
                          value={addClubData.email}
                          onChange={handleAddClubChange}
                          placeholder="club@campus.ac.in"
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">LinkedIn URL</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={addClubData.linkedin}
                          onChange={handleAddClubChange}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Instagram URL</label>
                        <input
                          type="url"
                          name="instagram"
                          value={addClubData.instagram}
                          onChange={handleAddClubChange}
                          placeholder="https://instagram.com/..."
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-800 p-6 sm:px-8">
                  <button
                    type="button"
                    onClick={() => setIsAddClubOpen(false)}
                    disabled={addingClub}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={addingClub}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:scale-105 disabled:opacity-50"
                  >
                    {addingClub ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Registering...
                      </>
                    ) : (
                      <>
                        <Check size={16} /> Register Club
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 6: EDIT CLUB MODAL                                 */}
        {/* ======================================================== */}
        {clubToEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl">
              {/* Modal Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-6 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-cyan-500/10 p-2.5 text-cyan-400">
                    <Edit2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Edit Club: {clubToEdit.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update organization details, descriptions, and links
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setClubToEdit(null)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSaveEditClub} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:px-8">
                  {editClubError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                      {editClubError}
                    </div>
                  )}

                  {editClubSuccess && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                      {editClubSuccess}
                    </div>
                  )}

                  {/* Club Short Name & Full Organization Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Club Short Name / Acronym *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editClubData.name}
                        onChange={handleEditClubChange}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Full Organization Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={editClubData.fullName}
                        onChange={handleEditClubChange}
                        className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Short Description *
                    </label>
                    <textarea
                      name="description"
                      value={editClubData.description}
                      onChange={handleEditClubChange}
                      rows={2}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Detailed Description
                    </label>
                    <textarea
                      name="longDescription"
                      value={editClubData.longDescription}
                      onChange={handleEditClubChange}
                      rows={3}
                      className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Laptop Uploads for Logo and Banner */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Club Logo Upload */}
                    <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                      <label className="mb-2 block text-xs font-semibold text-slate-300">
                        Club Logo (Upload from Laptop)
                      </label>
                      {editLogoPreview ? (
                        <div className="relative flex items-center gap-3 rounded-xl border border-slate-700 bg-[#080D1C] p-3">
                          <img
                            src={editLogoPreview}
                            alt="Logo preview"
                            className="h-14 w-14 rounded-xl object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {editLogoFile ? editLogoFile.name : 'Current Logo'}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {editLogoFile ? 'New file selected' : 'Saved image'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveEditLogo}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                            title="Remove logo"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#080D1C]/60 p-4 transition hover:border-cyan-400 hover:bg-cyan-500/5">
                          <Upload size={22} className="mb-1 text-cyan-400" />
                          <span className="text-xs font-semibold text-white">Choose Logo file</span>
                          <span className="text-[11px] text-slate-500">Square PNG, JPG or WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditLogoChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Club Banner Upload */}
                    <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                      <label className="mb-2 block text-xs font-semibold text-slate-300">
                        Club Banner (Upload from Laptop)
                      </label>
                      {editBannerPreview ? (
                        <div className="relative flex items-center gap-3 rounded-xl border border-slate-700 bg-[#080D1C] p-3">
                          <img
                            src={editBannerPreview}
                            alt="Banner preview"
                            className="h-14 w-24 rounded-lg object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {editBannerFile ? editBannerFile.name : 'Current Banner'}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {editBannerFile ? 'New file selected' : 'Saved cover image'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveEditBanner}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                            title="Remove banner"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#080D1C]/60 p-4 transition hover:border-cyan-400 hover:bg-cyan-500/5">
                          <Upload size={22} className="mb-1 text-cyan-400" />
                          <span className="text-xs font-semibold text-white">Choose Banner file</span>
                          <span className="text-[11px] text-slate-500">Landscape cover image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditBannerChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Social & Contact Links */}
                  <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Social & Contact Links
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Official Website</label>
                        <input
                          type="url"
                          name="website"
                          value={editClubData.website}
                          onChange={handleEditClubChange}
                          placeholder="https://..."
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Contact Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editClubData.email}
                          onChange={handleEditClubChange}
                          placeholder="club@campus.ac.in"
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">LinkedIn URL</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={editClubData.linkedin}
                          onChange={handleEditClubChange}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Instagram URL</label>
                        <input
                          type="url"
                          name="instagram"
                          value={editClubData.instagram}
                          onChange={handleEditClubChange}
                          placeholder="https://instagram.com/..."
                          className="w-full rounded-xl border border-slate-700 bg-[#080D1C] px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-800 p-6 sm:px-8">
                  <button
                    type="button"
                    onClick={() => setClubToEdit(null)}
                    disabled={savingClub}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingClub}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:opacity-50"
                  >
                    {savingClub ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Check size={16} /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 7: DELETE CLUB CONFIRMATION                        */}
        {/* ======================================================== */}
        {clubToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0B132B] p-6 shadow-2xl sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-red-500/10 p-3 text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Delete Club</h3>
                  <p className="text-xs text-slate-400">This action cannot be undone</p>
                </div>
              </div>

              {deleteClubError && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                  {deleteClubError}
                </div>
              )}

              <p className="text-sm text-slate-300">
                Are you sure you want to permanently delete{' '}
                <span className="font-bold text-white">{clubToDelete.name}</span>{' '}
                ({clubToDelete.fullName || clubToDelete.name})?
              </p>

              <div className="mt-7 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setClubToDelete(null)}
                  disabled={deletingClub}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDeleteClub}
                  disabled={deletingClub}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 disabled:opacity-50"
                >
                  {deletingClub ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} /> Yes, Delete Club
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
