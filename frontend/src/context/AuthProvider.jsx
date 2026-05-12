import React, { createContext, useContext, useState, useEffect } from "react";
import { loginAdmin, logoutAdmin, fetchCsrfToken, fetchWithTimeout, apiUrl } from "../services/api";

// Create AuthContext
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  // Start as true so RequireAuth shows a spinner while we verify the cookie,
  // preventing an immediate redirect to /admin/login on every page refresh.
  const [loading, setLoading] = useState(true);

  // On every mount, check whether a valid JWT cookie already exists.
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetchWithTimeout(apiUrl("/api/auth/verify"), {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) setAdmin(data.admin);
        }
      } catch {
        // No valid cookie or network error — remain logged out
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await fetchCsrfToken();
      const res = await loginAdmin(email, password);
      if (res.success) setAdmin(res.admin);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context
export const useAuth = () => useContext(AuthContext);