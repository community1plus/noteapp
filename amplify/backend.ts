import { defineBackend } from "@aws-amplify/backend";
import { auth } from './auth/resource';
import { storage } from './auth/resource';

defineBackend({
  auth,
  storage,
});
