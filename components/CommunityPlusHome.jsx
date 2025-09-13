import React from "react";

export default function CommunityPlusHome({ user, signOut }) {
  return (
    <div>
      <h1>Welcome {user?.username}</h1>

      <button onClick={signOut}>Sign out</button>

      <h2>Community+ Home Page - Protected Content</h2>
      <p>This content is only visible to authenticated users.</p>
    </div>
  );
}




