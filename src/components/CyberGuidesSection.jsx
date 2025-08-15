import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { guides } from "../data/guides";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CyberGuidesSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function CyberGuidesSection() {
  useEffect(() => {
    const cards = document.querySelectorAll(".guide-card");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="guides" className="guides-section">
      <div className="container">
        <h2 className="guides-section__title">Cybersecurity CheatSheets</h2>
        <div className="guides-section__grid">
          {guides.map((guide) => (
            <div key={guide.id} className="guide-card">
              <Link to={`/guide/${guide.id}`} className="guide-card__link">
                {guide.image && (
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="guide-card__image"
                  />
                )}
                <h3 className="guide-card__title">{guide.title}</h3>
                <p className="guide-card__excerpt">{guide.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
