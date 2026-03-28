# 🚀 Deployment & Migration Checklist

**Date:** March 28, 2026  
**Status:** Ready for Deployment  

---

## **PHASE 1: Frontend Deployment** (Production)

### Step 1: Commit Frontend Changes
```bash
cd frontend
git add .
git commit -m "feat: sync pricing table names and add displayTitle support

- Update pricingPolicyRows to use clean display names (remove ™)
- Update getDisplayTitle to prioritize DB displayTitle field
- Add meta tags to 7 pages (Services, Blog, Projects, Contact, About, HowWeWork)
- Add dynamic BlogPosting schema to blog detail pages
- Enhance LocalBusiness schema with address and hours
"
git push origin main
```

### Step 2: Deploy to Render (if using Render)
- Go to https://dashboard.render.com
- Select `tishbiteDigital1-frontend` service
- Click "Manual Deploy"
- Wait for deployment (typically 2-3 min)
- Verify: Visit https://tishbitedigital.co.za

### Step 3: Verify Frontend Deployment
```bash
# Check that pages load with new meta tags
curl -s https://tishbitedigital.co.za/services | grep -o "<title>.*</title>"
# Expected: <title>Website Design, SEO & Digital Marketing Services | Cape Town | Tishbite Digital</title>
```

---

## **PHASE 2: Backend Deployment** (Database Schema)

### Step 1: Commit Backend Changes
```bash
cd backend
git add .
git commit -m "feat: add displayTitle field to service schema

- Add optional displayTitle field to serviceSchema
- Create migration script to populate displayTitle for existing services
- displayTitle has priority in frontend display logic
"
git push origin main
```

### Step 2: Deploy Backend to Render (if using Render)
- Go to https://dashboard.render.com
- Select `tishbiteDigital1-backend` service
- Click "Manual Deploy"
- Wait for deployment (typically 3-5 min)

### Step 3: Verify Backend Deployment
```bash
# Check that API is running
curl -s https://api.tishbitedigital.co.za/health
# Expected: {"status":"ok"} or similar response
```

---

## **PHASE 3: Run Migration Script** ⚠️ IMPORTANT

### Prerequisites Check
- [ ] Backend deployed successfully
- [ ] MongoDB access verified
- [ ] `.env` file has MONGODB_URI set

### Step 1: SSH Into Backend (if on Render)
```bash
# If using Render with SSH
ssh -i ~/.ssh/render_key render@your-backend-instance
cd /app/backend
```

**OR: Run Locally (if you have MongoDB access)**
```bash
cd backend
node migrations/addDisplayTitles.js
```

### Step 2: Execute Migration
```bash
node migrations/addDisplayTitles.js
```

### Step 3: Expected Output
```
🔗 Connecting to MongoDB...
✓ Connected to MongoDB

📊 Fetching all services...
✓ Found 13 services

✓ [Company Registration & Compliance Setup™] → displayTitle: "Business Registration & Compliance Setup"
✓ [Professional Website Development] → displayTitle: "Lead-Generating Website Development"
✓ [Brand Identity & Business Design™] → displayTitle: "Brand Identity & Market Positioning Design"
✓ [Google Business Profile & Local SEO Optimization™] → displayTitle: "Google Business Profile & Local SEO Growth"
✓ [Meta Business Suite & Social Platform Integration] → displayTitle: "Meta Suite Setup & Social Integration"
✓ [Social Media Growth Strategy & Management] → displayTitle: "Social Media Growth Strategy & Execution"
✓ [Lead Generation & Paid Advertising Campaigns™] → displayTitle: "Paid Ads & Lead Generation Campaigns"
✓ [CRM, Automation & Conversion Optimization™] → displayTitle: "CRM, Automation & Conversion Systems"
✓ [Business Launch Suite™] → displayTitle: "Business Launch Suite"
✓ [Digital Foundation Suite™] → displayTitle: "Digital Foundation Suite"
✓ [Growth Acceleration Suite™] → displayTitle: "Growth Acceleration Suite"
✓ [Revenue Automation Suite™] → displayTitle: "Revenue Automation Suite"
✓ [Tishbite Enterprise Growth System™] → displayTitle: "Tishbite Enterprise Growth System"

✅ Migration Complete!
   Updated: 13
   Skipped: 0
   Total:   13

🔌 MongoDB connection closed
```

### Step 4: Verify Migration
```bash
# Query MongoDB directly (optional)
use tishbite_db
db.services.findOne({title: "Company Registration & Compliance Setup™"})
# Should show: displayTitle: "Business Registration & Compliance Setup"
```

---

## **PHASE 4: Google Search Console Setup** 🔍

### Step 1: Set Up GSC Property
1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Choose "URL prefix"
4. Enter: `https://tishbitedigital.co.za`

### Step 2: Verify Ownership (FASTEST METHOD)
1. Copy the meta tag GSC provides
2. Paste into `frontend/index.html` head section:
```html
<meta name="google-site-verification" content="xxxYOUR_VERIFICATION_CODExxx" />
```
3. Deploy frontend
4. Return to GSC and click "Verify"
5. Should show: ✓ Property verified

