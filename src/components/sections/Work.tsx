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
      <div className="work-sticky-support">
        <div className="work-sticky">
          <div className="work-sticky-inner">
            
            {/* Header section with Label and Title */}
            <div className="work-sticky-left" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe62bb-be2d4114">
              <div className="label">SELECTED WORK</div>
              <h2 className="h2-style">Helping brands <br/>make an impact.</h2>
            </div>

            {/* Horizontal Scroll track wrapper */}
            <div className="work-track-wrap" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe62bf-be2d4114">
              <div className="work-track">
                
                {PROJECTS.map((project, index) => {
                  const numberLabel = (index + 1).toString().padStart(2, "0");
                  
                  return (
                    <div className="work-card-wrap" key={project.id}>
                      <a className="work-card w-inline-block" href={project.href}>
                        <div className="work-card-top">
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
                        </div>
                        
                        <div className="work-card-bottom">
                          <div className="work-card-left-bottom">
                            <div className="work-label-wrap">
                              <div className="work-label">{numberLabel}</div>
                              {project.tags.map((tag, tagIdx) => (
                                <div className="work-label" key={tagIdx}>{tag}</div>
                              ))}
                            </div>
                            <h3 className="work-card-heading">{project.title}</h3>
                          </div>
                          
                          <div className="work-card-arrow-wrap">
                            <div className="work-card-arrow"></div>
                            <div className="work-card-arrow-2"></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
