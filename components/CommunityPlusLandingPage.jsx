import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export default function CommunityPlusLandingPage() {
  const navigate = useNavigate();

  // On mount, check if the user is already authenticated
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        // already signed in → go straight to /home
        navigate("/home", { replace: true });
      })
      .catch(() => {
        // not signed in → stay on landing page
      });
  }, [navigate]);

  const handleCommunityClick = () => {
    // Always push user to /home
    // If not signed in, Authenticator at /home will show login
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>COMMUNITY+</h1>
      <button
        onClick={handleCommunityClick}
        style={{ padding: "10px 20px", fontSize: "1.2rem" }}
      >
        COMMUNITY+
      </button>
    </div>
  );
}