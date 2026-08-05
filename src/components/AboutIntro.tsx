"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const targets = [
        pillRef.current,
        headingLine1Ref.current,
        headingLine2Ref.current,
        paragraphRef.current,
      ];

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full min-h-screen bg-transparent flex flex-col justify-start select-none"
    >
      <div
        className="absolute flex flex-col items-start"
        style={{
          left: "20vw",
          top: "45vh",
          width: "550px",
          maxWidth: "75vw",
        }}
      >
        <div ref={pillRef} className="opacity-0">
          <span 
            className="inline-block border border-[#171715] rounded-full px-3.5 py-1 text-[11px] font-extrabold tracking-[0.14em] text-[#171715] uppercase leading-none"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            START SMALL GROW BIG
          </span>
        </div>

        <h2
          className="text-[#171715] font-sans font-black tracking-[-0.045em] leading-[0.92] mt-6 flex flex-col select-none"
          style={{ 
            fontSize: "clamp(48px, 5.5vw, 84px)",
            fontFamily: "'Geist', sans-serif"
          }}
        >
          <span ref={headingLine1Ref} className="opacity-0 block">
            About Me <span className="text-[#6B6A65] font-normal">(&)</span>
          </span>
          <span ref={headingLine2Ref} className="opacity-0 block">
            My Journey
          </span>
        </h2>

        <p
          ref={paragraphRef}
          className="font-sans text-[20px] font-medium leading-[1.5] text-[#595854] mt-8 opacity-0 max-w-[500px] select-none"
          style={{ 
            fontFamily: "'Geist', sans-serif"
          }}
        >
          Seven years ago I started building for the web. What happened after
          that is easier to show than explain.
        </p>
      </div>
    </section>
  );
}
