import { defineBackend, defineApi } from '@aws-amplify/backend';
import { defineStorage } from "@aws-amplify/backend-storage";
import { defineFunction } from "@aws-amplify/backend-function";
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  api: {
    videoApi: {
      // REST route example
      routes: {
        "POST /generate-upload-url": {
          function: "getUploadUrl"
        }
      }
    }
  }
});

// Buckets
const storage = defineStorage({
  name: "videoStorage",
  access: (allow) => ({
    "video-raw": [allow.authenticated.to(["read", "write"])],
    "video-output": [allow.guest.to(["read"]), allow.authenticated.to(["read"])]
  })
});
  
// Lambda: presigned URL
const getUploadUrlFn = defineFunction({
  entry: "./functions/get-upload-url/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw"
  },
});
 
// Lambda: start MediaConvert on S3 create
const startTranscodeFn = defineFunction({
  entry: "./functions/start-transcode/handler.ts",
  environment: {
    RAW_BUCKET: "video-raw",
    OUTPUT_BUCKET: "video-output",
    MEDIACONVERT_ROLE_ARN: "",     // fill later
    MEDIACONVERT_ENDPOINT: ""      // fill later
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

// API routes (REST) for frontend to request presigned URL

const api = defineApi({
  name: "videoApi",
  routes: {
    "POST /generate-upload-url": getUploadUrlFn
  }
});

export default backend;

