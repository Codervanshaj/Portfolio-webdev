"use client";

import { useLenis } from "@/hooks/useLenis";
import { useGSAP } from "@/hooks/useGSAP";
import { initMagneticPositions, destroyMagneticPositions } from "@/lib/animations/magneticPositions";

import Preloader from "./layout/Preloader";
import Navigation from "./layout/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import WhatYouGet from "./sections/WhatYouGet";
import Services from "./sections/Services";
import CTA from "./sections/CTA";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import Footer from "./layout/Footer";

export function HeyNeshCloneClient() {
  // Setup Lenis smooth scrolling
  useLenis();

  // Setup magnetic coordinates tracking positions loops
  useGSAP(() => {
    initMagneticPositions();
    return () => {
      destroyMagneticPositions();
    };
  }, []);

  return (
    <>
      {/* Page Load Preloader overlay */}
      <Preloader />

      {/* Persistent Navigation & header bar */}
      <Navigation />

      {/* Main Sections container */}
      <main className="main-wrap">
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
    </>
  );
}
