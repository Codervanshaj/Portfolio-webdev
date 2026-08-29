"use client";

import { useLenis } from "@/hooks/useLenis";
import { useGSAP } from "@/hooks/useGSAP";
import { initMagneticPositions, destroyMagneticPositions } from "@/lib/animations/magneticPositions";
import { initLogoFlip } from "@/lib/animations/flipAnimations";
import { initScrollAnimations } from "@/lib/animations/scrollTriggers";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import Preloader from "@/components/layout/Preloader";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  // Setup Lenis smooth scrolling
  useLenis();

  // Setup magnetic coordinates tracking positions loops + logo scroll flip + entrance animations
  useGSAP(() => {
    // Prevent browser scroll restoration and force scroll to top on load
    if (typeof window !== "undefined") {
      if (window.history && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Magnetic positions can initialize immediately
    initMagneticPositions();

    const runLayoutAndEntrance = () => {
      // ─── Step 1: Force the nav-container visible BEFORE measuring FLIP rects.
      // The Webflow CSS sets nav-container { opacity: 0 }. If we don't unlock it
      // here, getBoundingClientRect() returns zero-size rects for all children,
      // so every FLIP offset calculates as 0 and nothing morphs correctly.
      gsap.set(".nav-container", { opacity: 1, visibility: "visible" });

      // ─── Step 2: Run FLIP (measures real sidebar rects now that they're visible)
      initLogoFlip();
      ScrollTrigger.update();

      // ─── Step 3: Run generic scroll animations (StyleEngine)
      // This will parse all data-tl-* attributes on the page. Because elements in
      // the sidebar menu have data-tl-from with opacity: 0, this will immediately
      // hide the sidebar elements at scroll = 0, resolving the visibility overlap.
      initScrollAnimations();
      ScrollTrigger.refresh();

      // ─── Step 4: Play page entrance timeline
      const preloader = document.querySelector(".nesh-logo-preload-wrap") as HTMLElement;
      if (preloader) {
        const tl = gsap.timeline();

        // Slide the preloader overlay up and away
        tl.to(preloader, {
          yPercent: -100,
          duration: 1.2,
          delay: 0.6,
          ease: "power4.inOut",
          onComplete: () => {
            preloader.style.display = "none";
            // Recalculate ScrollTrigger measurements now that the viewport is unblocked
            ScrollTrigger.refresh();
          }
        });

        // Reveal hero content elements with opacity and visibility.
        tl.fromTo([
          ".profile-img-item",
          ".hero-left-text",
          ".hero-right-text",
          ".hero-heading",
          ".hero-cards-left",
          ".hero-card-3",
          ".hero-navigation-sep",
        ], {
          opacity: 0,
          y: 15,
          visibility: "hidden"
        }, {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.75,
          stagger: 0.04,
          ease: "power2.out",
        }, "-=0.5");

        // Fade in morphed elements without changing their y/translate coordinates
        // to prevent property conflicts with GSAP FLIP offsets.
        tl.fromTo([
          ".hero-navigation-link",
          ".nav-button",
          ".nav-button-secondary",
          ".nav-stats-card",
        ], {
          opacity: 0,
          visibility: "hidden"
        }, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
        }, "-=0.5");
      }
    };

    let active = true;
    const startAnimations = () => {
      if (!active) return;
      if (document.fonts) {
        document.fonts.ready.then(() => {
          if (active) runLayoutAndEntrance();
        });
      } else {
        runLayoutAndEntrance();
      }
    };

    if (document.readyState === "complete") {
      // Use short delay to let component fully mount before starting GSAP context
      const t = setTimeout(startAnimations, 100);
      return () => {
        active = false;
        destroyMagneticPositions();
        clearTimeout(t);
      };
    } else {
      window.addEventListener("load", startAnimations);
      return () => {
        active = false;
        destroyMagneticPositions();
        window.removeEventListener("load", startAnimations);
      };
    }
  }, []);

  return (
    <div className="page-wrap">
      {/* Page Load Preloader overlay */}
      <Preloader />

      {/* Persistent Navigation & header bar */}
      <Navigation />

      {/* Main Sections container */}
      <main className="main-wrap" style={{ zIndex: 20, position: "relative" }}>
        <Hero />
        <About />
        <Work />
        <WhatYouGet />
        <Services />
        <CTA />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}


