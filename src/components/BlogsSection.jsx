// src/components/BlogsSection.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./BlogsSection.css";

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function BlogsSection() {
  useEffect(() => {
    // Select all elements with class "blog-card"
    const cards = document.querySelectorAll(".blog-card");
    console.log("🔹 Found .blog-card count:", cards.length);

    cards.forEach((card) => {
      // Use fromTo(...) to explicitly set initial values (0 opacity, y=40)
      // and final values (opacity=1, y=0) when the ScrollTrigger fires.
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },          // start hidden and shifted down 40px
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",            // when the top of card hits 90% down from top of viewport
            toggleActions: "play none none none",
            // markers: true,            // ← uncomment if you still want to see the debug markers
          },
        }
      );
    });

    // In case some cards are already in view on load:
    ScrollTrigger.refresh();

    // Cleanup: kill all ScrollTriggers when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="blogs" className="blogs-section">
      <div className="container">
        <h2 className="blogs-section__title">My Blog</h2>
        <div className="blogs-section__grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <Link to={`/blog/${blog.id}`} className="blog-card__link">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-card__image"
                />
                <h3 className="blog-card__title">{blog.title}</h3>
                <p className="blog-card__excerpt">{blog.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
