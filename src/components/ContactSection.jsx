// src/components/ContactSection.jsx
import React from "react";
import "./ContactSection.css";

const ContactSection = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <h2>Contact Me</h2>
        <p>If you'd like to work together or just say hello, feel free to reach out:</p>
        <ul className="contact__links">
          <li>
            <a href="mailto:sahilnrs9@gmail.com">youremail@example.com</a>
          </li>
          <li>
            <a href="https://github.com/EL3CTRO-9" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="www.linkedin.com/in/sahil-shaikh-cs" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          {/* Add Twitter, Instagram, or any other as desired */}
        </ul>
      </div>
    </section>
  );
};

export default ContactSection;
