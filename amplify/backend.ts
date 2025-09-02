import { defineBackend, defineStorage, defineFunction, defineApi } from "@aws-amplify/backend";

// ---------- Storage ----------
const storage = defineStorage({
  name: "videoStorage",
  access: (allow) => ({
    "video-raw": [
      allow.authenticated.to(["read", "write"]) // signed-in users upload
    ],
    "video-output": [
      allow.guest.to(["read"]),                // playback public
      allow.authenticated.to(["read"])
    ]
  }),
  cors: {
    "video-raw": {
      allowedOrigins: ["*"],
      allowedMethods: ["GET", "PUT", "HEAD", "OPTIONS"],
      allowedHeaders: ["*"]
    },
    "video-output": {
      allowedOrigins: ["*"],
      allowedMethods: ["GET", "HEAD", "OPTIONS"],
      allowedHeaders: ["*"]
    }
  }
});

// ---------- Functions ----------
const getUploadUrlFn = defineFunction({
  entry: "./functions/get-upload-url/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw"
  },
  access: (allow) => [
    allow.fromStorage("video-raw").to(["read", "write"])
  ]
});

const startTranscodeFn = defineFunction({
  entry: "./functions/start-transcode/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw",
    OUTPUT_BUCKET: "video-output",
    MEDIACONVERT_ROLE_ARN: "",     // <-- fill with your IAM role ARN
    MEDIACONVERT_ENDPOINT: ""      // <-- fill with MediaConvert endpoint
  },
  access: (allow) => [
    allow.fromStorage("video-raw").to(["read"]),
    allow.fromStorage("video-output").to(["read", "write"])
  ],
  s3Triggers: [
    {
      eventSource: "video-raw",
      events: ["s3:ObjectCreated:*"]
    }
  ]
});

// ---------- API ----------
const api = defineApi({
  name: "videoApi",
  routes: {
    "POST /generate-upload-url": getUploadUrlFn
  }
});

// ---------- Export backend ----------
export default defineBackend({
  storage,
  functions: {
    getUploadUrl: getUploadUrlFn,
    startTranscode: startTranscodeFn
  },
  api
});



