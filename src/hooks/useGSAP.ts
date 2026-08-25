import { useEffect } from "react";
import { gsap } from "@/lib/animations/gsap";

/**
 * A safe hook to execute GSAP animations inside React.
 * Handles garbage collection/reversion automatically when the component unmounts.
 * 
 * @param callback The function housing all GSAP selectors and timelines
 * @param deps Dependency array to trigger animation updates
 */
export function useGSAP(callback: (ctx: any) => void, deps: any[] = []) {
  useEffect(() => {
    // Only execute on browser client
    if (typeof window === "undefined" || !gsap || !gsap.context) return;

    const ctx = gsap.context(callback);

    // Revert/cleanup animations on unmount
    return () => {
      ctx.revert();
    };
  }, deps);
}
