import React, { useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaLock, FaArrowLeft, FaArrowRight, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { initiatePayment } from "../../../services/paymentService";
import "./checkout.css";

const INSTALLMENT_INFO = {
  "Business Launch Suite": { amount: 2900, months: 3 },
  "Business Registration & Compliance Setup": null,
  "Brand Identity & Market Positioning Design": null,
  "Digital Foundation Suite": { amount: 3400, months: 3 },
  "Growth Acceleration Suite": { amount: 2500, months: 5 },
  "Revenue Automation Suite": { amount: 3000, months: 5 },
  "Tishbite Enterprise Growth System": { amount: 4700, months: 6 },
};

const SERVICES_CATALOGUE = [
  {
    name: "Business Launch Suite",
    price: 8700,
    badge: "Most Popular",
    description: "Website + branding + local SEO foundation",
  },
  {
    name: "Digital Foundation Suite",
    price: 10200,
    badge: null,
    description: "Website + SEO + Google Business setup",
  },
  {
    name: "Growth Acceleration Suite",
    price: 12500,
    badge: null,
    description: "Full digital system with lead automation",
  },
  {
    name: "Revenue Automation Suite",
    price: 15000,
    badge: null,
    description: "Advanced automation + ads + CRM integration",
  },
  {
    name: "Tishbite Enterprise Growth System",
    price: 28200,
    badge: "Premium",
    description: "Complete enterprise digital growth system",
  },
  {
    name: "Brand Identity & Market Positioning Design",
    price: 4500,
    badge: null,
    description: "Logo, colours, brand guidelines & positioning",
  },
  {
    name: "Business Registration & Compliance Setup",
    price: 2500,
    badge: null,
    description: "Company registration & compliance documentation",
  },
];

const TRUST_BADGES = [
  "SSL Encrypted",
  "PayFast Secured",
  "South African Rand (ZAR)",
];

const Checkout = () => {
  const [searchParams] = useSearchParams();

  const paramService = searchParams.get("service");
  const paramPrice = searchParams.get("price");

  const [selectedService, setSelectedService] = useState(() =>
    paramService && paramPrice
      ? { name: paramService, price: parseFloat(paramPrice) }
      : null
  );

  const service = selectedService?.name || "";
  const rawPrice = selectedService?.price || 0;
  const installInfo = INSTALLMENT_INFO[service] || null;

  const [paymentType, setPaymentType] = useState("once-off");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const pfFormRef = useRef(null);

  const displayAmount =
    paymentType === "installment" && installInfo ? installInfo.amount : rawPrice;

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email address is required.";
    if (form.phone && !/^[\d\s+()-]{7,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submitToPayFast = (pfUrl, params) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = pfUrl;
    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const { pfUrl, params } = await initiatePayment({
        ...form,
        service,
        amount: displayAmount,
        paymentType,
      });
      submitToPayFast(pfUrl, params);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* ── Step 1: Service picker ──────────────────── */
  if (!selectedService) {
    return (
      <>
        <Helmet>
          <title>Choose a Service | Pay Online | Tishbite Digital</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="checkout-page checkout-page--picker">
          <div className="checkout-picker-wrap">
            <Link to="/services" className="checkout-back-link">
              <FaArrowLeft /> Back to Services
            </Link>

            <h1 className="checkout-picker-title">Choose a Service</h1>
            <p className="checkout-picker-sub">
              Select the package you want to pay for. You will be redirected to PayFast's
              secure payment portal to complete your purchase.
            </p>

            <div className="checkout-picker-grid">
              {SERVICES_CATALOGUE.map((svc) => {
                const info = INSTALLMENT_INFO[svc.name];
                return (
                  <button
                    key={svc.name}
                    type="button"
                    className={`checkout-picker-card${svc.badge === "Most Popular" ? " checkout-picker-card--featured" : ""}`}
                    onClick={() => {
                      setSelectedService({ name: svc.name, price: svc.price });
                      setPaymentType("once-off");
                    }}
                  >
                    {svc.badge && (
                      <span className="checkout-picker-badge">{svc.badge}</span>
                    )}
                    <p className="checkout-picker-name">{svc.name}</p>
                    <p className="checkout-picker-desc">{svc.description}</p>
                    <p className="checkout-picker-price">
                      R{svc.price.toLocaleString("en-ZA")}
                    </p>
                    {info && (
                      <p className="checkout-picker-install">
                        or {info.months} × R{info.amount.toLocaleString("en-ZA")} / month
                      </p>
                    )}
                    <span className="checkout-picker-cta">
                      Select &amp; Continue <FaArrowRight />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="checkout-picker-trust">
              <FaLock aria-hidden="true" />
              <span>Payments secured by <strong>PayFast</strong> · SSL Encrypted · ZAR</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Step 2: Checkout form ───────────────────── */
  return (
    <>
      <Helmet>
        <title>Secure Checkout | {service} | Tishbite Digital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="checkout-page">
        <div className="checkout-container">
          {/* Left — Summary */}
          <aside className="checkout-summary">
            <button
              type="button"
              className="checkout-back-link"
              onClick={() => setSelectedService(null)}
            >
              <FaArrowLeft /> Change Service
            </button>

            <div className="checkout-summary-card">
              <div className="checkout-summary-icon">
                <FaCreditCard />
              </div>
              <h2 className="checkout-summary-title">Order Summary</h2>

              <div className="checkout-summary-service">
                <p className="checkout-summary-label">Service</p>
                <p className="checkout-summary-value">{service}</p>
              </div>

              {installInfo && (
                <div className="checkout-payment-toggle">
                  <p className="checkout-summary-label">Payment Option</p>
                  <div className="checkout-toggle-group">
                    <button
                      type="button"
                      className={`checkout-toggle-btn ${paymentType === "once-off" ? "active" : ""}`}
                      onClick={() => setPaymentType("once-off")}
                    >
                      Once-Off
                    </button>
                    <button
                      type="button"
                      className={`checkout-toggle-btn ${paymentType === "installment" ? "active" : ""}`}
                      onClick={() => setPaymentType("installment")}
                    >
                      Installment
                    </button>
                  </div>
                  {paymentType === "installment" && (
                    <p className="checkout-installment-note">
                      {installInfo.months} monthly payments of R{installInfo.amount.toLocaleString()} each
                    </p>
                  )}
                </div>
              )}

              <div className="checkout-summary-amount">
                <span className="checkout-amount-label">
                  {paymentType === "installment" ? "Today's Payment" : "Total Amount"}
                </span>
                <span className="checkout-amount-value">
                  R{displayAmount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="checkout-trust-badges">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge} className="checkout-trust-badge">
                    <FaCheckCircle /> {badge}
                  </span>
                ))}
              </div>

              <div className="checkout-payfast-logo">
                <FaLock className="checkout-lock-icon" />
                <span>Secured by <strong>PayFast</strong></span>
              </div>
            </div>
          </aside>

          {/* Right — Form */}
          <main className="checkout-form-wrap">
            <h1 className="checkout-form-title">Your Details</h1>
            <p className="checkout-form-subtitle">
              Enter your details below to proceed to secure payment.
            </p>

            {apiError && (
              <div className="checkout-api-error" role="alert">
                {apiError}
              </div>
            )}

            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <div className="checkout-field-row">
                <div className="checkout-field">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "has-error" : ""}
                    placeholder="Your first name"
                    disabled={loading}
                  />
                  {errors.firstName && (
                    <span className="checkout-field-error" role="alert">{errors.firstName}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "has-error" : ""}
                    placeholder="Your last name"
                    disabled={loading}
                  />
                  {errors.lastName && (
                    <span className="checkout-field-error" role="alert">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="checkout-field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "has-error" : ""}
                  placeholder="you@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <span className="checkout-field-error" role="alert">{errors.email}</span>
                )}
              </div>

              <div className="checkout-field">
                <label htmlFor="phone">
                  Phone Number <span className="checkout-optional">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "has-error" : ""}
                  placeholder="+27 79 168 4548"
                  disabled={loading}
                />
                {errors.phone && (
                  <span className="checkout-field-error" role="alert">{errors.phone}</span>
                )}
              </div>

              <button type="submit" className="checkout-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="checkout-spinner" aria-hidden="true" />
                    Redirecting to PayFast...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Pay R{displayAmount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })} Securely
                  </>
                )}
              </button>

              <p className="checkout-disclaimer">
                By proceeding, you agree to our terms. Payments are processed securely
                by PayFast. You will be redirected to their payment portal.
              </p>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Checkout;
