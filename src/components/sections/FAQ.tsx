"use client";

import { useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { initTextReveal } from "@/lib/animations/textReveal";
import { FAQS } from "@/lib/constants/data";

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  useGSAP(() => {
    // Scroll reveal headers inside FAQ section
    initTextReveal(".faq-column-main h2");
  }, []);

  const toggleFaq = (id: string) => {
    setActiveFaq(prev => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq-section">
      <div className="container">
        <div className="column faq-column-main" id="faq">
          <div className="label">FAQ</div>
          <h2 className="h2-style">Got any <br/>questions?</h2>
          
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
