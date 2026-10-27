import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundscape.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cacao-footer">
      <div className="footer-top-grid">
        <div className="footer-brand-col">
          <div className="footer-brand-title">CACAO</div>
          <div className="footer-brand-sub">Haute Chocolaterie & Confectionery</div>
          <p className="footer-philosophy">
            Dedicated to the unhurried craft of single-estate Criollo chocolate. Rooted in ancient Venezuelan terroir, refined through Swiss precision conching.
          </p>
          <div className="footer-certifications">
            <span className="cert-tag">Direct Trade Certified</span>
            <span className="cert-tag">100% Heirloom Criollo</span>
            <span className="cert-tag">Zero Soy Lecithin</span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-header">ATELIERS</h4>
          <ul className="footer-list">
            <li><strong>Zurich:</strong> Bahnhofstrasse 48</li>
            <li><strong>Paris:</strong> 14 Rue Saint-Honoré</li>
            <li><strong>Tokyo:</strong> 6-Chome Ginza, Chuo</li>
            <li><strong>New York:</strong> 72 Mercer Street, SoHo</li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-header">EXPLORE</h4>
          <ul className="footer-list">
            <li><a href="#hero" onClick={() => soundscape.playClick()}>The Canvas Film</a></li>
            <li><a href="#explainer" onClick={() => soundscape.playClick()}>Bean-To-Bar Method</a></li>
            <li><a href="#craftsmanship" onClick={() => soundscape.playClick()}>Artisanal Chronicles</a></li>
            <li><a href="#collection" onClick={() => soundscape.playClick()}>Cellar Editions</a></li>
            <li><a href="#atelier" onClick={() => soundscape.playClick()}>VIP Allocations</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-header">CELLAR CONCIERGE</h4>
          <ul className="footer-list">
            <li>concierge@cacao-atelier.ch</li>
            <li>+41 44 211 88 00</li>
            <li>Daily: 10:00 — 19:30 CET</li>
            <li className="footer-gift-line">Private Corporate Tastings on request.</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-copyright">
          © {new Date().getFullYear()} CACAO Haute Chocolaterie S.A. All rights reserved. Handcrafted with React.
        </div>

        <button className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <span>RETURN TO APEX</span>
          <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  );
}
