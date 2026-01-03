import React, { useState, useEffect } from "react";
import CommunityPlusDashboard from "./CommunityPlusDashboard";
import "../src/CommunityPlusNewsContribution.css";
import GoogleStyleSearch from "./GoogleStyleSearch";

function CommunityPlusNewsContribution({ user, signOut }) {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        },
        () => {
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
      );
    }
  }, []);

  return (
    <>
      <header className="header">

        {/* TOP ROW */}
        <div className="header-top">

          {/* Left: Avatar + Search */}
          <div className="logo-container">
            <div className="avatar">C</div>

            {/* Search fills available space */}
            <div className="search-wrapper">
              <GoogleStyleSearch />
            </div>
          </div>

          {/* Right: Geo location */}
          <div className="geo">{location}</div>
        </div>

        {/* BOTTOM ROW: Navigation */}
        <nav className="links">
          <a href="/">Home</a>
          <a href="/posts">Posts</a>
          <a href="/events">Events</a>
          <a href="/incidents">Incidents</a>
          <a href="/search">Search</a>
          <a href="/community">Community+</a>
          <a href="/about">About</a>
        </nav>

      </header>

      <CommunityPlusDashboard />
    </>
  );
}

export default CommunityPlusNewsContribution;
