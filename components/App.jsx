import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusHome from "./CommunityPlusHome";
import CommunityPlusHomePage from "./CommunityPlusHomePage";

function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Protected routes */}
        <Route
          path="/"
          element={<CommunityPlusHome user={user} signOut={signOut} />}
        />
        <Route path="/main"
          element={<CommunityPlusHomePage user={user} signOut={signOut} />}
        />

        {/* Catch-all → go to /main */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);

