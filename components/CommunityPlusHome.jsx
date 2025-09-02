import React from "react";
import "./CommunityPlusHome.css";

export default function CommunityPlusHome({ location = "St Kilda, VIC" }) {
  return (
    <div className="cph-root">
      {/* Header */}
      <header className="cph-header">
        <div className="cph-logo">COMMUNITY+</div>
        <div className="cph-location">📍 {location}</div>
      </header>

      {/* Main content */}
      <main className="cph-main">
        {/* Left Column */}
        <section className="cph-left">
          <div className="cph-top">
            <h2>Videos / Images / Ads</h2>
            {/* TODO: replace with your media grid */}
            <div className="cph-media-grid">
              <div className="cph-media-card">Media 1</div>
              <div className="cph-media-card">Media 2</div>
              <div className="cph-media-card">Media 3</div>
            </div>
          </div>

          <div className="cph-bottom">
            <h2>News &amp; Comments</h2>
            {/* TODO: plug in your feed + comments */}
            <article className="cph-news-item">
              <h3>Sample News Headline</h3>
              <p>
                Brief summary of the news item goes here. Replace with your data-bound content.
              </p>
              <div className="cph-comments">
                <strong>Comments</strong>
                <ul>
                  <li>Great update!</li>
                  <li>Looking forward to more.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Right Column */}
        <aside className="cph-right">
          <h2>Incoming News / Events Stream</h2>
          {/* TODO: hook to your live stream */}
          <ul className="cph-stream">
            <li>[08:01] New event submitted</li>
            <li>[08:05] Road closure notice</li>
            <li>[08:12] Market opening alert</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
