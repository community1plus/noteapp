import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import "../src/CommunityPlusDashboard.css";
import CommunityPlusFetchfbPosts from "./CommunityPlusFetchfbPosts";

function CommunityPlusDashboard() {
  const [coords, setCoords] = useState({ lat: -37.8136, lng: 144.9631 }); // default Melbourne
  const [location, setLocation] = useState("Detecting location...");
  const searchBoxRef = useRef(null);

  // Try geolocation + IP fallback
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
              } else {
                setLocation("Location unavailable");
              }
            });
        }
      );
    }
  }, []);

  // Handle autocomplete place selection
  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoords({ lat, lng });
      setLocation(place.formatted_address);
    }
  };

  return (
    <div className="dashboard">
      {/* Left column: Google Map */}
      <div className="map-column">
        <LoadScript
          googleMapsApiKey="AIzaSyCPG5QI1XTpFjgcTaDoY_rN5qxR3susJrc"
          libraries={["places"]}
        >
          <div className="search-bar">
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Enter suburb or postcode"
                className="location-input"
              />
            </StandaloneSearchBox>
          </div>
          
            <GoogleMap
              center={coords}
              zoom={14}
              mapContainerClassName="map-container"
           >
              <Marker position={coords} />
          </GoogleMap>
          
        </LoadScript>

      </div>

      {/* Right column: Feed */}
      <div className="feed-column">
        <div>News</div>
        <div>{CommunityPlusFetchfbPosts}</div>
      </div>
    </div>
  );
}

export default CommunityPlusDashboard;
