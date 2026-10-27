import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Package, ShieldCheck, Gift, CheckCircle2 } from 'lucide-react';
import { GIFT_PACKAGING_OPTIONS } from '../data/chocolates';
import { soundscape } from '../utils/audio';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  const [selectedPackaging, setSelectedPackaging] = useState('velvet');
  const [giftNote, setGiftNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const packagingObj = GIFT_PACKAGING_OPTIONS.find(p => p.id === selectedPackaging) || GIFT_PACKAGING_OPTIONS[0];
  const itemsSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const packagingPrice = packagingObj ? packagingObj.price : 0;
  const totalPrice = itemsSubtotal + packagingPrice;

  const handleCheckout = () => {
    soundscape.playClick();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCompleted(true);
      soundscape.playGentleChime(648, 'sine', 3.0);
    }, 1200);
  };

  const handleReset = () => {
    onClearCart();
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div>
            <div className="cart-kicker">ATELIER CELLAR</div>
            <h3 className="cart-drawer-title">YOUR CURATED BOX</h3>
          </div>
          <button
            className="cart-close-btn"
            onClick={() => {
              soundscape.playClick();
              onClose();
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {isCompleted ? (
          /* Order Confirmed Screen */
          <div className="order-confirmed-screen">
            <div className="confirmed-icon-wrap">
              <CheckCircle2 size={54} color="#C6A46C" />
            </div>
            <span className="badge-pill">ATELIER ORDER DISPATCHED</span>
            <h3 className="confirmed-title">DEVOTION RECEIVED</h3>
            <p className="confirmed-desc">
              Your bespoke chocolate creation has been recorded at our Zurich atelier.
              Our maître chocolatier will temper and hand-seal your box in cold-chain presentation.
            </p>

            <div className="order-summary-box">
              <div className="summary-row">
                <span>Packaging:</span>
                <strong>{packagingObj.name}</strong>
              </div>
              <div className="summary-row">
                <span>Items Ordered:</span>
                <strong>{items.reduce((sum, i) => sum + i.quantity, 0)} Tablets / Truffles</strong>
              </div>
              <div className="summary-row">
                <span>Total Paid:</span>
                <strong className="gold-text">${totalPrice} USD</strong>
              </div>
              {giftNote && (
                <div className="gift-message-quote">
                  " {giftNote} "
                </div>
              )}
            </div>

            <button className="btn-solid-gold" onClick={handleReset}>
              Return To Atelier
            </button>
          </div>
        ) : (
          /* Cart Content View */
          <>
            <div className="cart-drawer-body">
              {items.length === 0 ? (
                <div className="cart-empty-state">
                  <Package size={44} color="#C6A46C" opacity={0.6} />
                  <p className="empty-title">YOUR CURATED BOX IS EMPTY</p>
                  <p className="empty-sub">
                    Explore our single-estate Grand Cru editions and add your preferred terroir tablets.
                  </p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {items.map(item => (
                    <div key={item.id} className="cart-item-row">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <div className="item-edition">{item.edition}</div>
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-price">${item.price} USD</div>

                        {/* Qty Controls */}
                        <div className="qty-controls">
                          <button
                            className="qty-btn"
                            onClick={() => {
                              soundscape.playClick();
                              onUpdateQty(item.id, item.quantity - 1);
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => {
                              soundscape.playClick();
                              onUpdateQty(item.id, item.quantity + 1);
                            }}
                          >
                            <Plus size={13} />
                          </button>
                          <button
                            className="qty-del-btn"
                            onClick={() => {
                              soundscape.playClick();
                              onRemoveItem(item.id);
                            }}
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bespoke Gift Packaging Selection */}
                  <div className="packaging-selector-box">
                    <div className="packaging-title">
                      <Gift size={15} color="#C6A46C" />
                      <span>BESPOKE GIFT PACKAGING</span>
                    </div>

                    <div className="packaging-options">
                      {GIFT_PACKAGING_OPTIONS.map(opt => (
                        <label
                          key={opt.id}
                          className={`packaging-option ${selectedPackaging === opt.id ? 'active' : ''}`}
                          onClick={() => {
                            soundscape.playClick();
                            setSelectedPackaging(opt.id);
                          }}
                        >
                          <input
                            type="radio"
                            name="packaging"
                            value={opt.id}
                            checked={selectedPackaging === opt.id}
                            onChange={() => setSelectedPackaging(opt.id)}
                          />
                          <div className="opt-meta">
                            <span className="opt-name">{opt.name}</span>
                            <span className="opt-cost">
                              {opt.price === 0 ? "Included" : `+$${opt.price}`}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Complimentary Handwritten Calligraphy Note */}
                  <div className="gift-note-box">
                    <label htmlFor="gift-note" className="gift-note-label">
                      CALLIGRAPHY CARD NOTE (OPTIONAL)
                    </label>
                    <textarea
                      id="gift-note"
                      rows={2}
                      className="gift-note-textarea"
                      placeholder="Enter a private inscription to be sealed with artisanal wax..."
                      value={giftNote}
                      onChange={e => setGiftNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Drawer Footer */}
            {items.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="pricing-rows">
                  <div className="price-row">
                    <span>Curated Selection ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>${itemsSubtotal}</span>
                  </div>
                  <div className="price-row">
                    <span>Packaging ({packagingObj.name})</span>
                    <span>{packagingPrice === 0 ? "Free" : `$${packagingPrice}`}</span>
                  </div>
                  <div className="price-row">
                    <span>Cold-Chain Insulated Shipping</span>
                    <span className="gold-text">Complimentary</span>
                  </div>
                  <div className="price-row total-row">
                    <span>ESTIMATED TOTAL</span>
                    <span className="total-amount">${totalPrice} USD</span>
                  </div>
                </div>

                <button
                  className="btn-solid-gold btn-checkout"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "SEALING ATELIER ORDER..." : `RESERVE ORDER • $${totalPrice}`}
                </button>

                <div className="cold-chain-pledge">
                  <ShieldCheck size={14} color="#C6A46C" />
                  <span>Ships in thermal gold insulated boxes with natural dry cooling. Guaranteed 0% melt.</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
