import { defineBackend } from "@aws-amplify/backend";
import { auth } from './auth/resource';
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive'
});

defineBackend({
  auth,
  storage
});
