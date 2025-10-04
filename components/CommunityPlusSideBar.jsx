import React from "react";
import "../src/CommunityPlusSidebar.css"; // import the CSS file

export default function CommunityPlusSidebar() {
  return (
    <div className="sidebar">
      {/* Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">C+</div>
        <span className="sidebar-username">Adefope Oloyede</span>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        <li className="sidebar-item">➕ Add News</li>
        <li className="sidebar-item">📅 Add Event</li>
        <li className="sidebar-item">💬 Opinion</li>
      </ul>
    </div>
  );
}
