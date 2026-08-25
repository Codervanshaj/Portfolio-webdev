interface AnimationEngine {
  init(): void;
  destroy(): void;
}

declare global {
  interface Window {
    AnimationEngine?: AnimationEngine;
    gsap?: typeof import('gsap').gsap;
    ScrollTrigger?: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    Lenis?: typeof import('lenis').default;
  }
}

export {};
