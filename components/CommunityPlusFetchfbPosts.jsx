import React, { useEffect, useState } from "react";

export default function CommunityPlusFetchfbPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dc8bv7xdyf.execute-api.us-east-1.amazonaws.com/dev/fbposts-dev")
      .then((res) => res.json())
      .then((data) => {
        // Facebook returns { data: [...] }
        setPosts(data.data || []);
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
      <h2>Community+ Facebook News</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post, i) => (
          <div key={i} className="news-card">
            {post.message && <p>{post.message}</p>}
            <small>
              {post.created_time
                ? new Date(post.created_time).toLocaleString()
                : "Unknown time"}{" "}
              ·{" "}
              {post.permalink_url && (
                <a
                  href={post.permalink_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Facebook
                </a>
              )}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

