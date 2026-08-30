"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

export default function CTA() {
  useGSAP(() => {
    const section = document.querySelector(".cta_section");
    if (!section) return;

    const wrap        = section.querySelector(".cta-wrap")               as HTMLElement;
    const typingGrid  = section.querySelector(".typing-grid")            as HTMLElement;
    const typingWrap  = typingGrid?.querySelector(".cta-chat-typing-wrap") as HTMLElement;
    const chatGrid    = section.querySelector(".cta-chat-grid")          as HTMLElement;
    const chatBubble  = chatGrid?.querySelector(".cta-chat")             as HTMLElement;
    const chatText    = chatGrid?.querySelector(".cta-text")             as HTMLElement;
    const buttonGrid  = section.querySelector(".cta-button-grid")        as HTMLElement;
    const buttonBubble = buttonGrid?.querySelector(".cta-button")        as HTMLElement;
    const dots        = section.querySelectorAll(".typing-dots");

    if (!wrap || !typingGrid || !chatGrid || !buttonGrid) return;

    const speed = 0.728;

    // ── Helper to calculate absolute position offsets ──────────────────────────
    const getPositionOffset = (from: HTMLElement, to: HTMLElement) => {
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      return {
        x: toRect.left - fromRect.left,
        y: toRect.top - fromRect.top
      };
    };

    // ── Initial States (done via GSAP immediately on mount to be safe) ──────────
    gsap.set(typingGrid, { x: 0, y: 0 }); // start at its natural bottom position
    gsap.set(typingWrap, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    gsap.set(chatBubble, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    gsap.set(buttonBubble, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    
    if (chatText) {
      gsap.set(chatText, { opacity: 0, filter: "blur(4px)" });
    }

    // ── Dots bounce animation loop ──────────────────────────────────────────────
    const dotsTl = gsap.timeline({ repeat: -1, paused: true });
    dotsTl
      .to(dots, { y: -6, opacity: 1,   duration: 0.35 * speed, stagger: 0.15 * speed, ease: "power1.inOut" })
      .to(dots, { y:  0, opacity: 0.5, duration: 0.35 * speed, stagger: 0.15 * speed, ease: "power1.inOut" });

    // ─── ScrollTrigger: fires once when chat widget enters viewport ───────────
    ScrollTrigger.create({
      trigger: wrap,
      start: "top 90%",
      once: true,
      onEnter: () => {
        // Measure exact offsets now that the DOM layout is loaded and rendered
        const chatOffset = getPositionOffset(typingGrid, chatGrid);
        const buttonOffset = getPositionOffset(typingGrid, buttonGrid);

        // Position typing bubble at the chat bubble's position next to avatar
        gsap.set(typingGrid, { x: chatOffset.x, y: chatOffset.y });

        const tl = gsap.timeline();

        // === PHASE 1: Typing bubble pops in next to avatar ===
        tl.to(typingWrap, {
          scale: 1,
          opacity: 1,
          duration: 0.45 * speed,
          ease: "back.out(1.7)"
        });
        // tiny settle bounce
        tl.to(typingWrap, { scale: 1.04, duration: 0.10 * speed, ease: "power2.out"   }, "-=0.08");
        tl.to(typingWrap, { scale: 1,    duration: 0.12 * speed, ease: "power2.inOut" });

        // start dots bouncing
        tl.call(() => dotsTl.play(), undefined, "-=0.1");

        // === PHASE 2: Typing bubble slides down to button position, chat bubble appears ===
        tl.to(typingGrid, {
          x: buttonOffset.x,
          y: buttonOffset.y,
          duration: 0.45 * speed,
          ease: "power2.inOut"
        }, `+=${0.95 * speed}`); // Let it type next to avatar for ~1s

        // Chat bubble expands in
        tl.to(chatBubble, {
          scale: 1,
          opacity: 1,
          duration: 0.45 * speed,
          ease: "back.out(1.7)"
        }, "<0.08");

        // Reveal text smoothly
        if (chatText) {
          tl.to(chatText, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.35 * speed,
            ease: "power2.out"
          }, "-=0.15");
        }

        // === PHASE 3: Typing bubble slides down to bottom, button appears ===
        tl.to(typingGrid, {
          x: 0,
          y: 0,
          duration: 0.45 * speed,
          ease: "power2.inOut"
        }, `+=${0.95 * speed}`); // Let it type at button position for ~1s

        // Button expands in
        tl.to(buttonBubble, {
          scale: 1,
          opacity: 1,
          duration: 0.45 * speed,
          ease: "back.out(1.7)"
        }, "<0.08");

        // === PHASE 4: Typing bubble fades out ===
        tl.to(typingWrap, {
          scale: 0,
          opacity: 0,
          duration: 0.3 * speed,
          ease: "back.in(1.7)"
        }, "+=0.1");
        
        tl.call(() => dotsTl.pause(), undefined, "<");
      }
    });
  }, []);

  return (
    <section className="cta_section" id="webflow_journey">
      <div className="container">
        <div className="column cta-column" id="cta_column">

          {/* ── Large animated heading ── */}
          <h2
            aria-label="Transform Your Webflow Experience Journey"
            className="cta_heading"
            data-tl-type="trigger"
            data-tl-trigger="#cta_column"
            data-tl-start="top 90%"
            data-tl-split="lines"
            data-tl-from="{'yPercent': 100}"
            data-tl-to="{'yPercent': 0, 'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'power2.out'}"
            data-tl-once=""
          >
            Transform Your <br />
            Webflow <br />
            <span className="cta-span-heading">Experience</span> <br />
            <span className="cta-span-heading">Journey</span>
          </h2>

          {/* ── Description paragraph ── */}
          <div
            aria-label="Every Webflow site has room to grow. You get a clear view of what works, what holds you back and how to move toward a setup that feels faster, lighter and easier to manage."
            className="max-width-389"
            data-tl-type="trigger"
            data-tl-trigger="#cta_column"
            data-tl-start="top 65%"
            data-tl-split="lines"
            data-tl-from="{'yPercent': 100}"
            data-tl-to="{'yPercent': 0, 'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'power2.out'}"
            data-tl-once=""
          >
            Every Webflow site has room to grow. You get a clear view of what works, what holds
            you back and how to move toward a setup that feels faster, lighter and easier to manage.
          </div>

          {/* ── Chat widget: avatar + bubble column ── */}
          <div className="cta-wrap">

            {/* Circular profile photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Profile photo"
              className="cta_img"
              loading="lazy"
              src="/vanshaj-assets/avatar.png"
            />

            {/* Bubble column */}
            <div className="column">
              <div className="cta-column-item">

                {/* 1. "Have something in mind?" ── */}
                <div className="cta-chat-grid" style={{ display: "grid", gridTemplateRows: "1fr", overflow: "hidden" }}>
                  <div className="cta-chat-item" style={{ overflow: "hidden" }}>
                    <div 
                      className="cta-chat" 
                      style={{ transform: "scale(0)", opacity: 0, transformOrigin: "bottom left" }}
                    >
                      <div className="cta-text-wrap">
                        <p className="cta-text">Have something in mind?</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. "Let's Talk" yellow button ── */}
                <div className="cta-button-grid" style={{ display: "grid", gridTemplateRows: "1fr", overflow: "hidden" }}>
                  <div className="cta-button-grid-item">
                    <a
                      className="cta-button w-inline-block"
                      data-button-hover=""
                      href="https://cal.com/vanshaj/intro-call"
                      target="_blank"
                      rel="noreferrer"
                      style={{ transform: "scale(0)", opacity: 0, transformOrigin: "bottom left" }}
                    >
                      <div className="nav-button-mask">
                        <div aria-label="Let's Talk" className="button-text">
                          <div aria-hidden="true" className="word" style={{ position: "relative", display: "inline-block" }}>Let&apos;s</div>
                          {" "}
                          <div aria-hidden="true" className="word" style={{ position: "relative", display: "inline-block" }}>Talk</div>
                        </div>
                        <div aria-label="Let's Talk" className="button-text clone-p">
                          <div aria-hidden="true" className="word" style={{ position: "relative", display: "inline-block" }}>Let&apos;s</div>
                          {" "}
                          <div aria-hidden="true" className="word" style={{ position: "relative", display: "inline-block" }}>Talk</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

              </div>

              {/* 3. Typing indicator bubble ── */}
              <div className="typing-grid" style={{ display: "grid", gridTemplateRows: "1fr", overflow: "hidden" }}>
                <div className="typing-grid-item" style={{ overflow: "hidden" }}>
                  <div 
                    className="cta-chat-typing-wrap"
                    style={{ transform: "scale(0)", opacity: 0, transformOrigin: "bottom left" }}
                  >
                    <div className="typing-dots"></div>
                    <div className="typing-dots"></div>
                    <div className="typing-dots"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
