"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TwitterIcon, LinkedinIcon } from "./Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Custom Navigation Icons ───
const HomeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const LayersIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const LightningIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ClientsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FAQIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("hero");

  useGSAP(
    () => {
      // 1. Measure natural viewport coordinates of elements BEFORE building the timeline
      const logoRect = document.querySelector(".gsap-sidebar-logo")?.getBoundingClientRect();
      const descRect = document.querySelector(".gsap-sidebar-desc")?.getBoundingClientRect();
      const projectsRect = document.querySelector(".gsap-sidebar-stats-projects")?.getBoundingClientRect();
      const expRect = document.querySelector(".gsap-sidebar-stats-exp")?.getBoundingClientRect();
      
      const navHomeRect = document.querySelector(".gsap-nav-home")?.getBoundingClientRect();
      const navAboutRect = document.querySelector(".gsap-nav-about")?.getBoundingClientRect();
      const navServicesRect = document.querySelector(".gsap-nav-services")?.getBoundingClientRect();
      const navClientsRect = document.querySelector(".gsap-nav-clients")?.getBoundingClientRect();
      const navFaqRect = document.querySelector(".gsap-nav-faq")?.getBoundingClientRect();
      const navProjectsRect = document.querySelector(".gsap-nav-projects")?.getBoundingClientRect();
      const navWygRect = document.querySelector(".gsap-nav-wyg")?.getBoundingClientRect();
      
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
      gsap.set(sidebarRef.current, { opacity: 1, zIndex: 5 });

      // Animate wrapper z-index to sit on top of page portrait after morph finishes
      tl.fromTo(
        sidebarRef.current,
        { zIndex: 5 },
        { zIndex: 25, ease: "none", duration: 0.1 },
        0.55
      );

      // ─── Card Background & Border Reveals ───
      const bgCardElements = [
        ".gsap-logo-card-bg",
        ".gsap-stats-card-bg",
        ".gsap-nav-card-bg",
        ".gsap-clients-card-bg",
        ".gsap-email-card-bg",
      ];
      
      tl.fromTo(
        bgCardElements,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 0.45,
        },
        0.55 // cards expand from the left as elements settle
      );

      // Animate parent cards pointerEvents status
      tl.fromTo(
        [
          ".gsap-sidebar-logo-card",
          ".gsap-sidebar-stats-card",
          ".gsap-sidebar-nav-card",
          ".gsap-sidebar-clients-card",
          ".gsap-sidebar-email-card",
        ],
        { pointerEvents: "none" },
        { pointerEvents: "auto", duration: 0.45 },
        0.55
      );

      // Active Capsule CSS Variables Animation
      tl.fromTo(
        ".gsap-sidebar-nav-card",
        {
          "--nav-active-bg": "rgba(244, 255, 0, 0)",
          "--nav-inactive-bg": "rgba(230, 227, 216, 0)",
          "--nav-active-text": "#171715",
          "--nav-inactive-text": "#171715",
          "--nav-active-shadow": "rgba(0, 0, 0, 0)",
        },
        {
          "--nav-active-bg": "rgba(244, 255, 1, 1)", // minor tweak to distinguish
          "--nav-inactive-bg": "rgba(215, 209, 193, 0.45)",
          "--nav-active-text": "#171715",
          "--nav-inactive-text": "#171715",
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
          y: () => window.innerHeight * 0.23 - (logoRect?.top || 44) - (logoRect?.height || 22) / 2,
          scale: () => (window.innerWidth * 1.25) / (logoRect?.width || 112),
          color: "#F4FF00",
          backgroundColor: "rgba(244, 255, 0, 0)",
          transformOrigin: "center center",
        },
        {
          x: 0,
          xPercent: 0,
          y: 0,
          scale: 1,
          color: "#F4FF00", // stays yellow until settling
          backgroundColor: "rgba(244, 255, 0, 0)", // transparent background while translating
          transformOrigin: "center center",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      )
      .fromTo(
        ".gsap-sidebar-logo",
        { color: "#F4FF00" },
        { color: "#171715", duration: 0.25, ease: "power2.out" },
        0.55
      )
      .fromTo(
        ".gsap-sidebar-logo-yellow-bg",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
        0.55
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
          x: () => window.innerWidth * 0.96 - 320 - (descRect?.left || 36),
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
      // Glassy stats background fade out early
      tl.fromTo(
        [".gsap-sidebar-stats-projects", ".gsap-sidebar-stats-exp"],
        {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px)",
        },
        {
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255, 255, 255, 0)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
          ease: "none",
        },
        0
      );

      // Projects Stats Card morphing (layout and positions only)
      tl.fromTo(
        ".gsap-sidebar-stats-projects",
        {
          x: () => (window.innerWidth * 0.03 + 210 + (navProjectsRect?.width || 0) / 2 + 20) - ((projectsRect?.left || 0) + 130),
          y: () => (window.innerHeight * 0.53) - ((projectsRect?.top || 0) + 60),
          padding: "24px",
          borderRadius: "12px",
          width: 260,
          height: 120,
          zIndex: 30, // Layered above the PROJECTS navigation tab
          alignSelf: "flex-start",
          justifySelf: "start",
          gap: "16px",
        },
        {
          x: 0,
          y: 0,
          padding: "0px",
          borderRadius: "0px",
          width: "auto",
          height: "auto",
          zIndex: 20,
          alignSelf: "center",
          justifySelf: "stretch",
          gap: "10px",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
   
      // Experience Stats Card morphing (layout and positions only)
      tl.fromTo(
        ".gsap-sidebar-stats-exp",
        {
          x: () => (window.innerWidth * 0.03 + 210 + (navProjectsRect?.width || 0) / 2 + 20) - ((expRect?.left || 0) + 85),
          y: () => (window.innerHeight * 0.53 + 185) - ((expRect?.top || 0) + 85),
          padding: "24px 20px",
          borderRadius: "12px",
          width: 170,
          height: 170,
          zIndex: 30,
          alignSelf: "flex-start",
          justifySelf: "start",
        },
        {
          x: 0,
          y: 0,
          padding: "0px",
          borderRadius: "0px",
          width: "auto",
          height: "auto",
          zIndex: 20,
          alignSelf: "center",
          justifySelf: "stretch",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
 
      // Stats inner details morphing
      tl.fromTo(
        ".gsap-stats-projects-icon",
        { width: "60px", height: "40px" },
        { width: "24px", height: "16px", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-projects-num",
        { fontSize: "42px", color: "#FFFFFF" },
        { fontSize: "13px", color: "#171715", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-projects-label",
        { fontSize: "16px", color: "rgba(255, 255, 255, 0.7)" },
        { fontSize: "9px", color: "#171715", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-exp-num",
        { fontSize: "58px", color: "#F4FF00" },
        { fontSize: "22px", color: "#F4FF00", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .fromTo(
        ".gsap-stats-exp-label",
        { fontSize: "15px", color: "#FFFFFF" },
        { fontSize: "9px", color: "#171715", ease: "power2.inOut", duration: 0.7 },
        0
      )
      .set(
        ".gsap-sidebar-stats-exp",
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "left",
          gap: "10px",
        },
        0.5
      )
      .set(
        ".gsap-stats-exp-label-container",
        {
          alignItems: "flex-start",
          textAlign: "left",
        },
        0.5
      );

      // ─── Navigation Menu Morphing ───
      // Left flanks
      tl.fromTo(
        ".gsap-nav-home",
        {
          x: () => (window.innerWidth * 0.03) - (navHomeRect?.left || 36),
          y: () => window.innerHeight * 0.53 - ((navHomeRect?.top || 0) + (navHomeRect?.height || 0) / 2),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-about",
        {
          x: () => (window.innerWidth * 0.03 + 85) - (navAboutRect?.left || 129),
          y: () => window.innerHeight * 0.53 - ((navAboutRect?.top || 0) + (navAboutRect?.height || 0) / 2),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Dividers left
      tl.fromTo(
        ".gsap-nav-div-1",
        {
          x: () => (window.innerWidth * 0.03 + 65) - (div1Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - ((div1Rect?.top || 0) + (div1Rect?.height || 0) / 2),
          opacity: 1,
          scale: 1,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-div-2",
        {
          x: () => (window.innerWidth * 0.03 + 190) - (div2Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - ((div2Rect?.top || 0) + (div2Rect?.height || 0) / 2),
          opacity: 1,
          scale: 1,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Right flanks
      tl.fromTo(
        ".gsap-nav-services",
        {
          x: () => window.innerWidth * 0.785 - (navServicesRect?.left || 36),
          y: () => window.innerHeight * 0.53 - ((navServicesRect?.top || 0) + (navServicesRect?.height || 0) / 2),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-clients",
        {
          x: () => (window.innerWidth * 0.785 + 80 + 56 + 4) - (navClientsRect?.left || 36),
          y: () => window.innerHeight * 0.53 - ((navClientsRect?.top || 0) + (navClientsRect?.height || 0) / 2),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-faq",
        {
          x: () => (window.innerWidth * 0.785 + 80 + 56 + 4 + 68 + 56 + 4) - (navFaqRect?.left || 36),
          y: () => window.innerHeight * 0.53 - ((navFaqRect?.top || 0) + (navFaqRect?.height || 0) / 2),
        },
        { x: 0, y: 0, ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // Dividers right
      tl.fromTo(
        ".gsap-nav-div-3",
        {
          x: () => (window.innerWidth * 0.785 + 80 + 28) - (div3Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - ((div3Rect?.top || 0) + (div3Rect?.height || 0) / 2),
          opacity: 1,
          scale: 1,
        },
        { x: 0, y: 0, opacity: 0, scale: 0, width: 0, height: 0, margin: 0, padding: 0, display: "none", ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-div-4",
        {
          x: () => (window.innerWidth * 0.785 + 80 + 56 + 4 + 68 + 28) - (div4Rect?.left || 0),
          y: () => window.innerHeight * 0.53 - ((div4Rect?.top || 0) + (div4Rect?.height || 0) / 2),
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
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "14px",
          paddingRight: "14px",
          borderRadius: "9999px",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );
 
      // Icon reveal inside navigation pills
      tl.fromTo(
        ".gsap-nav-icon",
        { opacity: 0, width: 0, marginRight: 0 },
        { opacity: 1, width: "12px", marginRight: "10px", ease: "power2.inOut", duration: 0.65 },
        0.3
      );
 
      // Morph navigation elements from horizontal hero state
      tl.fromTo(
        ".gsap-nav-projects",
        {
          x: () => (window.innerWidth * 0.03 + 210) - (navProjectsRect?.left || 0),
          y: () => window.innerHeight * 0.53 - ((navProjectsRect?.top || 0) + (navProjectsRect?.height || 0) / 2),
          opacity: 0,
        },
        { x: 0, y: 0, opacity: 1, ease: "power2.inOut", duration: 0.65 },
        0.02
      )
      .fromTo(
        ".gsap-nav-wyg",
        {
          x: () => (window.innerWidth * 0.635 + 20) - (navWygRect?.left || 0),
          y: () => window.innerHeight * 0.53 - ((navWygRect?.top || 0) + (navWygRect?.height || 0) / 2),
          opacity: 0,
        },
        { x: 0, y: 0, opacity: 1, ease: "power2.inOut", duration: 0.65 },
        0.02
      );
 
      // ─── Footer & CTA Morphing ───
      tl.fromTo(
        ".gsap-sidebar-cta",
        {
          x: () => window.innerWidth / 2 - 160 - (ctaRect?.left || 36),
          y: () => window.innerHeight * 0.85 - (ctaRect?.top || 714),
          width: 150,
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
          width: 150,
          opacity: 1,
        },
        {
          x: () => window.innerWidth / 2 - 40 - (ctaRect?.left || 36), // slides left with the primary button
          y: () => window.innerHeight * 0.85 - (ctaRect?.top || 714),
          width: 150, // stays at fixed width
          opacity: 0, // fades out completely
          ease: "power2.inOut",
          duration: 0.45, // fades out early
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
          background-color: var(--nav-inactive-bg, rgba(236, 233, 223, 0)) !important;
          transition: color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease !important;
        }
        .gsap-nav-link-item:hover {
          color: #171715 !important;
          background-color: rgba(215, 209, 193, 0.8) !important;
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
          transform: scale(1.04) translateY(-1px) !important;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08) !important;
          background-color: #E2EC00 !important;
        }
      `}} />

      {/* ─── Sidebar Cards 1-6 Container (Fixed flex container for layout alignment) ─── */}
      <div 
        className="fixed left-5 top-7 bottom-7 w-[240px] flex flex-col gap-3 z-[20] pointer-events-none"
        style={{ height: "calc(100vh - 56px)" }}
      >
        {/* ─── 1. Logo Card ─── */}
        <div 
          className="gsap-sidebar-logo-card relative w-full bg-transparent border border-transparent rounded-[16px] p-4 flex flex-col gap-3 z-[5] pointer-events-auto"
        >
          <div className="gsap-logo-card-bg absolute inset-0 bg-[#E6E3D8] border border-[#171715]/8 rounded-[16px] pointer-events-none z-[-1] origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="flex justify-between items-center w-full">
            <div 
              className="gsap-sidebar-logo font-sans font-black text-[14px] px-3.5 py-1.5 rounded-[8px] tracking-[-0.03em] uppercase leading-none relative inline-block shrink-0"
              style={{ letterSpacing: "-0.03em" }}
            >
              <div className="gsap-sidebar-logo-yellow-bg absolute inset-0 bg-[#F4FF00] rounded-[8px] z-[-1] origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
              VANSHAJ
              <span 
                className="gsap-sidebar-logo-r absolute text-[8px] font-bold"
                style={{ top: "1px", right: "2px" }}
              >
                ®
              </span>
            </div>
            <div className="gsap-sidebar-socials flex items-center gap-1.5">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[26px] h-[26px] rounded-lg bg-[#171715] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <TwitterIcon size={12} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[26px] h-[26px] rounded-lg bg-[#171715] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
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
          className="gsap-sidebar-stats-card relative w-full h-[52px] grid grid-cols-2 bg-transparent border border-transparent rounded-[16px] p-3.5 z-[20] pointer-events-auto"
        >
          <div className="gsap-stats-card-bg absolute inset-0 bg-[#E6E3D8] border border-[#171715]/8 rounded-[16px] pointer-events-none z-[-1] origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="gsap-sidebar-stats-projects flex items-center gap-2.5 w-full justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91 57" className="gsap-stats-projects-icon text-[#F4FF00] shrink-0" style={{ width: "24px", height: "16px" }} fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M90.0571 0L61.3209 56.1824H34.3296L46.3557 32.898H45.8162C35.8948 45.7787 21.0919 54.2582 0 56.1824V33.2204C0 33.2204 13.493 32.4233 21.4251 24.0827H0V0.00044379H24.0795V19.8078L24.62 19.8056L34.4597 0.00044379H52.6705V19.6822L53.2109 19.6813L63.4197 0H90.0571Z"></path>
            </svg>
            <div className="flex flex-col pl-0.5 py-0.5 justify-center leading-none">
              <span className="gsap-stats-projects-num font-sans font-black text-[13px] text-[#171715] leading-none">80+</span>
              <span className="gsap-stats-projects-label font-sans font-black text-[9px] text-[#171715] mt-0.5 leading-none">Projects</span>
            </div>
          </div>
          <div className="gsap-sidebar-stats-exp flex flex-col items-center justify-center text-center gap-3 border-l border-[#171715]/10 pl-4">
            <span className="gsap-stats-exp-num font-sans font-black text-[22px] text-[#F4FF00] leading-none shrink-0">7+</span>
            <div className="gsap-stats-exp-label-container flex flex-col justify-center items-center text-center leading-[1.1]">
              <span className="gsap-stats-exp-label font-sans font-black text-[9px] text-[#171715] max-w-[80px]">
                Years of experience
              </span>
            </div>
          </div>
        </div>

        {/* ─── 3. Navigation Card ─── */}
        <div 
          className="gsap-sidebar-nav-card relative w-full bg-transparent border border-transparent rounded-[16px] p-3 flex flex-col gap-1.5 z-[20] pointer-events-auto"
        >
          <div className="gsap-nav-card-bg absolute inset-0 bg-[#E6E3D8] border border-[#171715]/8 rounded-[16px] pointer-events-none z-[-1] origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <nav className="flex flex-col gap-1.5 w-full">
            {[
              { id: "hero", label: "HOME", class: "gsap-nav-home", icon: <HomeIcon /> },
              { id: "divider1", label: "|", class: "gsap-nav-div-1", isDivider: true },
              { id: "about", label: "ABOUT ME", class: "gsap-nav-about", icon: <UserCircleIcon /> },
              { id: "divider2", label: "|", class: "gsap-nav-div-2", isDivider: true },
              { id: "projects", label: "PROJECTS", class: "gsap-nav-projects", icon: <ProjectsIcon /> },
              { id: "what-you-get", label: "WHAT YOU GET", class: "gsap-nav-wyg", icon: <LayersIcon /> },
              { id: "services", label: "SERVICES", class: "gsap-nav-services", icon: <LightningIcon /> },
              { id: "divider3", label: "|", class: "gsap-nav-div-3", isDivider: true },
              { id: "clients", label: "CLIENTS", class: "gsap-nav-clients", icon: <ClientsIcon /> },
              { id: "divider4", label: "|", class: "gsap-nav-div-4", isDivider: true },
              { id: "faq", label: "FAQ", class: "gsap-nav-faq", icon: <FAQIcon /> },
            ].map((item) => {
              if (item.isDivider) {
                return (
                  <span
                    key={item.id}
                    className={`${item.class} gsap-nav-divider bg-[#171715]/25 select-none pointer-events-none`}
                    style={{
                      display: "inline-block",
                      width: "1.5px",
                      height: "10px",
                      alignSelf: "center",
                      transformOrigin: "center center",
                    }}
                  />
                );
              }
              const isActive = activeId === item.id || (item.id === "about" && activeId === "timeline");
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${item.class} gsap-nav-link-item flex items-center justify-start h-[32px] box-border rounded-full text-[10px] font-black tracking-wider transition-all duration-300 pointer-events-auto ${isActive ? "is-active-item" : ""}`}
                >
                  <span className="gsap-nav-icon flex items-center justify-center text-[#171715] shrink-0 overflow-hidden">
                    {item.icon}
                  </span>
                  <span className="gsap-nav-text leading-none">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* ─── 4. Clients Card ─── */}
        <div 
          className="gsap-sidebar-clients-card relative w-full bg-transparent border border-transparent rounded-[16px] p-4 flex items-center justify-between z-[20] pointer-events-auto"
        >
          <div className="gsap-clients-card-bg absolute inset-0 bg-[#E6E3D8] border border-[#171715]/8 rounded-[16px] pointer-events-none z-[-1] origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="gsap-sidebar-clients-logos flex items-center justify-between w-full opacity-60 hover:opacity-90 transition-opacity duration-300">
            <span className="font-sans font-extrabold text-[12px] tracking-widest text-[#171715] uppercase leading-none">CURRI</span>
            <span className="font-serif italic font-semibold text-[13px] tracking-normal text-[#171715] leading-none">omicron</span>
            <span className="font-sans font-black text-[13px] tracking-tight text-[#171715] lowercase leading-none">puck</span>
          </div>
        </div>

        {/* ─── 5. Email Copy Card ─── */}
        <div 
          className="gsap-sidebar-email-card relative w-full bg-transparent border border-transparent rounded-[16px] p-3 z-[20] pointer-events-auto"
        >
          <div className="gsap-email-card-bg absolute inset-0 bg-[#E6E3D8] border border-[#171715]/8 rounded-[16px] pointer-events-none z-[-1] origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="gsap-sidebar-email-bar flex items-center justify-between bg-[#ECE9DF] rounded-[10px] border border-[#171715]/5 p-2.5 text-[10px] font-bold text-[#171715] w-full">
            <span className="font-sans tracking-wide">hello@vanshaj.com</span>
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
        </div>

        {/* ─── 6. CTA Card ─── */}
        <div className="gsap-sidebar-cta-card w-full relative h-[44px] pointer-events-auto shrink-0 z-[20]">
          <div
            className="gsap-sidebar-cta absolute inset-0"
            style={{ zIndex: 2 }}
          >
            <a
              href="#contact"
              className="cta-btn-inner flex w-full h-full items-center justify-center bg-[#F4FF00] text-[#171715] font-sans font-extrabold text-[11px] tracking-widest uppercase rounded-full shadow-sm border border-[#171715]/10"
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
              className="cta-btn-inner flex w-full h-full items-center justify-center bg-[#F4FF00] text-[#171715] font-sans font-extrabold text-[11px] tracking-widest uppercase rounded-full shadow-sm border border-[#171715]/10"
            >
              About Me
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
