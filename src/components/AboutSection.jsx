// src/components/AboutSection.jsx
import React from "react";
import GiacCarousel from "./GiacCarousel";
import "./AboutSection.css";

// ↓ Import the profile picture so Webpack bundles it
import profilePic from "../assets/profile.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="about">
      {/* ===== GIAC CERTIFICATIONS CAROUSEL ===== */}
      <GiacCarousel />

      {/* ===== PROFILE IMAGE & BIO ===== */}
      <div className="about__main">
        <div className="about__image">
         <img src={profilePic} alt="Sahil Shaikh" />
        </div>
        <div className="about__text">
          <h2>About Me </h2>
          <p>
            GIAC-certified cybersecurity professional with a strong passion for protecting digital assets and combating cyber threats. Skilled in threat intelligence, vulnerability assessment, cloud and container security, and compliance.
          </p>
          <p>
            Proficient with tools like Nmap, Wireshark, Metasploit, and tcpdump. I thrive in fast-paced environments, breaking down complex security issues into actionable solutions. Known for clear communication, teamwork, and mentoring. I’m driven by curiosity, research, and a commitment to staying ahead in cybersecurity.
          </p>
        </div>
      </div>
    </section>
  );
}
