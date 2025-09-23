import React, { useState, useEffect } from "react";
import "./CommunityPlusDashboard";
import "../src/CommunityPlusNewsContribution.css";

function CommunityPlusNewsContribution({ user, signOut }) {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        },
        (err) => {
          console.warn("Geolocation failed, falling back to IP:", err);

          // 🔹 Fallback to IP-based geolocation
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
              if (data.city && data.region) {
                setLocation(`${data.city}, ${data.region}`);
              } else {
                setLocation("Location unavailable");
              }
            })
            .catch(() => setLocation("Location unavailable"));
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // If geolocation not supported, fallback to IP
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data.city && data.region) {
            setLocation(`${data.city}, ${data.region}`);
          } else {
            setLocation("Location unavailable");
          }
        })
        .catch(() => setLocation("Location unavailable"));
    }
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <div className="logo">Community+</div>
          <div className="geo">{location}</div>
        </div>

        <div className="search-box">
          <input type="text" placeholder="AI Search..." />
        </div>

        <div className="profile">
          <div className="avatar">{user?.username?.[0]?.toUpperCase() || "U"}</div>
          <button className="logout" onClick={signOut}>
            Logout
          </button>
        </div>
      </header>
      <main className="main">
          {/* Dashboard goes here */}
          <CommunityPlusDashboard />
        </main>
    </div>
  );
}

export default CommunityPlusNewsContribution;
