import { Router, Routes, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from "./CommunityPlusHome"; // protected page
import SignInRegister from "../src/SignInRegister";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommunityPlusLandingPage />} />
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



