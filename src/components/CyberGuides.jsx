import React from "react";
import guides from "../data/guides";
import "./CyberGuides.css";

export default function CyberGuides() {
  return (
    <section className="cyber-guides" id="guides">
      <h2>Cybersecurity Guides & 101s</h2>
      <div className="guide-list">
        {guides.map((guide, index) => (
          <a href={guide.link} key={index} className="guide-card">
            <h3>{guide.title}</h3>
            <p>{guide.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
