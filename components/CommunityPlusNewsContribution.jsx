import React, { useState } from "react";
import "../src/CommunityPlusNewsContribution.css";

function CommunityPlusNewsContribution({ user, signOut }) {
  const [blurb, setBlurb] = useState("");
  const [images, setImages] = useState([]);
  const [submittedPosts, setSubmittedPosts] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = () => {
    if (!blurb.trim() && images.length === 0) {
      alert("Please add a news blurb or image before submitting.");
      return;
    }

    const newPost = { blurb, images, timestamp: new Date().toISOString() };
    setSubmittedPosts([newPost, ...submittedPosts]);

    setBlurb("");
    setImages([]);

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
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />

            {images.length > 0 && (
              <div className="image-preview">
                {images.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                  />
                ))}
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
                  {post.images.length > 0 && (
                    <div className="image-preview">
                      {post.images.map((file, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={URL.createObjectURL(file)}
                          alt="submitted"
                        />
                      ))}
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
