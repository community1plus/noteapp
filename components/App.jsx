import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage";
import CommunityPlusHomePage from "./CommunityPlusHomePage";
import CommunityPlusHome from "./CommunityPlusHome"; // already protected by HOC
import SignInRegister from "../src/SignInRegister";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page is public */}
        <Route path="/" element={<CommunityPlusLandingPage />} />

        {/* Protected route */}
        <Route path="/home" element={<CommunityPlusHome />} />

        {/* Post-login landing page */}
        <Route
          path="/main"
          element={
            <Authenticator>
              {({ user, signOut }) => (
                <CommunityPlusHomePage user={user} signOut={signOut} />
              )}
            </Authenticator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
