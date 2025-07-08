// src/components/ProjectCard.jsx
import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title, description, link }) => {
  return (
    <div className="project-card">
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__desc">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="project-card__link">
        View Project
      </a>
    </div>
  );
};

export default ProjectCard;
