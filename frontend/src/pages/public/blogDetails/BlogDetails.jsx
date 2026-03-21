import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { Link, useParams } from "react-router-dom";
import { getBlogPostById } from "../../../services/blogService";
import { resolveUploadUrl } from "../../../services/api";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import "./blogDetails.css";

const FALLBACK_IMAGE = "/assets/project-fallback.png";

const resolveBlogImage = (image) => {
  return resolveUploadUrl(image) || FALLBACK_IMAGE;
};

const formatBlogDate = (value) => {
  if (!value) return "Recent";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent";

  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
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
      <section className="blog-details-wrap container" role="region" aria-labelledby="blog-details-content-heading">
        <h2 id="blog-details-content-heading" className="sr-only">Blog article content</h2>
        <motion.div
          className="blog-back-btn-wrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link to="/blog" className="blog-back-btn">← Back to Blogs</Link>
        </motion.div>
        <motion.article
          className="blog-details-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="blog-details-image-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <img
              src={resolveBlogImage(blog.image)}
              alt={blog.title}
              className="blog-details-image"
              loading="eager"
            />
          </motion.div>
          <motion.div
            className="blog-content markdown-render"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            <p className="blog-details-meta">
              <span>By {blog.author?.trim() || "Tishbite Digital Team"}</span>
              <span className="blog-details-meta-divider">•</span>
              <span>{formatBlogDate(blog.createdAt)}</span>
            </p>
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </motion.div>
        </motion.article>
      </section>
    </>
  );
};

export default BlogDetails;
