import { useNavigate } from "react-router-dom";

export default function CommunityPlusLandingPage() {
  const navigate = useNavigate();

  const handleCommunityClick = () => {
    // Always go to /home, Authenticator will handle login if required
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold mb-8">Welcome to Community+</h1>
      <p className="text-lg text-gray-600 mb-10">
        Stay updated with your local community news and events.
      </p>
      <button
        onClick={handleCommunityClick}
        className="px-8 py-4 bg-blue-600 text-white text-lg rounded-2xl shadow-lg hover:bg-blue-700 transition"
      >
        Enter Community
      </button>
    </div>
  );
}