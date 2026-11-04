
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Profile from './pages/Profile';



import Login from './pages/Login';
import GDGC from './pages/clubs/GDGC';
import Ecell from './pages/clubs/Ecell';
import SAE from './pages/clubs/SAE';
import Elektron from './pages/clubs/Elektron';
import Genesis from './pages/clubs/Genesis';
import EventDetails from './pages/EventDetails';
import OrganizeEvent from './pages/OrganizeEvent';
import Clubs from './pages/Clubs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('campusUser') === 'true'
  );

  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem('campusEmail') || ''
  );

  

  // Login
  const handleLogin = (email, role = 'student') => {
    localStorage.setItem('campusUser', 'true');
    localStorage.setItem('campusEmail', email);
    

    setUserEmail(email);
    
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusEmail');
    

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


        <Route path="/profile" element={<Profile />} />



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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
