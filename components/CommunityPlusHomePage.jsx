import { useNavigate } from "react-router-dom";

function CommunityPlusHomePage({ user, signOut }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();          // Amplify logout
    navigate("/");            // React Router redirect
  };

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

