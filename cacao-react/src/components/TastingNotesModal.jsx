import React from 'react';
import { X, Sparkles, Award, MapPin, Wine, Flame } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function TastingNotesModal({ chocolate, onClose, onAddToCart }) {
  if (!chocolate) return null;

  return (
    <div className="tasting-modal-overlay" onClick={onClose}>
      <div className="tasting-modal-card" onClick={e => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => {
            soundscape.playClick();
            onClose();
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Left Column: Image & Badges */}
          <div className="modal-media-col">
            <div className="modal-image-wrap">
              <img src={chocolate.image} alt={chocolate.name} className="modal-img" />
              <div className="modal-img-gradient"></div>
              <div className="modal-badge-float">
                <span className="badge-dot"></span>
                <span>{chocolate.cacao} CACAO</span>
              </div>
            </div>

            <div className="modal-quick-specs">
              <div className="spec-tile">
                <MapPin size={15} color="#C6A46C" />
                <div>
                  <div className="tile-title">TERROIR</div>
                  <div className="tile-val">{chocolate.origin}</div>
                </div>
              </div>
              <div className="spec-tile">
                <Flame size={15} color="#C6A46C" />
                <div>
                  <div className="tile-title">CONCHING</div>
                  <div className="tile-val">{chocolate.conche}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flavor Notes & Sensory Profile */}
          <div className="modal-info-col">
            <div className="modal-kicker">{chocolate.edition}</div>
            <h3 className="modal-title">{chocolate.name}</h3>
            <p className="modal-description">{chocolate.description}</p>

            {/* Flavor Spectrum Bars */}
            <div className="flavor-profile-section">
              <div className="profile-heading">
                <Sparkles size={14} color="#C6A46C" />
                <span>SENSORY PROFILE MATRIX</span>
              </div>

              <div className="profile-bars-list">
                <div className="profile-bar-item">
                  <div className="bar-labels">
                    <span>Intensity</span>
                    <span>{chocolate.profile.intensity}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${chocolate.profile.intensity}%` }}></div>
                  </div>
                </div>

                <div className="profile-bar-item">
                  <div className="bar-labels">
                    <span>Fruitiness & Acidity</span>
                    <span>{chocolate.profile.fruitiness}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${chocolate.profile.fruitiness}%` }}></div>
                  </div>
                </div>

                <div className="profile-bar-item">
                  <div className="bar-labels">
                    <span>Roastiness & Smoke</span>
                    <span>{chocolate.profile.roastiness}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${chocolate.profile.roastiness}%` }}></div>
                  </div>
                </div>

                <div className="profile-bar-item">
                  <div className="bar-labels">
                    <span>Floral Bouquet</span>
                    <span>{chocolate.profile.floral}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${chocolate.profile.floral}%` }}></div>
                  </div>
                </div>

                <div className="profile-bar-item">
                  <div className="bar-labels">
                    <span>Natural Sweetness</span>
                    <span>{chocolate.profile.sweetness}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${chocolate.profile.sweetness}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasting Notes Tags */}
            <div className="tasting-notes-tags">
              <div className="tags-label">DOMINANT NOTES:</div>
              <div className="tags-flex">
                {chocolate.notes.map((note, i) => (
                  <span key={i} className="note-pill">{note}</span>
                ))}
              </div>
            </div>

            {/* Sommelier Pairing */}
            <div className="sommelier-pairing-box">
              <Wine size={16} color="#C6A46C" />
              <div>
                <strong>CELLAR PAIRING RECOMMENDATION:</strong>
                <p>{chocolate.pairing}</p>
              </div>
            </div>

            {/* Add to Box Action */}
            <div className="modal-actions-bar">
              <div className="modal-price">${chocolate.price} <span className="price-unit">USD</span></div>
              <button
                className="btn-solid-gold"
                onClick={() => {
                  soundscape.playClick();
                  onAddToCart(chocolate);
                  onClose();
                }}
              >
                Add To Curated Box
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
