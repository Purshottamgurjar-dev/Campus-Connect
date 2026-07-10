import React, { useState } from 'react';
import { signupUser } from '../../services/Api';
import './Signup.css';

export default function Signup({ isOpen, onClose, onSignupSuccess, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const data = await signupUser(fullName, email, password, college);
      onSignupSuccess(data.token, data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      onClose();
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-backdrop" onClick={onClose} />
      <div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title">
        <button className="signup-close" onClick={onClose} aria-label="Close signup">
          ×
        </button>

        <h2 id="signup-title" className="signup-title">Create your account</h2>
        <p className="signup-sub">Join CampusConnect and start learning from your peers.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <div className="signup-error">{error}</div>}

          <label className="field-label">FULL NAME</label>
          <input
            className="field-input"
            type="text"
            placeholder="Alex Rivers"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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

          <label className="field-label">COLLEGE / UNIVERSITY</label>
          <input
            className="field-input"
            type="text"
            placeholder="Stanford University"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          Already have an account? <button type="button" className="signup-link" onClick={handleSwitchToLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
}
