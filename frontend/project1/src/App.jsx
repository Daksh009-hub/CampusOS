import React from 'react';
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
  }
]

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-2xl font-bold text-blue-700">
            CampusOS
          </a>

          <div className="flex gap-5 text-sm font-medium">
            <a href="#home" className="hover:text-blue-700">Home</a>
            <a href="#clubs" className="hover:text-blue-700">Clubs</a>
            <a href="#events" className="hover:text-blue-700">Events</a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section id="home" className="py-16 text-center sm:py-24">
          <p className="mb-3 font-semibold text-blue-700">
            UIET STUDENT COMMUNITY
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to CampusOS
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
            Discover student clubs, explore campus events and connect
            with communities—all in one place.
          </p>

          <a
            href="#clubs"
            className="mt-7 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Explore Clubs
          </a>
        </section>

        <section id="clubs" className="py-10">
          <h2 className="text-3xl font-bold">Our Clubs</h2>
          <p className="mt-2 text-gray-600">
            Find a community that matches your interests.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <article
                key={club.name}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-xl font-bold">{club.name}</h3>
                <p className="mt-3 leading-6 text-gray-600">
                  {club.description}
                </p>
                <a
                  href="#events"
                  className="mt-5 inline-block font-semibold text-blue-700"
                >
                  View details →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="events" className="py-16">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>

          <div className="mt-6 rounded-xl border border-dashed bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">No events yet</h3>
            <p className="mt-2 text-gray-600">
              Upcoming GDGC, E-Cell , SAE, Elektron and Genesis events will appear here.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t bg-white px-6 py-6 text-center text-sm text-gray-500">
        CampusOS · Built for the UIET community
      </footer>
    </div>
  )
}

export default App
