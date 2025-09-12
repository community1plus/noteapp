import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";

import CommunityPlusLandingPage from "./CommunityPlusLandingPage";
import CommunityPlusHome from "./CommunityPlusHome";
import CommunityPlusHomePage from "./CommunityPlusHomePage";

function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<CommunityPlusLandingPage />} />

        {/* Protected routes */}
        <Route path="/home" element={<CommunityPlusHome user={user} signOut={signOut} />} />
        <Route path="/main" element={<CommunityPlusHomePage user={user} signOut={signOut} />} />

        {/* Default → if authenticated, go to /main */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);

