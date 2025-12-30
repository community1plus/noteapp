import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/CommunityPlusLandingPage.css";

function CommunityPlusLandingPage({ user }) {
  const navigate = useNavigate();

  // Auto-redirect signed-in users
  useEffect(() => {
    if (user) {
      navigate("/main", { replace: true });
    }
  }, [user, navigate]);

  const handleCommunityClick = () => {
    navigate("/main");
  };

  return (
    <div className="landing-container">
      
      {/* Main centered content */}
      <div className="main-content">
        <div>
          <h1
            className="title"
            onClick={handleCommunityClick}
            style={{ cursor: "pointer" }}
          >
            community.one
          </h1>

          <p className="subtitle">
            Hyperlocal Real-time content streaming. News. Video. Audio. Chat. Collaboration.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          © {new Date().getFullYear()} community.one
        </div>

        <div className="footer-center">
          Built for local communities
        </div>

        <div className="footer-right">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </footer>

    </div>
  );
}

export default CommunityPlusLandingPage;
