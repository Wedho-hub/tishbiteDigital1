import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock, FaCalendarAlt, FaUser } from "react-icons/fa";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { getBlogPosts } from "../../../services/blogService";
import { resolveUploadUrl } from "../../../services/api";
import "./blog.css";

/* ── Animation variants ──────────────────────────────── */
const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ── Constants ───────────────────────────────────────── */
const FALLBACK_IMAGE = "/assets/tishbiteHero.png";

const CATEGORY_MAP = [
  { test: /(seo|search|google|ranking|traffic|visibility)/i, label: "SEO", color: "cat-seo" },
  { test: /(social|facebook|instagram|meta|twitter)/i,       label: "Social Media", color: "cat-social" },
  { test: /(website|web design|landing page|ux|ui|develop)/i, label: "Web Design", color: "cat-web" },
  { test: /(crm|automation|workflow|whatsapp|follow.?up)/i,  label: "Automation", color: "cat-auto" },
  { test: /(ads|paid|campaign|meta ads|google ads)/i,        label: "Paid Ads", color: "cat-ads" },
  { test: /(brand|identity|logo|design)/i,                   label: "Branding", color: "cat-brand" },
];

const LOADING_PROMPTS = [
  "Loading the latest growth insights...",
  "Practical SEO and marketing guidance is on the way.",
  "Building better visibility for Cape Town businesses.",
];

/* ── Helpers ─────────────────────────────────────────── */
const resolveBlogImage = (image) => resolveUploadUrl(image) || FALLBACK_IMAGE;

const sanitizePlain = (content = "") =>
  content
    .replace(/[#>*_`]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const getExcerpt = (content, max = 155) => {
  const plain = sanitizePlain(content || "");
  return plain.length <= max ? plain : `${plain.slice(0, max).trimEnd()}…`;
};

const getReadingTime = (content) => {
  const words = sanitizePlain(content || "").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
};

const getCategory = (blog) => {
  const haystack = `${blog.title || ""} ${blog.content || ""}`;
  const match = CATEGORY_MAP.find(({ test }) => test.test(haystack));
  return match || { label: "Digital Marketing", color: "cat-default" };
};

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" });
};

/* ── Skeleton card ───────────────────────────────────── */
const BlogSkeleton = ({ count = 5 }) => (
  <div className="blog-grid" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className={`blog-card-skeleton ${i === 0 ? "blog-card-skeleton--featured" : ""}`}>
        <div className="skeleton-img" />
        <div className="skeleton-body">
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line--medium" />
          <div className="skeleton-line skeleton-line--short" />
        </div>
      </div>
    ))}
  </div>
);

