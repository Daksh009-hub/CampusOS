
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ClubsSection from '../components/ClubsSection';
import EventsSection from '../components/EventsSection';
import Footer from '../components/Footer';

function Home({ isLoggedIn, onLogout, userEmail,userRole }) {
  const isClubHead = isLoggedIn && userRole === 'clubHead';

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} userEmail={userEmail} userRole={userRole} isClubHead={isClubHead} />

      <main className="mx-auto max-w-6xl px-6">
        <HeroSection />
        <ClubsSection />
        <EventsSection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
