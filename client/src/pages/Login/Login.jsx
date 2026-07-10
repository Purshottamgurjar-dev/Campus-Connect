import React, { useState } from 'react';
import { loginUser } from '../../services/Api';
import './Login.css';

export default function Login({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(email, password);
      onLoginSuccess(data.token, data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-backdrop" onClick={onClose} />
      <div className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="login-close" onClick={onClose} aria-label="Close login">
          ×
        </button>
        <h2 id="login-title" className="login-title">Welcome Back</h2>
        <p className="login-sub">Continue your learning journey.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
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

        <div className="login-footer">Don't have an account? <button type="button" className="login-link" onClick={onClose}>Sign Up</button></div>
      </div>
    </div>
  );
}
