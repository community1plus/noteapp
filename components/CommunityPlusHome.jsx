import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

function CommunityPlusHome({ signOut, user }) {
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
      {<h1>Community+ Home Page - Protected Content</h1>}
    </div>
  );
}

// Protect this page with Cognito login
export default withAuthenticator(CommunityPlusHome);
