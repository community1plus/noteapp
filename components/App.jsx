import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import CommunityPlusHomePage from "./CommunityPlusHomePage";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage";


function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<CommunityPlusLandingPage user={user} signOut={signOut} />}
        />

        {/* OAuth Callback & Landing page after login */}
        <Route
          path="/main"
          element={
            <withAuthenticator>
              {({ signOut, user }) => (
                <CommunityPlusHomePage user={user} signOut={signOut} />
              )}
            </withAuthenticator>
          }
        />
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

