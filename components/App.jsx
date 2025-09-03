import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from "./CommunityPlusHome"; // protected page
import SignInRegister from "../src/SignInRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<CommunityPlusLandingPage />} />

        {/* Protected home page */}
        <Route
          path="/home"
          element={
            <withAuthenticator>
              {({ signOut, user }) => (
                <CommunityPlusHome user={user} signOut={signOut} />
              )}
            </withAuthenticator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



