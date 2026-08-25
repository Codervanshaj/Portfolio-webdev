import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import Lenis from "lenis";

/**
 * Initializes and manages Lenis smooth scroll lifecycle.
 * Syncs Lenis scroll triggers with GSAP ScrollTrigger and the gsap ticker.
 */
export function useLenis() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const options = {
      duration: 0.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    };

    // Instantiate Lenis
    const lenisInstance = new Lenis(options);
    lenisRef.current = lenisInstance;
    (window as any).LenisInstance = lenisInstance;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenisInstance.on("scroll", () => {
      if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
        ScrollTrigger.update();
      }
    });

    // Add Lenis to GSAP ticker
    const tickerUpdate = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Disable lag smoothing to prevent syncing issues
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenisInstance.destroy();
      lenisRef.current = null;
      delete (window as any).LenisInstance;
    };
  }, []);

  return lenisRef;
}
