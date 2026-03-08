import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import PublicLayout from "./components/layout/PublicLayout";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Home from "./pages/public/home/Home.jsx";
import Blog from "./pages/public/blog/Blog.jsx";
import BlogDetails from "./pages/public/blogDetails/BlogDetails.jsx";
import Projects from "./pages/public/projects/Projects.jsx";
import Services from "./pages/public/servicesPage/Services.jsx";
import Contacts from "./pages/public/contact/Contact.jsx";
import NotFound from "./pages/public/notFound/NotFound.jsx";
import ErrorPage from "./pages/public/errorPage/ErrorPage.jsx";
import HowWeWorkPage from "./pages/public/howWeWork/HowWeWorkPage.jsx";
import About from "./components/common/about/About.jsx";

// Error Boundary for catching React errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Optionally log error to external service
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, background: '#fff', color: '#c00' }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error && this.state.error.toString()}</pre>
          <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
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
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;