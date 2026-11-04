
import Navbar from '../components/Navbar';
import ClubsSection from '../components/ClubsSection';
import Footer from '../components/Footer';

function Clubs({ isLoggedIn, onLogout, userEmail }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        userEmail={userEmail}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <ClubsSection />
      </main>

      <Footer />
    </div>
  );
}

export default Clubs;
