import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CommunityPlusHomePage from "./CommunityPlusHomePage";

function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<CommunityPlusLandingPage user={user} signOut={signOut} />}
        />
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

