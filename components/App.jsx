import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommunityPlusLandingPage from './CommunityPlusLandingPage';
import CommunityPlusRegistrationPage from './CommunityPlusRegistrationPage';
import CommunityPlusHomePage from './CommunityPlusHomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommunityPlusLandingPage />} />
      <Route path="/register" element={<CommunityPlusRegistrationPage />} />
      <Route path="/home" element={<CommunityPlusHomePage />} />
    </Routes>
  );
}

export default App;