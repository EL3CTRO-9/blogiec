// src/components/ProjectsSection.jsx
import React from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectsSection.css";

const ProjectsSection = () => {
  // Example data; swap with your own projects
  const projects = [
    {
      title: "Cybersecurity Blog",
      description: "A React-based blog to share threat research and honeypot findings.",
      link: "https://github.com/yourusername/blog-repo",
    },
    {
      title: "Raspberry Pi Honeypot",
      description: "Configured a Cowrie honeypot + ELK stack to monitor SSH attacks in real-time.",
      link: "https://github.com/yourusername/pihoneypot",
    },
    {
      title: "Network Scanner Toolkit",
      description: "A Python script that automates nmap scans and flags suspicious hosts.",
      link: "https://github.com/yourusername/net-scan-toolkit",
    },
    // ...add as many as you like
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects__header">
        <h2>Projects</h2>
        
      </div>
      <div className="projects__grid">
        {projects.map((proj, idx) => (
          <ProjectCard
            key={idx}
            title={proj.title}
            description={proj.description}
            link={proj.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
