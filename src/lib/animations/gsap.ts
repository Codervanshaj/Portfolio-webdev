import { gsap as gsapNpm } from "gsap";
import { ScrollTrigger as ScrollTriggerNpm } from "gsap/ScrollTrigger";
import { Flip as FlipNpm } from "gsap/Flip";
import { ScrollToPlugin as ScrollToPluginNpm } from "gsap/ScrollToPlugin";

let gsap = gsapNpm;
let ScrollTrigger = ScrollTriggerNpm;
let Flip = FlipNpm;
let ScrollToPlugin = ScrollToPluginNpm;
let SplitText: any;

if (typeof window !== "undefined") {
  // Expose gsap to window for the commercial plugins loaded from public files
  (window as any).gsap = gsap;

  // Register the standard/free plugins
  gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);

  // Retrieve the commercial/club plugins from the window object where they are loaded
  SplitText = (window as any).SplitText;
  if (SplitText) {
    gsap.registerPlugin(SplitText);
  } else {
    // Fallback: If not loaded yet, retrieve and register dynamically when window loads
    const handleLoad = () => {
      const st = (window as any).SplitText;
      if (st) {
        SplitText = st;
        gsap.registerPlugin(st);
      }
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
  }
} else {
  // SSR Mock for server-side compilation safety
  gsap = {
    registerPlugin: () => {},
    set: () => {},
    fromTo: () => {},
    to: () => {},
    from: () => {},
    context: () => ({ revert: () => {} }),
    matchMedia: () => ({ add: () => {} }),
    ticker: { add: () => {}, remove: () => {} },
  } as any;
  ScrollTrigger = {} as any;
  Flip = {} as any;
  SplitText = {} as any;
  ScrollToPlugin = {} as any;
}

export { gsap, ScrollTrigger, Flip, SplitText, ScrollToPlugin };
