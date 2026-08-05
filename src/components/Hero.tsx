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
    const tl = gsap.timeline();
    const portraitEl = document.querySelector(".gsap-portrait-inner");

    tl.fromTo(
      portraitEl,
      { yPercent: 25 },
      { yPercent: 0, duration: 1.1, ease: "power4.out" },
      0.2
    )
      .fromTo(
        ".gsap-headline-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.10 },
        0.5
      )
      .fromTo(
        ".gsap-side-element",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.05 },
        0.8
      );

  }, { scope: container });

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "transparent", zIndex: 20 }}
    >

      {/* ─── LAYER 2: Headline overlay on portrait ─── */}
      <div
        className="absolute left-[50vw] -translate-x-[50%] pointer-events-none text-center flex flex-col items-center justify-start"
        style={{
          zIndex: 15,
          top: "43vh",
          width: "50vw",
          maxWidth: "700px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Geist', 'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(42px, 5.5vw, 85px)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            color: "#FFFFFF",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.15em",
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

      {/* ─── LAYER 3: Descriptors Panel ─── */}
      <div
        className="absolute flex flex-col justify-center gap-3.5 px-5 py-6 rounded-[12px] pointer-events-auto gsap-side-element gsap-descriptors"
        style={{
          zIndex: 25,
          left: "63.5vw",
          top: "40vh",
          width: "210px",
          height: "auto",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {[
          { icon: "◑", label: "Creative" },
          { icon: "✿", label: "Reliable" },
          { icon: "♛", label: "Strategist" },
          { icon: "◆", label: "Builder" },
          { icon: "⧓", label: "Efficient" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3.5"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.0vw, 17px)",
              color: "#FFFFFF",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "#F4FF00", fontSize: "1.25em", lineHeight: "1" }}>{icon}</span>
            {label}
          </div>
        ))}
      </div>

      {/* ─── LAYER 5: Bottom Corner Text (Left only) ─── */}
      <div
        className="absolute pointer-events-none gsap-side-element gsap-bottom-left"
        style={{
          zIndex: 10,
          left: "4vw",
          bottom: "6vh",
          fontFamily: "'Geist', sans-serif",
          fontWeight: 500,
          fontSize: "clamp(15px, 1.2vw, 18px)",
          color: "#66645F",
          lineHeight: 1.5,
        }}
      >
        The Next.js Expert.<br />That's Vanshaj.
      </div>
    </section>
  );
}


