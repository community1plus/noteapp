import { defineAuth } from "@aws-amplify/backend-auth";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      amazon: true,
      apple: true,
      facebook: true,
      google: true,
      twitter: true,
    },
  },
  identityPool: {
    // Enables guest access
    unauthenticatedLogin: true,
  },
  multifactor: {
    mode: "OPTIONAL",
    sms: true,
  },
  accountRecovery: "EMAIL_ONLY",
});
