
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileDropdown({ email, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const name = email?.split('@')[0] || 'Student';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-700 bg-[#10172A] p-2 transition hover:border-cyan-400"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </div>

        <span className="hidden text-sm font-semibold text-white sm:block">
          {name}
        </span>

        <span className="pr-2 text-cyan-400">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-slate-700 bg-[#10172A] p-4 shadow-2xl">

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white capitalize">
                {name}
              </h3>
              <p className="truncate text-xs text-slate-400">
                {email || 'Student Account'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-3">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              My Profile
            </Link>

            <Link
              to="/my-events"
              onClick={() => setIsOpen(false)}
              className="mt-1 block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              My Events
            </Link>
          </div>

          <div className="mt-3 border-t border-slate-700 pt-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              ↪ Logout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
