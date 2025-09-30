import React, { useState } from "react";

export default function CommunityPlusUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="upload-container">
      {!file ? (
        <div
          className="upload-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="upload-icon">⬆️</div>
          <p>Drag and drop video/image files to upload</p>
          <input
            type="file"
            accept="video/*,image/*"
            id="fileInput"
            onChange={handleFileChange}
            hidden
          />
          <label htmlFor="fileInput" className="upload-button">
            Select files
          </label>
        </div>
      ) : (
        <div className="preview-box">
          {file.type.startsWith("video/") ? (
            <video src={preview} controls />
          ) : (
            <img src={preview} alt="preview" />
          )}
          <p>{file.name}</p>
        </div>
      )}
    </div>
  );
}
