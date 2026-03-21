import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../../../services/blogService";
import { resolveUploadUrl } from "../../../services/api";
import { motion } from "framer-motion";
import "./blog.css";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const FALLBACK_IMAGE = "/assets/project-fallback.png";

const resolveBlogImage = (image) => {
  return resolveUploadUrl(image) || FALLBACK_IMAGE;
};

const createPreview = (content = "") => {
  const plain = content
    .replace(/[#>*_`-]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= 160) return plain;
  return `${plain.slice(0, 157)}...`;
};

const formatBlogDate = (value) => {
  if (!value) return "Recent";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent";

  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      try {
        const res = await getBlogPosts(1);
        if (!mounted) return;
        setBlogs(res.data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Blog service is temporarily unavailable.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <PageHeader title="Blog" subtitle="Read our latest articles and insights." background="light" />
      <section className="blog-page-wrap container" role="region" aria-labelledby="blog-listing-heading">
        <h2 id="blog-listing-heading" className="sr-only">Blog post listing</h2>
        {loading && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Loading blog posts...</motion.p>}
        {!loading && error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
        <motion.div className="blog-grid" variants={gridVariants} initial="hidden" animate="visible">
          {!loading && !error && blogs.map((blog) => (
            <motion.article
              key={blog._id}
              className="blog-card"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/blog/${blog._id}`} className="blog-card-img-link" aria-label={`Read ${blog.title}`}>
                <img
                  src={resolveBlogImage(blog.image)}
                  alt={blog.title}
                  className="blog-card-img"
                  loading="lazy"
                />
              </Link>

              <div className="blog-card-body">
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-meta">
                  <span>By {blog.author?.trim() || "Tishbite Digital Team"}</span>
                  <span className="blog-meta-divider">•</span>
                  <span>{formatBlogDate(blog.createdAt)}</span>
                </p>
                <p className="blog-card-preview">{createPreview(blog.content || "")}</p>
                <Link to={`/blog/${blog._id}`} className="blog-read-btn">Read Blog</Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
        {!loading && !error && blogs.length === 0 && <p>No blog posts available yet.</p>}
      </section>
    </>
  );
};

export default Blog;
