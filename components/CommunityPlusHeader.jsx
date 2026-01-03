import React from "react";

function CommunityPlusHeader({ setActiveContent }) {
  return (
    <header className="header">
      <nav>
        <ul>
          <li onClick={() => setActiveContent("posts")}>Posts</li>
          <li onClick={() => setActiveContent("map")}>Map</li>
          <li onClick={() => setActiveContent("other")}>Other</li>
        </ul>
      </nav>
    </header>
  );
}

export default CommunityPlusHeader;
