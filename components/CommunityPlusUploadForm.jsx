import React, { useState } from "react";
import "../src/CommunityPlusUploadForm.css";

export default function CommunityPlusUploadForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("news");
  const [media, setMedia] = useState(null);

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just send form data back up
    const formData = {
      title,
      summary,
      category,
      media, // File object, you’ll handle upload via S3 presigned URL
    };

    onSubmit?.(formData);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add News / Event</h2>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Summary
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          placeholder="Write your news or event details..."
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="news">📰 News</option>
          <option value="event">📅 Event</option>
          <option value="opinion">💬 Opinion</option>
        </select>
      </label>

      <label>
        Media (Image or Video)
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
