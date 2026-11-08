import { useState } from 'react';
import {
  Home,
  Users,
  ArrowUpRight,
  Menu,
  X,
  CalendarDays,
  ShieldCheck,
  User,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

function Navbar({ isLoggedIn, onLogout, userEmail, role }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const userRole = role || localStorage.getItem('campusUserRole') || 'student';
  const isAdmin = userRole === 'admin';

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-extrabold tracking-tight text-white transition hover:opacity-90 sm:text-3xl"
        >
          Campus<span className="text-cyan-400">OS</span>
        </Link>

        {/* Desktop Navigation - Centered (hidden on mobile) */}
        <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <Icon size={17} strokeWidth={2} />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Organize Event Button (Desktop) */}
          {isLoggedIn && (
            <Link
              to="/organize-event"
              className="hidden md:flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 md:text-sm"
            >
              Organize Event
              <ArrowUpRight size={16} />
            </Link>
          )}

          {/* Profile Dropdown / Login Button (Desktop only - hidden on mobile where hamburger menu is shown) */}
          {isLoggedIn ? (
            <div className="hidden md:block">
              <ProfileDropdown
                email={userEmail}
                onLogout={onLogout}
                role={role}
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block rounded-full border border-cyan-400/50 px-6 py-2.5 text-sm font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-[#050816]"
            >
              Login
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#10172A] text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800/80 bg-[#080D1C]/98 px-5 py-4 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-2">

            {/* User Profile Card on Mobile */}
            {isLoggedIn && (
              <div className="mb-2 flex items-center gap-3 rounded-xl border border-slate-800 bg-[#10172A] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white shadow-md">
                  {(userEmail?.split('@')[0] || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white capitalize">
                    {userEmail?.split('@')[0] || 'Student'}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {userEmail}
                  </p>
                </div>
              </div>
            )}

            {/* Nav Links */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}

            {/* Organize Event CTA in mobile menu */}
            {isLoggedIn ? (
              <div className="mt-2 space-y-2 border-t border-slate-800 pt-3">
                <Link
                  to="/organize-event"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20"
                >
                  <ArrowUpRight size={18} />
                  Organize New Event
                </Link>

                <Link
                  to="/my-events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800/60 hover:text-white"
                >
                  <CalendarDays size={18} className="text-cyan-400" />
                  My Events
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800/60 hover:text-white"
                >
                  <User size={18} className="text-cyan-400" />
                  My Profile
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-300 hover:bg-purple-500/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldCheck size={18} className="text-purple-400" />
                      Admin Dashboard
                    </span>
                    <span className="rounded bg-purple-400/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-purple-300">
                      Super Admin
                    </span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-2 border-t border-slate-800 pt-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-400"
                >
                  Login to CampusOS
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
