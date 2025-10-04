import React from "react";
import "../src/CommunityPlusSidebar.css"; // import the CSS file
import { signOut } from "aws-amplify/auth";

export default function CommunityPlusSidebar() {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload(); // optional, refresh to reset app state
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="sidebar">
      {/* ...profile... */}
      <ul className="sidebar-menu">
        <li className="sidebar-item">➕ Add News</li>
        <li className="sidebar-item">📅 Add Event</li>
        <li className="sidebar-item">💬 Opinion</li>
        <hr className="sidebar-divider" />
        <li className="sidebar-item" onClick={handleSignOut}>🚪 Logout</li>
      </ul>
    </div>
  );
}
