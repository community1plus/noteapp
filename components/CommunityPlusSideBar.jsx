import React, { useState } from "react";
import "../src/CommunityPlusSidebar.css";
import { signOut } from "aws-amplify/auth";
import CommunityPlusUploadForm from "./CommunityPlusUploadForm";

export default function CommunityPlusSidebar() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadCategory, setUploadCategory] = useState("news"); // track which type

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const openModal = (category) => {
    setUploadCategory(category);
    setActiveTab("upload");
    setShowModal(true);
  };

  return (
    <div className="sidebar">
      {/* Sidebar menu */}
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={() => openModal("news")}>
          ➕ Add News
        </li>
        <li className="sidebar-item" onClick={() => openModal("event")}>
          📅 Add Event
        </li>
        <li className="sidebar-item" onClick={() => openModal("opinion")}>
          💬 Opinion
        </li>
        <hr className="sidebar-divider" />
        <li className="sidebar-item" onClick={handleSignOut}>
          🚪 Logout
        </li>
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✖
            </button>

            {/* Tabs */}
            <div className="modal-tabs">
              <span
                className={`tab ${activeTab === "upload" ? "active" : ""}`}
                onClick={() => setActiveTab("upload")}
              >
                UPLOAD
              </span>
              <span
                className={`tab ${activeTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                PREVIEW
              </span>
              <span
                className={`tab ${activeTab === "submit" ? "active" : ""}`}
                onClick={() => setActiveTab("submit")}
              >
                SUBMIT
              </span>
            </div>

            {/* Tab content */}
            <div className="modal-body">
              {activeTab === "upload" && (
                <CommunityPlusUploadForm
                  category={uploadCategory}   // pass category into the form
                  onSubmit={(formData) => {
                    console.log("Uploaded:", formData);

                    if (formData.files) {
                      setUploadedFiles(Array.from(formData.files));
                    }
                    setActiveTab("preview");
                  }}
                />
              )}

              {activeTab === "preview" && (
                <div className="preview-container">
                  <h3>Preview ({uploadCategory})</h3>
                  {uploadedFiles.length === 0 ? (
                    <p>No files uploaded yet.</p>
                  ) : (
                    <div className="preview-grid">
                      {uploadedFiles.map((file, idx) => {
                        const url = URL.createObjectURL(file);
                        return file.type.startsWith("image/") ? (
                          <img
                            key={idx}
                            src={url}
                            alt={file.name}
                            className="preview-thumb"
                          />
                        ) : file.type.startsWith("video/") ? (
                          <video
                            key={idx}
                            src={url}
                            controls
                            className="preview-thumb"
                          />
                        ) : (
                          <p key={idx}>{file.name}</p>
                        );
                      })}
                    </div>
                  )}
                  <button onClick={() => setActiveTab("submit")}>
                    Continue to Submit →
                  </button>
                </div>
              )}

              {activeTab === "submit" && (
                <div>
                  <h3>Submit ({uploadCategory})</h3>
                  <p>Final review and confirmation step.</p>
                  <button
                    className="submit-btn"
                    onClick={() => {
                      console.log("Submitted successfully!");
                      setShowModal(false);
                      setUploadedFiles([]);
                    }}
                  >
                    ✅ Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
