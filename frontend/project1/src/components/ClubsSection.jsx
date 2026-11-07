
import { useState, useEffect } from 'react';
import ClubCard from './ClubCard';
import { Sparkles } from 'lucide-react';

function ClubsSection() {
  // Store clubs fetched from backend
  const [clubs, setClubs] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState('');

  // Fetch clubs from MongoDB through backend API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError('');

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

        const response = await fetch(`${apiUrl}/clubs`);

        // Read response only once
        const responseText = await response.text();

        console.log('API Status:', response.status);
        console.log('API Response:', responseText);

        // Check HTTP status
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        // Convert response text into JSON
        let result;

        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            'Backend returned an invalid JSON response. Check API URL.'
          );
        }

        // Store clubs in state
        if (result.success && Array.isArray(result.data)) {
          setClubs(result.data);
        } else {
          throw new Error(
            result.message || 'Unable to load clubs.'
          );
        }

      } catch (err) {
        console.error('Clubs API Error:', err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return (
    <section
      id="clubs"
      className="relative scroll-mt-28 overflow-hidden pt-6 pb-20"
    >

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10">

        {/* Section Heading */}
        <div className="mb-12 text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold tracking-wider text-cyan-400">
            <Sparkles size={16} />
            FIND YOUR COMMUNITY
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-white md:text-5xl">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Clubs
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            Find your passion, connect with like-minded people,
            develop new skills and make your campus journey memorable.
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

        </div>

        {/* Loading State */}
        {loading && (
          <p className="py-10 text-center text-cyan-400">
            Loading clubs...
          </p>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-10 text-center">

            <p className="text-red-400">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Empty State */}
        {!loading && !error && clubs.length === 0 && (
          <p className="py-10 text-center text-slate-400">
            No clubs available right now.
          </p>
        )}

        {/* Real Clubs from MongoDB */}
        {!loading && !error && clubs.length > 0 && (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {clubs.map((club) => (
              <ClubCard
                key={club._id}
                name={club.name || club.slug}
                description={club.description}
                slug={club.slug}
                bannerUrl={club.bannerUrl}
                category={club.category}
              />
            ))}

          </div>

        )}

      </div>
    </section>
  );
}

export default ClubsSection;
