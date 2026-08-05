"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DETAIL_DATA = {
  2024: {
    year: "'24",
    title: "Started Building AI & Cloud Projects",
    description: "In 2024, I focused heavily on integrating advanced artificial intelligence models and scalable cloud microservices. I designed and deployed serverless APIs, built machine learning ingestion pipelines, and automated complex business logic workflows. This allowed me to bridge the gap between heavy backend automation and high-performance server architectures, delivering robust and cost-effective digital solutions for clients looking to harness AI.",
    style: {
      right: "calc(100% - 92% + 40px)",
      left: "auto",
      top: "28%",
    }
  },
  2025: {
    year: "'25",
    title: "Scaling Development & Automation",
    description: "During 2025, the focus shifted to optimization and scalability. I built robust CI/CD deployment pipelines, automated system health monitors, and established reliable containerized server setups. By streamlining developer workflows and removing infrastructure bottlenecks, I helped organizations reduce operational overhead, decrease feature lead times, and run high-traffic applications with 99.9% uptime.",
    style: {
      left: "calc(18% + 40px)",
      right: "auto",
      top: "54%",
    }
  },
  2026: {
    year: "'26",
    title: "Building Production Systems",
    description: "In 2026, I am engineering state-of-the-art production web platforms. Utilizing high-performance Next.js architectures, modern state-management systems, and custom GSAP web animations, I deliver premium user interfaces with zero-compromise speed. Combined with deep technical SEO configurations and responsive layouts, these applications provide unparalleled user engagement and long-term business value.",
    style: {
      right: "calc(100% - 82% + 40px)",
      left: "auto",
      top: "82%",
    }
  }
};

interface StaticRollingYearProps {
  year: string;
  digitRef: React.RefObject<HTMLSpanElement | null>;
}

