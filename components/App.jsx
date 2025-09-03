import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage"; // protected page
import CommunityPlusHome from CommunityPlusHome;
import SignInRegister from "../src/SignInRegister";

function App({ signOut, user }) {
  return (
    <Router>
      <nav>
        <Link to="/login">COMMUNITY</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/login" element={<SignInRegister user={user} signOut={signOut} />} />
        <Route path="/home" element={<CommunityPlusHome />} /> 
      </Routes>
    </Router>
  );
}

// Protect the entire app with Auth (sign-in shown when unauthenticated)
export default withAuthenticator(App, {
  socialProviders: ["google", "facebook"],
});

