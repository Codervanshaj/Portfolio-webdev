import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

// Local state to track sidebar scale
let sidebarScale = 1;

/**
 * Auto-scales the sticky navigation container to fit inside small height viewports
 * and compensates child components with inverse scaling to prevent distortion.
 */
export function scaleSidebar() {
  if (typeof window === "undefined" || window.innerWidth < 768) return;

  const sidebar = document.querySelector(".nav-container") as HTMLElement;
  if (!sidebar) return;

  const availableHeight = window.innerHeight - 40; // 40px padding
  const sh = sidebar.scrollHeight || 1;
  sidebarScale = Math.min(1, availableHeight / sh);

  // Safely cap scale to prevent it from collapsing to 0, NaN, or negative values
  if (isNaN(sidebarScale) || sidebarScale < 0.35) {
    sidebarScale = 0.35;
  }

  gsap.set(sidebar, { scale: sidebarScale, transformOrigin: "top left", force3D: false });

  const inverse = 1 / sidebarScale;

  const profileImg = document.querySelector(".profile-img-wrap") as HTMLElement;
  if (profileImg && profileImg.closest(".nav-container")) {
    gsap.set(profileImg, { scale: inverse, transformOrigin: "top left", force3D: false });
  }

  document.querySelectorAll(".nav-button .button-text, .nav-button-secondary .button-text").forEach(el => {
    gsap.set(el, { scale: inverse, transformOrigin: "center center", force3D: false });
  });
}

/**
 * Returns scroll triggers settings for elements
 */
function getSettings(el: HTMLElement) {
  const configEl = el.closest("[data-flip-start]") || document.querySelector(".hero");
  let trigger = ".hero", start = "top top", end = "900px top";
  if (configEl) {
    if (configEl.getAttribute("data-flip-trigger")) trigger = configEl.getAttribute("data-flip-trigger")!;
    if (configEl.getAttribute("data-flip-start")) start = configEl.getAttribute("data-flip-start")!;
    if (configEl.getAttribute("data-flip-end")) end = configEl.getAttribute("data-flip-end")!;
  }
  return { trigger, start, end };
}

/**
 * Measures the physical bounding box offsets of target elements compared to source ghosts.
 */
function measurePair(real: HTMLElement | null, ghost: HTMLElement | null, type: string) {
  if (!real || !ghost) return null;

  const settings = getSettings(real);
  const rRect = real.getBoundingClientRect();
  const gRect = ghost.getBoundingClientRect();
  const measurement: any = { real, ghost, type, settings, rRect, gRect };

  if (type === "logo") {
    const parent = real.closest(".nesh-copyright-wrap") || real.closest(".nav-button-wrap") || real.closest(".nav-logo-item") || real.parentElement;
    measurement.parent = parent;
    measurement.parentRect = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };
    measurement.computedStyle = {
      width: window.getComputedStyle(real).width,
      height: window.getComputedStyle(real).height
    };
    measurement.offsetHeight = real.offsetHeight;
  }

  if (type === "text_font") {
    measurement.ghostFontSize = parseFloat(window.getComputedStyle(ghost).fontSize);
  }

  if (type === "background") {
    const realStyle = window.getComputedStyle(real);
    const ghostStyle = window.getComputedStyle(ghost);
    measurement.realBorderRadius = parseFloat(realStyle.borderRadius) || 0;
    measurement.realBorderWidth = parseFloat(realStyle.borderWidth) || 0;
    measurement.ghostBorderRadius = parseFloat(ghostStyle.borderRadius) || 0;
  }

  measurement.realFontSize = window.getComputedStyle(real).fontSize;

  return measurement;
}

/**
 * Port of applyAnimation from GhostEngine. Morph animations from ghost (hero) to real (nav).
 */