function StaticRollingYear({ year, digitRef }: StaticRollingYearProps) {
  const lastChar = year.charAt(year.length - 1);
  const staticPart = year.slice(0, year.length - 1); // e.g. "'2"
  
  const currDigit = parseInt(lastChar);
  const prevDigit = currDigit - 1;

  return (
    <span className="inline-flex items-baseline font-sans font-black text-[clamp(72px,6vw,110px)] text-[#F4FF00] leading-none mb-3 select-none">
      <span>{staticPart}</span>
      <span className="relative inline-block overflow-hidden h-[1em] w-[0.65em] align-baseline">
        <span
          ref={digitRef}
          className="absolute top-0 left-0 flex flex-col w-full"
          style={{
            height: "2em",
            transform: "translateY(0%)",
          }}
        >
          <span className="h-[1em] flex items-center justify-center leading-none">{prevDigit}</span>
          <span className="h-[1em] flex items-center justify-center leading-none">{currDigit}</span>
        </span>
      </span>
    </span>
  );
}

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  // Outer Wrapper Refs for Parallax
  const cardOuter1Ref = useRef<HTMLDivElement>(null);
  const cardOuter2Ref = useRef<HTMLDivElement>(null);
  const cardOuter3Ref = useRef<HTMLDivElement>(null);

  // Inner Container Refs for Entrance and Active Highlight States
  const cardInner1Ref = useRef<HTMLDivElement>(null);
  const cardInner2Ref = useRef<HTMLDivElement>(null);
  const cardInner3Ref = useRef<HTMLDivElement>(null);

  // New dashed path refs
  const dashPathRef = useRef<SVGPathElement>(null);
  const progressDashPathRef = useRef<SVGPathElement>(null);

  // SVG Waypoint Circle Refs
  const svgCircle1Ref = useRef<SVGCircleElement>(null);
  const svgCircle2Ref = useRef<SVGCircleElement>(null);
  const svgCircle3Ref = useRef<SVGCircleElement>(null);

  // Decorative Connector Line Refs (Faded vertical lines side-by-side with cards)
  const connectorLine1Ref = useRef<HTMLDivElement>(null);
  const connectorLine2Ref = useRef<HTMLDivElement>(null);
  const connectorLine3Ref = useRef<HTMLDivElement>(null);

  // Year Digit Rolling Container Refs
  const yearDigit1Ref = useRef<HTMLSpanElement>(null);
  const yearDigit2Ref = useRef<HTMLSpanElement>(null);
  const yearDigit3Ref = useRef<HTMLSpanElement>(null);

  // Detail Card & Overlay Refs
  const detailCardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Interactive States
  const [activeCardYear, setActiveCardYear] = useState<number | null>(null);
  const [renderedYear, setRenderedYear] = useState<number | null>(null);

  const openDetailCard = (year: number) => {
    setRenderedYear(year);
    setActiveCardYear(year);
  };

  const closeDetailCard = () => {
    setActiveCardYear(null);
  };

  // ─── Hook 1: ScrollTrigger Animations (Paths, Nodes, Cards Entry & Parallax) ───
  useGSAP(
    () => {
      const path = progressPathRef.current;
      const dashPath = progressDashPathRef.current;
      if (!path || !dashPath) return;

      const length = path.getTotalLength() || 2100;
      const dashLength = dashPath.getTotalLength() || 150;

      const mm = gsap.matchMedia();

      // Desktop layout: apply ScrollTrigger drawing, connectors, and parallax
      mm.add("(min-width: 768px)", () => {
        // SVG path setup
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.set(dashPath, {
          strokeDasharray: dashLength,
          strokeDashoffset: dashLength,
        });

        // SVG circles setup (all circles are always visible)
        gsap.set([svgCircle1Ref.current, svgCircle2Ref.current, svgCircle3Ref.current], {
          scale: 1,
          transformOrigin: "50% 50%",
        });

        // Year digits setup (always at translateY(-50%))
        gsap.set([yearDigit1Ref.current, yearDigit2Ref.current, yearDigit3Ref.current], {
          yPercent: -50,
        });

        // Timeline path and nodes timeline (triggering based on the 1st dot position to ensure it starts when visible)
        // We set the end to 'top+=1845 60%' (when the 3rd dot reaches 60% of viewport) to guarantee it's fully reachable
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=630 80%",
            end: "top+=1845 60%",
            scrub: true,
          },
        });

        // 1. Draw the paths sequentially, starting from the 1st dot (y=630) to the end of the dashed path (y=1890)
        tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 0.95 }, 0);
        tl.to(dashPath, { strokeDashoffset: 0, ease: "none", duration: 0.05 }, 0.95);

        // Card parallax, entrance reveal, and active triggers
        const cards = [
          { outer: cardOuter1Ref.current, inner: cardInner1Ref.current, connector: connectorLine1Ref.current },
          { outer: cardOuter2Ref.current, inner: cardInner2Ref.current, connector: connectorLine2Ref.current },
          { outer: cardOuter3Ref.current, inner: cardInner3Ref.current, connector: connectorLine3Ref.current },
        ];

        cards.forEach(({ outer, inner, connector }, index) => {
          if (!outer || !inner || !connector) return;

          // Set initial hidden state for entry reveal (shifted down to appear from bottom)
          gsap.set(inner, { opacity: 0, y: 50 });
          gsap.set(connector, { scaleY: 0, transformOrigin: "top center" });
          const children = gsap.utils.toArray(inner.children);
          gsap.set(children, { opacity: 0, y: 20 });

          // Entrance reveal timeline as the card scrolls into view (independent of the journey line)
          gsap.timeline({
            scrollTrigger: {
              trigger: outer,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            }
          })
          .to(inner, { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }, 0)
          .to(connector, { scaleY: 1, ease: "power1.inOut", duration: 0.3 }, 0.05)
          .to(children, { opacity: 1, y: 0, stagger: 0.05, ease: "power2.out", duration: 0.25 }, 0.05);

          // Parallax scrubber
          gsap.fromTo(
            outer,
            { yPercent: 0, y: -20 },
            {
              y: 20,
              scrollTrigger: {
                trigger: outer,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          // Centering highlight trigger
          ScrollTrigger.create({
            trigger: outer,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) {
                inner.classList.add("is-active");
              } else {
                inner.classList.remove("is-active");
              }
            },
          });
        });
      });

      // Mobile layout: render static fully drawn timeline without scroll triggers
      mm.add("(max-width: 767px)", () => {
        // Draw paths fully
        gsap.set([path, dashPath], { strokeDashoffset: 0 });

        // Show cards statically
        gsap.set([cardInner1Ref.current, cardInner2Ref.current, cardInner3Ref.current], { opacity: 1, y: 0, filter: "none" });
        gsap.set([svgCircle1Ref.current, svgCircle2Ref.current, svgCircle3Ref.current], { scale: 1 });
        gsap.set([connectorLine1Ref.current, connectorLine2Ref.current, connectorLine3Ref.current], { scaleY: 1 });
        gsap.set([yearDigit1Ref.current, yearDigit2Ref.current, yearDigit3Ref.current], { yPercent: -50 });

        // Show card children statically
        const card1Children = cardInner1Ref.current ? gsap.utils.toArray(cardInner1Ref.current.children) : [];
        const card2Children = cardInner2Ref.current ? gsap.utils.toArray(cardInner2Ref.current.children) : [];
        const card3Children = cardInner3Ref.current ? gsap.utils.toArray(cardInner3Ref.current.children) : [];
        gsap.set([...card1Children, ...card2Children, ...card3Children], { opacity: 1, y: 0 });
      });

      // Return clean callback
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // ─── Hook 2: Reactive Detail Card Animations (Open / Close Click Triggers) ───
  useGSAP(
    () => {
      if (activeCardYear !== null) {
        // OPEN TRANSITION (Overlay fades in, card delayed)
        gsap.set(overlayRef.current, { display: "block" });
        gsap.set(detailCardRef.current, { display: "block" });

        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 0.45, duration: 0.20, ease: "power2.out" }
        );

        gsap.fromTo(
          detailCardRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            delay: 0.10, // Stagger detail card entrance
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      } else if (renderedYear !== null) {
        // CLOSE TRANSITION (Card fades out, overlay disappears last)
        gsap.to(detailCardRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 30,
          duration: 0.35,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(detailCardRef.current, { display: "none" });
            setRenderedYear(null); // Clear content container only after animation completes
          },
        });

        gsap.to(overlayRef.current, {
          opacity: 0,
          delay: 0.15, // Let overlay vanish last
          duration: 0.20,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none" });
          },
        });
      }
    },
    { scope: containerRef, dependencies: [activeCardYear, renderedYear] }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-20 w-full bg-transparent overflow-hidden select-none"
      style={{ height: "2250px", marginTop: "-15vh" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .timeline-card {
            left: 5vw !important;
            right: auto !important;
            width: 90vw !important;
            max-width: none !important;
          }
          .gsap-about-content {
            left: 5vw !important;
            top: 40px !important;
            width: 90vw !important;
          }
        }
        
        /* CSS-driven micro-interactions for timeline cards to prevent JS override conflicts */
        .timeline-card-inner {
          opacity: 0.9;
          filter: blur(0px);
          transform: translateY(0px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                      opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                      filter 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        /* Active (centered) state */
        .timeline-card-inner.is-active {
          opacity: 1.0 !important;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.07) !important;
        }
        
        /* Hover lift behavior (exactly 8px lift and slightly increased shadow) */
        .timeline-card-inner:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05) !important;
        }
        
        /* Node hover scale interaction */
        .timeline-node:hover {
          transform: scale(1.12) !important;
        }
      `}} />

      {/* ─── About Intro Content (Merged) ─── */}
      <div
        className="absolute flex flex-col items-start gsap-about-content"
        style={{
          left: "24vw",
          top: "80px",
          width: "500px",
          maxWidth: "75vw",
        }}
      >
        <div
          className="px-4 py-2 border rounded-full border-[#171715]/10 font-bold uppercase select-none leading-none inline-flex"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "10px",
            color: "#171715",
            letterSpacing: "0.08em",
            marginBottom: "20px",
            backgroundColor: "#DFDECE",
          }}
        >
          Start small grow big
        </div>
        <h2
          className="font-sans font-black leading-[0.9] text-[#171715] tracking-tight text-[clamp(44px,4.8vw,76px)]"
          style={{
            marginBottom: "24px",
          }}
        >
          About Me (&)<br />My Journey
        </h2>
        <p
          className="font-sans text-[18px] font-semibold leading-[1.6] text-[#595854]"
          style={{
            maxWidth: "440px",
          }}
        >
          Seven years ago I opened Webflow for the first time. What happened after that is easier to show than explain.
        </p>
      </div>

      {/* ─── Trigger element for #timeline ScrollTrigger ─── */}
      <div id="timeline" className="absolute top-[400px] w-full h-[calc(100%-400px)] pointer-events-none" />

      {/* ─── Timeline Canvas (SVG Path) ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 2250"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background solid track (hidden) */}
        <path
          ref={pathRef}
          d="M 1309,630 C 1309,950 275,900 275,1215 C 275,1550 656,1800 756,1845"
          stroke="#171715"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="hidden"
        />
        {/* Active solid progress line (Thicker for high visibility) */}
        <path
          ref={progressPathRef}
          d="M 1309,630 C 1309,950 275,900 275,1215 C 275,1550 656,1800 756,1845"
          stroke="#171715"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Background dashed track (hidden) */}
        <path
          ref={dashPathRef}
          d="M 756,1845 C 806,1867.5 836,1880 856,1890"
          stroke="#171715"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6,6"
          fill="none"
          className="hidden"
        />
        {/* Active dashed progress line (Thicker for high visibility) */}
        <path
          ref={progressDashPathRef}
          d="M 756,1845 C 806,1867.5 836,1880 856,1890"
          stroke="#171715"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="6,6"
          fill="none"
        />
        {/* Waypoint Dots */}
        <circle
          ref={svgCircle1Ref}
          cx="1309"
          cy="630"
          r="8"
          fill="#F4FF00"
          stroke="#171715"
          strokeWidth="2"
          className="timeline-node pointer-events-auto cursor-pointer transition-transform duration-[250ms] ease-out"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        />
        <circle
          ref={svgCircle2Ref}
          cx="275"
          cy="1215"
          r="8"
          fill="#F4FF00"
          stroke="#171715"
          strokeWidth="2"
          className="timeline-node pointer-events-auto cursor-pointer transition-transform duration-[250ms] ease-out"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        />
        <circle
          ref={svgCircle3Ref}
          cx="756"
          cy="1845"
          r="8"
          fill="#F4FF00"
          stroke="#171715"
          strokeWidth="2"
          className="timeline-node pointer-events-auto cursor-pointer transition-transform duration-[250ms] ease-out"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        />
      </svg>

      {/* ─── Journey Cards ─── */}
      {/* Card 2024 (Left of first node) */}
      <div
        ref={cardOuter1Ref}
        className="timeline-card absolute w-[420px] pointer-events-auto"
        style={{
          right: "calc(100% - 92% + 40px)",
          bottom: "calc(100% - 28% + 12px)",
        }}
      >
        {/* Decorative Vertical Connector Line (faded gradient) */}
        <div className="hidden md:flex absolute left-full ml-6 top-0 bottom-[-20px] w-4 flex-col items-center pointer-events-none">
          <div
            ref={connectorLine1Ref}
            className="w-[1.5px] absolute top-0 bottom-[32px] bg-gradient-to-b from-[#171715]/40 to-transparent origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div
          ref={cardInner1Ref}
          className="timeline-card-inner w-full bg-[#DFDECE]/80 backdrop-blur-[10px] rounded-[28px] p-8 md:p-[32px] border border-[#171715]/15"
        >
          <StaticRollingYear year="'24" digitRef={yearDigit1Ref} />
          <h3 className="font-serif font-black text-[clamp(22px,2vw,28px)] text-[#171715] leading-[1.1] mb-4">
            Started Building AI & Cloud Projects
          </h3>
          <p className="font-timeline-sans text-[16px] font-normal leading-[1.6] text-[#595854] mb-6">
            Deep-dived into modern AI integrations and cloud architectures. Developed customized solutions utilizing advanced API designs, cloud functions, and machine learning endpoints to solve automated business workflows.
          </p>
          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#171715]/10 shrink-0">
                <Image
                  src="/Vanshaj-pic.png"
                  alt="Vanshaj"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-timeline-sans font-bold text-[13px] text-[#171715]">
                  @developer
                </span>
                <span className="font-timeline-sans text-[11px] text-[#6B6A65] mt-1">
                  2 years ago
                </span>
              </div>
            </div>
            <button
              onClick={() => openDetailCard(2024)}
              className="group bg-white hover:bg-white text-[#171715] font-timeline-sans font-extrabold text-[12px] tracking-[0.02em] rounded-full px-5 py-2 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex items-center gap-2 overflow-hidden shrink-0"
            >
              {/* Text sliding wrapper */}
              <span className="relative block overflow-hidden h-[18px]">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">
                  Read more
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full pointer-events-none whitespace-nowrap">
                  Read more
                </span>
              </span>
              {/* Arrow transition */}
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-x-[5px]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 2025 (Right of second node) */}
      <div
        ref={cardOuter2Ref}
        className="timeline-card absolute w-[420px] pointer-events-auto"
        style={{
          left: "calc(18% + 40px)",
          bottom: "calc(100% - 54% + 12px)",
        }}
      >
        {/* Decorative Vertical Connector Line (faded gradient) */}
        <div className="hidden md:flex absolute right-full mr-6 top-0 bottom-[-20px] w-4 flex-col items-center pointer-events-none">
          <div
            ref={connectorLine2Ref}
            className="w-[1.5px] absolute top-0 bottom-[32px] bg-gradient-to-b from-[#171715]/40 to-transparent origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div
          ref={cardInner2Ref}
          className="timeline-card-inner w-full bg-[#DFDECE]/80 backdrop-blur-[10px] rounded-[28px] p-8 md:p-[32px] border border-[#171715]/15"
        >
          <StaticRollingYear year="'25" digitRef={yearDigit2Ref} />
          <h3 className="font-serif font-black text-[clamp(22px,2vw,28px)] text-[#171715] leading-[1.1] mb-4">
            Scaling Development & Automation
          </h3>
          <p className="font-timeline-sans text-[16px] font-normal leading-[1.6] text-[#595854] mb-6">
            Focused on optimizing infrastructure, setting up continuous integration pipelines, and streamlining development workflows. Engineered complex serverless systems and automated deployments to scale operations efficiently.
          </p>
          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#171715]/10 shrink-0">
                <Image
                  src="/Vanshaj-pic.png"
                  alt="Vanshaj"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-timeline-sans font-bold text-[13px] text-[#171715]">
                  @automation
                </span>
                <span className="font-timeline-sans text-[11px] text-[#6B6A65] mt-1">
                  1 year ago
                </span>
              </div>
            </div>
            <button
              onClick={() => openDetailCard(2025)}
              className="group bg-white hover:bg-white text-[#171715] font-timeline-sans font-extrabold text-[12px] tracking-[0.02em] rounded-full px-5 py-2 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex items-center gap-2 overflow-hidden shrink-0"
            >
              {/* Text sliding wrapper */}
              <span className="relative block overflow-hidden h-[18px]">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">
                  Read more
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full pointer-events-none whitespace-nowrap">
                  Read more
                </span>
              </span>
              {/* Arrow transition */}
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-x-[5px]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 2026 (Left of third node) */}
      <div
        ref={cardOuter3Ref}
        className="timeline-card absolute w-[420px] pointer-events-auto"
        style={{
          left: "calc(50% + 60px)",
          bottom: "calc(100% - 82% + 12px)",
        }}
      >
        {/* Decorative Vertical Connector Line (faded gradient) */}
        <div className="hidden md:flex absolute right-full mr-6 top-0 bottom-[-20px] w-4 flex-col items-center pointer-events-none">
          <div
            ref={connectorLine3Ref}
            className="w-[1.5px] absolute top-0 bottom-[32px] bg-gradient-to-b from-[#171715]/40 to-transparent origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div
          ref={cardInner3Ref}
          className="timeline-card-inner w-full bg-[#DFDECE]/80 backdrop-blur-[10px] rounded-[28px] p-8 md:p-[32px] border border-[#171715]/15"
        >
          <StaticRollingYear year="'26" digitRef={yearDigit3Ref} />
          <h3 className="font-serif font-black text-[clamp(22px,2vw,28px)] text-[#171715] leading-[1.1] mb-4">
            Building Production Systems
          </h3>
          <p className="font-timeline-sans text-[16px] font-normal leading-[1.6] text-[#595854] mb-6">
            Currently building production-grade, highly scalable web systems. Specializing in high-performance Next.js architectures, premium UI interactions, and technical search engine optimization for clients worldwide.
          </p>
          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#171715]/10 shrink-0">
                <Image
                  src="/Vanshaj-pic.png"
                  alt="Vanshaj"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-timeline-sans font-bold text-[13px] text-[#171715]">
                  @vanshaj
                </span>
                <span className="font-timeline-sans text-[11px] text-[#6B6A65] mt-1">
                  just now
                </span>
              </div>
            </div>
            <button
              onClick={() => openDetailCard(2026)}
              className="group bg-white hover:bg-white text-[#171715] font-timeline-sans font-extrabold text-[12px] tracking-[0.02em] rounded-full px-5 py-2 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex items-center gap-2 overflow-hidden shrink-0"
            >
              {/* Text sliding wrapper */}
              <span className="relative block overflow-hidden h-[18px]">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">
                  Read more
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full pointer-events-none whitespace-nowrap">
                  Read more
                </span>
              </span>
              {/* Arrow transition */}
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-x-[5px]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Fixed Fullscreen Dark Overlay ─── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-[12px] z-[90] cursor-pointer select-none pointer-events-auto"
        style={{ display: "none", opacity: 0 }}
        onClick={closeDetailCard}
      />

      {/* ─── Custom Floating Detail Card (Centered in Viewport Flex Container) ─── */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
      >
        <div
          ref={detailCardRef}
          className="w-[90vw] max-w-[500px] bg-gradient-to-br from-[#3B3D38] via-[#222222] to-[#444444] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.4)] pointer-events-auto text-white select-none relative"
          style={{
            display: "none",
            opacity: 0,
          }}
        >
          {renderedYear && (
            <>
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#2A2A25] hover:bg-white hover:text-[#171715] text-white flex items-center justify-center font-bold text-[20px] transition-all duration-300 cursor-pointer select-none border border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] pointer-events-auto"
                onClick={closeDetailCard}
                aria-label="Close detail modal"
              >
                &times;
              </button>

              {/* Year */}
              <div className="font-timeline-sans font-black text-[clamp(80px,7vw,110px)] text-[#F4FF00] leading-none mb-3 tracking-tighter">
                {DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].year}
              </div>

              {/* Title */}
              <h3 className="font-serif font-extrabold text-[clamp(24px,2.2vw,32px)] text-white leading-[1.1] mb-4">
                {DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].title}
              </h3>

              {/* Long Description */}
              <p className="font-timeline-sans text-[16px] font-normal leading-[1.6] text-white/90">
                {DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].description}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
