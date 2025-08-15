// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import bg99 from "../assets/bg99.jpg"; // or .png if that's the correct format


export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo / Site Title */}
      <Link to="/" className="navbar__logo">
        <img src={bg99} alt="Logo" className="navbar__logo-image" />

      </Link>


      {/* Navigation links */}
      <ul className="navbar__links">
        <li>
          <a href="/" className="navbar__link">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="navbar__link">
            About
          </a>
        </li>
        <li>
          <a href="#blogs" className="navbar__link">
            Blogs
          </a>
        </li>
        <li>
          <a href="#guides" className="navbar__link">
            Guides
          </a>
        </li>
        <li>
          <a href="#projects" className="navbar__link">
            Projects
          </a>
        </li>
        <li>
          <a href="#footer" className="navbar__link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