function applyAnimation(m: any) {
  if (!m) return;

  const { real, type, settings, rRect, gRect } = m;

  let xDiff = Math.round((gRect.left - rRect.left) / sidebarScale);
  let yDiff = Math.round((gRect.top - rRect.top) / sidebarScale);

  let vars: any = { ease: "power1.inOut" };
  let toVarsOverrides: any = {};

  if (type === "logo") {
    const { parent, parentRect, computedStyle, offsetHeight } = m;

    if (parent && !parent.classList.contains("nesh-copyright-wrap") && !parent.classList.contains("nav-button-wrap")) {
      parent.style.position = "relative";
      parent.style.minHeight = offsetHeight + "px";
      parent.style.display = "block";
    }

    xDiff = Math.round((gRect.left - parentRect.left) / sidebarScale);
    yDiff = Math.round((gRect.top - parentRect.top) / sidebarScale);

    vars.width = (gRect.width / sidebarScale) + "px";
    vars.height = (gRect.height / sidebarScale) + "px";
    vars.position = "absolute";
    vars.top = "0px";
    vars.left = "0px";

    toVarsOverrides.width = computedStyle.width;
    toVarsOverrides.height = computedStyle.height;
    toVarsOverrides.position = "absolute";
    toVarsOverrides.top = "0px";
    toVarsOverrides.left = "0px";

    vars.x = xDiff;
    vars.y = yDiff;
    vars.transformOrigin = "top left";
    vars.force3D = false;
    delete vars.scale;
  }
  else if (type === "link") {
    vars.x = xDiff;
    vars.y = yDiff;
    vars.scaleX = gRect.width / rRect.width;
    vars.scaleY = gRect.height / rRect.height;
    vars.transformOrigin = "top left";
  }
  else if (type === "background") {
    const sX = gRect.width / rRect.width;
    const sY = gRect.height / rRect.height;
    const avgScale = (sX + sY) / 2;
    vars.x = xDiff;
    vars.y = yDiff;
    vars.scaleX = sX;
    vars.scaleY = sY;
    vars.transformOrigin = "top left";
    vars.backgroundColor = "rgba(194, 184, 172, 0.3)";

    const ghostR = m.ghostBorderRadius || m.realBorderRadius;
    const fromCorner = (ghostR / sX) + "px " + (ghostR / sY) + "px";
    vars.borderTopLeftRadius = fromCorner;
    vars.borderTopRightRadius = fromCorner;
    vars.borderBottomLeftRadius = fromCorner;
    vars.borderBottomRightRadius = fromCorner;
    vars.borderWidth = (m.realBorderWidth / avgScale) + "px";
    vars.boxSizing = "border-box";
    vars.opacity = 1;
  }
  else if (type === "icon_center") {
    vars.x = xDiff;
    vars.y = yDiff;
    vars.scaleX = gRect.width / rRect.width;
    vars.scaleY = gRect.height / rRect.height;
    vars.transformOrigin = "top left";
  }
  else if (type === "text_font") {
    vars.x = xDiff;
    vars.y = yDiff;
    vars.scaleX = gRect.width / rRect.width;
    vars.scaleY = gRect.height / rRect.height;
    vars.transformOrigin = "top left";
  }

  let fromVars = { ...vars };
  let toVars = {
    x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotation: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)",
    opacity: 0,
    fontSize: m.realFontSize,
    ease: "power1.inOut", force3D: false,
    scrollTrigger: { 
      trigger: settings.trigger, 
      start: settings.start, 
      end: settings.end, 
      scrub: 1 
    },
    ...toVarsOverrides
  };

  if (type !== "logo") {
    delete fromVars.width; delete toVars.width;
    delete fromVars.height; delete toVars.height;
  }
  if (type !== "background") {
    delete fromVars.backgroundColor; delete toVars.backgroundColor;
    delete fromVars.borderRadius; delete toVars.borderRadius;
    delete fromVars.borderTopLeftRadius; delete toVars.borderTopLeftRadius;
    delete fromVars.borderTopRightRadius; delete toVars.borderTopRightRadius;
    delete fromVars.borderBottomLeftRadius; delete toVars.borderBottomLeftRadius;
    delete fromVars.borderBottomRightRadius; delete toVars.borderBottomRightRadius;
    delete fromVars.opacity; delete toVars.opacity;
  } else {
    const toCorner = m.realBorderRadius + "px " + m.realBorderRadius + "px";
    toVars.borderTopLeftRadius = toCorner;
    toVars.borderTopRightRadius = toCorner;
    toVars.borderBottomLeftRadius = toCorner;
    toVars.borderBottomRightRadius = toCorner;
    delete fromVars.borderRadius; delete toVars.borderRadius;
  }
  delete fromVars.fontSize; delete toVars.fontSize;
  delete fromVars.color; delete toVars.color;
  if (type !== "logo") {
    delete fromVars.position; delete toVars.position;
    delete fromVars.top; delete toVars.top;
    delete fromVars.left; delete toVars.left;
  }

  delete fromVars.backdropFilter; delete toVars.backdropFilter;
  delete fromVars.webkitBackdropFilter; delete toVars.webkitBackdropFilter;

  gsap.fromTo(real, fromVars, toVars);
}

