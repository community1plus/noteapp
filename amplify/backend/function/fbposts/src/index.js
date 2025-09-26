const https = require('https');

exports.handler = async (event) => {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_TOKEN;

  const url = `https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=message,created_time,permalink_url&access_token=${ACCESS_TOKEN}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://main.dmuplbxdc2r3b.amplifyapp.com",   // allow all origins (dev)
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          },
          body: data
        });
      });
    }).on('error', (err) => {
      reject({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "https://main.dmuplbxdc2r3b.amplifyapp.com",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify({ error: err.message })
      });
    });
  });
};
