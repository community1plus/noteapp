const https = require("https");

exports.handler = async (event) => {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_TOKEN;

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://main.dmuplbxdc2r3b.amplifyapp.com",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  const url = `https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=message,created_time,permalink_url&access_token=${ACCESS_TOKEN}`;

  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://main.dmuplbxdc2r3b.amplifyapp.com",
              "Access-Control-Allow-Methods": "GET,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify(JSON.parse(data)), // ensure JSON string
          });
        });
      })
      .on("error", (err) => {
        resolve({
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "https://main.dmuplbxdc2r3b.amplifyapp.com",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({ error: err.message }),
        });
      });
  });
};
