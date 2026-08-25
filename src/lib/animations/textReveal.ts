import { gsap } from "@/lib/animations/gsap";

/**
 * Traverses DOM nodes of an element recursively to wrap text characters in spans
 * while preserving tags like <br/>, links, and specific data attributes.
 */
function splitTextPreservingElements(element: HTMLElement) {
  const container = document.createDocumentFragment();

  const processNode = (node: ChildNode, parentContainer: DocumentFragment | HTMLElement) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const chars = text.split("");
      
      chars.forEach(char => {
        const span = document.createElement("span");
        span.className = "anim-char";
        span.textContent = char;
        parentContainer.appendChild(span);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const shouldPreserve = 
        el.hasAttribute("data-connect") || 
        el.hasAttribute("data-origin") ||
        el.classList.contains("span") ||
        el.tagName === "BR" ||
        el.tagName === "IMG";

      if (shouldPreserve) {
        const clone = el.cloneNode(true);
        parentContainer.appendChild(clone);
      } else {
        const wrapper = el.cloneNode(false) as HTMLElement;
        
        Array.from(el.childNodes).forEach(child => {
          processNode(child, wrapper);
        });
        
        if (wrapper.childNodes.length > 0) {
          parentContainer.appendChild(wrapper);
        }
      }
    }
  };

  Array.from(element.childNodes).forEach(child => {
    processNode(child, container);
  });

  element.innerHTML = "";
  element.appendChild(container);
}

/**
 * Initializes character-by-character scroll reveal on target text elements.
 * Replaces the raw text inside target with character spans, and triggers GSAP ScrollTrigger to
 * colorize them as the user scrolls.
 * 
 * @param selector CSS selector of elements to apply reveal animation to (e.g. '.what_you_get-text')
 */
export function initTextReveal(selector: string) {
  if (typeof window === "undefined" || !gsap) return;

  const targets = document.querySelectorAll(selector);
  targets.forEach(target => {
    const el = target as HTMLElement;
    if (el.dataset.splitInitialized === "true") return;

    splitTextPreservingElements(el);
    el.dataset.splitInitialized = "true";

    const chars = el.querySelectorAll(".anim-char");
    if (chars.length === 0) return;

    gsap.fromTo(chars,
      { color: "#E0DFC5", filter: "blur(0px)", opacity: 0.1, y: 5 },
      {
        color: "black",
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        force3D: true,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          end: "top 25%",
          scrub: 1,
          markers: false
        }
      }
    );
  });
}
