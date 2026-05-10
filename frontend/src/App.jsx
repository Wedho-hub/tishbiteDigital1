import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import PublicLayout from "./components/layout/PublicLayout";

// Eagerly loaded — on the critical path for every visitor
import Home from "./pages/public/home/Home.jsx";
import NotFound from "./pages/public/notFound/NotFound.jsx";

// Lazy-loaded — each becomes its own JS chunk, downloaded only when first visited
const Blog           = lazy(() => import("./pages/public/blog/Blog.jsx"));
const BlogDetails    = lazy(() => import("./pages/public/blogDetails/BlogDetails.jsx"));
const Projects       = lazy(() => import("./pages/public/projects/Projects.jsx"));
const Services       = lazy(() => import("./pages/public/servicesPage/Services.jsx"));
const Contacts       = lazy(() => import("./pages/public/contact/Contact.jsx"));
const About          = lazy(() => import("./components/common/about/About.jsx"));
const Checkout       = lazy(() => import("./pages/public/checkout/Checkout.jsx"));
const PaymentSuccess = lazy(() => import("./pages/public/payment/PaymentSuccess.jsx"));
const PaymentCancel  = lazy(() => import("./pages/public/payment/PaymentCancel.jsx"));
const ErrorPage      = lazy(() => import("./pages/public/errorPage/ErrorPage.jsx"));
const HowWeWorkPage  = lazy(() => import("./pages/public/howWeWork/HowWeWorkPage.jsx"));
const AdminLogin     = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminRoutes    = lazy(() => import("./routes/AdminRoutes.jsx"));

const PageLoader = () => (
  <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div className="page-spinner" role="status" aria-label="Loading" />
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, background: "#fff", color: "#c00" }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contacts />} />
              <Route path="/how-we-work" element={<HowWeWorkPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
