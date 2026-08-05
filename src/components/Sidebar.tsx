"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("hero");

  useGSAP(
    () => {
      // 1. Slide in sidebar as page scrolls
      gsap.fromTo(
        sidebarRef.current,
        {
          xPercent: -100,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "300px top",
            scrub: true,
          },
        }
      );

      // 2. Track active section to update highlight states
      const sections = ["hero", "about", "timeline"];
      sections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveId(id);
            }
          },
        });
      });
    },
    { scope: sidebarRef }
  );

  return (
    <div
      ref={sidebarRef}
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-[270px] bg-[#DFDECE] border-r border-[#171715]/10 flex-col justify-between py-7 px-5 select-none"
      style={{ zIndex: 100, opacity: 0 }}
    >
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Logo */}
        <div 
          className="font-sans font-black text-[22px] tracking-[-0.05em] text-[#171715] uppercase leading-none"
          style={{ letterSpacing: "-0.05em" }}
        >
          VANSHAJ<span className="text-[10px] font-bold align-super ml-0.5">®</span>
        </div>

        {/* Descriptor Card */}
        <div className="bg-[#D7D1C1]/40 rounded-[12px] border border-[#171715]/10 p-3.5 mt-5 text-[11px] leading-relaxed text-[#595854] font-semibold">
          Working closely with your team to deliver custom builds that merge creativity, technical excellence, and long-term value.
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-2 bg-[#D7D1C1]/40 rounded-[12px] border border-[#171715]/10 p-3 mt-3">
          <div className="flex flex-col pl-1 py-0.5">
            <span className="font-sans font-black text-[18px] text-[#171715] leading-none">80+</span>
            <span className="font-sans font-extrabold text-[8px] text-[#6B6A65] tracking-widest uppercase mt-1">Projects</span>
          </div>
          <div className="flex flex-col border-l border-[#171715]/15 pl-4 py-0.5">
            <span className="font-sans font-black text-[18px] text-[#171715] leading-none">7+</span>
            <span className="font-sans font-extrabold text-[8px] text-[#6B6A65] tracking-widest uppercase mt-1">Years Exp</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5 mt-6">
          {[
            { 
              id: "hero", 
              label: "HOME", 
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              )
            },
            { 
              id: "about", 
              label: "ABOUT ME", 
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              )
            },
            { 
              id: "timeline", 
              label: "MY JOURNEY", 
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 22 12 17 22 22 12 2"/></svg>
              )
            },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-full text-[10px] font-black tracking-wider transition-all duration-300 ${
                activeId === item.id || (item.id === "about" && activeId === "timeline")
                  ? "bg-[#F4FF00] text-[#171715] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  : "text-[#595854] hover:text-[#171715] hover:bg-[#D7D1C1]/20"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col">
        {/* Clients Marquee Logos */}
        <div className="border-t border-[#171715]/10 pt-4 flex items-center justify-between opacity-40 hover:opacity-75 transition-opacity duration-300">
          <span className="font-sans font-black text-[9px] tracking-widest text-[#171715] leading-none">INVERT</span>
          <span className="font-sans font-black text-[9px] tracking-widest text-[#171715] leading-none">1910</span>
          <span className="font-sans font-black text-[9px] tracking-widest text-[#171715] leading-none">ALOSANT</span>
        </div>

        {/* Email copy bar */}
        <div className="flex items-center justify-between bg-[#D7D1C1]/40 rounded-[10px] border border-[#171715]/10 p-2.5 mt-3.5 text-[10px] font-bold text-[#171715]">
          <span className="font-sans">hello@vanshaj.com</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText("hello@vanshaj.com");
              alert("Email copied to clipboard!");
            }}
            className="opacity-55 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center p-0.5"
            title="Copy Email"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="w-full bg-[#F4FF00] hover:bg-[#E2EC00] text-[#171715] font-sans font-extrabold text-[11px] tracking-widest uppercase rounded-full h-11 flex items-center justify-center transition-colors shadow-sm mt-3 border border-[#171715]/5"
        >
          Book a Call
        </a>
      </div>
    </div>
  );
}
