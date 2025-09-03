import { useNavigate } from "react-router-dom";

export default function CommunityPlusLandingPage() {
  const navigate = useNavigate();

  const handleCommunityClick = () => {
    // Redirect to /home → Authenticator will handle login if needed
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Welcome to COMMUNITY+</h1>
      <button
        onClick={handleCommunityClick}
        style={{ padding: "10px 20px", fontSize: "1.2rem" }}
      >
        COMMUNITY+
      </button>
    </div>
  );
}