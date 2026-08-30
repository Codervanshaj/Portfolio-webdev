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

  const leftFaqs = FAQS.slice(0, 4);
  const rightFaqs = FAQS.slice(4);

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

  const renderFaq = (faq: typeof FAQS[0]) => {
    const isOpen = activeFaq === faq.id;

    return (
      <div 
        className={`faq w-dropdown ${isOpen ? "open" : ""}`} 
        key={faq.id}
        onClick={() => toggleFaq(faq.id)}
      >
        <div 
          className={`faq-toggle w-dropdown-toggle ${isOpen ? "w--open" : ""}`} 
          role="button" 
          tabIndex={0}
          aria-expanded={isOpen}
        >
          <h3 className="faq-heading">{faq.question}</h3>
          <div className="faq-icon">
            <svg className="faq-icon-item" fill="none" viewBox="0 0 15 15" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path 
                className="faq-icon-v-line" 
                d="M6.5625 0.9375C6.5625 0.419733 6.98223 0 7.5 0C8.01777 0 8.4375 0.419733 8.4375 0.9375V14.0625C8.4375 14.5803 8.01777 15 7.5 15C6.98223 15 6.5625 14.5803 6.5625 14.0625V0.9375Z" 
                fill="currentColor"
              />
              <path 
                d="M0.9375 8.4375C0.419733 8.4375 2.26323e-08 8.01777 0 7.5C-2.26323e-08 6.98223 0.419733 6.5625 0.9375 6.5625L14.0625 6.5625C14.5803 6.5625 15 6.98223 15 7.5C15 8.01777 14.5803 8.4375 14.0625 8.4375L0.9375 8.4375Z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        <nav className={`faq-list w-dropdown-list ${isOpen ? "w--open" : ""}`}>
          <div className="faq-answer-wrap">
            <div className="faq-answer-item">
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        </nav>
      </div>
    );
  };

  return (
    <div className="column faq-column-main" id="faq">
      <div className="label">FAQ</div>
      <h2 className="h2-style">
        {renderSplitTextWithBr("Got any \nquestions?")}
      </h2>
      
      <div className="faq-column">
        <div className="faq-colum-item">
          {leftFaqs.map(renderFaq)}
        </div>
        <div className="faq-colum-item">
          {rightFaqs.map(renderFaq)}
        </div>
      </div>
    </div>
  );

}