/**
 * Initializes the full logo FLIP scroll sequences (Hero -> Nav transition).
 */
export function initLogoFlip() {
  if (typeof window === "undefined" || window.innerWidth < 768 || !gsap) return;

  // Scale the sidebar first
  scaleSidebar();

  const measurements: any[] = [];

  measurements.push(measurePair(document.querySelector(".nav-logo-item .nesh-logo"), document.querySelector(".nesh-logo-ghost"), "logo"));
  measurements.push(measurePair(document.querySelector(".nav-button"), document.querySelector(".hero-cta-button"), "logo"));
  measurements.push(measurePair(document.querySelector(".nav-button-secondary"), document.querySelector(".hero-button"), "logo"));

  document.querySelectorAll(".hero-navigation-link").forEach(link => {
    const id = link.getAttribute("data-link-id");
    measurements.push(measurePair(link as HTMLElement, document.querySelector(`.hero-link-ghost[data-link-id="${id}"]`), "link"));
  });

  measurements.push(measurePair(document.querySelector(".nav-webflow-bg"), document.querySelector(".hero-card-2-bg"), "background"));
  measurements.push(measurePair(document.querySelector(".nav-webflow-icon"), document.querySelector(".hero-webflow-icon"), "icon_center"));
  measurements.push(measurePair(document.querySelector(".nav-webflow-text"), document.querySelector(".hero-webflow-projects-text"), "text_font"));
  measurements.push(measurePair(document.querySelector(".nav-experience-bg"), document.querySelector(".experience-bg"), "background"));
  measurements.push(measurePair(document.querySelector(".nav-experience-numb"), document.querySelector(".experience-number"), "icon_center"));
  measurements.push(measurePair(document.querySelector(".nav-experience-text"), document.querySelector(".experience-text"), "text_font"));

  // Initial states for hero items
  gsap.set(".hero-cta-button", { opacity: 0 });
  gsap.set(".hero-button", { opacity: 0 });

  measurements.forEach(m => {
    if (m) applyAnimation(m);
  });

  // Handle Copyright icon
  const crReal = document.querySelector(".nesh-copyright-icon") as HTMLElement;
  const crGhost = document.querySelector(".nesh-copyright-icon-ghost") as HTMLElement;
  if (crReal && crGhost) {
    const parent = crReal.closest(".nesh-copyright-wrap") as HTMLElement;
    if (parent) {
      const gRect = crGhost.getBoundingClientRect();
      const pRect = parent.getBoundingClientRect();
      const computedWidth = window.getComputedStyle(crReal).width;
      const computedHeight = window.getComputedStyle(crReal).height;

      gsap.fromTo(crReal, {
        x: Math.round((gRect.left - pRect.left) / sidebarScale),
        y: Math.round((gRect.top - pRect.top) / sidebarScale),
        width: (gRect.width / sidebarScale) + "px",
        height: (gRect.height / sidebarScale) + "px",
        position: "absolute",
        top: "0px",
        left: "0px",
        transformOrigin: "top left",
        ease: "power1.inOut"
      }, {
        x: 0, y: 0,
        width: computedWidth,
        height: computedHeight,
        position: "absolute",
        top: "0px",
        left: "0px",
        ease: "power1.inOut",
        force3D: false,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "50% top",
          scrub: 1
        }
      });
    }
  }
}
