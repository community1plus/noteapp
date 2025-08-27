import { defineData } from "@aws-amplify/backend-data";

// Export a default empty data configuration to satisfy Amplify
export const data = defineData({
  schema: `
    type Note @model {
      id: ID!
      content: String!
      createdAt: AWSDateTime
    }
  `,
});
