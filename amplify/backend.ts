import { defineBackend, defineFunction, defineStorage } from "@aws-amplify/backend";

// ---------- Storage ----------
const storage = defineStorage({
  name: "videoStorage",
  partitions: ["video-raw", "video-output"], // two logical buckets
});

// ---------- Functions ----------

// Upload URL Lambda (exposed as REST endpoint)
const getUploadUrl = defineFunction({
  name: "getUploadUrl",
  entry: "./functions/get-upload-url/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw"
  },
  api: {
    path: "/generate-upload-url",
    method: "POST"
  }
});

// Start transcode Lambda (triggered by S3 event)
const startTranscode = defineFunction({
  name: "startTranscode",
  entry: "./functions/start-transcode/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw",
    OUTPUT_BUCKET: "video-output",
    MEDIACONVERT_ROLE_ARN: "",     // <-- set in Amplify console or env
    MEDIACONVERT_ENDPOINT: ""      // <-- set in Amplify console or env
  },
  s3Events: [
    {
      bucket: "video-raw",
      events: ["s3:ObjectCreated:*"]
    }
  ]
});

// ---------- Export everything ----------
export default defineBackend({
  storage,
  getUploadUrl,
  startTranscode
});
