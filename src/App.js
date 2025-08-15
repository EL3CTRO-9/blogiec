// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BlogsSection from "./components/BlogsSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogDetail from "./components/BlogDetail";
import Footer from "./components/Footer";
import CyberGuidesSection from "./components/CyberGuidesSection";
import GuideDetail from "./components/GuideDetail";
import Secret from "./components/secret";


import "./index.css";

function App() {
  useEffect(() => {
    // ALL wheel‐preventing code has been removed.
    // If you had added a window.addEventListener("wheel", ...) here, delete those lines.
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <AboutSection />
              <BlogsSection />
              <CyberGuidesSection />
              <ProjectsSection />
            </>
          }
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blogs" element={<BlogsSection />} />
        <Route path="/guides" element={<CyberGuidesSection />} />
        <Route path="/guide/:id" element={<GuideDetail />} />
         {/* Secret route */}
        <Route path="/h4x90p-secret-doorway-29" element={<Secret />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
