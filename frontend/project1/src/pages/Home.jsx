
import Navbar from '../components/Navbar';
import EventsSection from '../components/EventsSection';
import Footer from '../components/Footer';

function Home({ isLoggedIn, onLogout, userEmail }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        userEmail={userEmail}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <EventsSection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
