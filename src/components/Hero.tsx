"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  // Elements
  const containerRef = useRef<HTMLDivElement>(null);
  const navLeftRef = useRef<HTMLDivElement>(null);
  const navRightRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const secondaryLeftRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  
  // Headline lines
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  
  // Tiny annotations
  const annotationsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial setups
    gsap.set(
      [
        navLeftRef.current,
        navRightRef.current,
        introTextRef.current,
        ctaRef.current,
        secondaryLeftRef.current,
        annotationsRef.current
      ],
      { opacity: 0, y: 15 }
    );
    
    // Masked text initial state
    gsap.set(
      [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
      { yPercent: 120 }
    );

    // Portrait initial state (masked/clipped and pushed down)
    gsap.set(portraitRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      y: 40,
      scale: 1.02
    });

    // --- SEQUENTIAL ASSEMBLY ---
    
    // 0.10s – 0.40s: Nav & peripheral text
    tl.to(
      [navLeftRef.current, navRightRef.current, secondaryLeftRef.current],
      { opacity: 1, y: 0, duration: 0.8 },
      0.1
    )
    
    // 0.25s – 0.60s: Small intro text
    .to(introTextRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.25)
    
    // 0.40s – 1.50s: Giant Headline Masked Reveal
    .to(
      [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
      {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out"
      },
      0.4
    )
    
    // 1.00s – 1.70s: CTA buttons
    .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
    
    // 1.30s – 2.50s: Portrait Reveal
    .to(
      portraitRef.current,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out"
      },
      1.3
    )
    
    // 1.70s – 2.70s: Tiny descriptor annotations
    .to(
      annotationsRef.current,
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
      1.7
    );

  }, []);

  // Simple magnetic hover effect for nav items
  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    gsap.to(e.currentTarget, {
      y: enter ? -3 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-[#F1F0EA]"
    >
      {/* LAYER 1: MASSIVE BACKGROUND TEXT */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none z-0">
        <h1 className="text-[35vw] font-black tracking-tighter text-[#eeff00] leading-none whitespace-nowrap">
          VANSHAJ
        </h1>
      </div>

      {/* LAYER 2: THE PORTRAIT */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-end z-10 pointer-events-none">
        <div ref={portraitRef} className="relative w-[80vw] max-w-[500px] h-[75vh] max-h-[800px] origin-bottom">
          <Image
            src="/Vanshaj-pic.png"
            alt="Vanshaj"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
      </div>

      {/* LAYER 3: FOREGROUND TYPOGRAPHY & UI */}
      <div className="relative w-full h-full z-20 flex flex-col pointer-events-none px-4 md:px-12 py-8">
        
        {/* Navigation - Left & Right split in vertical center */}
        <div className="absolute inset-x-4 md:inset-x-12 top-[45%] -translate-y-1/2 flex justify-between items-center z-30 font-bold text-xs md:text-sm tracking-widest text-[#171717] pointer-events-auto">
          {/* Left Nav */}
          <div ref={navLeftRef} className="flex gap-4 items-center">
            <a href="#" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>HOME</a>
            <span className="opacity-20">|</span>
            <a href="#" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>ABOUT ME</a>
          </div>

          {/* Right Nav */}
          <div ref={navRightRef} className="flex gap-4 items-center">
            <a href="#" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>SERVICES</a>
            <span className="opacity-20">|</span>
            <a href="#" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>CLIENTS</a>
            <span className="opacity-20">|</span>
            <a href="#" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>FAQ</a>
          </div>
        </div>

        {/* Top/Center Typography Area */}
        <div className="flex-1 flex flex-col justify-center items-center w-full z-30 pointer-events-none mt-20">
          
          <div ref={introTextRef} className="text-[#171717] font-medium tracking-wide text-sm md:text-base mb-2">
            CREATIVE DEVELOPER / PORTFOLIO
          </div>

          {/* Massive Headline */}
          <div className="flex flex-col items-center text-center font-black text-white leading-[0.85] tracking-tight w-full drop-shadow-md mix-blend-difference">
            <div className="overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block text-[14vw] md:text-[clamp(90px,10vw,170px)]">Next.js,</span>
            </div>
            <div className="overflow-hidden pb-1">
              <span ref={headlineLine2Ref} className="block text-[14vw] md:text-[clamp(90px,10vw,170px)]">Applied</span>
            </div>
            <div className="overflow-hidden pb-1">
              <span ref={headlineLine3Ref} className="block text-[14vw] md:text-[clamp(90px,10vw,170px)]">Differently.</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-40 pointer-events-auto">
          <button className="px-8 py-3 bg-[#eeff00] text-[#171717] font-bold rounded-sm text-sm hover:bg-[#171717] hover:text-[#eeff00] transition-colors border border-transparent hover:border-[#eeff00]">
            Book a Call
          </button>
          <button className="px-8 py-3 bg-[#eeff00] text-[#171717] font-bold rounded-sm text-sm hover:bg-[#171717] hover:text-[#eeff00] transition-colors border border-transparent hover:border-[#eeff00]">
            About Me
          </button>
        </div>

        {/* Peripheral Text - Bottom Left */}
        <div ref={secondaryLeftRef} className="absolute bottom-8 left-4 md:left-12 max-w-[180px] text-xs md:text-sm text-[#65655F] leading-snug">
          The Creative Developer. That's Vanshaj.
        </div>
        
        {/* Peripheral Text - Bottom Right */}
        <div className="absolute bottom-8 right-4 md:right-12 max-w-[220px] text-xs md:text-sm text-[#65655F] leading-snug text-right md:text-left">
          Working closely with your team to deliver custom builds that merge creativity, technical excellence, and long-term value.
        </div>

        {/* Asymmetrical Descriptor Annotations */}
        
        <div 
          ref={el => { annotationsRef.current[0] = el }}
          className="absolute top-[25%] left-[10%] md:left-[25%] font-bold text-sm tracking-wide text-[#171717] rotate-[-5deg]"
        >
          <span className="text-[#eeff00] text-xl drop-shadow-sm">80+</span> Projects
        </div>

        <div 
          ref={el => { annotationsRef.current[1] = el }}
          className="absolute top-[60%] left-[5%] md:left-[20%] font-bold text-sm tracking-wide text-[#171717] rotate-[3deg]"
        >
          <span className="text-[#eeff00] text-xl drop-shadow-sm">7+</span> Years
        </div>

        <div 
          ref={el => { annotationsRef.current[2] = el }}
          className="absolute top-[35%] right-[15%] md:right-[28%] font-bold text-sm tracking-wide text-[#171717] rotate-[8deg]"
        >
          Creative Builder
        </div>

        <div 
          ref={el => { annotationsRef.current[3] = el }}
          className="absolute top-[50%] right-[8%] md:right-[20%] font-bold text-sm tracking-wide text-[#171717] rotate-[-4deg]"
        >
          Efficient Strategist
        </div>

        <div 
          ref={el => { annotationsRef.current[4] = el }}
          className="absolute top-[75%] right-[12%] md:right-[25%] font-bold text-sm tracking-wide text-[#171717] rotate-[2deg]"
        >
          Reliable
        </div>
        
      </div>
    </section>
  );
}
