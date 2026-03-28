import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Article | Tishbite Digital</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <p>Loading article...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Article Error | Tishbite Digital</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <PageHeader
          title="Error Loading Article"
          subtitle="We encountered an issue."
          background="light"
        />
        <div className="container" style={{ padding: "2rem 1rem", textAlign: "center" }}>
          <p>{error}</p>
          <Link to="/blog" style={{ color: "#1b4332", fontWeight: "700" }}>
            ← Back to Blog
          </Link>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Tishbite Digital</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <PageHeader
          title="Article Not Found"
          subtitle="This post doesn't exist."
          background="light"
        />
        <div className="container" style={{ padding: "2rem 1rem", textAlign: "center" }}>
          <Link to="/blog" style={{ color: "#1b4332", fontWeight: "700" }}>
            ← Back to Blog
          </Link>
        </div>
      </>
    );
  }

  // Generate BlogPosting schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title || "Article",
    "description": blog.metaDescription || (blog.content && blog.content.substring(0, 160)) || "Read this article",
    "image": resolveBlogImage(blog.image),
    "datePublished": blog.createdAt || new Date().toISOString(),
    "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Tishbite Digital",
      "url": "https://tishbitedigital.co.za"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tishbite Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tishbitedigital.co.za/logo.png",
        "width": 250,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tishbitedigital.co.za/blog/${blog._id}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle || blog.title || "Article"} | Tishbite Digital</title>
        <meta name="description" content={blog.metaDescription || (blog.content && blog.content.substring(0, 160)) || "Read this article"} />
        <meta name="keywords" content={blog.keywords || "digital marketing, Cape Town, business growth"} />
        <link rel="canonical" href={`https://tishbitedigital.co.za/blog/${blog._id}`} />
        <meta property="og:title" content={blog.title || "Article"} />
        <meta property="og:description" content={blog.metaDescription || (blog.content && blog.content.substring(0, 160))} />
        <meta property="og:image" content={resolveBlogImage(blog.image)} />
        <meta property="og:url" content={`https://tishbitedigital.co.za/blog/${blog._id}`} />
        <meta property="og:type" content="article" />
        <meta name="author" content="Tishbite Digital" />
        <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
      </Helmet>
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
