import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    // Default login: guest
    guest: true, // <- allows anonymous sessions

    // Federated providers
    oauth: true,
    providers: [
      "Google",
      "Facebook",
      "LoginWithAmazon",
      "SignInWithApple",
      "Twitter"
    ],
  },
});
