import React from "react";
import { defineAuth } from "@aws-amplify/backend-auth";
import { secret } from "@aws-amplify/backend";

// Define secrets - - Stored in Amplify Console → Environment variables)
const GOOGLE_CLIENT_ID = secret("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = secret("GOOGLE_CLIENT_SECRET");

const FACEBOOK_CLIENT_ID = secret("FACEBOOK_CLIENT_ID");
const FACEBOOK_CLIENT_SECRET = secret("FACEBOOK_CLIENT_SECRET");

const APPLE_CLIENT_ID = secret("APPLE_CLIENT_ID");
const APPLE_TEAM_ID = secret("APPLE_TEAM_ID");
const APPLE_KEY_ID = secret("APPLE_KEY_ID");
const APPLE_PRIVATE_KEY = secret("APPLE_PRIVATE_KEY");

const AMAZON_CLIENT_ID = secret("AMAZON_CLIENT_ID");
const AMAZON_CLIENT_SECRET = secret("AMAZON_CLIENT_SECRET");

const TWITTER_CLIENT_ID = secret("TWITTER_CLIENT_ID");
const TWITTER_CLIENT_SECRET = secret("TWITTER_CLIENT_SECRET");

export const auth = defineAuth({
  loginWith: {
    email: true,   // allow email sign-up/login
    externalProviders: {
      callbackUrls: [
        "http://localhost:3000/",
        // Add your production callback URLs here
      ],
      logoutUrls: [
        "http://localhost:3000/",
        // Add your production logout URLs here
      ],
      google: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      },
      facebook: {
        clientId: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
      },
    },
  },
  
});
// Note: To use social providers, you must configure them in the respective
// developer consoles (Google, Facebook, Apple, Amazon, Twitter) and set the
// callback URLs to point to your Cognito User Pool. See the documentation for
// more details: https://docs.amplify.aws/cli/auth/social-provider/s/overview/