"use client";

import { useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/animations/gsap";
import { FAQS } from "@/lib/constants/data";

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  useGSAP(() => {
    // Scroll reveal headers inside FAQ section
    const chars = document.querySelectorAll(".faq-column-main h2 .anim-char");
    if (chars.length > 0) {
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
            trigger: ".faq-column-main h2",
            start: "top 92%",
            end: "top 25%",
            scrub: 1,
            markers: false
          }
        }
      );
    }
  }, []);

  const toggleFaq = (id: string) => {
    setActiveFaq(prev => (prev === id ? null : id));
  };

  const renderSplitTextWithBr = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => (
      <span key={lineIdx} style={{ display: "inline-block" }}>
        {[...line].map((char, charIdx) => (
          <span key={charIdx} className="anim-char">
            {char}
          </span>
        ))}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="faq-section" id="faq-section">
      <div className="container">
        <div className="column faq-column-main" id="faq">
          <div className="label">FAQ</div>
          <h2 className="h2-style">
            {renderSplitTextWithBr("Got any \nquestions?")}
          </h2>
          
          <div className="faq-column">
            {FAQS.map(faq => {
              const isOpen = activeFaq === faq.id;

              return (
                <div 
                  className={`faq w-dropdown ${isOpen ? "open" : ""}`} 
                  key={faq.id}
                  onClick={() => toggleFaq(faq.id)}
                >
                  {/* Dropdown Question Header */}
                  <div className="faq-toggle w-dropdown-toggle" aria-expanded={isOpen}>
                    <div className="faq-question-wrap">
                      <div className="faq-title">{faq.question}</div>
                      <div className="faq-icon-wrap">
                        <div className={`faq-icon ${isOpen ? "open" : ""}`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Answer content (using smooth CSS grid/height transition) */}
                  <div 
                    className="faq-answer-grid"
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div className="faq-answer-wrap">
                        <p className="faq-text">{faq.answer}</p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