/* ── Featured card (first post) ─────────────────────── */
const FeaturedCard = ({ blog }) => {
  const cat = getCategory(blog);
  return (
    <motion.article className="blog-card blog-card--featured" variants={cardVariants}>
      <Link
        to={`/blog/${blog._id}`}
        className="blog-card-img-link"
        aria-label={`Read featured article: ${blog.title}`}
        tabIndex={-1}
      >
        <span className="blog-featured-badge" aria-label="Featured article">Featured</span>
        <span className={`blog-cat-pill ${cat.color}`}>{cat.label}</span>
        <img
          src={resolveBlogImage(blog.image)}
          alt={blog.title}
          className="blog-card-img"
          width="800"
          height="450"
          decoding="async"
          fetchpriority="high"
          onError={(e) => {
            if (e.currentTarget.src !== window.location.origin + FALLBACK_IMAGE)
              e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </Link>
      <div className="blog-card-body">
        <span className={`blog-cat-pill blog-cat-pill--inline ${cat.color}`}>{cat.label}</span>
        <Link to={`/blog/${blog._id}`} className="blog-title-link">
          <h2 className="blog-card-title blog-card-title--featured">{blog.title}</h2>
        </Link>
        <p className="blog-card-excerpt">{getExcerpt(blog.content, 220)}</p>
        <div className="blog-card-meta">
          <span><FaUser aria-hidden="true" /> {blog.author?.trim() || "Tishbite Digital"}</span>
          <span><FaCalendarAlt aria-hidden="true" /> {formatDate(blog.createdAt)}</span>
          <span><FaClock aria-hidden="true" /> {getReadingTime(blog.content)}</span>
        </div>
        <Link to={`/blog/${blog._id}`} className="blog-read-btn blog-read-btn--featured">
          Read Article <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
};

/* ── Regular card ────────────────────────────────────── */
const BlogCard = ({ blog }) => {
  const cat = getCategory(blog);
  return (
    <motion.article className="blog-card" variants={cardVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/blog/${blog._id}`}
        className="blog-card-img-link"
        aria-label={`Read: ${blog.title}`}
        tabIndex={-1}
      >
        <span className={`blog-cat-pill ${cat.color}`}>{cat.label}</span>
        <img
          src={resolveBlogImage(blog.image)}
          alt={blog.title}
          className="blog-card-img"
          width="600"
          height="338"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== window.location.origin + FALLBACK_IMAGE)
              e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </Link>
      <div className="blog-card-body">
        <Link to={`/blog/${blog._id}`} className="blog-title-link">
          <h3 className="blog-card-title">{blog.title}</h3>
        </Link>
        <p className="blog-card-excerpt">{getExcerpt(blog.content)}</p>
        <div className="blog-card-meta">
          <span><FaCalendarAlt aria-hidden="true" /> {formatDate(blog.createdAt)}</span>
          <span><FaClock aria-hidden="true" /> {getReadingTime(blog.content)}</span>
        </div>
        <Link to={`/blog/${blog._id}`} className="blog-read-btn">
          Read Article <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
};

/* ── Page ────────────────────────────────────────────── */
const Blog = () => {
  const [blogs, setBlogs]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [promptIdx, setPromptIdx] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setPromptIdx((p) => (p + 1) % LOADING_PROMPTS.length), 2200);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    let active = true;
    getBlogPosts(1, { summary: true, limit: 9 })
      .then((res) => { if (active) setBlogs(res.data || []); })
      .catch((err) => { if (active) setError(err.message || "Could not load articles."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const [featured, ...rest] = blogs;

  return (
    <>
      <Helmet>
        <title>Digital Marketing &amp; SEO Blog | Cape Town Business Growth | Tishbite Digital</title>
        <meta name="description" content="Read practical articles on website design, SEO, lead generation, and digital marketing for Cape Town service businesses. Real strategies, real results." />
        <meta name="keywords" content="SEO blog, digital marketing tips, web design, lead generation, Cape Town business growth" />
        <link rel="canonical" href="https://tishbitedigital.co.za/blog" />
        <meta property="og:site_name" content="Tishbite Digital" />
        <meta property="og:title" content="Digital Marketing &amp; SEO Blog | Tishbite Digital" />
        <meta property="og:description" content="Growth-focused insights for Cape Town businesses." />
        <meta property="og:url" content="https://tishbitedigital.co.za/blog" />
        <meta property="og:image" content="https://tishbitedigital.co.za/assets/tishbiteHero.png" />
        <meta property="og:image:alt" content="Tishbite Digital Blog — SEO & Digital Marketing for Cape Town Businesses" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": "https://tishbitedigital.co.za/blog#blog",
              "url": "https://tishbitedigital.co.za/blog",
              "name": "Digital Marketing & SEO Blog | Tishbite Digital",
              "description": "Practical articles on website design, SEO, lead generation, and digital marketing for Cape Town service businesses.",
              "publisher": { "@id": "https://tishbitedigital.co.za/#organization" },
              "inLanguage": "en-ZA",
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tishbitedigital.co.za/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tishbitedigital.co.za/blog" },
              ],
            },
          ],
        })}</script>
      </Helmet>

      <PageHeader
        title="Blog"
        subtitle="Practical digital growth insights for South African businesses."
        background="light"
      />

      <section
        className="blog-page-wrap container"
        role="region"
        aria-labelledby="blog-listing-heading"
      >
        <h2 id="blog-listing-heading" className="sr-only">Blog post listing</h2>

        {loading && (
          <>
            <p className="blog-loading-prompt" aria-live="polite">
              {LOADING_PROMPTS[promptIdx]}
            </p>
            <BlogSkeleton count={5} />
          </>
        )}

        {!loading && error && (
          <motion.div
            className="blog-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{error}</p>
            <button className="blog-retry-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </motion.div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="blog-empty">No articles published yet — check back soon.</p>
        )}

        {!loading && !error && blogs.length > 0 && (
          <motion.div
            className="blog-grid"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {featured && <FeaturedCard blog={featured} />}
            {rest.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Blog;
