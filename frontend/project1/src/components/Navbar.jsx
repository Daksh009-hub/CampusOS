import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  CalendarDays,
  User,
  ArrowUpRight,
} from 'lucide-react';

import logo from '../assets/logo.png';

function Navbar() {
  const navLinks = [
    { name: 'Home', href: '/', isRoute: true, icon: Home },
    { name: 'Clubs', href: '#clubs', isRoute: false, icon: Users },
    { name: 'Events', href: '#events', isRoute: false, icon: CalendarDays },
    { name: 'Profile', href: '/profile', isRoute: true, icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center">
          <img
            src={logo}
            alt="CampusOS Logo"
            className="h-12 w-auto object-contain transition duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold text-slate-300 transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold text-slate-300 transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Side Action Button */}
        <Link
          to="/profile"
          className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 sm:flex"
        >
          My Profile
          <User
            size={18}
            className="transition-transform group-hover:scale-110"
          />
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
