import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: hook up real auth call (Api.js)
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="login-page">
      <div className="login-backdrop" />

      <div className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <h2 id="login-title" className="login-title">Welcome Back</h2>
        <p className="login-sub">Continue your learning journey.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field-label">UNIVERSITY EMAIL</label>
          <input
            className="field-input"
            type="email"
            placeholder="name@univ.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label">PASSWORD</label>
          <input
            className="field-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <div className="login-footer">Don't have an account? <a href="/signup">Sign Up</a></div>
      </div>
    </div>
  );
}
