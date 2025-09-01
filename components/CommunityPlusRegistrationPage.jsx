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
  );
};

export default SignInRegister;
