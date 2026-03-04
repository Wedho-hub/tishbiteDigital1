import React from "react";
import { useNavigate } from "react-router-dom";
import "./errorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong</h1>
      <p>Sorry, an unexpected error has occurred.<br />Please try again later or return to the homepage.</p>
      <div className="error-actions">
        <button className="error-btn" onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
