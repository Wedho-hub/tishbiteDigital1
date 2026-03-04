/**
 * SEO Routes
 * Serves sitemap.xml and robots.txt for search engines.
 */
import express from "express";
import BlogPost from "../models/blogpost.js";

const router = express.Router();

// Sitemap.xml endpoint
router.get("/sitemap.xml", async (req, res) => {
  const posts = await BlogPost.find({}, "_id");
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  let urls = posts.map(post => `<url><loc>${baseUrl}/blog/${post._id}</loc></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  res.header("Content-Type", "application/xml").send(xml);
});

// robots.txt endpoint
router.get("/robots.txt", (req, res) => {
  res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: /sitemap.xml");
});

export default router;
