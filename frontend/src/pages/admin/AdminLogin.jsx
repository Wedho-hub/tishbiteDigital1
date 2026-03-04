import React, { useState } from "react";
import { isEmail, isNotEmpty } from "../../utils/validate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import "./admin.css";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation
    if (!isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isNotEmpty(password)) {
      setError("Password cannot be empty.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate("/admin/dashboard");
    } else {
      setError(res.error?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login login-center">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          {error && <div className="error login-error-anim">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
