import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: 1,
    title: "THE SACRED POD",
    subtitle: "Chuao Valley • Single Estate Criollo",
    image: "/images/chocolate-01-cocoa-pod.jpeg",
    body: "Wild-harvested deep within protected mountain reserves. Each ruby and golden pod is clipped by hand at the precise dawn of ripeness, ensuring the intact botanical envelope protects the delicate sweet white pulp.",
    specs: [
      { label: "Origin", value: "Chuao, Aragua" },
      { label: "Elevation", value: "1,240m AMSL" },
      { label: "Harvest", value: "Lunar Solstice" }
    ]
  },
  {
    id: 2,
    title: "FERMENTATION & SUN-DRYING",
    subtitle: "Natural Cask Fermentation",
    image: "/images/chocolate-03-cocoa-beans-revealed.jpeg",
    body: "Enclosed in tiered cedar wood fermentation boxes for exactly 144 hours. Ambient wild yeasts develop profound fruity, wine-like esters before the beans are solar-cured on open terracotta patios under equatorial sunshine.",
    specs: [
      { label: "Ferment", value: "6 Full Days" },
      { label: "Cask Wood", value: "Indigenous Cedar" },
      { label: "Moisture", value: "6.8% Target" }
    ]
  },
  {
    id: 3,
    title: "ARTISANAL WOODFIRE ROAST",
    subtitle: "Low Temperature Aeration",
    image: "/images/chocolate-05-roasted-cocoa-beans.jpeg",
    body: "Our roast masters reject industrial convection. Roasted over embers of seasoned applewood and cacao shell char, coaxing out subtleties of raw honeycomb, roasted pecan, and smoked dark cherry without scorching delicate fatty lipids.",
    specs: [
      { label: "Profile", value: "Slow Gentle Low-Heat" },
      { label: "Fuel", value: "Aged Applewood" },
      { label: "Aroma Notes", value: "Tobacco & Plum" }
    ]
  },
  {
    id: 4,
    title: "VELVET CONCHING & TEMPERING",
    subtitle: "Stone Ground to 10 Microns",
    image: "/images/chocolate-06-beans-transforming.jpeg",
    body: "Crushed nibs are stone-milled in granite melangers for 72 continuous hours. Mechanical shearing rounds off every sharp cocoa crystal until the texture surpasses silk, achieving our iconic glass-smooth surface and resonance snap.",
    specs: [
      { label: "Granite Stone", value: "Porphyry Granite" },
      { label: "Duration", value: "72 Hours Continuous" },
      { label: "Fineness", value: "< 11 Microns" }
    ]
  }
];

export default function StickyExplainer() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const panels = panelsRef.current;
    const triggers = [];

    panels.forEach((panel, index) => {
      if (!panel) return;
      const st = ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStage(index),
        onEnterBack: () => setActiveStage(index)
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="explainer" ref={containerRef} className="explainer-section">
      <div className="explainer-header">
        <span className="explainer-kicker">Genesis • The Bean-To-Bar Method</span>
        <h2 className="explainer-title">THE ARCHITECTURE OF TASTE</h2>
      </div>

      <div className="explainer-layout">
        {/* Sticky Left Column with Crossfading Visual Stage */}
        <div className="explainer-left">
          <div className="explainer-visual-stage">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                className={`explainer-img-wrap ${activeStage === idx ? 'active' : ''}`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="explainer-img"
                  loading="lazy"
                />
                <div className="explainer-img-tint"></div>
              </div>
            ))}

            <div className="explainer-badge">
              <span className="badge-dot"></span>
              <span>PHASE 0{activeStage + 1} // {STAGES[activeStage].title}</span>
            </div>
          </div>
        </div>

        {/* Right Column with Narrative Panels */}
        <div className="explainer-right">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              ref={el => (panelsRef.current[idx] = el)}
              className={`explainer-panel ${activeStage === idx ? 'panel-focused' : ''}`}
            >
              <div className="panel-num">PHASE 0{stage.id}</div>
              <h3 className="panel-title">{stage.title}</h3>
              <div className="panel-sub">{stage.subtitle}</div>
              <p className="panel-body">{stage.body}</p>

              <div className="panel-specs">
                {stage.specs.map((s, i) => (
                  <div key={i} className="spec-item">
                    <span className="spec-label">{s.label}</span>
                    <span className="spec-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
