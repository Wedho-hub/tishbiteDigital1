/**
 * Migration: Add displayTitle field to all services
 * 
 * Usage: node backend/migrations/addDisplayTitles.js
 * 
 * This script populates the displayTitle field for all services based on the title mapping.
 * displayTitle is used for frontend display, while title remains the database key.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/service.js";

dotenv.config();

// Mapping of normalized titles to display names
const displayTitleMap = {
  "company registration & compliance setup": "Business Registration & Compliance Setup",
  "brand identity & business design": "Brand Identity & Market Positioning Design",
  "professional website development": "Lead-Generating Website Development",
  "google business profile & local seo optimization": "Google Business Profile & Local SEO Growth",
  "meta business suite & social platform integration": "Meta Suite Setup & Social Integration",
  "social media growth strategy & management": "Social Media Growth Strategy & Execution",
  "lead generation & paid advertising campaigns": "Paid Ads & Lead Generation Campaigns",
  "crm, automation & conversion optimization": "CRM, Automation & Conversion Systems",
  "business launch suite": "Business Launch Suite",
  "digital foundation suite": "Digital Foundation Suite",
  "growth acceleration suite": "Growth Acceleration Suite",
  "revenue automation suite": "Revenue Automation Suite",
  "tishbite enterprise growth system": "Tishbite Enterprise Growth System",
};

// Normalize function (same as frontend)
function normalizeTitle(title = "") {
  return title
    .toLowerCase()
    .replace(/™/g, "")
    .replace(/^the\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function migrate() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("Missing Mongo URI. Set MONGODB_URI or MONGO_URI in backend/.env");
    }

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    console.log("\n📊 Fetching all services...");
    const services = await Service.find({});
    console.log(`✓ Found ${services.length} services`);

    let updated = 0;
    let skipped = 0;

    for (const service of services) {
      const normalized = normalizeTitle(service.title);
      const display = displayTitleMap[normalized];

      if (display) {
        // Only update if displayTitle is not already set
        if (!service.displayTitle || service.displayTitle === null) {
          service.displayTitle = display;
          await service.save();
          console.log(`✓ [${service.title}] → displayTitle: "${display}"`);
          updated++;
        } else {
          console.log(`⊘ [${service.title}] → already has displayTitle: "${service.displayTitle}"`);
          skipped++;
        }
      } else {
        console.log(`⚠ [${service.title}] → No mapping found (keeping displayTitle as null)`);
        skipped++;
      }
    }

    console.log("\n✅ Migration Complete!");
    console.log(`   Updated: ${updated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total:   ${services.length}`);

    await mongoose.connection.close();
    console.log("\n🔌 MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

migrate();
