import React, { useState, useEffect } from "react";
import "../src/CommunityPlusNewsContribution.css";

function CommunityPlusNewsContribution({ user, signOut }) {
  const [blurb, setBlurb] = useState("");
  const [media, setMedia] = useState([]); 
  const [submittedPosts, setSubmittedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Fetching location...");

  // Get geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        },
        (err) => {
          console.error(err);
          setLocation("Location unavailable");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
  };

  const handleSubmit = async () => {
    if (!blurb.trim() && media.length === 0) {
      alert("Please add a news blurb or media before submitting.");
      return;
    }

    setLoading(true);

    // Fake API call simulation
    setTimeout(() => {
      const newPost = {
        id: Math.floor(Math.random() * 1000000),
        blurb,
        media,
        timestamp: new Date().toISOString(),
        user: user?.username || "Anonymous",
      };
      setSubmittedPosts([newPost, ...submittedPosts]);
      setBlurb("");
      setMedia([]);
      setLoading(false);
      alert("✅ News submitted successfully!");
    }, 1000);
  };

  return (
    <div className="news-page">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo">Community+</div>
          <div className="geo">{location}</div>
        </div>

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
          {/* Media upload */}
          <div className="media-upload">
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
            />
          </div>

          {/* News blurb */}
          <div className="blurb-box">
            <textarea
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              placeholder="Write your news blurb..."
            />
            <button className="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit News"}
            </button>
          </div>

          {/* Submissions */}
          {submittedPosts.length > 0 && (
            <div className="submissions">
              <h2>Your Submissions</h2>
              {submittedPosts.map((post) => (
                <div className="submission" key={post.id}>
                  <p><strong>{post.user}</strong>: {post.blurb}</p>
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
