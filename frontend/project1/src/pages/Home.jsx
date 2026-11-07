
import Navbar from '../components/Navbar';
import EventsSection from '../components/EventsSection';
import Footer from '../components/Footer';

function Home({ isLoggedIn, onLogout, userEmail, role }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        userEmail={userEmail}
        role={role}
      />

      <main className="mx-auto max-w-7xl px-6 pb-12">
        <EventsSection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
