// src/components/GiacCarousel.jsx
import React from "react";
import "./GiacCarousel.css";

// Import each certification image from src/assets/
import gsecPng from "../assets/gsec.png";
import gcihPng from "../assets/gcih.png";
import gciaPng from "../assets/gcia.png";
import gmlePng from "../assets/gmle.png";
import gcldPng from "../assets/gcld.png";
import gpycPng from "../assets/gpyc.png";
import gcsaPng from "../assets/gcsa.png";

const certifications = [
  {
    name: "GSEC",
    file: gsecPng,
    link: "https://www.credly.com/badges/7bc21f2b-29b3-4c92-a3c3-7ebe740169cf/public_url",
  },
  {
    name: "GCIH",
    file: gcihPng,
    link: "https://www.credly.com/badges/154ce60b-b07e-481a-bb90-eb8903d9254a/public_url",
  },
  {
    name: "GCIA",
    file: gciaPng,
    link: "https://www.credly.com/badges/fc83e520-e755-4120-9566-9ba3971ca3b6/public_url",
  },
  {
    name: "GMLE",
    file: gmlePng,
    link: "https://www.credly.com/badges/6f400756-23ac-4c4d-9b6e-32ac942e7903/public_url",
  },
  {
    name: "GCLD",
    file: gcldPng,
    link: "https://www.credly.com/badges/c49f4bbe-8387-4b0b-b3b3-aa25c5ca91f6/public_url",
  },
  {
    name: "GPYC",
    file: gpycPng,
    link: "https://www.credly.com/badges/cd38a0b8-7ce5-4692-aadd-82140a6608f1/public_url",
  },
  {
    name: "GCSA",
    file: gcsaPng,
    link: "https://www.credly.com/badges/17977ed3-a732-4969-98c5-00d79bfa70ad/public_url",
  },
];

export default function GiacCarousel() {
  return (
    <div className="giac-carousel-container">
      {/* Left fade overlay */}
      <div className="giac-carousel-overlay left-overlay" />

      {/* Right fade overlay */}
      <div className="giac-carousel-overlay right-overlay" />

      {/* Scrolling row */}
      <div className="giac-carousel-track">
        {[...certifications, ...certifications, ...certifications].map((cert, idx) => (
          <a
            key={idx}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="giac-carousel-item"
          >
            <img
              src={cert.file}
              alt={cert.name}
              className="giac-carousel-img"
              loading="lazy"
            />
            <span className="giac-carousel-label">{cert.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
