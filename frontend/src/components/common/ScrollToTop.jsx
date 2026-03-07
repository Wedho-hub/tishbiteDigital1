import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Scrolls window to top when route changes
 * Place this component inside BrowserRouter but before Routes
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
