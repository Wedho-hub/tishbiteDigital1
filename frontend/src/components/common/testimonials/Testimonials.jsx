import React from "react";
import "./testimonials.css";
import { FaStar, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const reviews = [
  {
    name: "Thandi M.",
    role: "HR Business Partner",
    company: "Maffy Online",
    service: "Lead-Generating Website",
    rating: 5,
    quote:
      "Our WhatsApp enquiries doubled within the first month of launching our new site. Tishbite Digital didn't just build a website — they built us a lead machine that works around the clock.",
    initials: "TM",
  },
  {
    name: "Mr. F. Nkosi",
    role: "Principal",
    company: "FOG Educare",
    service: "Local SEO & Google Visibility",
    rating: 5,
    quote:
      "Parents started finding us through Google within weeks. Enrolment enquiries increased noticeably and we now appear for the local searches that matter most to our community.",
    initials: "FN",
  },
  {
    name: "Leon V.",
    role: "Owner",
    company: "Cape Comfort Home Services",
    service: "Business Starter Pack",
    rating: 5,
    quote:
      "They made the whole process simple and clear. I didn't know where to start online, but within a short time I had a professional site and was getting weekly WhatsApp enquiries.",
    initials: "LV",
  },
];

// Update with your actual Google Business Profile review link from Google Maps
const GOOGLE_REVIEW_URL =
  "https://g.page/r/CcbaVAYMBDDAEBM/review";

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tishbite Digital",
  url: "https://tishbitedigital.co.za",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: "5",
    },
    reviewBody: r.quote,
    itemReviewed: { "@type": "LocalBusiness", name: "Tishbite Digital" },
  })),
};

const StarRating = ({ count }) => (
  <div className="testimonial-stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <FaStar key={i} aria-hidden="true" />
    ))}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const Testimonials = () => (
  <section
    className="testimonials-section py-5"
    role="region"
    aria-labelledby="testimonials-heading"
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
      </script>
    </Helmet>

    <div className="container">
      <div className="text-center mb-5">
        <p className="section-kicker justify-content-center mb-3">
          Client Results
        </p>
        <h2 id="testimonials-heading" className="section-title mb-3">
          What Cape Town businesses say about us
        </h2>
        <p className="testimonials-intro mx-auto">
          Real outcomes from real businesses. Here's what our clients achieved
          after working with Tishbite Digital.
        </p>
      </div>

      <motion.div
        className="row g-4"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {reviews.map((review) => (
          <motion.div key={review.name} className="col-md-4" variants={fadeUp}>
            <article className="testimonial-card h-100">
              <div className="testimonial-card-top">
                <div className="testimonial-avatar" aria-hidden="true">
                  {review.initials}
                </div>
                <div className="testimonial-meta">
                  <p className="testimonial-name">{review.name}</p>
                  <p className="testimonial-role">
                    {review.role} &middot; {review.company}
                  </p>
                </div>
              </div>
              <StarRating count={review.rating} />
              <p className="testimonial-service-tag">{review.service}</p>
              <blockquote className="testimonial-quote">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="testimonial-verified">
                <FaGoogle aria-hidden="true" />
                <span>Google Review</span>
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>

      <div className="testimonials-cta-wrap text-center mt-5">
        <p className="testimonials-cta-label">
          Worked with us? We&rsquo;d love your feedback.
        </p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="testimonials-review-btn"
          aria-label="Leave us a Google review (opens in a new tab)"
        >
          <FaGoogle aria-hidden="true" />
          Leave a Google Review
        </a>
      </div>
    </div>
  </section>
);

export default Testimonials;
