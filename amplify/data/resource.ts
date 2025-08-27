import { defineAuth } from "@aws-amplify/backend-auth";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      amazon: true,
      apple: true,
      facebook: {
        clientId: '773397878670957',
        clientSecret: 'a5f6a7a531b2e94825798a3ba05a3011',
      },
      google: {
        clientId: '683031353967-',
        clientSecret: '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',
      },
      //twitter: true,
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
