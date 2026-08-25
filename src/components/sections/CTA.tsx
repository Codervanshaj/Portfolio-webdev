"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

export default function CTA() {
  useGSAP(() => {
    const wrap = document.querySelector(".cta-wrap");
    if (!wrap) return;

    const typingGrid = wrap.querySelector(".typing-grid") as HTMLElement;
    const typingBubble = typingGrid?.querySelector(".cta-bubble") as HTMLElement;
    const chatGrid = wrap.querySelector(".cta-chat-grid") as HTMLElement;
    const chatBubble = chatGrid?.querySelector(".cta-bubble") as HTMLElement;
    const chatText = chatGrid?.querySelector(".cta-text") as HTMLElement;
    const buttonGrid = wrap.querySelector(".cta-button-grid") as HTMLElement;
    const buttonBubble = buttonGrid?.querySelector(".cta-bubble") as HTMLElement;
    const buttonText = buttonGrid?.querySelector("p") as HTMLElement;
    const dots = wrap.querySelectorAll(".typing-dots");
    const speed = 0.728; // CONFIG.ctaSpeed

    // Initial states for grids
    gsap.set([chatGrid, buttonGrid], { gridTemplateRows: "0fr" });
    gsap.set(typingGrid, { gridTemplateRows: "1fr" });
    
    // Initial states for bubbles (scale from 0)
    if (typingBubble) gsap.set(typingBubble, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    if (chatBubble) gsap.set(chatBubble, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    if (buttonBubble) gsap.set(buttonBubble, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    
    // Initial states for text content
    if (chatText) gsap.set(chatText, { opacity: 0, filter: "blur(4px)" });
    if (buttonText) gsap.set(buttonText, { opacity: 0, filter: "blur(4px)" });
    
    // Typing dots initial state
    gsap.set(dots, { y: 0, opacity: 0.6 });

    // Typing dots loop animation
    const dotsTl = gsap.timeline({ repeat: -1, paused: true });
    dotsTl.to(dots, { y: -6, opacity: 1, duration: 0.35 * speed, stagger: 0.15 * speed, ease: "power1.inOut" })
          .to(dots, { y: 0, opacity: 0.6, duration: 0.35 * speed, stagger: 0.15 * speed, ease: "power1.inOut" });

    // Helper function to get position offset between two elements
    const getPositionOffset = (from: HTMLElement, to: HTMLElement) => {
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      return {
        x: toRect.left - fromRect.left,
        y: toRect.top - fromRect.top
      };
    };

    ScrollTrigger.create({
      trigger: wrap,
      start: "top 90%",
      once: true,
      onEnter: () => {
        // Calculate offsets before animation starts
        const chatOffset = getPositionOffset(typingGrid, chatGrid);
        const buttonOffset = getPositionOffset(typingGrid, buttonGrid);
        
        // Set typing grid initial position at chat-grid level
        gsap.set(typingGrid, { x: chatOffset.x, y: chatOffset.y });
        
        const tl = gsap.timeline();
        
        // === PHASE 1: TYPING AT CHAT-GRID POSITION ===
        tl.to(typingBubble, {
          scale: 1,
          opacity: 1,
          duration: 0.5 * speed,
          ease: "back.out(1.7)"
        });
        
        tl.to(typingBubble, {
          scale: 1.03,
          duration: 0.1 * speed,
          ease: "power2.out"
        }, "-=0.1");
        
        tl.to(typingBubble, {
          scale: 1,
          duration: 0.15 * speed,
          ease: "power2.inOut"
        });
        
        tl.call(() => dotsTl.play(), undefined, "-=0.2");

        // === PHASE 2: CHAT APPEARS + TYPING MOVES TO BUTTON-GRID ===
        // Move typing to button-grid position
        tl.to(typingGrid, {
          x: buttonOffset.x,
          y: buttonOffset.y,
          duration: 0.4 * speed,
          ease: "power2.inOut"
        }, "+=0.5");
        
        // Chat grid expands (slightly after typing starts moving)
        tl.to(chatGrid, { 
          gridTemplateRows: "1fr", 
          duration: 0.3 * speed, 
          ease: "power2.out" 
        }, "<0.1");
        
        // Chat bubble pops in
        tl.to(chatBubble, {
          scale: 1,
          opacity: 1,
          duration: 0.5 * speed,
          ease: "back.out(1.7)"
        }, "-=0.1");
        
        tl.to(chatBubble, {
          scale: 1.03,
          duration: 0.1 * speed,
          ease: "power2.out"
        }, "-=0.1");
        
        tl.to(chatBubble, {
          scale: 1,
          duration: 0.15 * speed,
          ease: "power2.inOut"
        });
        
        if (chatText) {
          tl.to(chatText, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4 * speed,
            ease: "power2.out"
          }, "-=0.2");
        }

        // === PHASE 3: BUTTON APPEARS + TYPING MOVES TO ORIGINAL ===
        // Move typing back to original position
        tl.to(typingGrid, {
          x: 0,
          y: 0,
          duration: 0.4 * speed,
          ease: "power2.inOut"
        }, "+=0.5");
        
        // Button grid expands
        tl.to(buttonGrid, { 
          gridTemplateRows: "1fr", 
          duration: 0.3 * speed, 
          ease: "power2.out" 
        }, "<0.1");
        
        // Button bubble pops in
        tl.to(buttonBubble, {
          scale: 1,
          opacity: 1,
          duration: 0.5 * speed,
          ease: "back.out(1.7)"
        }, "-=0.1");
        
        tl.to(buttonBubble, {
          scale: 1.03,
          duration: 0.1 * speed,
          ease: "power2.out"
        }, "-=0.1");
        
        tl.to(buttonBubble, {
          scale: 1,
          duration: 0.15 * speed,
          ease: "power2.inOut"
        });
        
        if (buttonText) {
          tl.to(buttonText, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4 * speed,
            ease: "power2.out"
          }, "-=0.2");
        }

        // === PHASE 4: TYPING DISAPPEARS ===
        tl.call(() => dotsTl.pause(), undefined, "+=0.3");
        
        tl.to(typingBubble, {
          scale: 0,
          opacity: 0,
          duration: 0.4 * speed,
          ease: "back.in(1.7)"
        });
      }
    });
  }, []);

  return (
    <section className="cta_section">
      <div className="container">
        <div className="cta-wrap">
          
          {/* 1. Typing chat grid indicator */}
          <div className="typing-grid" style={{ overflow: "hidden", display: "grid" }}>
            <div className="cta-bubble" style={{ scale: 0, opacity: 0 }}>
              <div className="cta-bubble-content">
                <div className="typing-dots-wrap">
                  <div className="typing-dots"></div>
                  <div className="typing-dots"></div>
                  <div className="typing-dots"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main Chat grid message */}
          <div className="cta-chat-grid" style={{ overflow: "hidden", display: "grid", gridTemplateRows: "0fr" }}>
            <div className="cta-bubble" style={{ scale: 0, opacity: 0 }}>
              <div className="cta-bubble-content">
                <p className="cta-text">
                  Want to work together?
                </p>
              </div>
            </div>
          </div>

          {/* 3. Button CTA bubble */}
          <div className="cta-button-grid" style={{ overflow: "hidden", display: "grid", gridTemplateRows: "0fr" }}>
            <a 
              className="cta-bubble is-button w-inline-block" 
              href="https://cal.com/nenad-popadic/intro-call" 
              target="_blank"
              style={{ scale: 0, opacity: 0 }}
            >
              <div className="cta-bubble-content">
                <p>Book a Call</p>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
