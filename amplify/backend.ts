import { defineBackend, defineFunction, defineStorage } from "@aws-amplify/backend";

// ---------- Storage (two buckets) ----------
const rawStorage = defineStorage({
  name: "videoRaw",
  access: (allow) => ({
    "uploads/*": [allow.authenticated.to(["read", "write"])]
  })
});

const outputStorage = defineStorage({
  name: "videoOutput",
  access: (allow) => ({
    "public/*": [allow.guest.to(["read"]), allow.authenticated.to(["read"])]
  })
});

// ---------- Functions ----------

// Upload URL Lambda (REST endpoint)
const getUploadUrl = defineFunction({
  name: "getUploadUrl",
  entry: "./functions/get-upload-url/handler.ts",
  environment: {
    RAW_BUCKET: rawStorage.name
  },
  api: {
    path: "/generate-upload-url",
    method: "POST"
  }
});

// Start transcode Lambda (triggered by S3)
const startTranscode = defineFunction({
  name: "startTranscode",
  entry: "./functions/start-transcode/handler.ts",
  environment: {
    RAW_BUCKET: rawStorage.name,
    OUTPUT_BUCKET: outputStorage.name,
    MEDIACONVERT_ROLE_ARN: "",     // fill in
    MEDIACONVERT_ENDPOINT: ""      // fill in
  },
  s3Events: [
    {
      bucket: rawStorage.name,
      events: ["s3:ObjectCreated:*"]
    }
  ]
});

// ---------- Export ----------
export default defineBackend({
  storage: [rawStorage, outputStorage],
  getUploadUrl,
  startTranscode
});


