import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas({ onLoadingComplete }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeOverlay, setActiveOverlay] = useState(0);

  const framesRef = useRef([]);
  const currentFrameRef = useRef(1);
  const totalFrames = 290;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Canvas Cover Draw Logic
    function drawFrame(index) {
      const img = framesRef.current[index - 1];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let sw, sh, sx, sy;

      if (canvasRatio > imgRatio) {
        sw = iw;
        sh = iw / canvasRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      } else {
        sh = ih;
        sw = ih * canvasRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameRef.current);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Frame preloading
    let loadedCount = 0;
    const frames = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/frames/frame_${frameNum}.jpg`;

      const checkLoaded = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / totalFrames) * 100);
        setLoadPercent(pct);

        if (loadedCount >= 25 && !isLoaded) {
          setIsLoaded(true);
          if (onLoadingComplete) onLoadingComplete();
          resizeCanvas();
        }

        if (i === 1) {
          drawFrame(1);
        }
      };

      img.onload = checkLoaded;
      img.onerror = checkLoaded;
      frames.push(img);
    }
    framesRef.current = frames;

    // ScrollTrigger creation for pinned canvas
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 0.25,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        const frameIndex = Math.min(
          totalFrames,
          Math.max(1, Math.round(p * (totalFrames - 1)) + 1)
        );
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);

        // Determine active text overlay
        if (p >= 0.03 && p <= 0.18) {
          setActiveOverlay(1);
        } else if (p >= 0.22 && p <= 0.36) {
          setActiveOverlay(2);
        } else if (p >= 0.42 && p <= 0.56) {
          setActiveOverlay(3);
        } else if (p >= 0.62 && p <= 0.76) {
          setActiveOverlay(4);
        } else if (p >= 0.82 && p <= 0.96) {
          setActiveOverlay(5);
        } else {
          setActiveOverlay(0);
        }
      }
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Luxury Loading Curtain */}
      <div className={`cacao-loader ${isLoaded ? 'loaded' : ''}`}>
        <div className="loader-crest">✦</div>
        <div className="loader-title">CACAO</div>
        <div className="loader-subtitle">CRU EXTRAORDINAIRE</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${loadPercent}%` }}></div>
        </div>
        <div className="loader-text">CURATING ATELIER {loadPercent}%</div>
      </div>

      {/* Floating Vertical Scroll Progress Tracker */}
      <div className="vertical-progress" aria-hidden="true">
        <div
          className="vertical-progress-bar"
          style={{ height: `${Math.round(scrollProgress * 100)}%` }}
        ></div>
        <div className="progress-number">
          {String(Math.round(scrollProgress * 100)).padStart(2, '0')}
        </div>
      </div>

      {/* Hero Canvas Pinned Container */}
      <section ref={heroRef} id="hero" className="hero-scroll-section">
        <div className="hero-canvas-wrap">
          <canvas ref={canvasRef} className="hero-canvas" />
          <div className="hero-vignette"></div>

          {/* Floating Cinematic Typography Overlays */}
          <div className="hero-overlays-container">
            {/* Phase 1 */}
            <div className={`hero-text-block ${activeOverlay === 1 ? 'active' : ''}`}>
              <span className="hero-kicker">Haute Confectionery • Cru Extraordinaire</span>
              <h1 className="hero-heading-main">CACAO</h1>
              <p className="hero-caption">
                Where ancient Andean soil meets 72 hours of slow, stone-ground alchemy.
              </p>
            </div>

            {/* Phase 2 */}
            <div className={`hero-text-block ${activeOverlay === 2 ? 'active' : ''}`}>
              <span className="hero-kicker">Genesis • Single Estate Criollo</span>
              <h2 className="hero-heading-sub">BORN OF FIRE & EARTH</h2>
              <p className="hero-caption">
                Hand-harvested at the peak of lunar fullness in the remote misty valleys of Chuao.
              </p>
            </div>

            {/* Phase 3 */}
            <div className={`hero-text-block ${activeOverlay === 3 ? 'active' : ''}`}>
              <span className="hero-kicker">Alchemy • Woodfire Roasting</span>
              <h2 className="hero-heading-sub">AWAKENING THE ESSENCE</h2>
              <p className="hero-caption">
                Gentle woodfire aeration unseals hidden bouquets of dried plum, tobacco leaf, and rare jasmine.
              </p>
            </div>

            {/* Phase 4 */}
            <div className={`hero-text-block ${activeOverlay === 4 ? 'active' : ''}`}>
              <span className="hero-kicker">Metamorphosis • Liquid Obsidian</span>
              <h2 className="hero-heading-sub">LIQUID DEVOTION</h2>
              <p className="hero-caption">
                Slow granite conching refines each particle to less than 12 microns for an ethereal, velvet melt.
              </p>
            </div>

            {/* Phase 5 */}
            <div className={`hero-text-block ${activeOverlay === 5 ? 'active' : ''}`}>
              <span className="hero-kicker">Culmination • The Finished Tablet</span>
              <h2 className="hero-heading-sub">THE ART OF TASTING</h2>
              <p className="hero-caption">
                Tempered with surgical precision to produce a crisp harmonic snap and golden luster.
              </p>
              <div style={{ marginTop: '1.4rem' }}>
                <a href="#collection" className="btn-solid-gold">Explore The Cellar</a>
              </div>
            </div>
          </div>

          {/* Scroll Cue Indicator */}
          <div
            className="scroll-cue"
            style={{ opacity: scrollProgress > 0.05 ? 0 : 0.85, transition: 'opacity 0.4s ease' }}
          >
            <span className="scroll-cue-text">SCROLL TO EXPERIENCE</span>
            <ChevronDown size={18} className="scroll-arrow" />
          </div>
        </div>
      </section>
    </>
  );
}
