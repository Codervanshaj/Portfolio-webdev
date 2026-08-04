"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".gsap-vanshaj",
      { yPercent: 105 },
      { yPercent: 0, duration: 1.15, ease: "power4.out" },
      0
    )
    .fromTo(
      ".gsap-portrait",
      { yPercent: 25 },
      { yPercent: 0, duration: 1.1, ease: "power4.out" },
      0.35
    )
    .fromTo(
      ".gsap-headline-line",
      { yPercent: 110 },
      { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.10 },
      0.75
    )
    .fromTo(
      ".gsap-side-element",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.05 },
      1.1
    )
    .fromTo(
      ".gsap-cta-btn",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 },
      1.3
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "#D7D1C1" }}
    >
      <div
        className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1, top: "5vh", height: "52vh" }}
      >
        <div style={{ overflow: "hidden", display: "flex" }}>
          <span
            className="gsap-vanshaj"
            style={{
              fontFamily: "'Geist', 'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(120px, 49vh, 350px)",
              lineHeight: "0.8",
              letterSpacing: "-0.065em",
              color: "#F4FF00",
              whiteSpace: "nowrap",
              userSelect: "none",
              display: "block",
            }}
          >
            VANSHAJ
          </span>
        </div>
      </div>

      {/* ─── LAYER 2: Stat Cards (Project & Experience) ─── */}
      {/* Project Card */}
      <div
        className="absolute flex items-center justify-center p-4 rounded-[12px] pointer-events-auto gsap-side-element"
        style={{
          zIndex: 2,
          left: "18.2vw",
          top: "56vh",
          width: "15vw",
          height: "16vh",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex items-center gap-4 w-full justify-center">
          {/* Slanted W-like logo */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M15 25h14l12 36 10-36h14l10 36 12-36h13L72 75H56L45 39 34 75H18L15 25z"
              fill="#F4FF00"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(24px, 2.5vw, 36px)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              80+
            </span>
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(10px, 0.8vw, 13px)",
                color: "rgba(255, 255, 255, 0.8)",
                letterSpacing: "0.05em",
                marginTop: "2px",
              }}
            >
              Projects
            </span>
          </div>
        </div>
      </div>

      {/* Experience Card */}
      <div
        className="absolute flex flex-col justify-center px-6 py-4 rounded-[12px] pointer-events-auto gsap-side-element"
        style={{
          zIndex: 2,
          left: "21.2vw",
          top: "75vh",
          width: "9vw",
          height: "22vh",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 3.5vw, 54px)",
            color: "#F4FF00",
            lineHeight: "1",
            letterSpacing: "-0.03em",
          }}
        >
          7+
        </span>
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(10px, 0.8vw, 13px)",
            color: "#FFFFFF",
            letterSpacing: "0.04em",
            lineHeight: "1.3",
            marginTop: "6px",
          }}
        >
          Years of<br />experience
        </span>
      </div>

      {/* ─── LAYER 3: Portrait ─── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none flex justify-center items-end"
        style={{ zIndex: 3, width: "39.5vw", height: "96.5vh" }}
      >
        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
          <div className="relative w-full h-full gsap-portrait">
            <Image
              src="/Vanshaj-pic.png"
              alt="Vanshaj"
              fill
              sizes="39.5vw"
              className="object-cover object-top"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* ─── LAYER 4: White headline overlay on portrait ─── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-center flex flex-col justify-between"
        style={{
          zIndex: 4,
          top: "55vh",
          height: "31vh",
          width: "31vw",
        }}
      >
        <h2
          style={{
            fontFamily: "'Geist', 'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 4.4vw, 75px)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            color: "#FFFFFF",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="gsap-headline-line" style={{ display: "block" }}>Next.js,</span>
          </span>
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="gsap-headline-line" style={{ display: "block" }}>Applied</span>
          </span>
          <span style={{ overflow: "hidden", display: "block" }}>
            <span className="gsap-headline-line" style={{ display: "block" }}>Differently.</span>
          </span>
        </h2>
      </div>

      {/* ─── LAYER 5: Navigation & Descriptor Panel ─── */}
      {/* Navigation (mid-height, flanking the portrait) */}
      <div
        className="absolute left-[3.5vw] right-[3.5vw] flex justify-between items-center pointer-events-auto gsap-side-element"
        style={{ zIndex: 5, top: "64.2vh", transform: "translateY(-50%)" }}
      >
        {/* Left nav */}
        <div
          className="flex items-center gap-3"
          style={{
            fontFamily: "'Geist', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 850,
            fontSize: "clamp(11px, 1vw, 14px)",
            letterSpacing: "0.12em",
            color: "#171715",
          }}
        >
          <a href="#" className="group whitespace-nowrap relative inline-block">
            <span className="relative overflow-hidden inline-flex">
              <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">HOME</span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">HOME</span>
            </span>
          </a>
          <span className="opacity-30">|</span>
          <a href="#" className="group whitespace-nowrap relative inline-block">
            <span className="relative overflow-hidden inline-flex">
              <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">ABOUT ME</span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">ABOUT ME</span>
            </span>
          </a>
        </div>

        {/* Right nav */}
        <div
          className="flex items-center gap-3"
          style={{
            fontFamily: "'Geist', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 850,
            fontSize: "clamp(11px, 1vw, 14px)",
            letterSpacing: "0.12em",
            color: "#171715",
          }}
        >
          <a href="#" className="group whitespace-nowrap relative inline-block">
            <span className="relative overflow-hidden inline-flex">
              <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">SERVICES</span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">SERVICES</span>
            </span>
          </a>
          <span className="opacity-30">|</span>
          <a href="#" className="group whitespace-nowrap relative inline-block">
            <span className="relative overflow-hidden inline-flex">
              <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">CLIENTS</span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">CLIENTS</span>
            </span>
          </a>
          <span className="opacity-30">|</span>
          <a href="#" className="group whitespace-nowrap relative inline-block">
            <span className="relative overflow-hidden inline-flex">
              <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">FAQ</span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">FAQ</span>
            </span>
          </a>
        </div>
      </div>

      {/* Descriptor Panel */}
      <div
        className="absolute flex flex-col justify-center gap-3.5 px-5 py-4 rounded-[12px] pointer-events-auto gsap-side-element"
        style={{
          zIndex: 5,
          left: "65.2vw",
          top: "52vh",
          width: "12vw",
          height: "29vh",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        {[
          { icon: "◑", label: "Creative" },
          { icon: "✿", label: "Developer" },
          { icon: "♛", label: "DevOps" },
          { icon: "◆", label: "Cloud" },
          { icon: "⧓", label: "Automation" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3.5"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(11px, 0.9vw, 14px)",
              color: "#FFFFFF",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "#F4FF00", fontSize: "1.25em", lineHeight: "1" }}>{icon}</span>
            {label}
          </div>
        ))}
      </div>

      {/* ─── LAYER 6: CTA buttons below headline ─── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto"
        style={{ zIndex: 6, top: "91vh" }}
      >
        <a
          href="#"
          className="gsap-cta-btn group"
          style={{
            background: "#F4FF00",
            color: "#171715",
            fontFamily: "'Geist', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(11px, 0.9vw, 13px)",
            letterSpacing: "0.06em",
            padding: "0 24px",
            height: "48px",
            borderRadius: "6px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "130px",
            transition: "opacity 0.2s",
          }}
        >
          <span className="relative overflow-hidden inline-flex">
            <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">Book a Call</span>
            <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">Book a Call</span>
          </span>
        </a>
        <a
          href="#"
          className="gsap-cta-btn group"
          style={{
            background: "#F4FF00",
            color: "#171715",
            fontFamily: "'Geist', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(11px, 0.9vw, 13px)",
            letterSpacing: "0.06em",
            padding: "0 24px",
            height: "48px",
            borderRadius: "6px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "130px",
            transition: "opacity 0.2s",
          }}
        >
          <span className="relative overflow-hidden inline-flex">
            <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">About Me</span>
            <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:translate-y-0">About Me</span>
          </span>
        </a>
      </div>

      {/* ─── LAYER 7: Bottom Corner Texts (Left & Right) ─── */}
      {/* Bottom-left corner text */}
      <div
        className="absolute pointer-events-none gsap-side-element"
        style={{
          zIndex: 10,
          left: "3.5vw",
          bottom: "6vh",
          fontFamily: "'Geist', sans-serif",
          fontWeight: 500,
          fontSize: "clamp(11px, 0.9vw, 13px)",
          color: "#66645F",
          lineHeight: 1.5,
        }}
      >
        The Next.js Expert.<br />That's Vanshaj.
      </div>

      {/* Bottom-right description */}
      <div
        className="absolute pointer-events-none gsap-side-element"
        style={{
          zIndex: 10,
          left: "70vw",
          bottom: "6vh",
          width: "25vw",
          fontFamily: "'Geist', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(11px, 0.85vw, 13px)",
          color: "#66645F",
          lineHeight: 1.55,
        }}
      >
        Working closely with your team to deliver custom builds that merge creativity, technical excellence, and long-term value.
      </div>
    </section>
  );
}


