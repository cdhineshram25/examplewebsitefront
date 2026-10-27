import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxShowcase() {
  const containerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const quoteBgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax quote background
      if (quoteBgRef.current) {
        gsap.to(quoteBgRef.current, {
          y: "25%",
          ease: "none",
          scrollTrigger: {
            trigger: ".quote-parallax-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Reverse columns scroll speeds
      if (col1Ref.current && col2Ref.current && col3Ref.current) {
        gsap.to(col1Ref.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(col2Ref.current, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(col3Ref.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="showcase" className="showcase-outer-container">
      {/* Editorial Quote Parallax */}
      <section className="quote-parallax-wrap">
        <div ref={quoteBgRef} className="quote-bg-image"></div>
        <div className="quote-overlay-tint"></div>

        <div className="quote-content-container">
          <span className="badge-pill">THE ATELIER CREED</span>
          <blockquote className="editorial-quote">
            "True chocolate is not confectionery. It is bottled sunlight, ancient earth, and quiet fermentation given physical form."
          </blockquote>
          <div className="quote-author">— DOMINIQUE DE VRIES, MASTER CHOCALATIER</div>
        </div>
      </section>

      {/* Reverse 3-Column Parallax Masonry */}
      <section ref={containerRef} className="reverse-columns-section">
        <div className="reverse-header">
          <span className="reverse-kicker">TERROIR & BOTANY</span>
          <h2 className="reverse-title">PRESERVING HEIRLOOM GENETICS</h2>
        </div>

        <div className="reverse-columns-grid">
          {/* Column 1 */}
          <div ref={col1Ref} className="reverse-column col-1">
            <div className="column-card">
              <img src="/images/chocolate-01-cocoa-pod.jpeg" alt="Criollo Pod" className="col-img" />
              <div className="col-card-meta">
                <h4>THE CHUAO VALLEY</h4>
                <p>Isolated by impassable coastal jungle, preserving 400-year-old single-origin genetics.</p>
              </div>
            </div>

            <div className="column-card">
              <img src="/images/chocolate-05-roasted-cocoa-beans.jpeg" alt="Woodfire Roasted" className="col-img" />
              <div className="col-card-meta">
                <h4>ROASTED OVER WOOD</h4>
                <p>Zero electric heat. Each batch aerated over embers of fragrant dried applewood.</p>
              </div>
            </div>
          </div>

          {/* Column 2 (Parallax Counter-Offset) */}
          <div ref={col2Ref} className="reverse-column col-2">
            <div className="column-card highlight-card">
              <div className="highlight-tag">PURE PURITY</div>
              <h3 className="highlight-headline">NEVER EMULSIFIED. NEVER ALKALIZED.</h3>
              <p className="highlight-body">
                We believe in raw botanical integrity. No soy lecithin, no added vegetable fat, and zero Dutch-process alkali. Only pure cacao mass and organic cane crystals.
              </p>
              <div className="highlight-stat">
                <span className="stat-big">100%</span>
                <span className="stat-desc">Traceable directly to individual micro-lot growers.</span>
              </div>
            </div>

            <div className="column-card">
              <img src="/images/chocolate-07-molten-chocolate-mold.jpeg" alt="Molten Pour" className="col-img" />
              <div className="col-card-meta">
                <h4>HAND-POURED MOLDS</h4>
                <p>Tempered at exactly 31.8°C to form resilient Beta-V crystals with a mirror sheen.</p>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div ref={col3Ref} className="reverse-column col-3">
            <div className="column-card">
              <img src="/images/chocolate-08-finished-chocolate-bar.jpeg" alt="Finished Tablet" className="col-img" />
              <div className="col-card-meta">
                <h4>THE HARMONIC SNAP</h4>
                <p>A pristine acoustic resonance that signals flawless tempering and crystal density.</p>
              </div>
            </div>

            <div className="column-card">
              <img src="/images/chocolate-10-person-tasting-front.jpeg" alt="The Tasting Ritual" className="col-img" />
              <div className="col-card-meta">
                <h4>THE SENSORY RITUAL</h4>
                <p>Allowed to melt against the palate at body temperature, unveiling five distinct flavor waves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
