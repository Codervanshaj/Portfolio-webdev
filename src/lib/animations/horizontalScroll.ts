import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

let workTween: gsap.core.Tween | null = null;
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
    workTween.scrollTrigger?.kill();
    workTween.kill();
    workTween = null;
  }
}

/**
 * Sets up horizontal scroll animation for the selected work section using CSS sticky bottom.
 *
 * Design: The parent container (.work_section) has a tall scroll-track sibling (.work-sticky-support)
 * that gives it height. The .work-sticky child sticks to the viewport bottom natively via CSS.
 * GSAP ScrollTrigger scrubs .work-track horizontally based on scroll progress of .work_section.
 */
export function initHorizontalScroll() {
  if (typeof window === "undefined" || window.innerWidth < 768 || !gsap) return;

  const section = document.querySelector<HTMLElement>(".work_section");
  const stickyEl = document.querySelector<HTMLElement>(".work-sticky");
  const track = document.querySelector<HTMLElement>(".work-track");
  const wrap = document.querySelector<HTMLElement>(".work-track-wrap");

  if (!section || !stickyEl || !track || !wrap) return;

  destroyHorizontalScroll();

  // Clear any leftover transforms
  gsap.set(track, { clearProps: "transform,x" });

  const runSetup = () => {
    // Force layout so measurements are fresh
    section.getBoundingClientRect();
    stickyEl.getBoundingClientRect();
    track.getBoundingClientRect();
    wrap.getBoundingClientRect();

    const measureAndCreate = () => {
      // Calculate dynamic padding-left in pixels
      const paddingLeft = parseFloat(window.getComputedStyle(wrap).paddingLeft) || 0;

      // Total translation is track width minus the visible (inner) wrap width
      const totalXMove = Math.max(0, track.scrollWidth - (wrap.offsetWidth - paddingLeft));

      if (totalXMove === 0) {
        // All cards fit - no horizontal scroll needed
        return;
      }

      workTween = gsap.to(track, {
        x: -totalXMove,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh() {
            const newPaddingLeft = parseFloat(window.getComputedStyle(wrap).paddingLeft) || 0;
            const newXMove = Math.max(0, track.scrollWidth - (wrap.offsetWidth - newPaddingLeft));

            if (workTween) {
              gsap.set(track, { x: 0 });
              workTween.vars.x = -newXMove;
              workTween.invalidate();
            }
          },
        },
      });

      // Entrance animations for visible cards
      const workCards = document.querySelectorAll<HTMLElement>(".work-card");
      if (workCards.length > 0) {
        gsap.set(workCards, { y: "8%", opacity: 0, scale: 0.92 });

        const inView: HTMLElement[] = [];
        const offScreen: HTMLElement[] = [];

        workCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.left < wrap.getBoundingClientRect().right + 50) {
            inView.push(card);
          } else {
            offScreen.push(card);
          }
        });

        if (inView.length > 0) {
          gsap.to(inView, {
            y: "0%",
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        offScreen.forEach((card) => {
          gsap.to(card, {
            y: "0%",
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: workTween || undefined,
              start: "left 95%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    };

    measureAndCreate();
    ScrollTrigger.refresh();
  };

  // Wait for images to load before measuring so card widths/heights are correct
  const images = Array.from(section.querySelectorAll<HTMLImageElement>("img"));
  const total = images.length;

  if (total === 0) {
    setupTimeout = setTimeout(runSetup, 250);
    return;
  }

  let loaded = 0;
  const onLoad = () => {
    loaded++;
    if (loaded >= total) {
      setupTimeout = setTimeout(runSetup, 250);
    }
  };

  images.forEach((img) => {
    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onLoad, { once: true });
    }
  });
}
