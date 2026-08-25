import { gsap, SplitText } from "@/lib/animations/gsap";

let splitInstances: any[] = [];

/**
 * Reverts all SplitText instances and removes DOM line masks to clean up.
 */
export function destroyScrollTriggers() {
  splitInstances.forEach(({ instance, element }) => {
    if (instance && typeof instance.revert === "function") {
      instance.revert();
    }
    element.querySelectorAll(".line-mask").forEach((mask: HTMLElement) => {
      const line = mask.firstChild;
      if (line && mask.parentNode) {
        mask.parentNode.insertBefore(line, mask);
      }
      mask.remove();
    });
    element.removeAttribute("data-split-initialized");
  });
  splitInstances = [];
}

/**
 * Initializes custom masked number counter layout and animation.
 * Replaces target's text content with rolling digit columns and sets up GSAP trigger.
 */
export function initMaskedNumber(el: HTMLElement, trigger: string, start: string, once = false) {
  if (typeof window === "undefined" || !gsap) return;
  if (el.querySelector(".number-wrap")) return;

  const targetVal = el.getAttribute("data-number-count") || el.textContent?.trim() || "";
  el.textContent = "";

  const wrap = document.createElement("div");
  wrap.className = "number-wrap";
  el.appendChild(wrap);

  const digitConfigs: { track: HTMLElement; targetIndex: number }[] = [];

  [...targetVal].forEach((char) => {
    const mask = document.createElement("div");
    mask.className = "digit-mask";

    const T = parseInt(char, 10);
    if (!isNaN(T)) {
      const track = document.createElement("div");
      track.className = "digit-track";
      
      // Create 10 spans (0-9) matching the CSS height: 1em per span = 10% per span
      for (let k = 0; k < 10; k++) {
        const span = document.createElement("span");
        span.textContent = k.toString();
        track.appendChild(span);
      }
      mask.appendChild(track);
      
      mask.dataset.isDigit = "true";
      wrap.appendChild(mask);
      
      digitConfigs.push({ track, targetIndex: T });
    } else {
      mask.textContent = char;
      mask.dataset.isDigit = "false";
      wrap.appendChild(mask);
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      toggleActions: once ? "play none none none" : "play none none reverse",
      once
    }
  });

  digitConfigs.forEach(({ track, targetIndex }, i) => {
    // Initial position is index 0 (each span is 10% of track height)
    gsap.set(track, { yPercent: 0 });
    // Animate forward to targetIndex
    tl.to(track, {
      yPercent: -targetIndex * 10,
      duration: 1.2,
      ease: "power3.out"
    }, i * 0.06);
  });
}

/**
 * Helper to build custom SplitText text entrance transitions.
 */
export function initSplitTextReveal(el: HTMLElement, trigger: string, start: string, end: string, splitType: "lines" | "words" | "chars" = "lines", fromVars: any = {}, toVars: any = {}, isScrub = false, once = false) {
  if (typeof window === "undefined" || !gsap || !SplitText) return;

  const hasInitialized = el.getAttribute("data-split-initialized") === "true";
  let targets: any;

  if (hasInitialized) {
    targets = splitType === "lines" ? el.querySelectorAll(".line") : el.querySelectorAll(`.${splitType.slice(0, -1)}`);
  } else {
    const split = new SplitText(el, {
      type: splitType,
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char"
    });
    splitInstances.push({ instance: split, element: el });
    el.setAttribute("data-split-initialized", "true");

    if (splitType === "lines") {
      split.lines.forEach((line: HTMLElement) => {
        if (line.parentElement && !line.parentElement.classList.contains("line-mask")) {
          const wrapper = document.createElement("div");
          wrapper.classList.add("line-mask");
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        }
      });
      targets = split.lines;

      const clip = window.getComputedStyle(el).webkitBackgroundClip || window.getComputedStyle(el).backgroundClip;
      if (clip === "text") {
        el.style.background = "none";
        el.style.webkitTextFillColor = "transparent";
      }
    } else {
      targets = split[splitType];
    }
  }

  const tweenConfig = {
    ...toVars,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: isScrub ? 1 : false,
      toggleActions: isScrub ? undefined : (once ? "play none none none" : "restart none none reverse"),
      once
    }
  };

  gsap.fromTo(targets, fromVars, tweenConfig);
}

/**
 * Parses and initializes all GSAP animations declared via HTML data-tl-* attributes.
 */
export function initScrollAnimations() {
  if (typeof window === "undefined" || !gsap) return;

  const elements = document.querySelectorAll("[data-tl-type], [data-number-count]");
  elements.forEach((el: any) => {
    const isDesktopOnly = el.hasAttribute("data-tl-desktop");
    if (isDesktopOnly && window.innerWidth < 768) return;

    const type = el.getAttribute("data-tl-type");
    const numberAttr = el.getAttribute("data-number-count");
    const trigger = el.getAttribute("data-tl-trigger") || ".hero";
    const start = el.getAttribute("data-tl-start") || "900px top";
    const end = el.getAttribute("data-tl-end") || "bottom top";

    let rawFrom = el.getAttribute("data-tl-from") || "{}";
    let rawTo = el.getAttribute("data-tl-to") || "{}";

    // Standardize single quotes for JSON parsing
    rawFrom = rawFrom.replace(/'/g, '"');
    rawTo = rawTo.replace(/'/g, '"');

    let fromVars: any = {};
    let toVars: any = {};

    try {
      fromVars = JSON.parse(rawFrom);
      toVars = JSON.parse(rawTo);
    } catch (err) {
      console.warn("Failed to parse animation data attributes on element:", el, err);
    }

    // 1. Roll-up Digit Counter
    if (numberAttr !== null) {
      initMaskedNumber(el, trigger, start, el.hasAttribute("data-tl-once"));
      return;
    }

    // 2. Text Reveal Split Text
    const splitType = el.getAttribute("data-tl-split");
    if (splitType) {
      const isScrub = type === "scroll";
      initSplitTextReveal(
        el,
        trigger,
        start,
        end,
        splitType as any,
        fromVars,
        toVars,
        isScrub,
        el.hasAttribute("data-tl-once")
      );
      return;
    }

    // 3. Generic Element Tween
    let targets: any = el;
    if (el.getAttribute("data-tl-target")) {
      targets = el.querySelectorAll(el.getAttribute("data-tl-target"));
    }

    let tweenConfig = { ...toVars };
    const isOnce = el.hasAttribute("data-tl-once");

    if (type === "scroll") {
      tweenConfig.scrollTrigger = {
        trigger,
        start,
        end,
        scrub: 1
      };
      if (isOnce) tweenConfig.scrollTrigger.once = true;
    } else {
      if (!tweenConfig.duration) tweenConfig.duration = 0.5;
      if (!tweenConfig.ease) tweenConfig.ease = "power1.inOut";
      tweenConfig.scrollTrigger = {
        trigger,
        start,
        toggleActions: isOnce ? "play none none none" : "restart none none reverse",
        once: isOnce
      };
    }

    gsap.fromTo(targets, fromVars, tweenConfig);
  });
}
