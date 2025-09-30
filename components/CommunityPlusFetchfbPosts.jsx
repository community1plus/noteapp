import React, { useEffect, useState } from "react";
import "../src/CommunityPlusFetchfbPosts.css" 

export default function CommunityPlusFetchfbPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dc8bv7xdyf.execute-api.us-east-1.amazonaws.com/dev/fbposts-dev")
      .then((res) => res.json())
      .then((data) => {
        // Facebook returns { data: [...] }
        setPosts(data.data || []);
        console.log("Fetched posts:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Facebook posts...</p>;

  return (
    <div className="news-feed">
  {posts.map((post, i) => (
    <div key={i} className="news-card">
      <h3 className="news-title">Community+ Facebook News</h3>
      {post.message && <p className="news-message">{post.message}</p>}
      <p className="news-meta">
        {new Date(post.created_time).toLocaleString()} ·{" "}
        <a
          href={post.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-link"
        >
          View on Facebook
        </a>
      </p>
    </div>
  ))}
</div>
  );
}

