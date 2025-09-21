import React, { useState } from "react";
import "./CommunityPlusNewsContribution.css";

function CommunityPlusNewsContribution({ user, signOut }) {
  const [blurb, setBlurb] = useState("");
  const [media, setMedia] = useState([]); // images + videos
  const [submittedPosts, setSubmittedPosts] = useState([]);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
  };

  const handleSubmit = () => {
    if (!blurb.trim() && media.length === 0) {
      alert("Please add a news blurb or media before submitting.");
      return;
    }

    const newPost = { blurb, media, timestamp: new Date().toISOString() };
    setSubmittedPosts([newPost, ...submittedPosts]);

    setBlurb("");
    setMedia([]);

    alert("✅ News submitted successfully!");
  };

  return (
    <div className="news-page">
      {/* Header */}
      <header className="header">
        <div className="logo">Community+</div>

        <div className="search-box">
          <input type="text" placeholder="AI Search..." />
        </div>

        <div className="profile">
          <div className="avatar">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <button className="logout" onClick={signOut}>
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Left column */}
        <div className="left-column">
          <div className="media-upload">
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
            />

            {media.length > 0 && (
              <div className="media-preview">
                {media.map((file, idx) =>
                  file.type.startsWith("image/") ? (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                    />
                  ) : (
                    <video
                      key={idx}
                      controls
                      src={URL.createObjectURL(file)}
                    />
                  )
                )}
              </div>
            )}
          </div>

          <div className="blurb-box">
            <textarea
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              placeholder="Write your news blurb..."
            />
            <button className="submit" onClick={handleSubmit}>
              Submit News
            </button>
          </div>

          {submittedPosts.length > 0 && (
            <div className="submissions">
              <h2>Your Submissions</h2>
              {submittedPosts.map((post, idx) => (
                <div className="submission" key={idx}>
                  <p>{post.blurb}</p>
                  {post.media.length > 0 && (
                    <div className="media-preview">
                      {post.media.map((file, mediaIdx) =>
                        file.type.startsWith("image/") ? (
                          <img
                            key={mediaIdx}
                            src={URL.createObjectURL(file)}
                            alt="submitted"
                          />
                        ) : (
                          <video
                            key={mediaIdx}
                            controls
                            src={URL.createObjectURL(file)}
                          />
                        )
                      )}
                    </div>
                  )}
                  <small>
                    Submitted {new Date(post.timestamp).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="right-column">
          <div className="reserved">[Reserved Column]</div>
        </div>
      </main>
    </div>
  );
}

export default CommunityPlusNewsContribution;
