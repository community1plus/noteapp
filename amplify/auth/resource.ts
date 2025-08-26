import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    // Cognito user pool + identity pool
    cognito: true,

    // Enable social providers
    socialProviders: [
      "google",
      "facebook",
      "amazon",
      "apple",
      "twitter",
    ],

    // Enable guest/unauthenticated users
    identityPoolFederation: true,
  },

  // Default auth behavior for unauthenticated guests
  unauthenticatedAccess: {
    allowGuest: true,
  },

  // Optional: add MFA & password policies
  multifactor: {
    mode: "OPTIONAL",
    types: ["SMS", "TOTP"],
  },
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true,
  },
});

