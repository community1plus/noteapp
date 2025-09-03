import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from "./CommunityPlusHome"; // protected page
import SignInRegister from "../src/SignInRegister";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;



