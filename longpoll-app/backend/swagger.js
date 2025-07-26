module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Long Poll Message API",
    version: "1.0.0",
  },
  paths: {
    "/api/messages": {
      get: {
        summary: "Get all messages",
        responses: {
          200: {
            description: "Messages array",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Post a new message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
                required: ["message"],
              },
            },
          },
        },
        responses: {
          201: { description: "Message added" },
        },
      },
    },
    "/api/messages/longpoll": {
      get: {
        summary: "Long poll for messages",
        responses: {
          200: {
            description: "Updated message list",
          },
        },
      },
    },
  },
};
