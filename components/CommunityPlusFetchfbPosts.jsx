import React, { useState, useEffect } from "react";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dc8bv7xdyf.execute-api.us-east-1.amazonaws.com/dev/fbposts-dev")
      .then(res => res.json())
      .then(data => {
        console.log(data); // check API response
        setPosts(data.data || []); // save posts into state
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div>
      <h2>Facebook Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post, idx) => (
          <div key={idx}>
            <p>{post.message}</p>
            <small>{new Date(post.created_time).toLocaleString()}</small>
            <br />
            <a href={post.permalink_url} target="_blank" rel="noreferrer">
              View on Facebook
            </a>
          </div>
        ))
      )}
    </div>
  );
}
