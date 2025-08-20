import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommunityPlusLandingPage from '../../notepad/src/components/CommunityPlusLandingPage';
import CommunityPlusRegistrationPage from '../../notepad/src/components/CommunityPlusRegistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommunityPlusLandingPage />} />
      <Route path="/register" element={<CommunityPlusRegistrationPage />} />
    </Routes>
  );
}

export default App;