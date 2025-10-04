import React, { useState, useEffect } from "react";
import CommunityPlusDashboard from "./CommunityPlusDashboard";
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
    <>
    <header className="header">
      <div className="logo-container">
        <div className="avatar">C+</div>
        <div className="search-box">
          <input type="text" placeholder="AI Search..." />
        </div>

        <div className="profile"></div>
          <div className="avatar">
            {user?.username
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase() || "U"}
          </div>
          <button className="logout" onClick={signOut}>Logout</button>
      </div>

    <nav className="nav-bar">
      <div className="geo">{location}</div>
      <div className="links">
         <a href="/">Home</a>
         <a href="/news">News</a>
         <a href="/events">Events</a>
         <a href="/discussion">Discussion</a>
         <a href="/broadcast">Broadcast</a>
         <a href="/messaging">Messaging</a>
         <a href="/about">About Us</a>
      </div>
    </nav>
    </header>
    
    <CommunityPlusDashboard />
    </>
  );
}

export default CommunityPlusNewsContribution;
