import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import "./paymentResult.css";

const PaymentSuccess = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Successful | Tishbite Digital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="payment-result-page">
        <div className="payment-result-card payment-result-success">
          <div className="payment-result-icon-wrap success-icon-wrap">
            <FaCheckCircle className="payment-result-icon" />
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="payment-result-title"
          >
            Payment Successful!
          </h1>

          <p className="payment-result-body">
            Thank you for choosing Tishbite Digital. Your payment has been
            received and we will be in touch within <strong>1 business day</strong> to
            kick off your project.
          </p>

          <p className="payment-result-body">
            Check your inbox — a receipt from PayFast will arrive shortly.
          </p>

          <div className="payment-result-actions">
            <a
              href="https://wa.me/27791684548"
              className="payment-result-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Chat with Us on WhatsApp
            </a>

            <Link to="/" className="payment-result-home">
              Back to Home <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
