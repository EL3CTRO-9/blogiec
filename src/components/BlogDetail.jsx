// src/components/BlogDetail.jsx
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { blogs } from "../data/blogs";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams(); // grabs the “id” from the route (/blog/:id)
  const blog = blogs.find((b) => b.id === id);

  // If no blog matches the ID, redirect back to blog list
  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <section className="blog-detail">
      <div className="container">
        <h1 className="blog-detail__title">{blog.title}</h1>
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-detail__image"
        />
        {/* We stored content as an HTML string—render it with dangerouslySetInnerHTML */}
        <div
          className="blog-detail__content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </section>
  );
}
