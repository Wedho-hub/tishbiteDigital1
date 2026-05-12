import express from "express";
import BlogPost from "../models/blogPost.js";

const router = express.Router();

const BASE_URL = "https://tishbitedigital.co.za";

const STATIC_URLS = [
  { loc: `${BASE_URL}/`,            changefreq: "weekly",  priority: "1.0" },
  { loc: `${BASE_URL}/services`,    changefreq: "weekly",  priority: "0.9" },
  { loc: `${BASE_URL}/blog`,        changefreq: "weekly",  priority: "0.9" },
  { loc: `${BASE_URL}/contact`,     changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/about`,       changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/projects`,    changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/how-we-work`, changefreq: "monthly", priority: "0.8" },
];

const urlEntry = ({ loc, changefreq, priority, lastmod }) =>
  `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

router.get("/sitemap.xml", async (req, res) => {
  let blogEntries = [];

  try {
    const posts = await BlogPost.find({}, "_id updatedAt createdAt").lean();
    blogEntries = posts.map((post) => ({
      loc: `${BASE_URL}/blog/${post._id}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: (post.updatedAt || post.createdAt)
        ? new Date(post.updatedAt || post.createdAt).toISOString().split("T")[0]
        : undefined,
    }));
  } catch {
    // DB unavailable — serve static pages only
  }

  const allEntries = [...STATIC_URLS, ...blogEntries].map(urlEntry).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allEntries}</urlset>`;

  res
    .header("Content-Type", "application/xml")
    .header("Cache-Control", "public, max-age=3600, s-maxage=3600")
    .send(xml);
});

router.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${BASE_URL}/sitemap.xml`
  );
});

export default router;
