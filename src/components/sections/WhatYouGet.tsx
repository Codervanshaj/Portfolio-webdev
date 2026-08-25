"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { initTextReveal } from "@/lib/animations/textReveal";
import { CAPABILITIES } from "@/lib/constants/data";

export default function WhatYouGet() {
  useGSAP(() => {
    // Scroll reveal reveal text
    initTextReveal(".what_you_get-text");
  }, []);

  return (
    <section className="what_you_get_section" id="overview">
      <div className="container">
        
        {/* Left header column */}
        <div className="what_you_get-left" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe62bb-be2d4114">
          <div className="label">WHAT YOU GET</div>
          <h2 className="what_you_get-text" data-split-initialized="true">
            Webflow builds that combine design integrity, clean animations, and structured code to deliver websites that perform.
          </h2>
        </div>

        {/* Right capability cards wrap */}
        <div className="capa-cards-wrap" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe62bf-be2d4114">
          {CAPABILITIES.map(cap => (
            <div className="capa-card-item" key={cap.id}>
              <div className="capa-card-top-item">
                
                {/* SVG Icon matching the capability type */}
                <div className={`capa-card-icon ${cap.iconClass}`} />

                <div className="capa-card-arrow-wrap">
                  <div className="capa-card-arrow"></div>
                </div>
              </div>

              <div className="capa-card-bottom">
                <div className="capa-card-bottom-layout">
                  <h3 className="capa-card-heading">{cap.title}</h3>
                  <p className="capa-card-text">{cap.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
