import React from "react";
import { defineAuth } from "@aws-amplify/backend-auth";
import { secret } from "@aws-amplify/backend";

// Define secrets - - Stored in Amplify Console → Environment variables)
const GOOGLE_CLIENT_ID = secret("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = secret("GOOGLE_CLIENT_SECRET");

const FACEBOOK_CLIENT_ID = secret("FACEBOOK_CLIENT_ID");
const FACEBOOK_CLIENT_SECRET = secret("FACEBOOK_CLIENT_SECRET");

// Export a default empty auth configuration to satisfy Amplify
export const auth = defineAuth({
  loginWith: {
    email: true,   // allow email sign-up/login
    externalProviders: {
      callbackUrls: [
        "http://localhost:3000/",
        "https://main.dmuplbxdc2r3b.amplifyapp.com"
        // Add your production callback URLs here
      ],
      logoutUrls: [
        "http://localhost:3000/",
        "https://main.dmuplbxdc2r3b.amplifyapp.com"
      ],
      google: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        scopes: ["profile"],
      },
      facebook: {
        clientId: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        scopes: ["public_profile"],
      },
      
    }, 
  },
});
