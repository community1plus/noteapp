import { defineAuth } from "@aws-amplify/backend";
import { secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
      },
      facebook: {
        clientId: secret("FACEBOOK_APP_ID"),
        clientSecret: secret("FACEBOOK_APP_SECRET"),
      },
      callbackUrls: [
        "http://localhost:3000/",
        "https://main.dmuplbxdc2r3b.amplifyapp.com/main/",
      ],
      logoutUrls: [
        "http://localhost:3000/",
        "https://main.dmuplbxdc2r3b.amplifyapp.com/",
      ],
    },
  },

  // ✅ These scopes must match what you use in frontend Amplify.configure
  tokenScopes: [
    "openid",
    "email",


  ],
});
