
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import EventDetails from './pages/EventDetails';
import OrganizeEvent from './pages/OrganizeEvent';
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';

function App() {
  const [userId, setUserId] = useState(
    () => localStorage.getItem('campusUserId') || ''
  );

  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem('campusEmail') || ''
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('campusUser') === 'true'
  );

  // Save authenticated user details
  const handleLogin = (user) => {
    localStorage.setItem('campusUser', 'true');
    localStorage.setItem('campusUserId', user._id);
    localStorage.setItem('campusEmail', user.email);

    setUserId(user._id);
    setUserEmail(user.email);
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusUserId');
    localStorage.removeItem('campusEmail');

    setUserId('');
    setUserEmail('');
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
              onLogout={handleLogout}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile userId={userId} />}
        />

        <Route
          path="/login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
            />
          }
        />

        <Route
          path="/clubs"
          element={
            <Clubs
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              onLogout={handleLogout}
            />
          }
        />

        <Route path="/clubs/:slug" element={<ClubDetails />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
  path="/organize-event"
  element={<OrganizeEvent userId={userId} />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
