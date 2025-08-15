import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { guides } from "../data/guides";
import "./GuideDetail.css";

export default function GuideDetail() {
  const { id } = useParams(); // pulls the dynamic :id from URL
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  return (
    <section className="guide-detail">
      <div className="container">
        <h1 className="guide-detail__title">{guide.title}</h1>
        {guide.image && (
          <img
            src={guide.image}
            alt={guide.title}
            className="guide-detail__image"
          />
        )}
        <div
          className="guide-detail__content"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </div>
    </section>
  );
}
