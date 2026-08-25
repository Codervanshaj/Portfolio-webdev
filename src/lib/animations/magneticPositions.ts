import { gsap } from "@/lib/animations/gsap";

let initialized = false;
let pairs: any[] = [];
let rafId: number | null = null;
let isRunning = false;
let isMobile = false;
let lastWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

function parseUnit(value: any) {
  if (!value || value === "0") return { value: 0, unit: "px" };
  const match = String(value).match(/^(-?[\d.]+)(px|%|vw|vh|rem|em)?$/i);
  if (!match) return { value: 0, unit: "px" };
  return { value: parseFloat(match[1]), unit: (match[2] || "px").toLowerCase() };
}

function toPx(parsed: any, ref = 0) {
  const { value, unit } = parsed;
  switch (unit) {
    case "%": return (value / 100) * ref;
    case "vw": return (value / 100) * window.innerWidth;
    case "vh": return (value / 100) * window.innerHeight;
    case "rem": return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
    default: return value;
  }
}

function getPoint(rect: DOMRect, config: string) {
  let x = rect.left + rect.width / 2;
  let y = rect.top + rect.height / 2;

  if (config.includes("left")) x = rect.left;
  else if (config.includes("right")) x = rect.right;
  if (config.includes("top")) y = rect.top;
  else if (config.includes("bottom")) y = rect.bottom;

  return { x, y };
}

function collectPairs() {
  document.querySelectorAll("[data-origin]").forEach(target => {
    const el = target as HTMLElement;
    if (el.hasAttribute("data-desktop") && window.innerWidth < 768) return;

    let id = el.getAttribute("data-connect");
    if (isMobile && el.hasAttribute("data-connect-mobile")) {
      id = el.getAttribute("data-connect-mobile");
    }
    
    if (!id) return;

    const anchor = document.querySelector(`[data-connect="${id}"]:not([data-origin])`) as HTMLElement;
    if (!anchor) return;

    let offsetRaw = el.getAttribute("data-offset") || "0,0";
    if (isMobile && el.hasAttribute("data-offset-mobile")) {
      offsetRaw = el.getAttribute("data-offset-mobile")!;
    }
    
    let originConfig = el.getAttribute("data-origin") || "center";
    if (isMobile && el.hasAttribute("data-origin-mobile")) {
      originConfig = el.getAttribute("data-origin-mobile")!;
    }
    
    let anchorConfig = el.getAttribute("data-anchor-pos") || "center";
    if (isMobile && el.hasAttribute("data-anchor-pos-mobile")) {
      anchorConfig = el.getAttribute("data-anchor-pos-mobile")!;
    }
    
    const [rawX, rawY] = offsetRaw.split(",").map(s => s.trim());

    pairs.push({
      target: el,
      anchor,
      originConfig: originConfig.toLowerCase(),
      anchorConfig: anchorConfig.toLowerCase(),
      offsetX: parseUnit(rawX),
      offsetY: parseUnit(rawY)
    });

    el.style.willChange = "transform";
  });
}

function positionAllOnce() {
  pairs.forEach(pair => {
    const { target, anchor, originConfig, anchorConfig, offsetX, offsetY } = pair;

    if (!target || !anchor) return;

    target.style.transform = "none";
    target.offsetHeight; // force reflow

    const targetRect = target.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();

    const anchorPoint = getPoint(anchorRect, anchorConfig);
    const originPoint = getPoint(targetRect, originConfig);

    const offX = toPx(offsetX, targetRect.width);
    const offY = toPx(offsetY, targetRect.height);

    const finalX = Math.round((anchorPoint.x - originPoint.x + offX) * 100) / 100;
    const finalY = Math.round((anchorPoint.y - originPoint.y + offY) * 100) / 100;

    target.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
    target.style.visibility = "visible";
    target.style.opacity = "1";
  });
}

function updatePairDesktop(pair: any) {
  const { target, anchor, originConfig, anchorConfig, offsetX, offsetY } = pair;

  if (!target || !anchor) return;

  const style = getComputedStyle(target);
  const transform = style.transform;
  
  let currentX = 0;
  let currentY = 0;
  
  if (transform && transform !== "none") {
    const values = transform.split("(")[1].split(")")[0].split(",");
    currentX = parseFloat(values[4]) || 0;
    currentY = parseFloat(values[5]) || 0;
  }

  const targetRectRaw = target.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();

  const baseRect = {
    left: targetRectRaw.left - currentX,
    top: targetRectRaw.top - currentY,
    width: targetRectRaw.width,
    height: targetRectRaw.height,
    right: targetRectRaw.right - currentX,
    bottom: targetRectRaw.bottom - currentY
  } as DOMRect;

  const anchorPoint = getPoint(anchorRect, anchorConfig);
  const originPoint = getPoint(baseRect, originConfig);

  const offX = toPx(offsetX, baseRect.width);
  const offY = toPx(offsetY, baseRect.height);

  const finalX = Math.round((anchorPoint.x - originPoint.x + offX) * 100) / 100;
  const finalY = Math.round((anchorPoint.y - originPoint.y + offY) * 100) / 100;

  target.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
  target.style.visibility = "visible";
  target.style.opacity = "1";
}

function updateAll() {
  pairs.forEach(pair => updatePairDesktop(pair));
}

function startLoop() {
  if (isRunning) return;
  isRunning = true;

  const loop = () => {
    if (!isRunning) return;
    updateAll();
    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);
}

function stopLoop() {
  isRunning = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function resizeHandler() {
  const newWidth = window.innerWidth;
  const wasMobile = isMobile;
  
  if (isMobile && newWidth === lastWidth) {
    return;
  }
  
  lastWidth = newWidth;
  isMobile = newWidth < 768;
  
  if (wasMobile !== isMobile) {
    rebuildPairs();
  } else {
    positionAllOnce();
  }
  
  if (isMobile) {
    stopLoop();
  } else if (!isRunning) {
    startLoop();
  }
}

function rebuildPairs() {
  pairs.forEach(pair => {
    if (pair.target) {
      pair.target.style.transform = "none";
    }
  });
  pairs = [];
  collectPairs();
  if (pairs.length > 0) {
    positionAllOnce();
  }
}

/**
 * Initializes target position tracking to snap nodes to connections (e.g. alignment layout loops).
 */
export function initMagneticPositions() {
  if (typeof window === "undefined") return;

  if (initialized) return;

  isMobile = window.innerWidth < 768;
  lastWidth = window.innerWidth;
  pairs = [];
  collectPairs();

  if (pairs.length === 0) return;

  positionAllOnce();

  if (!isMobile) {
    startLoop();
  }

  window.addEventListener("resize", resizeHandler, { passive: true });
  initialized = true;
}

/**
 * Clean up connections trackers loop.
 */
export function destroyMagneticPositions() {
  stopLoop();
  window.removeEventListener("resize", resizeHandler);
  
  pairs.forEach(pair => {
    if (pair.target) {
      pair.target.style.transform = "";
      pair.target.style.willChange = "";
      pair.target.style.visibility = "";
      pair.target.style.opacity = "";
    }
  });

  pairs = [];
  initialized = false;
}
