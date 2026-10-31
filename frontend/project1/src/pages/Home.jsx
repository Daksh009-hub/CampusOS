
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ClubsSection from '../components/ClubsSection';
import EventsSection from '../components/EventsSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

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
