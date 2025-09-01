import React from "react";
import "../src/SignInRegister.css"; // External CSS
import { signInWithRedirect } from "aws-amplify/auth";

const SignInRegister = () => {
  // Social sign-in (redirects to provider login page)
  const handleProviderLogin = async (providerId) => {
    try {
      await signInWithRedirect({ provider: providerId });
    } catch (err) {
      console.error("Error signing in with provider:", providerId, err);
    }
  };

  // Guest login
  const handleGuestLogin = async () => {
    try {
      const user = await signInAnonymously();
      console.log("Signed in as guest:", user);
    } catch (err) {
      console.error("Error with guest login:", err);
    }
  };

  // Email signup (you can replace with Amplify email/password auth later)
  const handleEmailSignUp = (e) => {
    e.preventDefault();
    alert("Signed up with email!");
  };

  return (
    <div className="container">
      {providers.map((provider) => (
        <button
          className="btn"
          key={provider.name}
          onClick={() => handleProviderLogin(provider.id)}
        >
          <img src={provider.icon} alt={provider.name} />
          Continue with {provider.name}
        </button>
      ))}

      <button className="btn guest-btn" onClick={handleGuestLogin}>
        Continue as Guest
      </button>

      <div className="divider">
        <span>or</span>
      </div>

      <form onSubmit={handleEmailSignUp}>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit" className="signup-btn">Sign up</button>
      </form>

      <footer>&copy; 2025 Community+. All rights reserved.</footer>
    </div>
  );
};

export default SignInRegister;