### Step 3: Submit Sitemap
1. In GSC left menu → "Sitemaps"
2. Enter: `https://tishbitedigital.co.za/sitemap.xml`
3. Click "Submit"
4. Status should change to "Success" within 24 hours

### Step 4: Request URL Indexing
In GSC "URL Inspection" tool, test these URLs:
- [ ] https://tishbitedigital.co.za/services
- [ ] https://tishbitedigital.co.za/blog
- [ ] https://tishbitedigital.co.za/projects
- [ ] https://tishbitedigital.co.za/contact
- [ ] https://tishbitedigital.co.za/about
- [ ] https://tishbitedigital.co.za/how-we-work

For each: Click "Request Indexing"

### Step 5: Monitor Progress
- **Coverage Report:** Check "Indexed" count growing
- **Enhancements:** Verify BlogPosting schema is valid
- **Performance:** Monitor CTR over next 2-4 weeks

---

## **PHASE 5: Core Web Vitals Optimization** ⚡

### Step 1: Measure Current Metrics
```bash
# Use PageSpeed Insights
# https://pagespeed.web.dev/?url=https://tishbitedigital.co.za

# Or check in GSC → Core Web Vitals report
```

### Step 2: Implement Code-Splitting (Recommended)

**File:** `frontend/vite.config.js`

Add to `build` section:
```javascript
rollupOptions: {
  output: {
    manualChunks: (id) => {
      if (id.includes('node_modules')) {
        if (id.includes('framer-motion')) return 'framer';
        if (id.includes('react-markdown')) return 'markdown';
        if (id.includes('react-router')) return 'routing';
        return 'vendor';
      }
    },
  },
},
```

### Step 3: Optimize Images
```bash
# Install sharp
npm install -g sharp-cli

# Convert PNG to WebP (50-70% smaller)
for file in frontend/public/assets/*.png; do
  sharp -i "$file" -o "${file%.png}.webp" --format webp
done
```

### Step 4: Re-build and Verify
```bash
npm run build
# Expected: Chunks split into multiple files, better size distribution
```

---

## **DEPLOYMENT SUMMARY**

| Phase | Component | Status | Est. Time |
|-------|-----------|--------|-----------|
| 1 | Frontend Meta Tags | ✅ Ready | 5 min deploy |
| 2 | Backend Schema | ✅ Ready | 5 min deploy |
| 3 | Migration Script | ✅ Ready | 2 min run |
| 4 | GSC Setup | 📋 Manual | 15 min |
| 5 | Performance | 📋 Optional | 30-60 min |

**Total Deployment Time:** ~30-45 minutes

---

## **POST-DEPLOYMENT VALIDATION** ✓

### Immediate (Day 1)
```bash
# Verify pricing table shows correct names
- Visit https://tishbitedigital.co.za/services
- Check pricing policy rows: NO ™ symbols, clean names
- Check service titles use displayTitle if available

# Verify meta tags
- Right-click → View Page Source → Search for:
  - <title>Website Design, SEO & Digital Marketing Services
  - <meta name="description" content="From website design to SEO...
  - <script type="application/ld+json"> (BlogPosting schema)
```

### Week 1
```bash
# Verify GSC submission
- Check "Coverage" report in GSC
- Expected: 8+ URLs indexed (7 pages + sitemap)
- Check "Enhancements" for BlogPosting schema validation
```

### Week 2-4
```bash
# Monitor organic traffic
- GSC "Performance" tab should show impressions growing
- Expected: 20-50% increase in impressions after 2-3 weeks
- Blog posts should start appearing in search results
```

---

## **TROUBLESHOOTING**

**Q: Migration script hangs**
- Kill with Ctrl+C
- Verify MONGODB_URI in .env
- Check MongoDB is accessible: `mongosh "mongodb://..."`

**Q: Pricing table still shows ™ symbols**
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Wait 5 min for Render deployment to complete
- Check git log to verify changes committed

**Q: GSC shows "Discovered - currently not indexed"**
- This is normal! Google crawls over 7 days
- Manually request indexing for each URL
- Check after 24 hours

**Q: Blog post title not showing in meta tag**
- Verify blog post has `title` and `metaTitle` fields
- Check API response includes post data
- Verify Helmet component rendered (check browser console)

---

## **ESTIMATED SEO IMPACT** 📈

**After 30 days:**
- ✅ All 7 pages indexed in Google
- ✅ +50-100% organic impressions
- ✅ +20-30% CTR improvement (from better meta descriptions)
- ✅ Blog posts ranking individually (+200% blog traffic potential)
- ✅ Core Web Vitals improved (green status)

**After 60 days:**
- ✅ Rankings for "Cape Town [service]" keywords
- ✅ LocalBusiness schema visible in Google Maps
- ✅ Featured snippets for blog posts
- ✅ Steady organic lead flow

---

## **NEXT STEPS**

1. **Review This Checklist** ← You are here
2. **Stage 1:** Deploy frontend (5 min)
3. **Stage 2:** Deploy backend (5 min)
4. **Stage 3:** Run migration (2 min)
5. **Stage 4:** Set up GSC (15 min)
6. **Stage 5:** (Optional) Performance optimization (30 min)
7. **Monitor:** Check GSC weekly for 4 weeks

**Ready to deploy?** Let me know and I can walk you through each stage!
