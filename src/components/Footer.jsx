// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
// Import the icons
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__container">
        <p>© {new Date().getFullYear()} Sahil Shaikh. All rights reserved.</p>
        <ul className="footer__social">
          <li>
          <a
              href="https://github.com/EL3CTRO-9"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__contact-icon hero__contact-icon--github"
              title="GitHub"
            >
              <FaGithub size={20} />
            </a>
          </li>
          <li>
          <a
              href="https://www.linkedin.com/in/sahil-shaikh-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__contact-icon hero__contact-icon--linkedin"
              title="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </li>
          <li>
          <a
              href="mailto:sahilnrs9@gmail.com"
              className="hero__contact-icon hero__contact-icon--mail"
              title="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </li>
          {/* Add any other social */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
