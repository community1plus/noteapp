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
    // Send everyone to /main — Authenticator at App level protects it
    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 onClick={handleCommunityClick} className="text-5xl font-bold mb-8">COMMUNITY+</h1>
      <p className="text-lg text-gray-600 mb-10">
        Stay updated with your local community news and events.
      </p>
    </div>
  );
}

export default CommunityPlusLandingPage;