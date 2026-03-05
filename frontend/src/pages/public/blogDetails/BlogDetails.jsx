import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { Link, useParams } from "react-router-dom";
import { getBlogPostById } from "../../../services/blogService";
import ReactMarkdown from "react-markdown";
import "./blogDetails.css";

const FALLBACK_IMAGE = "/assets/project-fallback.png";

const resolveBlogImage = (image) => {
  if (!image) return FALLBACK_IMAGE;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads/")) return image;
  if (image.startsWith("uploads/")) return `/${image}`;
  return `/uploads/${image}`;
};

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchBlog = async () => {
      try {
        const res = await getBlogPostById(id);
        if (!mounted) return;
        setBlog(res);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load this blog post");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlog();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>Blog post not found.</div>;

  return (
    <>
      <PageHeader title={blog.title} subtitle={blog.subtitle || "Read the full article below."} background="light" />
      <section className="blog-details-wrap container">
        <div className="blog-back-btn-wrap">
          <Link to="/blog" className="blog-back-btn">← Back to Blogs</Link>
        </div>
        <article className="blog-details-card">
          <div className="blog-details-image-wrap">
            <img
              src={resolveBlogImage(blog.image)}
              alt={blog.title}
              className="blog-details-image"
              loading="eager"
            />
          </div>
          <div className="blog-content markdown-render">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </article>
      </section>
    </>
  );
};

export default BlogDetails;
