"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // === ENTRANCE ANIMATIONS (on page load) ===
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

    // === EXIT ANIMATIONS (as user scrolls - ALL MOVING LEFT with dissolve) ===
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      }
    });

    // Large VANSHAJ text - moves LEFT and dissolves/blurs heavily
    exitTl.fromTo(
      ".gsap-vanshaj",
      { 
        x: 0, 
        y: 0,
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-55vw",
        y: "-15vh",
        scale: 0.12,
        opacity: 0,
        filter: "blur(60px)",
        ease: "power2.inOut",
        duration: 1,
      },
      0
    )

    // Headline lines (description text) - move LEFT and blur
    .fromTo(
      ".gsap-headline-line",
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-40vw",
        y: "-8vh",
        opacity: 0,
        filter: "blur(40px)",
        ease: "power2.inOut",
        duration: 0.85,
      },
      0.05
    )

    // CTA buttons - move LEFT toward sidebar area and blur
    .fromTo(
      ".gsap-cta-btn",
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-45vw",
        y: "5vh",
        opacity: 0,
        filter: "blur(30px)",
        ease: "power2.inOut",
        duration: 0.8,
      },
      0.1
    )

    // Project card - moves LEFT into sidebar area and dissolves
    .fromTo(
      ".gsap-card-projects",
      { 
        x: 0, 
        y: 0, 
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-35vw",
        y: "8vh",
        scale: 0.3,
        opacity: 0,
        filter: "blur(35px)",
        ease: "power2.inOut",
        duration: 0.8,
      },
      0.08
    )

    // Experience card - moves LEFT into sidebar area and dissolves
    .fromTo(
      ".gsap-card-experience",
      { 
        x: 0, 
        y: 0, 
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-38vw",
        y: "12vh",
        scale: 0.3,
        opacity: 0,
        filter: "blur(35px)",
        ease: "power2.inOut",
        duration: 0.8,
      },
      0.1
    )

    // Descriptor panel - moves LEFT and dissolves
    .fromTo(
      ".gsap-descriptors",
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-42vw",
        y: "10vh",
        scale: 0.25,
        opacity: 0,
        filter: "blur(35px)",
        ease: "power2.inOut",
        duration: 0.85,
      },
      0.12
    )

    // Bottom description text - moves LEFT and blurs
    .fromTo(
      ".gsap-bottom-right",
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-48vw",
        y: "8vh",
        opacity: 0,
        filter: "blur(40px)",
        ease: "power2.inOut",
        duration: 0.75,
      },
      0.08
    )

    // Bottom-left text - moves LEFT and blurs
    .fromTo(
      ".gsap-bottom-left",
      { 
        x: 0, 
        y: 0,
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-30vw",
        y: "5vh",
        opacity: 0,
        filter: "blur(30px)",
        ease: "power2.inOut",
        duration: 0.7,
      },
      0.12
    )

    // Navigation bars - move LEFT and dissolve
    .fromTo(
      ".gsap-nav-left",
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-25vw",
        y: "-3vh",
        opacity: 0,
        filter: "blur(25px)",
        ease: "power2.inOut",
        duration: 0.6,
      },
      0.15
    )
    .fromTo(
      ".gsap-nav-right",
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      },
      {
        x: "-50vw",
        y: "-3vh",
        opacity: 0,
        filter: "blur(30px)",
        ease: "power2.inOut",
        duration: 0.6,
      },
      0.15
    )

    // Portrait - HEAVY BLUR effect as it fades to background
    .fromTo(
      ".gsap-portrait",
      { 
        yPercent: 0, 
        scale: 1, 
        filter: "blur(0px)", 
        opacity: 1 
      },
      {
        yPercent: 5,
        scale: 1.1,
        filter: "blur(80px)",
        opacity: 0.1,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "#D7D1C1" }}
    >
      {/* ─── LAYER 1: Large VANSHAJ Text ─── */}
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
        className="absolute flex items-center justify-center p-4 rounded-[12px] pointer-events-auto gsap-side-element gsap-card-projects"
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
        className="absolute flex flex-col justify-center px-6 py-4 rounded-[12px] pointer-events-auto gsap-side-element gsap-card-experience"
        style={{
          zIndex: 2,
          left: "38.4vw",
          top: "75vh",
          width: "14vw",
          height: "12vh",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(24px, 2.5vw, 36px)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            7+
          </span>
          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(10px, 0.8vw, 13px)",
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "0.05em",
            }}
          >
            Years of<br />experience
          </span>
        </div>
      </div>

      {/* ─── LAYER 3: Portrait Image ─── */}
      <div
        className="absolute flex items-center justify-center overflow-hidden gsap-portrait"
        style={{
          zIndex: 3,
          right: "5vw",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(180px, 28vw, 400px)",
          height: "clamp(240px, 40vw, 560px)",
        }}
      >
        <Image
          src="/Vanshaj-pic.png"
          alt="Vanshaj"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
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
        className="absolute left-[3.5vw] right-[3.5vw] flex justify-between items-center pointer-events-auto gsap-side-element gsap-nav"
        style={{ zIndex: 5, top: "64.2vh", transform: "translateY(-50%)" }}
      >
        {/* Left nav */}
        <div
          className="flex items-center gap-3 gsap-nav-left"
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
          className="flex items-center gap-3 gsap-nav-right"
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
        className="absolute flex flex-col justify-center gap-3.5 px-5 py-4 rounded-[12px] pointer-events-auto gsap-side-element gsap-descriptors"
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

      {/* ─── LAYER 7: Bottom Corner Texts ─── */}
      {/* Bottom-left corner text */}
      <div
        className="absolute pointer-events-none gsap-side-element gsap-bottom-left"
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
        className="absolute pointer-events-none gsap-side-element gsap-bottom-right"
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
