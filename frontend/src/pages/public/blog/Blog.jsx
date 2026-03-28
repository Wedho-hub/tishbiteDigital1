import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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

const sanitizeToPlain = (content = "") => {
  const plain = content
    .replace(/[#>*_`-]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  return plain;
};

const trimText = (text, length = 180) => {
  if (text.length <= length) return text;
  return `${text.slice(0, length - 3)}...`;
};

const snippetIntentLibrary = [
  {
    matcher: /(seo|search|google|ranking|traffic|discoverability)/i,
    keywordIntent: "Cape Town SEO services for businesses that want local visibility and qualified inbound leads",
  },
  {
    matcher: /(website|web design|landing page|conversion|ux|ui)/i,
    keywordIntent: "high-converting website design for Cape Town service businesses",
  },
  {
    matcher: /(ads|meta|facebook|instagram|campaign|paid)/i,
    keywordIntent: "performance marketing and paid ads focused on lead generation in South Africa",
  },
  {
    matcher: /(crm|automation|workflow|whatsapp|follow-up)/i,
    keywordIntent: "automation and WhatsApp follow-up systems to convert leads faster",
  },
];

const buildSnippet = (blog) => {
  const plain = sanitizeToPlain(blog?.content || "");
  const topic = `${blog?.title || ""} ${plain}`;
  const keywordMatch = snippetIntentLibrary.find(({ matcher }) => matcher.test(topic));

  const problem = trimText(
    plain ||
      "Many businesses publish content but struggle to turn visibility into qualified leads and direct enquiries."
  );

  const solution = trimText(
    `This article explains a practical strategy to solve that challenge using clearer messaging, stronger conversion flow, and focused digital execution.`
  );

  const result = trimText(
    `Apply these steps to improve trust, attract better-fit prospects, and increase enquiry quality from search and social channels.`
  );

  const keywordIntent = keywordMatch?.keywordIntent ||
    "digital growth strategy for Cape Town and South African service businesses";

  const geoIntent = "Cape Town, Western Cape, and South Africa market relevance";

  return { problem, solution, result, keywordIntent, geoIntent };
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
  const [expandedSnippets, setExpandedSnippets] = useState({});

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
      <Helmet>
        <title>Digital Marketing & SEO Blog | Cape Town Business Growth Articles</title>
        <meta name="description" content="Read practical articles on website design, SEO, lead generation, and digital marketing systems for Cape Town service businesses." />
        <meta name="keywords" content="SEO blog, digital marketing tips, web design best practices, lead generation, Cape Town business" />
        <link rel="canonical" href="https://tishbitedigital.co.za/blog" />
        <meta property="og:title" content="Digital Marketing & SEO Blog" />
        <meta property="og:description" content="Growth-focused insights for Cape Town businesses" />
        <meta property="og:url" content="https://tishbitedigital.co.za/blog" />
      </Helmet>
      <PageHeader title="Blog" subtitle="Read our latest articles and insights." background="light" />
      <section className="blog-page-wrap container" role="region" aria-labelledby="blog-listing-heading">
        <h2 id="blog-listing-heading" className="sr-only">Blog post listing</h2>
        {loading && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Loading blog posts...</motion.p>}
        {!loading && error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
        <motion.div className="blog-grid" variants={gridVariants} initial="hidden" animate="visible">
          {!loading && !error && blogs.map((blog) => (
            (() => {
              const snippet = buildSnippet(blog);
              const snippetKey = blog._id || blog.title;
              const isExpanded = Boolean(expandedSnippets[snippetKey]);

              return (
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
                <div className="blog-card-snippet" aria-label="Problem solution summary">
                  <p><strong>Problem:</strong> {snippet.problem}</p>
                  <p><strong>Solution:</strong> {snippet.solution}</p>
                  <p><strong>Keyword Intent:</strong> {snippet.keywordIntent}</p>
                  {isExpanded && (
                    <>
                      <p><strong>Result Focus:</strong> {snippet.result}</p>
                      <p><strong>GEO Intent:</strong> {snippet.geoIntent}</p>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  className="blog-snippet-toggle"
                  onClick={() => setExpandedSnippets((prev) => ({
                    ...prev,
                    [snippetKey]: !prev[snippetKey],
                  }))}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Hide Details" : "Read More Summary"}
                </button>
                <Link to={`/blog/${blog._id}`} className="blog-read-btn">Read Blog</Link>
              </div>
            </motion.article>
              );
            })()
          ))}
        </motion.div>
        {!loading && !error && blogs.length === 0 && <p>No blog posts available yet.</p>}
      </section>
    </>
  );
};

export default Blog;
