
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
feature/student-profile
import Profile from './pages/Profile';


main
import Login from './pages/Login';
import GDGC from './pages/clubs/GDGC';
import Ecell from './pages/clubs/Ecell';
import SAE from './pages/clubs/SAE';
import Elektron from './pages/clubs/Elektron';
import Genesis from './pages/clubs/Genesis';
import EventDetails from './pages/EventDetails';
import OrganizeEvent from './pages/OrganizeEvent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('campusUser') === 'true'
  );

  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem('campusEmail') || ''
  );

  const [userRole, setUserRole] = useState(
    () => localStorage.getItem('campusRole') || 'student'
  );

  // Login
  const handleLogin = (email, role = 'student') => {
    localStorage.setItem('campusUser', 'true');
    localStorage.setItem('campusEmail', email);
    localStorage.setItem('campusRole', role);

    setUserEmail(email);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusEmail');
    localStorage.removeItem('campusRole');

    setUserEmail('');
    setUserRole('student');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              userRole={userRole}
              onLogout={handleLogout}
            />
          }
        />

feature/student-profile
        <Route path="/profile" element={<Profile />} />


main
        <Route
          path="/login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
            />
          }
        />

        <Route path="/clubs/gdgc" element={<GDGC />} />
        <Route path="/clubs/ecell" element={<Ecell />} />
        <Route path="/clubs/sae" element={<SAE />} />
        <Route path="/clubs/elektron" element={<Elektron />} />
        <Route path="/clubs/genesis" element={<Genesis />} />

        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/organize-event" element={<OrganizeEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
