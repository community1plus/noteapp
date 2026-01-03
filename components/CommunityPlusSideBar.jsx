import React from "react";

function CommunityPlusSideBar({ setActiveContent }) {
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={() => setActiveContent("posts")}>Posts</li>
        <li onClick={() => setActiveContent("map")}>Map</li>
        <li onClick={() => setActiveContent("other")}>Other</li>
      </ul>
    </aside>
  );
}

export default CommunityPlusSideBar;
