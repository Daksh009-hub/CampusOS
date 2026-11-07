import {
  Home,
  Users,
  CalendarDays,
  ArrowUpRight,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

function Navbar({ isLoggedIn, onLogout, userEmail, role }) {
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-white transition hover:opacity-90"
        >
          Campus<span className="text-cyan-400">OS</span>
        </Link>

        {/* Navigation - Always in exact dead center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-400"
                >
                  <Icon size={19} strokeWidth={2} />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Organize Event + Login / Profile */}
        <div className="flex items-center gap-3">

          {isLoggedIn && (
            <Link
              to="/organize-event"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
            >
              Organize Event
              <ArrowUpRight size={17} />
            </Link>
          )}

          {isLoggedIn ? (
            <ProfileDropdown
              email={userEmail}
              onLogout={onLogout}
              role={role}
            />
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-cyan-400/50 px-6 py-3 text-sm font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-[#050816]"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
