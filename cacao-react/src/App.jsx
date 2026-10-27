import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import StickyExplainer from './components/StickyExplainer';
import CraftsmanshipRail from './components/CraftsmanshipRail';
import ChocolateCollection from './components/ChocolateCollection';
import ParallaxShowcase from './components/ParallaxShowcase';
import AtelierNewsletter from './components/AtelierNewsletter';
import Footer from './components/Footer';
import TastingNotesModal from './components/TastingNotesModal';
import CartDrawer from './components/CartDrawer';
import { CHOCOLATE_EDITIONS } from './data/chocolates';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [cartItems, setCartItems] = useState([
    // Start with one complimentary tasting reserve in box for instant delight
    { ...CHOCOLATE_EDITIONS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedChocolate, setSelectedChocolate] = useState(null);

  // Initialize Lenis smooth scroll and synchronize with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="cacao-experience-root">
      {/* Luxury Film Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Fixed Luxury Navigation */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        onOpenTastingRadar={() => setSelectedChocolate(CHOCOLATE_EDITIONS[0])}
      />

      {/* 1. Hero Canvas Pinned Scrub (290 frames sequence) */}
      <HeroCanvas />

      {/* 2. Sticky Explainer (Bean-to-Bar 4 Stages) */}
      <StickyExplainer />

      {/* 3. Horizontal Craftsmanship Video Rail */}
      <CraftsmanshipRail />

      {/* 4. Grand Cru Editions & Curated Box Builder */}
      <ChocolateCollection
        onSelectChocolate={(item) => setSelectedChocolate(item)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Reverse Columns & Terroir Parallax */}
      <ParallaxShowcase />

      {/* 6. Private Cellar Allocation Membership */}
      <AtelierNewsletter />

      {/* 7. Luxury Footer */}
      <Footer />

      {/* Tasting Profile & Flavor Radar Modal */}
      <TastingNotesModal
        chocolate={selectedChocolate}
        onClose={() => setSelectedChocolate(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Curated Box / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
