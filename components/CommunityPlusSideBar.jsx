import React, { useState } from "react";
import "../src/CommunityPlusSidebar.css"; // import the CSS file
import { signOut } from "aws-amplify/auth";


export default function CommunityPlusSidebar() {
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload(); // optional, refresh to reset app state
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="sidebar">
      {/* ...profile... */}
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={() => setShowModal(true)}>
          ➕ Add News
        </li>
        <li className="sidebar-item">📅 Add Event</li>
        <li className="sidebar-item">💬 Opinion</li>
        <hr className="sidebar-divider" />
        <li className="sidebar-item" onClick={handleSignOut}>
          🚪 Logout
        </li>
      </ul>

      {/* Modal for Add News */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <CommunityPlusUploadForm
              onSubmit={(formData) => {
                console.log("Form submitted:", formData);
                setShowModal(false); // close after submit
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
