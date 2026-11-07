import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import EventDetails from './pages/EventDetails';
import OrganizeEvent from './pages/OrganizeEvent';
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';
import MyEvents from './pages/MyEvents';
import AdminDashboard from './pages/AdminDashboard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [userId, setUserId] = useState(
    () => localStorage.getItem('campusUserId') || ''
  );

  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem('campusEmail') || ''
  );

  const [userRole, setUserRole] = useState(
    () => localStorage.getItem('campusUserRole') || ''
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('campusUser') === 'true'
  );

  // Sync latest role from backend if logged in
  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/users/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data?.role) {
            setUserRole(result.data.role);
            localStorage.setItem('campusUserRole', result.data.role);
          }
        })
        .catch((err) => console.error('Failed to sync user role:', err));
    }
  }, [userId]);

  // Save authenticated user details
  const handleLogin = (user) => {
    const role = user.role || 'student';
    localStorage.setItem('campusUser', 'true');
    localStorage.setItem('campusUserId', user._id);
    localStorage.setItem('campusEmail', user.email);
    localStorage.setItem('campusUserRole', role);

    setUserId(user._id);
    setUserEmail(user.email);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusUserId');
    localStorage.removeItem('campusEmail');
    localStorage.removeItem('campusUserRole');

    setUserId('');
    setUserEmail('');
    setUserRole('');
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
              role={userRole}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile userId={userId} />}
        />

        <Route
          path="/my-events"
          element={
            isLoggedIn && userId ? (
              <MyEvents
                userId={userId}
                userEmail={userEmail}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Super-Admin Dashboard: protected for admin role only */}
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === 'admin' ? (
              <AdminDashboard
                userId={userId}
                userEmail={userEmail}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
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
              role={userRole}
            />
          }
        />

        <Route path="/clubs/:slug" element={<ClubDetails />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route
          path="/organize-event"
          element={
            isLoggedIn && userId ? (
              <OrganizeEvent userId={userId} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
