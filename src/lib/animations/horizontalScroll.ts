import { gsap } from "@/lib/animations/gsap";

let workTween: any = null;
let setupTimeout: NodeJS.Timeout | null = null;

/**
 * Destroys existing work horizontal scroll tween and timeouts.
 */
export function destroyHorizontalScroll() {
  if (setupTimeout) {
    clearTimeout(setupTimeout);
    setupTimeout = null;
  }
  if (workTween) {
    workTween.kill();
    workTween = null;
  }
}

/**
 * Sets up horizontal pin and scroll animation for the selected work cards section.
 */
export function initHorizontalScroll() {
  if (typeof window === "undefined" || window.innerWidth < 768 || !gsap) return;

  const section = document.querySelector(".work_section") as HTMLElement;
  const stickyEl = document.querySelector(".work-sticky") as HTMLElement;
  const stickySupportEl = document.querySelector(".work-sticky-support") as HTMLElement;
  const wrap = document.querySelector(".work-track-wrap") as HTMLElement;
  const track = document.querySelector(".work-track") as HTMLElement;

  if (!section || !stickyEl || !stickySupportEl || !wrap || !track) return;

  destroyHorizontalScroll();
  gsap.set(track, { clearProps: "transform" });

  setupTimeout = setTimeout(() => {
    // Force reflow
    section.offsetHeight;
    stickyEl.offsetHeight;
    stickySupportEl.offsetHeight;
    wrap.offsetHeight;
    track.offsetHeight;

    // Calculate height of the scroll spacer
    const sectionHeight = section.offsetHeight;
    const stickyHeight = stickyEl.offsetHeight;
    const supportHeight = sectionHeight - stickyHeight;
    stickySupportEl.style.height = supportHeight + "px";

    const wrapRect = wrap.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const overflowRight = Math.max(0, trackRect.right - wrapRect.right);
    const xMovement = -overflowRight;

    const viewportHeight = window.innerHeight;
    const scrollDistance = sectionHeight - viewportHeight;

    // Create horizontal scroll ScrollTrigger
    workTween = gsap.to(track, {
      x: xMovement,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: (self: any) => {
          const newWrapRect = wrap.getBoundingClientRect();
          const newTrackRect = track.getBoundingClientRect();
          const newOverflowRight = Math.max(0, newTrackRect.right - newWrapRect.right);

          const newSectionHeight = section.offsetHeight;
          const newStickyHeight = stickyEl.offsetHeight;
          const newSupportHeight = newSectionHeight - newStickyHeight;
          stickySupportEl.style.height = newSupportHeight + "px";

          const newViewportHeight = window.innerHeight;
          const newScrollDistance = newSectionHeight - newViewportHeight;

          if (workTween && workTween.scrollTrigger) {
            gsap.set(track, { x: 0 });
            workTween.vars.x = -newOverflowRight;
            workTween.scrollTrigger.vars.end = `+=${newScrollDistance}`;
            workTween.invalidate();
          }
        }
      }
    });

    // Animate work cards entering view
    const workCards = document.querySelectorAll(".work-card");
    if (workCards.length > 0) {
      gsap.set(workCards, { y: "10%", opacity: 0, scale: 0.6 });

      const inViewCards: HTMLElement[] = [];
      const offScreenCards: HTMLElement[] = [];

      workCards.forEach(card => {
        const el = card as HTMLElement;
        const cardRect = el.getBoundingClientRect();
        if (cardRect.left < wrapRect.right) {
          inViewCards.push(el);
        } else {
          offScreenCards.push(el);
        }
      });

      // Cards already visible when entering the section
      if (inViewCards.length > 0) {
        gsap.to(inViewCards, {
          y: "0%",
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      // Off-screen cards animate individually as they scroll into view
      offScreenCards.forEach(card => {
        gsap.to(card, {
          y: "0%",
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: workTween,
            start: "left right",
            toggleActions: "play none none none"
          }
        });
      });
    }
  }, 100);
}
