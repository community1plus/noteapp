import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import CommunityPlusHomePage from "./CommunityPlusHomePage";
import CommunityPlusLandingPage from "./CommunityPlusLandingPage";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import "../src/App.css";


function App({ signOut, user }) {
  return (
    <AmplifyProvider>
      <Routes>
        <Route path="/"
          element={<CommunityPlusLandingPage user={user} signOut={signOut} />}
        />

        {/* OAuth Callback & Landing page after login */}
        <Route
        path="/main"
        element={
          <Authenticator>
            {({ signOut, user }) => (
              <CommunityPlusHomePage user={user} signOut={signOut} />
            )}
          </Authenticator>
        }
      />
 
      </Routes>
    </AmplifyProvider>
  );
}

export default App;

