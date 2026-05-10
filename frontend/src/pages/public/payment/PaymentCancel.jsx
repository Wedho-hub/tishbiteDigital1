import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaTimesCircle, FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import "./paymentResult.css";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const headingRef = useRef(null);

  const service = searchParams.get("service");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const retryUrl = service
    ? `/checkout?service=${encodeURIComponent(service)}`
    : "/services";

  return (
    <>
      <Helmet>
        <title>Payment Cancelled | Tishbite Digital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="payment-result-page">
        <div className="payment-result-card payment-result-cancel">
          <div className="payment-result-icon-wrap cancel-icon-wrap">
            <FaTimesCircle className="payment-result-icon" />
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="payment-result-title"
          >
            Payment Cancelled
          </h1>

          <p className="payment-result-body">
            No payment was processed. If you changed your mind or encountered
            an issue, you can try again or reach us on WhatsApp and we will
            assist you directly.
          </p>

          <div className="payment-result-actions">
            <Link to={retryUrl} className="payment-result-retry">
              <FaArrowLeft /> Try Again
            </Link>

            <a
              href="https://wa.me/27791684548"
              className="payment-result-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Get Help on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCancel;
