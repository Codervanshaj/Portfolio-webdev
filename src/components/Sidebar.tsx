"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TwitterIcon, LinkedinIcon } from "./Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("hero");

  useGSAP(
    () => {
      // 1. Measure natural viewport coordinates of all elements BEFORE building the timeline
      const logoRect = document.querySelector(".gsap-sidebar-logo")?.getBoundingClientRect();
      const descRect = document.querySelector(".gsap-sidebar-desc")?.getBoundingClientRect();
      const projectsRect = document.querySelector(".gsap-sidebar-stats-projects")?.getBoundingClientRect();
      const expRect = document.querySelector(".gsap-sidebar-stats-exp")?.getBoundingClientRect();
      
      const navHomeRect = document.querySelector(".gsap-nav-home")?.getBoundingClientRect();
      const navAboutRect = document.querySelector(".gsap-nav-about")?.getBoundingClientRect();
      const navServicesRect = document.querySelector(".gsap-nav-services")?.getBoundingClientRect();
      const navClientsRect = document.querySelector(".gsap-nav-clients")?.getBoundingClientRect();
      const navFaqRect = document.querySelector(".gsap-nav-faq")?.getBoundingClientRect();
      
      const div1Rect = document.querySelector(".gsap-nav-div-1")?.getBoundingClientRect();
      const div2Rect = document.querySelector(".gsap-nav-div-2")?.getBoundingClientRect();
      const div3Rect = document.querySelector(".gsap-nav-div-3")?.getBoundingClientRect();
      const div4Rect = document.querySelector(".gsap-nav-div-4")?.getBoundingClientRect();
      
      const ctaRect = document.querySelector(".gsap-sidebar-cta")?.getBoundingClientRect();

      const portraitEl = document.querySelector(".gsap-portrait-inner");

      // 2. Coordinated timeline for single-set morphing layout
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=95%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Pin the sidebar wrapper so it stays fixed
      gsap.set(sidebarRef.current, { opacity: 1 });

      // ─── Card Background & Border Reveals ───
      const cards = [
        ".gsap-sidebar-logo-card",
        ".gsap-sidebar-stats-card",
        ".gsap-sidebar-nav-card",
        ".gsap-sidebar-footer-card",
      ];
      
      tl.fromTo(
        cards,
        {
          backgroundColor: "rgba(223, 222, 206, 0)",
          borderColor: "rgba(23, 23, 21, 0)",
          boxShadow: "none",
          backdropFilter: "blur(0px)",
          pointerEvents: "none",
        },
        {
          backgroundColor: "rgba(223, 222, 206, 0.65)",
          borderColor: "rgba(23, 23, 21, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(12px)",
          pointerEvents: "auto",
          ease: "none",
          duration: 0.45,
        },
        0.55 // cards fade in after elements start settling
      );

      // Active Capsule CSS Variables Animation
      tl.fromTo(
        ".gsap-sidebar-nav-card",
        {
          "--nav-active-bg": "rgba(244, 255, 0, 0)",
          "--nav-active-text": "#171715",
          "--nav-inactive-text": "#171715",
          "--nav-active-shadow": "rgba(0, 0, 0, 0)",
        },
        {
          "--nav-active-bg": "rgba(244, 255, 0, 1)",
          "--nav-active-text": "#171715",
          "--nav-inactive-text": "#595854",
          "--nav-active-shadow": "0 2px 8px rgba(0, 0, 0, 0.04)",
          ease: "none",
          duration: 0.45,
        },
        0.55
      );

      // ─── Hero Exit Animations ───
      tl.fromTo(
        ".gsap-headline-line",
        { y: 0, opacity: 1, filter: "blur(0px)" },
        {
          y: -220,
          opacity: 0,
          filter: "blur(8px)",
          ease: "none",
          duration: 0.45,
        },
        0
      )
      .fromTo(
        ".gsap-bottom-left",
        { x: 0, opacity: 1, filter: "blur(0px)" },
        {
          x: "-10vw",
          opacity: 0,
          filter: "blur(4px)",
          ease: "none",
          duration: 0.5,
        },
        0.05
      )
      .fromTo(
        ".gsap-descriptors",
        { x: 0, y: 0, opacity: 1 },
        {
          x: "15vw",
          y: -40,
          opacity: 0,
          ease: "none",
          duration: 0.55,
        },
        0.1
      )
      .fromTo(
        portraitEl,
        { filter: "blur(0px)", opacity: 1 },
        {
          filter: "blur(60px)",
          opacity: 0.15,
          ease: "none",
          duration: 0.75,
        },
        0.1
      );

      // ─── Logo & Description Morphing ───
      tl.fromTo(
        ".gsap-sidebar-logo",
        {
          x: () => window.innerWidth / 2 - (logoRect?.width || 112) / 2 - (logoRect?.left || 36),
          xPercent: 0,
          y: () => window.innerHeight * 0.28 - (logoRect?.top || 44) - (logoRect?.height || 22) / 2,
          scale: 11.5,
          color: "#F4FF00",
          transformOrigin: "center center",
        },
        {
          x: 0,
          xPercent: 0,
          y: 0,
          scale: 1,
          color: "#171715",
          transformOrigin: "center center",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      )
      .fromTo(
        ".gsap-sidebar-logo-r",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.5
      )
      .fromTo(
        ".gsap-sidebar-socials",
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        0.6
      )
      .fromTo(
        ".gsap-sidebar-desc",
        {
          x: () => window.innerWidth * 0.72 - (descRect?.left || 36),
          y: () => window.innerHeight * 0.78 - (descRect?.top || 88),
          width: 320,
          fontSize: "15px",
          color: "#66645F",
        },
        {
          x: 0,
          y: 0,
          width: "100%",
          fontSize: "11px",
          color: "#595854",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
 
      // ─── Stats Columns Morphing ───
      tl.fromTo(
        ".gsap-sidebar-stats-projects",
        {
          x: () => window.innerWidth * 0.18 - (projectsRect?.left || 36),
          y: () => window.innerHeight * 0.60 - (projectsRect?.top || 161),
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(12px)",
          padding: "14px",
          borderRadius: "12px",
          width: 170,
          height: 68,
        },
        {
          x: 0,
          y: 0,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255, 255, 255, 0)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          padding: "0px",
          borderRadius: "0px",
          width: "auto",
          height: "auto",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
  
      // Experience Column
      tl.fromTo(
        ".gsap-sidebar-stats-exp",
        {
          x: () => window.innerWidth * 0.21 - (expRect?.left || 130),
          y: () => window.innerHeight * 0.72 - (expRect?.top || 161),
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderLeftColor: "rgba(255, 255, 255, 0.12)",
          borderTopColor: "rgba(255, 255, 255, 0.12)",
          borderRightColor: "rgba(255, 255, 255, 0.12)",
          borderBottomColor: "rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(12px)",
          padding: "14px",
          borderRadius: "12px",
          width: 150,
          height: 80,
        },
        {
          x: 0,
          y: 0,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderLeftColor: "rgba(23, 23, 21, 0.15)",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          padding: "0px",
          borderRadius: "0px",
          width: "auto",
          height: "auto",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
 
      // Stats inner details morphing
      tl.fromTo(
        ".gsap-stats-projects-icon",
        { width: "36px", height: "24px" },
        { width: "18px", height: "12px", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-projects-num",
        { fontSize: "22px", color: "#FFFFFF" },
        { fontSize: "18px", color: "#171715", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-projects-label",
        { fontSize: "10px", color: "rgba(255, 255, 255, 0.7)" },
        { fontSize: "8px", color: "#6B6A65", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-exp-num",
        { fontSize: "36px", color: "#F4FF00" },
        { fontSize: "18px", color: "#171715", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-exp-label",
        { fontSize: "10px", color: "#FFFFFF" },
        { fontSize: "8px", color: "#6B6A65", ease: "power2.inOut", duration: 0.7 },
        0
      );
 
      // ─── Navigation Menu Morphing ───
      // Left flanks
      tl.fromTo(
        ".gsap-nav-home",
        {
          x: () => (window.innerWidth * 0.285 - 86 - 56 - 48) - (navHomeRect?.left || 36),
          y: () => window.innerHeight * 0.53 - (navHomeRect?.top || 368),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-about",
        {
          x: () => (window.innerWidth * 0.285 - 86) - (navAboutRect?.left || 129),
          y: () => window.innerHeight * 0.53 - (navAboutRect?.top || 409),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Dividers left
      tl.fromTo(
        ".gsap-nav-div-1",
        {
          x: () => (window.innerWidth * 0.285 - 86 - 28 - 2) - (div1Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - (div1Rect?.top || 0),
          opacity: 1,
          scale: 1,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-div-2",
        {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Right flanks
      tl.fromTo(
        ".gsap-nav-services",
        {
          x: () => window.innerWidth * 0.715 - (navServicesRect?.left || 36),
          y: () => window.innerHeight * 0.53 - (navServicesRect?.top || 533),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-clients",
        {
          x: () => (window.innerWidth * 0.715 + 80 + 56 + 4) - (navClientsRect?.left || 36),
          y: () => window.innerHeight * 0.53 - (navClientsRect?.top || 574),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-faq",
        {
          x: () => (window.innerWidth * 0.715 + 80 + 56 + 4 + 68 + 56 + 4) - (navFaqRect?.left || 36),
          y: () => window.innerHeight * 0.53 - (navFaqRect?.top || 615),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Dividers right
      tl.fromTo(
        ".gsap-nav-div-3",
        {
          x: () => (window.innerWidth * 0.715 + 80 + 28) - (div3Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - (div3Rect?.top || 0),
          opacity: 1,
          scale: 1,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-div-4",
        {
          x: () => (window.innerWidth * 0.715 + 80 + 56 + 4 + 68 + 28) - (div4Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - (div4Rect?.top || 0),
          opacity: 1,
          scale: 1,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Navigation Link Item properties morphing
      tl.fromTo(
        ".gsap-nav-link-item",
        {
          fontSize: "16px",
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          borderRadius: "0px",
        },
        {
          fontSize: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "16px",
          paddingRight: "16px",
          borderRadius: "9999px",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      )
      .fromTo(
        ".gsap-nav-divider",
        {
          fontSize: "16px",
        },
        {
          fontSize: "10px",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
 
      // Hidden menu items
      tl.fromTo(
        [".gsap-nav-projects", ".gsap-nav-wyg"],
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.35 },
        0.55
      );
 
      // ─── Footer & CTA Morphing ───
      tl.fromTo(
        ".gsap-sidebar-cta",
        {
          x: () => window.innerWidth / 2 - 140 - (ctaRect?.left || 36),
          y: () => window.innerHeight * 0.85 - (ctaRect?.top || 714),
          width: 130,
        },
        {
          x: 0,
          y: 0,
          width: "100%",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      )
      .fromTo(
        ".gsap-sidebar-cta-sec",
        {
          x: () => window.innerWidth / 2 + 10 - (ctaRect?.left || 36),
          y: () => window.innerHeight * 0.85 - (ctaRect?.top || 714),
          width: 130,
          opacity: 1,
        },
        {
          x: 0,
          y: 0,
          width: "100%",
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      )
      .fromTo(
        [".gsap-sidebar-clients-logos", ".gsap-sidebar-email-bar"],
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        0.6
      );

      // Track active section to update highlight states
      const sections = ["hero", "about", "timeline"];
      sections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveId(id),
          onEnterBack: () => setActiveId(id),
        });
      });
    }
  );

  return (
    <div ref={sidebarRef} className="hidden md:block select-none pointer-events-none">
      <style dangerouslySetInnerHTML={{__html: `
        .gsap-nav-link-item {
          color: var(--nav-inactive-text, #171715);
          transition: color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease !important;
        }
        .gsap-nav-link-item:hover {
          color: #171715 !important;
          background-color: rgba(215, 209, 193, 0.3) !important;
        }
        .gsap-nav-link-item.is-active-item {
          background-color: var(--nav-active-bg, rgba(244, 255, 0, 0)) !important;
          color: var(--nav-active-text, #171715) !important;
          box-shadow: var(--nav-active-shadow, none) !important;
        }
        .cta-btn-inner {
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .cta-btn-inner:hover {
          transform: scale(1.06) translateY(-2.5px) !important;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12) !important;
          background-color: #E2EC00 !important;
        }
      `}} />

      {/* ─── 1. Logo Card ─── */}
      <div 
        className="gsap-sidebar-logo-card fixed left-5 top-7 w-[240px] bg-transparent border border-transparent rounded-[12px] p-4 flex flex-col gap-3 z-[5] pointer-events-none"
      >
        <div className="flex justify-between items-center w-full">
          <div 
            className="gsap-sidebar-logo font-sans font-black text-[22px] tracking-[-0.05em] text-[#171715] uppercase leading-none relative inline-block"
            style={{ letterSpacing: "-0.05em" }}
          >
            VANSHAJ
            <span 
              className="gsap-sidebar-logo-r absolute text-[10px] font-bold align-super ml-0.5"
              style={{ top: "-2px", right: "-12px" }}
            >
              ®
            </span>
          </div>
          <div className="gsap-sidebar-socials flex items-center gap-1.5 pointer-events-auto">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[24px] h-[24px] rounded-md bg-[#171715] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <TwitterIcon size={12} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[24px] h-[24px] rounded-md bg-[#171715] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <LinkedinIcon size={12} />
            </a>
          </div>
        </div>
        <div className="gsap-sidebar-desc text-[11px] leading-relaxed text-[#595854] font-semibold">
          Working closely with your team to deliver custom builds that merge creativity, technical excellence, and long-term value.
        </div>
      </div>

      {/* ─── 2. Stats Card ─── */}
      <div 
        className="gsap-sidebar-stats-card fixed left-5 top-[146px] w-[240px] grid grid-cols-2 bg-transparent border border-transparent rounded-[12px] p-3.5 z-[20] pointer-events-none"
      >
        <div className="gsap-sidebar-stats-projects flex items-center gap-3.5 w-full justify-start overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91 57" className="gsap-stats-projects-icon text-[#F4FF00] shrink-0" style={{ width: "36px", height: "24px" }} fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M90.0571 0L61.3209 56.1824H34.3296L46.3557 32.898H45.8162C35.8948 45.7787 21.0919 54.2582 0 56.1824V33.2204C0 33.2204 13.493 32.4233 21.4251 24.0827H0V0.00044379H24.0795V19.8078L24.62 19.8056L34.4597 0.00044379H52.6705V19.6822L53.2109 19.6813L63.4197 0H90.0571Z" fill="currentColor"></path>
          </svg>
          <div className="flex flex-col pl-0.5 py-0.5 justify-center leading-none">
            <span className="gsap-stats-projects-num font-sans font-black text-[24px] text-white leading-none">80+</span>
            <span className="gsap-stats-projects-label font-sans font-extrabold text-[11px] text-[#6B6A65] tracking-widest uppercase mt-0.5">Projects</span>
          </div>
        </div>
        <div className="gsap-sidebar-stats-exp flex flex-col border-l border-[#171715]/15 pl-4 py-0.5 justify-center">
          <span className="gsap-stats-exp-num font-sans font-black text-[44px] text-[#F4FF00] leading-none">7+</span>
          <span className="gsap-stats-exp-label font-sans font-extrabold text-[11px] text-[#6B6A65] tracking-widest uppercase mt-0.5">Years Exp</span>
        </div>
      </div>

      {/* ─── 3. Navigation Card ─── */}
      <div 
        className="gsap-sidebar-nav-card fixed left-5 top-[222px] w-[240px] bg-transparent border border-transparent rounded-[12px] p-3 flex flex-col gap-1.5 z-[20] pointer-events-none"
      >
        <nav className="flex flex-col gap-1.5 animate-nav">
          {[
            { id: "hero", label: "HOME", class: "gsap-nav-home" },
            { id: "divider1", label: "|", class: "gsap-nav-div-1", isDivider: true },
            { id: "about", label: "ABOUT ME", class: "gsap-nav-about" },
            { id: "divider2", label: "|", class: "gsap-nav-div-2", isDivider: true },
            { id: "projects", label: "PROJECTS", class: "gsap-nav-projects" },
            { id: "what-you-get", label: "WHAT YOU GET", class: "gsap-nav-wyg" },
            { id: "services", label: "SERVICES", class: "gsap-nav-services" },
            { id: "divider3", label: "|", class: "gsap-nav-div-3", isDivider: true },
            { id: "clients", label: "CLIENTS", class: "gsap-nav-clients" },
            { id: "divider4", label: "|", class: "gsap-nav-div-4", isDivider: true },
            { id: "faq", label: "FAQ", class: "gsap-nav-faq" },
          ].map((item) => {
            if (item.isDivider) {
              return (
                <span
                  key={item.id}
                  className={`${item.class} gsap-nav-divider text-[#171715]/25 font-black select-none pointer-events-none`}
                  style={{ alignSelf: "center" }}
                >
                  |
                </span>
              );
            }
            const isActive = activeId === item.id || (item.id === "about" && activeId === "timeline");
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${item.class} gsap-nav-link-item flex items-center justify-start gap-3.5 px-4 h-[38px] box-border rounded-full text-[10px] font-black tracking-wider transition-all duration-300 pointer-events-auto ${isActive ? "is-active-item" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* ─── 4. Footer Card ─── */}
      <div 
        className="gsap-sidebar-footer-card fixed left-5 bottom-7 w-[240px] bg-transparent border border-transparent rounded-[12px] p-3.5 flex flex-col gap-3.5 z-[20] pointer-events-none"
      >
        {/* Clients Marquee Logos */}
        <div className="gsap-sidebar-clients-logos flex items-center justify-between opacity-40 hover:opacity-75 transition-opacity duration-300">
          <span className="font-sans font-black text-[9px] tracking-widest text-[#171715] leading-none">INVERT</span>
          <span className="font-sans font-black text-[9px] tracking-widest text-[#171715] leading-none">1910</span>
          <span className="font-sans font-black text-[9px] tracking-widest text-[#171715] leading-none">ALOSANT</span>
        </div>

        {/* Email copy bar */}
        <div className="gsap-sidebar-email-bar flex items-center justify-between bg-[#D7D1C1]/40 rounded-[10px] border border-[#171715]/10 p-2.5 text-[10px] font-bold text-[#171715] pointer-events-auto">
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

        {/* CTA Button Wrapper */}
        <div className="relative w-full h-11 pointer-events-auto">
          <div
            className="gsap-sidebar-cta absolute inset-0"
            style={{ zIndex: 2 }}
          >
            <a
              href="#contact"
              className="cta-btn-inner flex w-full h-full items-center justify-center bg-[#F4FF00] text-[#171715] font-sans font-extrabold text-[11px] tracking-widest uppercase rounded-full shadow-sm border border-[#171715]/5"
            >
              Book a Call
            </a>
          </div>
          <div
            className="gsap-sidebar-cta-sec absolute inset-0"
            style={{ zIndex: 1 }}
          >
            <a
              href="#about"
              className="cta-btn-inner flex w-full h-full items-center justify-center bg-[#F4FF00] text-[#171715] font-sans font-extrabold text-[11px] tracking-widest uppercase rounded-full shadow-sm border border-[#171715]/5"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
