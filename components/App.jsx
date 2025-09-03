import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from "./CommunityPlusHome"; // protected page
import SignInRegister from "../src/SignInRegister";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<CommunityPlusLandingPage />} />

        {/* Protected home page */}
        <Route
          path="/home"
          element={
            <Authenticator>
              {({ signOut, user }) => (
                <CommunityPlusHome user={user} signOut={signOut} />
              )}
            </Authenticator>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



