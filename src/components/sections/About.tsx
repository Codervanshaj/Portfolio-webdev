"use client";

import { useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { initScrollAnimations } from "@/lib/animations/scrollTriggers";
import { MILESTONES } from "@/lib/constants/milestones";

export default function About() {
  const [activePopupId, setActivePopupId] = useState<string | null>(null);

  return (
    <section className="about-section" id="about">
      <div className="container">
        
        {/* Left Side Header Sticky Column */}
        <div className="column">
          <div 
            className="label" 
            data-tl-from="{'width':'0vw','opacity':0}" 
            data-tl-start="top 90%" 
            data-tl-to="{'width':'auto', 'opacity':1, 'duration':0.7, 'ease':'expo.inOut'}" 
            data-tl-trigger=".about-section" 
            data-tl-type="trigger" 
            style={{ width: "0vw" }}
          >
            Start small grow big
          </div>
          
          <h2 
            aria-label="About Me (&) My Journey" 
            className="h2-style margin-bottom-s" 
            data-split-initialized="true" 
            data-tl-from="{'yPercent': 100}" 
            data-tl-split="lines" 
            data-tl-start="top 90%" 
            data-tl-to="{'yPercent': 0, 'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'power2.out'}" 
            data-tl-trigger=".about-section" 
            data-tl-type="trigger" 
            style={{ background: "none", WebkitTextFillColor: "transparent" }}
          >
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                About Me (&)
              </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                My Journey
              </div>
            </div>
          </h2>

          <div 
            aria-label="Seven years ago I opened Webflow for the first time. What happened after that is easier to show than explain." 
            className="max-width-389" 
            data-split-initialized="true" 
            data-tl-from="{'yPercent': 100}" 
            data-tl-split="lines" 
            data-tl-start="top 90%" 
            data-tl-to="{'yPercent': 0, 'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'power2.out'}" 
            data-tl-trigger=".about-section" 
            data-tl-type="trigger"
          >
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                Seven years ago I opened Webflow for the first time.
              </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                What happened after that is easier to show than
              </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                explain.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Timeline Area */}
        <div className="about-wrap">
          
          {/* Card 1 (AC-1) rendered separately as in the Webflow template layout */}
          {MILESTONES.slice(0, 1).map((card) => (
            <div 
              className={`about-card-wrap ${card.id}`} 
              data-connect={card.connect} 
              data-desktop="" 
              data-origin={card.origin} 
              id={card.id} 
              key={card.id}
            >
              <div 
                className="about-card" 
                data-tl-desktop="" 
                data-tl-from={card.cardAnim["data-tl-from"]} 
                data-tl-start={card.cardAnim["data-tl-start"]} 
                data-tl-to={card.cardAnim["data-tl-to"]} 
                data-tl-trigger={card.cardAnim["data-tl-trigger"]} 
                data-tl-type={card.cardAnim["data-tl-type"]}
              >
                <div className="about-card-year">
                  '
                  <span 
                    data-number-count={card.yearText} 
                    data-tl-desktop="" 
                    data-tl-start={card.cardAnim["data-tl-start"]} 
                    data-tl-to="{'duration': 1.5, 'stagger': 0.1, 'delay': 0.2, 'ease': 'expo.out'}" 
                    data-tl-trigger=".about-card-container"
                  >
                    {card.yearText}
                  </span>
                </div>
                
                <h3 aria-label={card.heading} className="about-card-heading">
                  {card.heading}
                </h3>
                
                <div aria-label={card.description} className="op80">
                  {card.description}
                </div>

                <div className="about-card-bottom-layout">
                  <div className="about-card-bottom-layout-left">
                    <div className="about-card-img-wrap">
                      {card.images.map((img, idx) => (
                        <img 
                          key={idx}
                          alt={img.alt} 
                          className={img.className} 
                          loading="lazy" 
                          src={img.src} 
                        />
                      ))}
                    </div>
                    <div aria-label={card.bottomText.join("")} className="about-card-bottom-text">
                      {card.bottomText.map((text, idx) => (
                        <div className="line-mask" key={idx}>
                          <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                            {text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    aria-label={`Read more about ${card.heading}`} 
                    className="about-card-button"
                    onClick={() => setActivePopupId(card.id)}
                  >
                    <p className="paragraph">Read more</p>
                  </button>

                  {/* Story Popup overlay rendered inside the card, matching Webflow nesting exactly */}
                  <div className={`popup-card-wrap ${activePopupId === card.id ? "is-active-card" : ""}`} style={{ clipPath: activePopupId === card.id ? "inset(0%)" : undefined }}>
                    <div className="popup-card-item">
                      <div className="popup-card">
                        <div className="popup-card-top-item">
                          <div>{card.popup.year}</div>
                          <div className="popup-close" onClick={(e) => { e.stopPropagation(); setActivePopupId(null); }}>
                            <div className="popup-close-icon">
                              <div className="popup-close-path-1"></div>
                              <div className="popup-close-path-2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="popup-card-bottom-item">
                          <div className="about-card-img-wrap">
                            {card.popup.images.map((img, idx) => (
                              <img 
                                key={idx}
                                alt={img.alt} 
                                className={img.className} 
                                loading="lazy" 
                                src={img.src} 
                              />
                            ))}
                            <h4 className="popup-heading" dangerouslySetInnerHTML={{ __html: card.popup.heading }} />
                            <p dangerouslySetInnerHTML={{ __html: card.popup.bodyHtml }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="about-card-point-wrap">
                <div className="about-card-point-line-wrap">
                  <div 
                    className="about-card-point-line" 
                    data-tl-desktop="" 
                    data-tl-from={card.lineAnim?.["data-tl-from"]} 
                    data-tl-start={card.lineAnim?.["data-tl-start"]} 
                    data-tl-to={card.lineAnim?.["data-tl-to"]} 
                    data-tl-trigger={card.lineAnim?.["data-tl-trigger"]} 
                    data-tl-type={card.lineAnim?.["data-tl-type"]}
                  ></div>
                </div>
                <div className="about-card-point-circle"></div>
              </div>
            </div>
          ))}

          {/* Cards 2 to 7 container */}
          <div className="about-card-container">
            {MILESTONES.slice(1).map((card) => {
              const isRight = card.origin === "bottom right";

              const cardElement = (
                <div 
                  className="about-card" 
                  data-tl-desktop="" 
                  data-tl-from={card.cardAnim["data-tl-from"]} 
                  data-tl-start={card.cardAnim["data-tl-start"]} 
                  data-tl-to={card.cardAnim["data-tl-to"]} 
                  data-tl-trigger={card.cardAnim["data-tl-trigger"]} 
                  data-tl-type={card.cardAnim["data-tl-type"]}
                >
                  <div className="about-card-year">
                    '
                    <span 
                      data-number-count={card.yearText} 
                      data-tl-desktop="" 
                      data-tl-start={card.cardAnim["data-tl-start"]} 
                      data-tl-to="{'duration': 1.5, 'stagger': 0.1, 'delay': 0.2, 'ease': 'expo.out'}" 
                      data-tl-trigger=".about-card-container"
                    >
                      {card.yearText}
                    </span>
                  </div>
                  
                  <h3 aria-label={card.heading} className="about-card-heading">
                    {card.heading}
                  </h3>
                  
                  <div aria-label={card.description} className="op80">
                    {card.description}
                  </div>

                  <div className="about-card-bottom-layout">
                    <div className="about-card-bottom-layout-left">
                      <div className="about-card-img-wrap">
                        {card.images.map((img, idx) => (
                          <img 
                            key={idx}
                            alt={img.alt} 
                            className={img.className} 
                            loading="lazy" 
                            src={img.src} 
                          />
                        ))}
                      </div>
                      <div aria-label={card.bottomText.join("")} className="about-card-bottom-text">
                        {card.bottomText.map((text, idx) => (
                          <div className="line-mask" key={idx}>
                            <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                              {text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      aria-label={`Read more about ${card.heading}`} 
                      className="about-card-button"
                      onClick={() => setActivePopupId(card.id)}
                    >
                      <p className="paragraph">Read more</p>
                    </button>

                    {/* Story Popup overlay */}
                    <div className={`popup-card-wrap ${activePopupId === card.id ? "is-active-card" : ""}`} style={{ clipPath: activePopupId === card.id ? "inset(0%)" : undefined }}>
                      <div className="popup-card-item">
                        <div className="popup-card">
                          <div className="popup-card-top-item">
                            <div>{card.popup.year}</div>
                            <div className="popup-close" onClick={(e) => { e.stopPropagation(); setActivePopupId(null); }}>
                              <div className="popup-close-icon">
                                <div className="popup-close-path-1"></div>
                                <div className="popup-close-path-2"></div>
                              </div>
                            </div>
                          </div>
                          <div className="popup-card-bottom-item">
                            <div className="about-card-img-wrap">
                              {card.popup.images.map((img, idx) => (
                                <img 
                                  key={idx}
                                  alt={img.alt} 
                                  className={img.className} 
                                  loading="lazy" 
                                  src={img.src} 
                                />
                              ))}
                              <h4 className="popup-heading" dangerouslySetInnerHTML={{ __html: card.popup.heading }} />
                              <p dangerouslySetInnerHTML={{ __html: card.popup.bodyHtml }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );

              const pointElement = (
                <div className="about-card-point-wrap">
                  <div className="about-card-point-line-wrap">
                    <div 
                      className="about-card-point-line" 
                      data-tl-desktop="" 
                      data-tl-from={card.lineAnim?.["data-tl-from"]} 
                      data-tl-start={card.lineAnim?.["data-tl-start"]} 
                      data-tl-to={card.lineAnim?.["data-tl-to"]} 
                      data-tl-trigger={card.lineAnim?.["data-tl-trigger"]} 
                      data-tl-type={card.lineAnim?.["data-tl-type"]}
                    ></div>
                  </div>
                  <div className="about-card-point-circle"></div>
                </div>
              );

              return (
                <div 
                  className={`about-card-wrap ${card.id}`} 
                  data-connect={card.connect} 
                  data-desktop="" 
                  data-origin={card.origin} 
                  key={card.id}
                  style={{ willChange: "transform" }}
                >
                  {isRight ? (
                    <>
                      {cardElement}
                      {pointElement}
                    </>
                  ) : (
                    <>
                      {pointElement}
                      {cardElement}
                    </>
                  )}
                </div>
              );
            })}

            {/* Desktop SVG timeline connectors path graphics */}
            <div className="about-timeline-wrap">
              
              {/* 1. Scroll animated SVG overlay */}
              <div 
                className="about-timeline-overflow" 
                data-tl-desktop="" 
                data-tl-end="bottom 80%" 
                data-tl-from="{'height' : '0%'}" 
                data-tl-start="top 90%" 
                data-tl-to="{'keyframes': [{ 'height': '14%', 'duration': 2 }, { 'height': '28%', 'duration': 1 }, { 'height': '42%', 'duration': 1.5 }, { 'height': '56%', 'duration': 2 }, { 'height': '70%', 'duration': 1 }, { 'height': '84%', 'duration': 1.5 }, { 'height': '100%', 'duration': 2 }], 'ease': 'none'}" 
                data-tl-trigger=".about-card-container" 
                data-tl-type="scroll" 
                style={{ height: "0%" }}
              >
                <svg className="about-timeline" fill="none" viewBox="0 0 1118 2166" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M568.583 2156.04C577.972 2158.27 587.663 2160.56 597.845 2162.95L597.349 2165.06C587.182 2162.67 577.504 2160.39 568.127 2158.17L568.583 2156.04Z" fill="currentColor"></path>
                  <path d="M568.583 2156.04C577.972 2158.27 587.663 2160.56 597.845 2162.95L597.349 2165.06C587.182 2162.67 577.504 2160.39 568.127 2158.17L568.583 2156.04Z" fill="currentColor"></path>
                  <path d="M516.754 2143.51C525.171 2145.59 533.538 2147.63 542.014 2149.68L541.558 2151.81C533.082 2149.76 524.714 2147.72 516.297 2145.64L516.754 2143.51Z" fill="currentColor"></path>
                  <path d="M516.754 2143.51C525.171 2145.59 533.538 2147.63 542.014 2149.68L541.558 2151.81C533.082 2149.76 524.714 2147.72 516.297 2145.64L516.754 2143.51Z" fill="currentColor"></path>
                  <path d="M1113.37 7.05273C857.638 75.0405 691.252 130.525 419.75 240.01C265.135 302.359 160.718 349.057 94.9395 399.803C62.0738 425.157 38.8986 451.491 23.9316 481.25C8.96604 511.006 2.17188 544.259 2.17188 583.504C2.17194 613.853 8.02461 640.901 24.0537 666.256C40.0935 691.627 66.381 715.394 107.409 739.066C189.501 786.431 330.303 833.25 565.114 891.842C812.778 953.64 932.075 1019.04 989.682 1079.82C1047.39 1140.71 1043.09 1196.89 1044.1 1239.48V1239.52C1043.79 1259.24 1039.25 1277.68 1027.51 1295.61C1015.79 1313.52 996.931 1330.86 968.091 1348.46C910.437 1383.65 812.64 1420.07 651.411 1464.25L650.62 1464.46C508.96 1503.28 357.819 1544.7 242.087 1602.3C126.305 1659.92 46.4043 1733.52 46.4043 1836.5C46.4043 1888.17 60.2488 1929.16 84.1621 1962.42C108.086 1995.69 142.136 2021.3 182.644 2042.12C263.71 2083.78 370.327 2106.11 472.759 2132.43C478.709 2133.96 484.522 2135.44 490.242 2136.89L489.785 2139.01C484.038 2137.56 478.197 2136.07 472.218 2134.53C369.967 2108.26 262.999 2085.86 181.651 2044.05C140.952 2023.13 106.587 1997.33 82.3984 1963.68C58.199 1930.02 44.2324 1888.59 44.2324 1836.5C44.2324 1732.18 125.209 1658.04 241.119 1600.35C357.079 1542.64 508.446 1501.17 650.046 1462.37L658.348 1460.08C815.096 1416.84 910.487 1381.08 966.959 1346.61C995.63 1329.11 1014.21 1311.97 1025.7 1294.42C1037.17 1276.89 1041.62 1258.87 1041.92 1239.51C1040.92 1196.85 1045.16 1141.52 988.105 1081.32C930.944 1021 812.164 955.726 564.589 893.949C329.796 835.362 188.714 788.484 106.324 740.947C65.112 717.169 38.5092 693.184 22.2188 667.416C5.91787 641.632 6.28439e-05 614.154 0 583.504C0 543.999 6.8414 510.397 21.9912 480.274C37.1399 450.154 60.5607 423.582 93.6133 398.083C159.672 347.122 264.384 300.321 418.938 237.996C690.517 128.481 856.987 72.9653 1112.81 4.95312L1113.37 7.05273Z" fill="currentColor"></path>
                  <path d="M1113.37 7.05273C857.638 75.0405 691.252 130.525 419.75 240.01C265.135 302.359 160.718 349.057 94.9395 399.803C62.0738 425.157 38.8986 451.491 23.9316 481.25C8.96604 511.006 2.17188 544.259 2.17188 583.504C2.17194 613.853 8.02461 640.901 24.0537 666.256C40.0935 691.627 66.381 715.394 107.409 739.066C189.501 786.431 330.303 833.25 565.114 891.842C812.778 953.64 932.075 1019.04 989.682 1079.82C1047.39 1140.71 1043.09 1196.89 1044.1 1239.48V1239.52C1043.79 1259.24 1039.25 1277.68 1027.51 1295.61C1015.79 1313.52 996.931 1330.86 968.091 1348.46C910.437 1383.65 812.64 1420.07 651.411 1464.25L650.62 1464.46C508.96 1503.28 357.819 1544.7 242.087 1602.3C126.305 1659.92 46.4043 1733.52 46.4043 1836.5C46.4043 1888.17 60.2488 1929.16 84.1621 1962.42C108.086 1995.69 142.136 2021.3 182.644 2042.12C263.71 2083.78 370.327 2106.11 472.759 2132.43C478.709 2133.96 484.522 2135.44 490.242 2136.89L489.785 2139.01C484.038 2137.56 478.197 2136.07 472.218 2134.53C369.967 2108.26 262.999 2085.86 181.651 2044.05C140.952 2023.13 106.587 1997.33 82.3984 1963.68C58.199 1930.02 44.2324 1888.59 44.2324 1836.5C44.2324 1732.18 125.209 1658.04 241.119 1600.35C357.079 1542.64 508.446 1501.17 650.046 1462.37L658.348 1460.08C815.096 1416.84 910.487 1381.08 966.959 1346.61C995.63 1329.11 1014.21 1311.97 1025.7 1294.42C1037.17 1276.89 1041.62 1258.87 1041.92 1239.51C1040.92 1196.85 1045.16 1141.52 988.105 1081.32C930.944 1021 812.164 955.726 564.589 893.949C329.796 835.362 188.714 788.484 106.324 740.947C65.112 717.169 38.5092 693.184 22.2188 667.416C5.91787 641.632 6.28439e-05 614.154 0 583.504C0 543.999 6.8414 510.397 21.9912 480.274C37.1399 450.154 60.5607 423.582 93.6133 398.083C159.672 347.122 264.384 300.321 418.938 237.996C690.517 128.481 856.987 72.9653 1112.81 4.95312L1113.37 7.05273Z" fill="currentColor"></path>
                  <circle className="op-0" cx="1111.09" cy="6.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <circle className="op-0" cx="186.086" cy="341.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <circle className="op-0" cx="105.086" cy="739.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <circle className="op-0" cx="998.086" cy="1092.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <circle className="op-0" cx="582.086" cy="1482.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <circle className="op-0" cx="59.0859" cy="1766.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <circle className="op-0" cx="458.086" cy="2129.5" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4101_214" x1="568.737" x2="568.737" y1="380.366" y2="1766.67">
                      <stop offset="0.201923" stopColor="#FFFF23"></stop>
                      <stop offset="0.240385" stopColor="#FFFF23" stopOpacity="0"></stop>
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_4101_214" x1="568.737" x2="568.737" y1="380.366" y2="1766.67">
                      <stop offset="0.201923" stopColor="#FFFF23"></stop>
                      <stop offset="0.240385" stopColor="#FFFF23" stopOpacity="0"></stop>
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_4101_214" x1="568.737" x2="568.737" y1="380.366" y2="1766.67">
                      <stop offset="0.201923" stopColor="#FFFF23"></stop>
                      <stop offset="0.240385" stopColor="#FFFF23" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 2. Aspect-ratio layout establishing SVG in document flow */}
              <svg className="about-timeline-position" fill="none" viewBox="0 0 1118 2166" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path className="op-0" d="M568.583 2156.04C577.972 2158.27 587.663 2160.56 597.845 2162.95L597.349 2165.06C587.182 2162.67 577.504 2160.39 568.127 2158.17L568.583 2156.04Z" fill="currentColor"></path>
                <path className="op-0" d="M568.583 2156.04C577.972 2158.27 587.663 2160.56 597.845 2162.95L597.349 2165.06C587.182 2162.67 577.504 2160.39 568.127 2158.17L568.583 2156.04Z" fill="currentColor"></path>
                <path className="op-0" d="M516.754 2143.51C525.171 2145.59 533.538 2147.63 542.014 2149.68L541.558 2151.81C533.082 2149.76 524.714 2147.72 516.297 2145.64L516.754 2143.51Z" fill="currentColor"></path>
                <path className="op-0" d="M516.754 2143.51C525.171 2145.59 533.538 2147.63 542.014 2149.68L541.558 2151.81C533.082 2149.76 524.714 2147.72 516.297 2145.64L516.754 2143.51Z" fill="currentColor"></path>
                <path className="op-0" d="M1113.37 7.05273C857.638 75.0405 691.252 130.525 419.75 240.01C265.135 302.359 160.718 349.057 94.9395 399.803C62.0738 425.157 38.8986 451.491 23.9316 481.25C8.96604 511.006 2.17188 544.259 2.17188 583.504C2.17194 613.853 8.02461 640.901 24.0537 666.256C40.0935 691.627 66.381 715.394 107.409 739.066C189.501 786.431 330.303 833.25 565.114 891.842C812.778 953.64 932.075 1019.04 989.682 1079.82C1047.39 1140.71 1043.09 1196.89 1044.1 1239.48V1239.52C1043.79 1259.24 1039.25 1277.68 1027.51 1295.61C1015.79 1313.52 996.931 1330.86 968.091 1348.46C910.437 1383.65 812.64 1420.07 651.411 1464.25L650.62 1464.46C508.96 1503.28 357.819 1544.7 242.087 1602.3C126.305 1659.92 46.4043 1733.52 46.4043 1836.5C46.4043 1888.17 60.2488 1929.16 84.1621 1962.42C108.086 1995.69 142.136 2021.3 182.644 2042.12C263.71 2083.78 370.327 2106.11 472.759 2132.43C478.709 2133.96 484.522 2135.44 490.242 2136.89L489.785 2139.01C484.038 2137.56 478.197 2136.07 472.218 2134.53C369.967 2108.26 262.999 2085.86 181.651 2044.05C140.952 2023.13 106.587 1997.33 82.3984 1963.68C58.199 1930.02 44.2324 1888.59 44.2324 1836.5C44.2324 1732.18 125.209 1658.04 241.119 1600.35C357.079 1542.64 508.446 1501.17 650.046 1462.37L658.348 1460.08C815.096 1416.84 910.487 1381.08 966.959 1346.61C995.63 1329.11 1014.21 1311.97 1025.7 1294.42C1037.17 1276.89 1041.62 1258.87 1041.92 1239.51C1040.92 1196.85 1045.16 1141.52 988.105 1081.32C930.944 1021 812.164 955.726 564.589 893.949C329.796 835.362 188.714 788.484 106.324 740.947C65.112 717.169 38.5092 693.184 22.2188 667.416C5.91787 641.632 6.28439e-05 614.154 0 583.504C0 543.999 6.8414 510.397 21.9912 480.274C37.1399 450.154 60.5607 423.582 93.6133 398.083C159.672 347.122 264.384 300.321 418.938 237.996C690.517 128.481 856.987 72.9653 1112.81 4.95312L1113.37 7.05273Z" fill="currentColor"></path>
                <path className="op-0" d="M1113.37 7.05273C857.638 75.0405 691.252 130.525 419.75 240.01C265.135 302.359 160.718 349.057 94.9395 399.803C62.0738 425.157 38.8986 451.491 23.9316 481.25C8.96604 511.006 2.17188 544.259 2.17188 583.504C2.17194 613.853 8.02461 640.901 24.0537 666.256C40.0935 691.627 66.381 715.394 107.409 739.066C189.501 786.431 330.303 833.25 565.114 891.842C812.778 953.64 932.075 1019.04 989.682 1079.82C1047.39 1140.71 1043.09 1196.89 1044.1 1239.48V1239.52C1043.79 1259.24 1039.25 1277.68 1027.51 1295.61C1015.79 1313.52 996.931 1330.86 968.091 1348.46C910.437 1383.65 812.64 1420.07 651.411 1464.25L650.62 1464.46C508.96 1503.28 357.819 1544.7 242.087 1602.3C126.305 1659.92 46.4043 1733.52 46.4043 1836.5C46.4043 1888.17 60.2488 1929.16 84.1621 1962.42C108.086 1995.69 142.136 2021.3 182.644 2042.12C263.71 2083.78 370.327 2106.11 472.759 2132.43C478.709 2133.96 484.522 2135.44 490.242 2136.89L489.785 2139.01C484.038 2137.56 478.197 2136.07 472.218 2134.53C369.967 2108.26 262.999 2085.86 181.651 2044.05C140.952 2023.13 106.587 1997.33 82.3984 1963.68C58.199 1930.02 44.2324 1888.59 44.2324 1836.5C44.2324 1732.18 125.209 1658.04 241.119 1600.35C357.079 1542.64 508.446 1501.17 650.046 1462.37L658.348 1460.08C815.096 1416.84 910.487 1381.08 966.959 1346.61C995.63 1329.11 1014.21 1311.97 1025.7 1294.42C1037.17 1276.89 1041.62 1258.87 1041.92 1239.51C1040.92 1196.85 1045.16 1141.52 988.105 1081.32C930.944 1021 812.164 955.726 564.589 893.949C329.796 835.362 188.714 788.484 106.324 740.947C65.112 717.169 38.5092 693.184 22.2188 667.416C5.91787 641.632 6.28439e-05 614.154 0 583.504C0 543.999 6.8414 510.397 21.9912 480.274C37.1399 450.154 60.5607 423.582 93.6133 398.083C159.672 347.122 264.384 300.321 418.938 237.996C690.517 128.481 856.987 72.9653 1112.81 4.95312L1113.37 7.05273Z" fill="currentColor"></path>
                
                {/* Scroll fade-in dots that sit on the timeline nodes */}
                <circle cx="1111.09" cy="6.5" data-connec="step-1" data-tl-from="{'opacity' : 0}" data-tl-start="-30% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="186.086" cy="341.5" data-connect="step-2" data-tl-from="{'opacity' : 0}" data-tl-start="-17% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="105.086" cy="739.5" data-connect="step-3" data-tl-from="{'opacity' : 0}" data-tl-start="-1% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="998.086" cy="1092.5" data-connect="step-4" data-tl-from="{'opacity' : 0}" data-tl-start="13% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="582.086" cy="1482.5" data-connect="step-5" data-tl-from="{'opacity' : 0}" data-tl-start="29% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="59.0859" cy="1766.5" data-connect="step-6" data-tl-from="{'opacity' : 0}" data-tl-start="44% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="458.086" cy="2129.5" data-connect="step-7" data-tl-from="{'opacity' : 0}" data-tl-start="58% top" data-tl-to="{'opacity': 1, 'duration': 0.6}" data-tl-trigger=".about-card-container" data-tl-type="trigger" fill="#ffff23" r="5.5" stroke="currentColor" strokeWidth="2"></circle>
                
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4101_214" x1="568.737" x2="568.737" y1="380.366" y2="1766.67">
                    <stop offset="0.201923" stopColor="#FFFF23"></stop>
                    <stop offset="0.240385" stopColor="#FFFF23" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_4101_214" x1="568.737" x2="568.737" y1="380.366" y2="1766.67">
                    <stop offset="0.201923" stopColor="#FFFF23"></stop>
                    <stop offset="0.240385" stopColor="#FFFF23" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_4101_214" x1="568.737" x2="568.737" y1="380.366" y2="1766.67">
                    <stop offset="0.201923" stopColor="#FFFF23"></stop>
                    <stop offset="0.240385" stopColor="#FFFF23" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>

            </div>

          </div>

          {/* Mobile SVG timeline connector (Rendered as sibling to about-card-container to match hierarchy) */}
          <div className="mobile-timeline-wrap">
            <svg className="mobile-timeline-icon" fill="none" viewBox="0 0 15 2421" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 2421H5.5V2412H8.5V2421ZM8.5 2401H5.5V2392H8.5V2401ZM8.5 2381H5.5V0H8.5V2381Z" fill="currentColor"></path>
              <circle cx="7" cy="743" fill="#FFFF23" r="5.5" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7" cy="414" fill="#FFFF23" r="5.5" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7.5" cy="49.5" fill="#FFFF23" r="6" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7.5" cy="1082.5" fill="#FFFF23" r="6" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7.5" cy="1415.5" fill="#FFFF23" r="6" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7.5" cy="1743.5" fill="#FFFF23" r="6" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7.5" cy="2078.5" fill="#FFFF23" r="6" stroke="currentColor" strokeWidth="3"></circle>
              <circle cx="7.5" cy="2363.5" fill="#FFFF23" r="6" stroke="currentColor" strokeWidth="3"></circle>
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
