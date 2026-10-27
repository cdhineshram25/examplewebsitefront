import React, { useState } from 'react';
import { CHOCOLATE_EDITIONS } from '../data/chocolates';
import { Sparkles, Plus, Check } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function ChocolateCollection({ onSelectChocolate, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? CHOCOLATE_EDITIONS
    : CHOCOLATE_EDITIONS.filter(item => item.category === activeCategory);

  const handleAdd = (item) => {
    soundscape.playClick();
    onAddToCart(item);
    setAddedAnimationId(item.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1400);
  };

  return (
    <section id="collection" className="collection-section">
      <div className="collection-header">
        <div className="collection-kicker">CURATED RELEASES // HARVEST 2026</div>
        <h2 className="collection-title">THE GRAND CRU EDITIONS</h2>
        <p className="collection-subtitle">
          Small-batch, single-origin expressions crafted exclusively from heirloom Venezuelan and Amazonian Criollo varietals.
        </p>

        {/* Filter Tabs */}
        <div className="collection-filter-tabs">
          <button
            className={`filter-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              soundscape.playClick();
              setActiveCategory('all');
            }}
          >
            All Editions ({CHOCOLATE_EDITIONS.length})
          </button>
          <button
            className={`filter-tab ${activeCategory === 'bars' ? 'active' : ''}`}
            onClick={() => {
              soundscape.playClick();
              setActiveCategory('bars');
            }}
          >
            Grand Cru Tablets
          </button>
          <button
            className={`filter-tab ${activeCategory === 'truffles' ? 'active' : ''}`}
            onClick={() => {
              soundscape.playClick();
              setActiveCategory('truffles');
            }}
          >
            Rare Truffles
          </button>
          <button
            className={`filter-tab ${activeCategory === 'boxes' ? 'active' : ''}`}
            onClick={() => {
              soundscape.playClick();
              setActiveCategory('boxes');
            }}
          >
            Connoisseur Flights
          </button>
        </div>
      </div>

      {/* Grid of Chocolates */}
      <div className="collection-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="collection-card">
            <div className="card-media-wrap">
              <img src={item.image} alt={item.name} className="card-image" loading="lazy" />
              <div className="card-cacao-badge">
                <span className="badge-dot"></span>
                <span>{item.cacao} Cacao</span>
              </div>
            </div>

            <div className="card-content">
              <div className="card-edition-tag">{item.edition}</div>
              <h3 className="card-title">{item.name}</h3>
              <div className="card-origin">{item.origin}</div>

              {/* Flavor tags */}
              <div className="card-notes-row">
                {item.notes.slice(0, 3).map((note, i) => (
                  <span key={i} className="card-note-chip">{note}</span>
                ))}
              </div>

              <div className="card-footer-row">
                <div className="card-price-display">
                  <span className="price-num">${item.price}</span>
                  <span className="price-curr">USD</span>
                </div>

                <div className="card-buttons-flex">
                  <button
                    className="btn-card-specs"
                    onClick={() => {
                      soundscape.playClick();
                      onSelectChocolate(item);
                    }}
                    title="Examine sensory notes"
                  >
                    <Sparkles size={14} />
                    <span>Notes</span>
                  </button>

                  <button
                    className={`btn-card-add ${addedAnimationId === item.id ? 'added' : ''}`}
                    onClick={() => handleAdd(item)}
                    title="Add to curated box"
                  >
                    {addedAnimationId === item.id ? (
                      <>
                        <Check size={14} />
                        <span>Curated</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Curate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
