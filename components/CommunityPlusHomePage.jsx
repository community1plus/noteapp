import React from "react";
import "../src/CommunityPlusHomePage.css";

const CommunityPlusHomePage = () => {
  return (
    <div className="page-container">
      {/* Header / Nav */}
      <header className="header">
        <div className="logo">Community+</div>

        <nav>
          <ul className="nav-links">
            <li>HOME</li>
            <li>NEWS</li>
            <li>OPINION</li>
            <li>EVENTS</li>
            <li>ASSIST</li>
            <li>COMMUNITY+</li>
          </ul>
        </nav>
      </header>

      {/* Placeholder Main Content */}
      <main className="main">
        <h1>Welcome to Community+</h1>
      </main>
    </div>
  );
};

export default CommunityPlusHomePage;
