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
      right: "calc(100% - 82.5% + 40px)",
      left: "auto",
      top: "21.33%",
    }
  },
  2025: {
    year: "'25",
    title: "Scaling Development & Automation",
    description: "During 2025, the focus shifted to optimization and scalability. I built robust CI/CD deployment pipelines, automated system health monitors, and established reliable containerized server setups. By streamlining developer workflows and removing infrastructure bottlenecks, I helped organizations reduce operational overhead, decrease feature lead times, and run high-traffic applications with 99.9% uptime.",
    style: {
      left: "calc(20.83% + 40px)",
      right: "auto",
      top: "51.11%",
    }
  },
  2026: {
    year: "'26",
    title: "Building Production Systems",
    description: "In 2026, I am engineering state-of-the-art production web platforms. Utilizing high-performance Next.js architectures, modern state-management systems, and custom GSAP web animations, I deliver premium user interfaces with zero-compromise speed. Combined with deep technical SEO configurations and responsive layouts, these applications provide unparalleled user engagement and long-term business value.",
    style: {
      right: "calc(100% - 80% + 40px)",
      left: "auto",
      top: "82.22%",
    }
  }
};

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);

  // Outer Wrapper Refs for Parallax
  const cardOuter1Ref = useRef<HTMLDivElement>(null);
  const cardOuter2Ref = useRef<HTMLDivElement>(null);
  const cardOuter3Ref = useRef<HTMLDivElement>(null);

  // Inner Container Refs for Entrance and Active Highlight States
  const cardInner1Ref = useRef<HTMLDivElement>(null);
  const cardInner2Ref = useRef<HTMLDivElement>(null);
  const cardInner3Ref = useRef<HTMLDivElement>(null);

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
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();

      // SVG path setup
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Nodes setup (initially hidden)
      gsap.set([node1Ref.current, node2Ref.current, node3Ref.current], {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
      });

      // Cards setup (initially hidden)
      gsap.set([cardInner1Ref.current, cardInner2Ref.current, cardInner3Ref.current], {
        opacity: 0,
        y: 50,
        filter: "blur(8px)",
      });

      // Timeline path and nodes timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. Draw the path
      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

      // 2. Node 1 and Card 1 reveal at progress 0.22
      tl.to(node1Ref.current, { scale: 1, opacity: 1, duration: 0.08, ease: "power2.out" }, 0.22)
        .to(cardInner1Ref.current, { y: 0, opacity: 0.9, filter: "blur(0px)", duration: 0.12, ease: "power2.out" }, 0.22);

      // 3. Node 2 and Card 2 reveal at progress 0.58
      tl.to(node2Ref.current, { scale: 1, opacity: 1, duration: 0.08, ease: "power2.out" }, 0.58)
        .to(cardInner2Ref.current, { y: 0, opacity: 0.9, filter: "blur(0px)", duration: 0.12, ease: "power2.out" }, 0.58);

      // 4. Node 3 and Card 3 reveal at progress 0.90
      tl.to(node3Ref.current, { scale: 1, opacity: 1, duration: 0.08, ease: "power2.out" }, 0.90)
        .to(cardInner3Ref.current, { y: 0, opacity: 0.9, filter: "blur(0px)", duration: 0.12, ease: "power2.out" }, 0.90);

      // Card parallax, and active triggers
      const cards = [
        { outer: cardOuter1Ref.current, inner: cardInner1Ref.current },
        { outer: cardOuter2Ref.current, inner: cardInner2Ref.current },
        { outer: cardOuter3Ref.current, inner: cardInner3Ref.current },
      ];

      cards.forEach(({ outer, inner }) => {
        if (!outer || !inner) return;

        // Parallax scrubber
        gsap.fromTo(
          outer,
          { yPercent: -50, y: -20 },
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
          { opacity: 0.35, duration: 0.20, ease: "power2.out" }
        );

        gsap.fromTo(
          detailCardRef.current,
          {
            opacity: 0,
            scale: 0.96,
            yPercent: -50,
            y: 20,
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
          scale: 0.96,
          yPercent: -50,
          y: 20,
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
          left: "22vw",
          top: "80px",
          width: "480px",
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
            maxWidth: "420px",
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
        <path
          ref={pathRef}
          d="M 1188,120 L 1188,480 C 1188,800 300,750 300,1150 C 300,1550 1152,1450 1152,1850"
          stroke="#171715"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* ─── Responsive Yellow Nodes (HTML Divs) ─── */}
      {/* Node 2024 */}
      <div
        ref={node1Ref}
        className="timeline-node absolute w-[16px] h-[16px] bg-[#F4FF00] border-2 border-[#171715] rounded-full select-none pointer-events-auto transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.12]"
        style={{
          left: "82.5%",
          top: "21.33%",
          marginLeft: "-8px",
          marginTop: "-8px",
        }}
      />

      {/* Node 2025 */}
      <div
        ref={node2Ref}
        className="timeline-node absolute w-[16px] h-[16px] bg-[#F4FF00] border-2 border-[#171715] rounded-full select-none pointer-events-auto transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.12]"
        style={{
          left: "20.83%",
          top: "51.11%",
          marginLeft: "-8px",
          marginTop: "-8px",
        }}
      />

      {/* Node 2026 */}
      <div
        ref={node3Ref}
        className="timeline-node absolute w-[16px] h-[16px] bg-[#F4FF00] border-2 border-[#171715] rounded-full select-none pointer-events-auto transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.12]"
        style={{
          left: "80%",
          top: "82.22%",
          marginLeft: "-8px",
          marginTop: "-8px",
        }}
      />

      {/* ─── Journey Cards ─── */}
      {/* Card 2024 (Left of first node) */}
      <div
        ref={cardOuter1Ref}
        className="timeline-card absolute w-[420px] pointer-events-auto"
        style={{
          right: "calc(100% - 82.5% + 40px)",
          top: "21.33%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          ref={cardInner1Ref}
          className="timeline-card-inner w-full bg-[#DFDECE]/80 backdrop-blur-[10px] rounded-[28px] p-8 md:p-[32px]"
        >
          <div className="font-sans font-black text-[clamp(72px,6vw,110px)] text-[#F4FF00] leading-none mb-3">
            '24
          </div>
          <h3 className="font-sans font-extrabold text-[clamp(20px,1.8vw,26px)] text-[#171715] leading-[1.1] mb-4">
            Started Building AI & Cloud Projects
          </h3>
          <p className="font-sans text-[14px] font-normal leading-[1.5] text-[#595854] mb-6">
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
                <span className="font-sans font-bold text-[13px] text-[#171715]">
                  @developer
                </span>
                <span className="font-sans text-[11px] text-[#6B6A65] mt-1">
                  2 years ago
                </span>
              </div>
            </div>
            <button
              onClick={() => openDetailCard(2024)}
              className="group bg-white hover:bg-white text-[#171715] font-sans font-extrabold text-[12px] tracking-[0.02em] rounded-full px-5 py-2 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex items-center gap-2 overflow-hidden shrink-0"
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
          left: "calc(20.83% + 40px)",
          top: "51.11%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          ref={cardInner2Ref}
          className="timeline-card-inner w-full bg-[#DFDECE]/80 backdrop-blur-[10px] rounded-[28px] p-8 md:p-[32px]"
        >
          <div className="font-sans font-black text-[clamp(72px,6vw,110px)] text-[#F4FF00] leading-none mb-3">
            '25
          </div>
          <h3 className="font-sans font-extrabold text-[clamp(20px,1.8vw,26px)] text-[#171715] leading-[1.1] mb-4">
            Scaling Development & Automation
          </h3>
          <p className="font-sans text-[14px] font-normal leading-[1.5] text-[#595854] mb-6">
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
                <span className="font-sans font-bold text-[13px] text-[#171715]">
                  @automation
                </span>
                <span className="font-sans text-[11px] text-[#6B6A65] mt-1">
                  1 year ago
                </span>
              </div>
            </div>
            <button
              onClick={() => openDetailCard(2025)}
              className="group bg-white hover:bg-white text-[#171715] font-sans font-extrabold text-[12px] tracking-[0.02em] rounded-full px-5 py-2 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex items-center gap-2 overflow-hidden shrink-0"
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
          right: "calc(100% - 80% + 40px)",
          top: "82.22%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          ref={cardInner3Ref}
          className="timeline-card-inner w-full bg-[#DFDECE]/80 backdrop-blur-[10px] rounded-[28px] p-8 md:p-[32px]"
        >
          <div className="font-sans font-black text-[clamp(72px,6vw,110px)] text-[#F4FF00] leading-none mb-3">
            '26
          </div>
          <h3 className="font-sans font-extrabold text-[clamp(20px,1.8vw,26px)] text-[#171715] leading-[1.1] mb-4">
            Building Production Systems
          </h3>
          <p className="font-sans text-[14px] font-normal leading-[1.5] text-[#595854] mb-6">
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
                <span className="font-sans font-bold text-[13px] text-[#171715]">
                  @vanshaj
                </span>
                <span className="font-sans text-[11px] text-[#6B6A65] mt-1">
                  just now
                </span>
              </div>
            </div>
            <button
              onClick={() => openDetailCard(2026)}
              className="group bg-white hover:bg-white text-[#171715] font-sans font-extrabold text-[12px] tracking-[0.02em] rounded-full px-5 py-2 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex items-center gap-2 overflow-hidden shrink-0"
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

      {/* ─── Dark Overlay ─── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/35 z-[40] cursor-pointer select-none pointer-events-auto"
        style={{ display: "none", opacity: 0 }}
        onClick={closeDetailCard}
      />

      {/* ─── Custom Floating Detail Card ─── */}
      <div
        ref={detailCardRef}
        className="timeline-card absolute w-[480px] bg-[#171715] rounded-[30px] p-10 md:p-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[50] pointer-events-auto text-white select-none"
        style={{
          display: "none",
          opacity: 0,
          transform: "translateY(-50%)",
          ...(renderedYear ? DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].style : {}),
        }}
      >
        {renderedYear && (
          <>
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-[#2A2A25] hover:bg-[#3A3A33] text-white flex items-center justify-center font-bold text-[18px] transition-colors cursor-pointer select-none border border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] pointer-events-auto"
              onClick={closeDetailCard}
              aria-label="Close detail modal"
            >
              &times;
            </button>

            {/* Year */}
            <div className="font-sans font-black text-[clamp(64px,5.5vw,96px)] text-[#F4FF00] leading-none mb-3">
              {DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].year}
            </div>

            {/* Title */}
            <h3 className="font-sans font-extrabold text-[clamp(24px,2.2vw,32px)] text-white leading-[1.1] mb-4">
              {DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].title}
            </h3>

            {/* Long Description */}
            <p className="font-sans text-[15px] font-normal leading-[1.6] text-white/80">
              {DETAIL_DATA[renderedYear as keyof typeof DETAIL_DATA].description}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
