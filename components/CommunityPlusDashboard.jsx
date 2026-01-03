import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../src/CommunityPlusDashboard.css";
import CommunityPlusFetchfbPosts from "./CommunityPlusFetchfbPosts";
import CommunityPlusSideBar from "./CommunityPlusSideBar";
import CommunityPlusHeader from "./CommunityPlusHeader"; // your nav header

function CommunityPlusDashboard() {
  const [coords, setCoords] = useState({ lat: -37.8136, lng: 144.9631 });
  const [location, setLocation] = useState("Detecting location...");
  
  // NEW: state to control main content
  const [activeContent, setActiveContent] = useState("posts"); // default

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        },
        () => {
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
              if (data.latitude && data.longitude) {
                setCoords({ lat: data.latitude, lng: data.longitude });
                setLocation(`${data.city}, ${data.region}`);
              } else setLocation("Location unavailable");
            });
        }
      );
    }
  }, []);

  return (
    <main className="main">
      {/* Header nav */}
      <CommunityPlusHeader setActiveContent={setActiveContent} />

      {/* Sidebar */}
      <CommunityPlusSideBar setActiveContent={setActiveContent} />

      {/* Main content */}
      <div className="feed-column">
        {activeContent === "posts" && <CommunityPlusFetchfbPosts />}
        {activeContent === "map" && (
          <LoadScript googleMapsApiKey="YOUR_KEY" libraries={["places"]}>
            <GoogleMap
              center={coords}
              zoom={14}
              mapContainerClassName="map-container"
            >
              <Marker position={coords} />
            </GoogleMap>
          </LoadScript>
        )}
        {activeContent === "other" && <div>Other content here</div>}
      </div>
    </main>
  );
}

export default CommunityPlusDashboard;
