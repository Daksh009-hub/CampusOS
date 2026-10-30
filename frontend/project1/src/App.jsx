
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ClubsSection from './components/ClubsSection';


const clubs = [
  {
    name: 'GDGC',
    description: 'Technology, coding and developer events.',
  },
  {
    name: 'E-Cell',
    description: 'Entrepreneurship, startups and innovation.',
  },
  {
    name: 'SAE',
    description: 'Automotive engineering and practical projects.',
  },
  {
    name: 'Elektron',
    description: 'Student community and activities.',
  },
  {
    name: 'Genesis',
    description: 'Student community and activities.',
  },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navbar */}
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">

        {/* Hero Section */}
        <HeroSection />

        {/* Clubs Section */}
        <section id="clubs" className="py-10">
          <h2 className="text-3xl font-bold">
            Our Clubs
          </h2>

          <p className="mt-2 text-gray-600">
            Find a community that matches your interests.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard
                key={club.name}
                name={club.name}
                description={club.description}
              />
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-16">
          <h2 className="text-3xl font-bold">
            Upcoming Events
          </h2>

          <div className="mt-6 rounded-xl border border-dashed bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">
              No events yet
            </h3>

            <p className="mt-2 text-gray-600">
              Upcoming GDGC, E-Cell, SAE, Elektron and Genesis
              events will appear here.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t bg-white px-6 py-6 text-center text-sm text-gray-500">
        CampusOS · Built for the UIET community
      </footer>

    </div>
  )
}

export default App
