import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from "./CommunityPlusHome"; // protected page
import SignInRegister from "../src/SignInRegister";

function App({ signOut, user }) {
  return (
    <Router>
      <nav>
        <Link to="/home">COMMUNITY</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CommunityPlusHome />} /> 
        <Route path="/home" element={<CommunityPlusHome />} /> 
        <Route path="/login" element={<SignInRegister user={user} signOut={signOut} />} />
      </Routes>
    </Router>
  );
}

// Protect the entire app with Auth (sign-in shown when unauthenticated)
export default withAuthenticator(App, {
  socialProviders: ["google", "facebook"],
});

