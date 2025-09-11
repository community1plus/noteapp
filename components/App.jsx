import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import CommunityPlusLandingPage from "./CommunityPlusLandingPage";
import CommunityPlusHome from "./CommunityPlusHome";
import SignInRegister from "../src/SignInRegister";

// Wrap your protected page with the HOC
const ProtectedCommunityPlusHome = Authenticator(CommunityPlusHome);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page is public */}
        <Route path="/" element={<CommunityPlusLandingPage />} />

        {/* Protected route */}
        <Route path="/home" element={<ProtectedCommunityPlusHome />} />

        {/* Optional standalone sign-in/register route */}
        <Route path="/auth" element={<SignInRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Authenticator(App);
