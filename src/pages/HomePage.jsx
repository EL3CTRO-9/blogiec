// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import CyberGuides from "../components/CyberGuides"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CyberGuides />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
