import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import "./notFound.css";

const NotFound = () => (
  <>
    <PageHeader title="404 - Page Not Found" subtitle="The page you are looking for does not exist." background="light" />
    <section className="not-found-wrap container">
      <p>Try going back to the homepage or explore our services and projects.</p>
      <div className="not-found-actions">
        <Link className="not-found-btn" to="/">Go Home</Link>
      </div>
    </section>
  </>
);

export default NotFound;
