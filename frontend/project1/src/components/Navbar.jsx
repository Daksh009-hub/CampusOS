import React from 'react';
function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="text-2xl font-bold text-blue-700"
        >
          CampusOS
        </a>

        <div className="flex gap-5 text-sm font-medium">
          <a href="#home" className="transition hover:text-blue-700">
            Home
          </a>

          <a href="#clubs" className="transition hover:text-blue-700">
            Clubs
          </a>

          <a href="#events" className="transition hover:text-blue-700">
            Events
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
