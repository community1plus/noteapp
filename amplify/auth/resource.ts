import { defineAuth } from "@aws-amplify/backend-auth";
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
    },
  },
});

