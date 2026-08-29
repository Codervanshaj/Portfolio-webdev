"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { initHorizontalScroll, destroyHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { PROJECTS } from "@/lib/constants/data";

export default function Work() {
  useGSAP(() => {
    initHorizontalScroll();
    return () => {
      destroyHorizontalScroll();
    };
  }, []);

  return (
    <section className="work_section" id="projects">
      <div className="work-sticky-support"></div>
      <div className="work-sticky">
        <div className="work-container">

          {/* Header section with Label, Title, and Description */}
          <div className="work-top-layout">
            <div className="column">
              <div className="label is-secondary">SELECTED WORK</div>
              <h2 className="h2-style-white max-width-700">Built in Webflow,<br />Made to Perform</h2>
            </div>
            <div className="column flex-center">
              <div className="work-top-text">
                <p className="paragraph op80">
                  Over seven years I've helped businesses across different industries turn their ideas into websites that look and work exactly how they imagined. Here's a look at some of that work.
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll track wrapper */}
          <div className="work-track-wrap">
            <div className="work-track">
              {PROJECTS.map((project, index) => {
                const numberLabel = (index + 1).toString().padStart(2, "0");

                return (
                  <a className="work-card w-inline-block" href={project.href} target="_blank" rel="noopener noreferrer" key={project.id}>
                    <img
                      alt={project.title}
                      className="work-image"
                      loading="lazy"
                      src={project.image}
                    />
                    {project.video && (
                      <video
                        autoPlay
                        className="work-bg"
                        loop
                        muted
                        playsInline
                        src={project.video}
                      />
                    )}
                    <div className="work-image-overlay"></div>

                    <div className="work-card-content">
                      <div className="work-card-content-top-layout">
                        <div className="work-label">{numberLabel}</div>
                        <div className="work-label-wrap">
                          {project.tags.map((tag, tagIdx) => (
                            <div className="work-label" key={tagIdx}>{tag}</div>
                          ))}
                        </div>
                      </div>

                      <div className="work-card-content-bottom-layout">
                        <h3 className="work-card-heading">{project.title}</h3>
                        {project.description && (
                          <p className="op80">{project.description}</p>
                        )}

                        <div className="work-card-arrow-wrap">
                          <div className="work-card-arrow-icon">
                            <svg className="work-card-arrow" fill="none" viewBox="0 0 23 23" width="100%" xmlns="http://www.w3.org/2000/svg">
                              <rect fill="currentColor" height="15" rx="1" transform="rotate(45 15.4004 5.5)" width="2" x="15.4004" y="5.5"></rect>
                              <rect fill="currentColor" height="11" rx="1" width="2" x="14.8145" y="5.5"></rect>
                              <rect fill="currentColor" height="11" rx="1" transform="rotate(90 16.8145 5.5)" width="2" x="16.8145" y="5.5"></rect>
                            </svg>
                            <svg className="work-card-arrow-2" fill="none" viewBox="0 0 23 23" width="100%" xmlns="http://www.w3.org/2000/svg">
                              <rect fill="currentColor" height="15" rx="1" transform="rotate(45 15.4004 5.5)" width="2" x="15.4004" y="5.5"></rect>
                              <rect fill="currentColor" height="11" rx="1" width="2" x="14.8145" y="5.5"></rect>
                              <rect fill="currentColor" height="11" rx="1" transform="rotate(90 16.8145 5.5)" width="2" x="16.8145" y="5.5"></rect>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );

}
