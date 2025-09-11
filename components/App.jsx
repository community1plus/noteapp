import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import CommunityPlusLandingPage from "./CommunityPlusLandingPage";
import CommunityPlusHome from "./CommunityPlusHome";
import SignInRegister from "../src/SignInRegister";
// Wrap your protected page with the HOC
const ProtectedCommunityPlusHome = CommunityPlusHome;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page is public */}
        <Route path="/" element={<CommunityPlusLandingPage />} />

        {/* Protected route */}
        <Route path="/home"
          element={
            <Authenticator>
              {({ signOut, user }) => (
                <ProtectedCommunityPlusHome user={user} signOut={signOut} />
              )}
            </Authenticator>
          }
        />

       <Route path="/auth" element={<SignInRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
