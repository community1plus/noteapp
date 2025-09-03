import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from "./CommunityPlusHome"; // protected page
import SignInRegister from "../src/SignInRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommunityPlusLandingPage />} />
        <Route
          path="/home"
          element={
            <withAuthenticator>
              {({ signOut, user }) => (
                <SignInRegister user={user} signOut={signOut} />
              )}
            </withAuthenticator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



