import React from 'react';
import { Link } from 'react-router-dom';
import './CommunityPlusLandingPage.css';

function CommunityPlusLandingPage() {
  return (
    <div className="landing-container">
      <div className="main-content">
        <Link to="/register" className="title-link">
          <div className="title">COMMUNITY+</div>
        </Link>
      </div>

      <footer className="footer">
        <div className="footer-left">How Commune+ Works</div>
        <div className="footer-center">© 2025 COMMUNITY+. All rights reserved.</div>
        <div className="footer-right">
          <a href="#">Terms</a>
          <a href="#">Security</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default CommunityPlusLandingPage;