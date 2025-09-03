import { defineBackend, defineStorage, defineFunction } from "@aws-amplify/backend";

const storage = defineStorage({
  name: "videoStorage",
  access: (allow) => ({
    "video-raw": [allow.authenticated.to(["read", "write"])],
    "video-output": [allow.guest.to(["read"]), allow.authenticated.to(["read"])]
  })
});

const getUploadUrlFn = defineFunction({
  entry: "./functions/get-upload-url/handler.ts",
  environment: { RAW_BUCKET: "video-raw" },
  access: (allow) => [
    allow.fromStorage("video-raw").to(["read", "write"])
  ],
  // 👇 Expose as REST endpoint
  api: {
    path: "/generate-upload-url",
    method: "POST"
  }
});

const startTranscodeFn = defineFunction({
  entry: "./functions/start-transcode/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw",
    OUTPUT_BUCKET: "video-output",
    MEDIACONVERT_ROLE_ARN: "",
    MEDIACONVERT_ENDPOINT: ""
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

export default defineBackend({
  storage,
  functions: {
    getUploadUrl: getUploadUrlFn,
    startTranscode: startTranscodeFn
  }
});
