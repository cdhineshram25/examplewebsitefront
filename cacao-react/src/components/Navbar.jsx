import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, Compass, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function Navbar({ onOpenCart, cartCount, onOpenTastingRadar }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = soundscape.toggle();
    setIsMuted(!active);
  };

  return (
    <nav className={`cacao-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="brand-logo" onClick={() => soundscape.playClick()}>
        <span className="brand-title">CACAO</span>
        <span className="brand-tagline">Haute Chocolaterie</span>
      </a>

      <div className="nav-links">
        <a href="#explainer" className="nav-link" onClick={() => soundscape.playClick()}>Origin</a>
        <a href="#craftsmanship" className="nav-link" onClick={() => soundscape.playClick()}>Craft</a>
        <a href="#collection" className="nav-link" onClick={() => soundscape.playClick()}>Editions</a>
        <a href="#showcase" className="nav-link" onClick={() => soundscape.playClick()}>Terroir</a>
        <a href="#atelier" className="nav-link" onClick={() => soundscape.playClick()}>Atelier</a>
      </div>

      <div className="nav-actions">
        {/* Ambient Soundscape Toggle */}
        <button
          className="nav-icon-btn"
          onClick={handleSoundToggle}
          title={isMuted ? "Unmute Ambient Soundscape" : "Mute Soundscape"}
          aria-label="Toggle ambient soundscape"
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} className="gold-pulse" />}
          <span className="nav-btn-caption">{isMuted ? "Sound Off" : "Ambient"}</span>
        </button>

        {/* Tasting Notes / Radar Quick Action */}
        <button
          className="nav-icon-btn hidden-mobile"
          onClick={() => {
            soundscape.playClick();
            if (onOpenTastingRadar) onOpenTastingRadar();
          }}
          title="Explore Tasting Profiles"
        >
          <Sparkles size={16} />
          <span className="nav-btn-caption">Notes</span>
        </button>

        {/* Shopping Box / Cart Drawer Trigger */}
        <button
          className="cart-trigger-btn"
          onClick={() => {
            soundscape.playClick();
            onOpenCart();
          }}
          aria-label="View curated box"
        >
          <ShoppingBag size={17} />
          <span className="cart-label">Box</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        {/* Discover Atelier CTA */}
        <a
          href="#collection"
          className="btn-discover"
          onClick={() => soundscape.playClick()}
        >
          Discover
        </a>
      </div>
    </nav>
  );
}
