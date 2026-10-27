import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { soundscape } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

const CRAFT_VIDEOS = [
  {
    id: "v01",
    src: "/videos/chocolate-v01-cocoa-pod.mp4",
    tag: "Chapter I",
    title: "HARVEST AT DAWN",
    desc: "Single-origin heirloom pods harvested in morning mountain mist."
  },
  {
    id: "v02",
    src: "/videos/chocolate-v02-beans-roasting.mp4",
    tag: "Chapter II",
    title: "FIRE ROASTING",
    desc: "Applewood ember aeration coaxing out dried plum and deep smoke."
  },
  {
    id: "v03",
    src: "/videos/chocolate-v03-cocoa-transformation.mp4",
    tag: "Chapter III",
    title: "THE METAMORPHOSIS",
    desc: "Stone grinding nibs into molten black nectar over 72 slow hours."
  },
  {
    id: "v04",
    src: "/videos/chocolate-v04-chocolate-flows.mp4",
    tag: "Chapter IV",
    title: "THE LIQUID RIBBON",
    desc: "Pure single-estate chocolate flowing at tempered satin temperatures."
  },
  {
    id: "v05",
    src: "/videos/chocolate-v05-chocolate-sets.mp4",
    tag: "Chapter V",
    title: "CRYSTALLIZATION",
    desc: "Beta-V crystal formation setting the bar into its mirror finish."
  },
  {
    id: "v06",
    src: "/videos/chocolate-v06-hand-picks-up.mp4",
    tag: "Chapter VI",
    title: "THE FIRST TASTE",
    desc: "The harmonic snap and sensory journey of pure Venezuelan Criollo."
  }
];

export default function CraftsmanshipRail() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let ctx = gsap.context(() => {
      // Horizontal scroll pinning only on desktop/tablet
      if (window.innerWidth > 1024) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 140),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const toggleVideoPlayback = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    soundscape.playClick();
    if (video.paused) {
      // Pause others
      Object.keys(videoRefs.current).forEach(k => {
        if (k !== id && videoRefs.current[k]) {
          videoRefs.current[k].pause();
        }
      });
      video.play().then(() => setPlayingVideoId(id)).catch(() => {});
    } else {
      video.pause();
      setPlayingVideoId(null);
    }
  };

  return (
    <section id="craftsmanship" ref={sectionRef} className="craftsmanship-rail-section">
      <div className="craft-sticky-heading">
        <span className="craft-kicker">CINEMATIC ARCHIVE // 01 — 06</span>
        <h2 className="craft-title">CHRONICLES OF CRAFTSMANSHIP</h2>
        <p className="craft-desc">
          Drag or scroll through our six-part visual documentary captured at the estate atelier.
        </p>
      </div>

      <div className="horizontal-track-container">
        <div ref={trackRef} className="horizontal-rail-track">
          {CRAFT_VIDEOS.map((item) => (
            <div
              key={item.id}
              className="rail-card"
              onClick={() => toggleVideoPlayback(item.id)}
            >
              <div className="rail-video-wrap">
                <video
                  ref={el => (videoRefs.current[item.id] = el)}
                  src={item.src}
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="rail-video"
                />
                <div className="rail-video-overlay"></div>

                <div className="rail-play-badge">
                  {playingVideoId === item.id ? (
                    <Pause size={18} color="#C6A46C" />
                  ) : (
                    <Play size={18} color="#C6A46C" />
                  )}
                </div>
              </div>

              <div className="rail-card-meta">
                <div className="rail-card-tag">{item.tag}</div>
                <h4 className="rail-card-title">{item.title}</h4>
                <p className="rail-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
