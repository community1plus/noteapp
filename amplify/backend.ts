import { defineBackend } from '@aws-amplify/backend';
import { defineStorage } from "@aws-amplify/backend-storage";
import { defineFunction } from "@aws-amplify/backend-function";
import { defineApi } from "@aws-amplify/backend-api";
import { auth } from './auth/resource';
import { data } from './data/resource';

import { defineBackend } from "@aws-amplify/backend";

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
    "video-raw": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read","write"]), // uploads via presigned URL
    ],
    "video-output": [
      allow.guest.to(["read"]),                 // HLS playback public via CF
      allow.authenticated.to(["read"])
    ],
  }),
  // Helpful CORS for PUT from browser
  cors: {
    "video-raw": {
      allowedOrigins: ["*"],
      allowedMethods: ["GET","PUT","HEAD","OPTIONS"],
      allowedHeaders: ["*"],
      exposeHeaders: ["ETag"]
    },
    "video-output": {
      allowedOrigins: ["*"],
      allowedMethods: ["GET","HEAD","OPTIONS"],
      allowedHeaders: ["*"],
    }
  }
});

// Lambda: presigned URL
const getUploadUrlFn = defineFunction({
  name: "getUploadUrl",
  entry: "./functions/get-upload-url/handler.ts",
  environment: {
    RAW_BUCKET: storage.resources["video-raw"].name
  },
  // grant put access for signed URLs (the URL itself authorizes, but SDK needs head/list sometimes)
  permissions: [storage.resources["video-raw"].grantReadWrite()],
});

// Lambda: start MediaConvert on S3 create
const startTranscodeFn = defineFunction({
  name: "startTranscode",
  entry: "./functions/start-transcode/handler.ts",
  environment: {
    RAW_BUCKET: storage.resources["video-raw"].name,
    OUTPUT_BUCKET: storage.resources["video-output"].name,
    // Fill these in after you create MediaConvert role/endpoints
    MEDIACONVERT_ROLE_ARN: process.env.MEDIACONVERT_ROLE_ARN ?? "",
    MEDIACONVERT_ENDPOINT: process.env.MEDIACONVERT_ENDPOINT ?? "",
  },
  permissions: [
    storage.resources["video-raw"].grantRead(),
    storage.resources["video-output"].grantReadWrite(),
    // inline IAM for MediaConvert
    {
      actions: [
        "mediaconvert:CreateJob",
        "mediaconvert:DescribeEndpoints",
        "iam:PassRole"
      ],
      resources: ["*"]
    }
  ],
  // Wire S3 -> Lambda trigger
  s3Triggers: [
    {
      bucket: storage.resources["video-raw"],
      events: ["s3:ObjectCreated:*"],
      filter: { prefix: "uploads/", suffix: "" }
    }
  ]
});

// API routes (REST) for frontend to request presigned URL
const api = defineApi({
  name: "videoApi",
  routes: {
    "POST /generate-upload-url": {
      function: getUploadUrlFn
    }
  }
});

export default backend;

