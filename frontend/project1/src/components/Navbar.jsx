
import {
  Home,
  Users,
  CalendarDays,
  ArrowUpRight,
} from 'lucide-react';

import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

function Navbar({ isLoggedIn, onLogout, userEmail, userRole }) {
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '#clubs', icon: Users },
    { name: 'Events', href: '#events', icon: CalendarDays },
  ];
  const isClubHead =
  isLoggedIn &&
  (userRole === 'clubHead' ||
    localStorage.getItem('campusRole') === 'clubHead');

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center">
          <img
            src={logo}
            alt="CampusOS Logo"
            className="h-24 w-auto object-contain transition duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 rounded-full px-5 py-3 text-base font-semibold text-slate-300 transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                <Icon size={19} strokeWidth={2} />
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Login / Profile */}
        
{/* Right Side: Organize Event + Profile / Login */}
<div className="flex items-center gap-4">
  {isClubHead && (
    <Link
      to="/organize-event"
      className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
    >
      + Organize Event
    </Link>
  )}

  {isLoggedIn ? (
    <ProfileDropdown
      email={userEmail}
      onLogout={onLogout}
    />
  ) : (
    <Link
      to="/login"
      className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:scale-105"
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
