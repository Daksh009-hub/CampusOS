
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import GDGC from './pages/clubs/GDGC';
import Ecell from './pages/clubs/Ecell';
import SAE from './pages/clubs/SAE';
import Elektron from './pages/clubs/Elektron';
import Genesis from './pages/clubs/Genesis';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Individual Club Routes */}
        <Route path="/clubs/gdgc" element={<GDGC />} />
        <Route path="/clubs/ecell" element={<Ecell />} />
        <Route path="/clubs/sae" element={<SAE />} />
        <Route path="/clubs/elektron" element={<Elektron />} />
        <Route path="/clubs/genesis" element={<Genesis />} />

        {/* Event Details Route */}
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
