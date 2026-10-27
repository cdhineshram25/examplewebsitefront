import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function AtelierNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    soundscape.playClick();
    setSubscribed(true);
    soundscape.playGentleChime(576, 'sine', 2.0);
  };

  return (
    <section id="atelier" className="atelier-newsletter-section">
      <div className="newsletter-bg-tint"></div>

      <div className="newsletter-inner-container">
        <span className="badge-pill">PRIVATE CELLAR ALLOCATION</span>
        <h2 className="newsletter-title">ENTER THE CACAO CIRCLE</h2>
        <p className="newsletter-desc">
          Receive confidential notifications of rare seasonal micro-lot pressings, vintage reserves, and private chocolate tastings hosted by our master chocolatier.
        </p>

        {subscribed ? (
          <div className="newsletter-confirmed">
            <CheckCircle2 size={32} color="#C6A46C" />
            <h4 className="confirmed-heading">WELCOME TO THE CELLAR</h4>
            <p className="confirmed-sub">
              An embossed invitation has been dispatched to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form className="newsletter-form-wrap" onSubmit={handleSubmit}>
            <div className="input-with-button">
              <input
                type="email"
                placeholder="Enter your personal email address..."
                className="newsletter-text-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Join Private Cellar">
                <span>Request Access</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="newsletter-disclaimer">
              <Shield size={13} color="#C6A46C" />
              <span>Allocations are limited to 350 boxes per micro-lot vintage. Unsubscribe anytime.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
