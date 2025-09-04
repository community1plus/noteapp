import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";

export default function CommunityPlusLandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(() => {
        // already signed in → go straight to /home
        navigate("/home", { replace: true });
      })
      .catch(() => {
        // not signed in → stay here
      });
  }, [navigate]);

  const handleCommunityClick = () => {
    navigate("/home"); // /home is wrapped in <Authenticator>, so it will show login if needed
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
