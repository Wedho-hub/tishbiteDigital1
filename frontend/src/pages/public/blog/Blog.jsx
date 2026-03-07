import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../../../services/blogService";
import { resolveUploadUrl } from "../../../services/api";
import "./blog.css";

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
      <section className="blog-page-wrap container">
        {loading && <p>Loading blog posts...</p>}
        {!loading && error && <p>{error}</p>}
        <div className="blog-grid">
          {!loading && !error && blogs.map((blog) => (
            <article key={blog._id} className="blog-card">
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
                <p className="blog-card-preview">{createPreview(blog.content || "")}</p>
                <Link to={`/blog/${blog._id}`} className="blog-read-btn">Read Blog</Link>
              </div>
            </article>
          ))}
        </div>
        {!loading && !error && blogs.length === 0 && <p>No blog posts available yet.</p>}
      </section>
    </>
  );
};

export default Blog;
