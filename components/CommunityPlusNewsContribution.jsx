import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CommunityPlusDashboard from "./CommunityPlusDashboard";
import GoogleStyleSearch from "./GoogleStyleSearch";

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

            <div className="search-wrapper">
              <GoogleStyleSearch />
            </div>
          </div>

          {/* Right: Geo location */}
          <div className="geo">{location}</div>
        </div>

        {/* BOTTOM ROW: Navigation */}
        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/events">Events</Link>
          <Link to="/incidents">Incidents</Link>
          <Link to="/search">Search</Link>
          <Link to="/community">Community+</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <CommunityPlusDashboard />
    </>
  );
}

export default CommunityPlusNewsContribution;
