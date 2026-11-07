
import Navbar from '../components/Navbar';
import ClubsSection from '../components/ClubsSection';
import Footer from '../components/Footer';

function Clubs({ isLoggedIn, onLogout, userEmail, role }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        userEmail={userEmail}
        role={role}
      />

      <main className="mx-auto max-w-7xl px-6 pb-12">
        <ClubsSection />
      </main>

      <Footer />
    </div>
  );
}

export default Clubs;
