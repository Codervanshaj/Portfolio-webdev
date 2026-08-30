"use client";

import React, { useRef, useState, useMemo } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/animations/gsap";
import { PROJECTS } from "@/lib/constants/data";
import { Project } from "@/types";

interface TrailCardData {
  id: number;
  x: number;
  y: number;
  image: string;
  rotation: number;
}

// Child component representing an individual image in the hover trail.
// It handles its own entrance (subtle zoom & fade in) and exit (scale down & fade out) animations via GSAP.
function TrailCard({ card, onClose }: { card: TrailCardData; onClose: () => void }) {
  const ref = useRef<SVGGElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ onComplete: onClose });

    // Smooth entrance animation: linear fade and very subtle scale zoom
    tl.fromTo(
      ref.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.22, ease: "power2.out" }
    );

    // Smooth exit animation: linear fade and scale down
    tl.to(
      ref.current,
      { scale: 0.95, opacity: 0, duration: 0.3, delay: 0.65, ease: "power2.inOut" }
    );
  }, []);

  return (
    <g
      ref={ref}
      transform={`translate(${card.x}, ${card.y}) rotate(${card.rotation})`}
      style={{ transformOrigin: "center", transformBox: "fill-box" }}
    >
      {/* Raw image only: no rounded clips, drop-shadow filters, or background rectangles */}
      <image
        href={card.image}
        x="-50"
        y="-70"
        width="100"
        height="140"
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
  );
}

export default function BigLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cards, setCards] = useState<TrailCardData[]>([]);

  // Select 5 unique projects with distinct visuals for the trail
  const selectedProjects = useMemo(() => {
    const ids = ["1910ai", "semiconbio", "happyring", "omicron", "puck"];
    return ids
      .map((id) => PROJECTS.find((p) => p.id === id))
      .filter((p): p is Project => !!p);
  }, []);

  const lastPos = useRef({ x: 0, y: 0 });
  const projectIdx = useRef(0);
  const isFirstMove = useRef(true);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Map global screen coordinates to the local SVG viewBox (0 0 851 167)
      const rect = svg.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      const svgX = (localX / rect.width) * 851;
      const svgY = (localY / rect.height) * 167;

      // Calculate distance moved since last spawned card
      const dx = svgX - lastPos.current.x;
      const dy = svgY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Spawn card if mouse has moved a threshold (approx 35 viewBox units)
      if (dist > 35 || isFirstMove.current) {
        isFirstMove.current = false;
        lastPos.current = { x: svgX, y: svgY };

        // Cycle through the selected project images
        const project = selectedProjects[projectIdx.current];
        projectIdx.current = (projectIdx.current + 1) % selectedProjects.length;

        const newCard: TrailCardData = {
          id: Date.now() + Math.random(),
          x: svgX,
          y: svgY,
          image: project.image,
          rotation: (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 5), // alternating -9 to +9 deg
        };

        // Append card and keep maximum cards size constrained to 8 for performance
        setCards((prev) => [...prev.slice(-7), newCard]);
      }
    };

    const handleMouseLeave = () => {
      isFirstMove.current = true;
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [selectedProjects]);

  // Remove card from state when its fade animation completes
  const handleCardClose = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="big-logo-section" id="big-logo">
      <div className="container">
        {/* Wrapping in footer-logo matches Webflow's sidebar offset grids */}
        <div className="footer-logo">
          <div className="w-embed">
            <svg
              className="vansh-mask-svg footer-logo-icon"
              viewBox="0 0 851 167"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ref={svgRef}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <defs>
                {/* SVG clipPath matching the name VANSH letters */}
                <clipPath id="vansh-text-clip">
                  {/* Letter H */}
                  <path d="M678 167V0H724.634V65.2344H786.366V0H833V167H786.366V101.766H724.634V167H678Z" />
                  {/* Letter S */}
                  <path d="M617.639 53.1219C617.207 47.8203 615.182 43.6851 611.564 40.7162C607.999 37.7473 602.572 36.2629 595.282 36.2629C590.638 36.2629 586.831 36.8195 583.861 37.9328C580.945 38.9932 578.785 40.4511 577.381 42.3067C575.976 44.1622 575.247 46.2829 575.193 48.6686C575.085 50.6302 575.436 52.4062 576.246 53.9967C577.11 55.5341 578.461 56.939 580.297 58.2114C582.133 59.4308 584.482 60.5441 587.344 61.5514C590.206 62.5587 593.608 63.46 597.55 64.2552L611.159 67.1181C620.339 69.0267 628.196 71.5449 634.73 74.6729C641.264 77.8008 646.611 81.4854 650.769 85.7267C654.927 89.9149 657.978 94.6333 659.922 99.8819C661.92 105.13 662.946 110.856 663 117.059C662.946 127.768 660.219 136.834 654.819 144.256C649.419 151.678 641.696 157.325 631.652 161.195C621.662 165.065 609.646 167 595.606 167C581.188 167 568.605 164.906 557.859 160.718C547.167 156.529 538.85 150.088 532.91 141.393C527.024 132.646 524.054 121.459 524 107.834H566.769C567.039 112.818 568.308 117.006 570.576 120.399C572.844 123.792 576.031 126.363 580.135 128.113C584.293 129.862 589.234 130.737 594.958 130.737C599.764 130.737 603.787 130.154 607.027 128.988C610.267 127.821 612.725 126.204 614.399 124.137C616.073 122.069 616.937 119.71 616.991 117.059C616.937 114.567 616.1 112.394 614.48 110.538C612.914 108.63 610.322 106.933 606.703 105.449C603.085 103.911 598.198 102.48 592.042 101.154L575.518 97.6552C560.829 94.5273 549.246 89.3052 540.767 81.9891C532.343 74.6198 528.158 64.5733 528.212 51.8495C528.158 41.5114 530.966 32.4722 536.636 24.7319C542.361 16.9386 550.272 10.8683 560.37 6.52095C570.522 2.17365 582.16 0 595.282 0C608.674 0 620.258 2.20016 630.032 6.60048C639.806 11.0008 647.34 17.2037 652.632 25.2091C657.978 33.1614 660.678 42.4657 660.732 53.1219H617.639Z" />
                  {/* Letter N */}
                  <path d="M507 0V167H463.009L392.851 79.2598H391.713V167H339V0H383.749L452.77 87.4141H454.287V0H507Z" />
                  {/* Letter A */}
                  <path d="M196.716 167H147L203.013 0H265.987L322 167H272.284L235.163 45.9902H233.837L196.716 167ZM187.436 101.113H280.901V135.035H187.436V101.113Z" />
                  {/* Letter V */}
                  <path d="M53.5227 0L89.3182 117.748H90.6818L126.477 0H180L122.386 167H57.6136L0 0H53.5227Z" />
                </clipPath>
              </defs>

              {/* Base Layer: Solid yellow letters when not hovered */}
              <g clipPath="url(#vansh-text-clip)">
                <rect
                  width="851"
                  height="167"
                  fill="#FFFF23"
                  className="vansh-logo-base-rect"
                />
              </g>

              {/* Card Trail Reveal Layer: Spawns overlapping project cards inside the letters */}
              <g clipPath="url(#vansh-text-clip)">
                {cards.map((card) => (
                  <TrailCard
                    key={card.id}
                    card={card}
                    onClose={() => handleCardClose(card.id)}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
