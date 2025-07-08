// src/components/HeroSection.jsx
import React from "react";
import "./HeroSection.css";
import heroBg from "../assets/hero-bg.jpg";

// Import the icons
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* semi-transparent overlay */}
      <div className="hero__overlay" />

      {/* All content inside a 900px-wide centered container */}
      <div className="container hero__inner">
        {/* LEFT COLUMN: your name, role, contact */}
        <div className="hero__left">
          <h1 className="hero__name">Sahil Shaikh</h1>
          <p className="hero__role">CyberSecurity Analyst</p>

          <div className="hero__contacts">
            {/* Email Icon */}
            <a
              href="mailto:sahilnrs9@gmail.com"
              className="hero__contact-icon hero__contact-icon--mail"
              title="Email"
            >
              <FaEnvelope size={20} />
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/EL3CTRO-9"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__contact-icon hero__contact-icon--github"
              title="GitHub"
            >
              <FaGithub size={20} />
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/sahil-shaikh-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__contact-icon hero__contact-icon--linkedin"
              title="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: short About-Me paragraph */}
        <div className="hero__right">
          <p>
          Hey there! I'm Sahil Shaikh, a cybersecurity enthusiast passionate about cloud computing, ethical hacking, and data science. I hold multiple GIAC certifications, including GCIA, showcasing my skills in intrusion analysis, cloud security, and advanced cyber defense. Through this blog, I share insights, research, and practical tips to help others navigate the cybersecurity world. Whether you're starting out or just curious about how things work, you'll find something useful here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
