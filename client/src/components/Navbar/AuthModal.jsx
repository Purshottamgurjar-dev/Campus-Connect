import React, { useState } from "react";
import { loginUser, signupUser } from "../../services/Api";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (activeTab === "login") {
        if (!email || !password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }
        const data = await loginUser(email, password);
        onLoginSuccess(data.token, data.user);
      } else {
        if (!name || !email || !password) {
          setError("Please fill in all required fields");
          setLoading(false);
          return;
        }
        const data = await signupUser(name, email, password, college);
        onLoginSuccess(data.token, data.user);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="auth-modal-tabs">
          <button
            className={`auth-modal-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
          >
            Log In
          </button>
          <button
            className={`auth-modal-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("register");
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-modal-form" onSubmit={handleSubmit}>
          {error && <div className="auth-modal-error">{error}</div>}

          {activeTab === "register" && (
            <div className="auth-form-group">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="e.g. Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="name@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {activeTab === "register" && (
            <div className="auth-form-group">
              <label htmlFor="auth-college">College / University</label>
              <input
                id="auth-college"
                type="text"
                placeholder="e.g. Stanford University"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Please wait..." : activeTab === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="auth-modal-footer">
          {activeTab === "login" ? (
            <p>
              New to CampusConnect?{" "}
              <span onClick={() => { setActiveTab("register"); setError(""); }}>Create an account</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => { setActiveTab("login"); setError(""); }}>Log in here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
