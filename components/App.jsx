import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPage from "./components/CommunityPage"; // protected page
import SignInRegister from "../src/SignInRegister";

function App({ signOut, user }) {
  return (
    <Router>
      <nav>
        <Link to="/community">COMMUNITY</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/community" element={<SignInRegister user={user} signOut={signOut} />} />
      </Routes>
    </Router>
  );
}

// Protect the entire app with Auth (sign-in shown when unauthenticated)
export default withAuthenticator(App, {
  socialProviders: ["google", "facebook"],
});

