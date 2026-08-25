"use client";

import { SERVICES } from "@/lib/constants/data";

export default function Services() {
  return (
    <section className="sevice_section" id="services">
      <div className="container">
        
        {/* Left header column */}
        <div className="service-left" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe62bb-be2d4114">
          <div className="label">SERVICES</div>
          <h2 className="h2-style">Tailored pricing <br/>for your needs.</h2>
        </div>

        {/* Right service/pricing cards wrap */}
        <div className="service-wrap" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe62bf-be2d4114">
          {SERVICES.map(service => {
            const isFirst = service.id === "ongoing";

            return (
              <div 
                className={`service-card ${isFirst ? "is-first" : ""}`} 
                key={service.id}
              >
                <div className="service-top-content">
                  <div className="service-card-top-layout">
                    <div className="service-card-top-item">
                      
                      {/* SVG Icon matching service type */}
                      {service.id === "ongoing" && (
                        <svg className="service-card-icon" fill="none" viewBox="0 0 42 42" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#FDF822" height="41.5299" rx="9.96716" width="41.5299"></rect>
                          <path d="M20.7656 16.1932C20.7656 18.7145 18.7187 20.7614 16.1974 20.7614C13.6762 20.7614 11.6292 18.7145 11.6292 16.1932V11.625H16.1974C18.7187 11.625 20.7656 13.6719 20.7656 16.1932Z" fill="currentColor"></path>
                          <path d="M25.3302 20.7656C22.809 20.7656 20.762 18.7187 20.762 16.1974C20.762 13.6762 22.809 11.6292 25.3302 11.6292H29.8984V16.1974C29.8984 18.7187 27.8515 20.7656 25.3302 20.7656Z" fill="currentColor"></path>
                          <path d="M20.7656 25.3381C20.7656 22.8168 22.8126 20.7699 25.3338 20.7699C27.8551 20.7699 29.902 22.8168 29.902 25.3381V29.9062H25.3338C22.8126 29.9062 20.7656 27.8593 20.7656 25.3381Z" fill="currentColor"></path>
                          <path d="M16.1932 20.7656C18.7145 20.7656 20.7614 22.8126 20.7614 25.3338C20.7614 27.8551 18.7145 29.902 16.1932 29.902H11.625V25.3338C11.625 22.8126 13.6719 20.7656 16.1932 20.7656Z" fill="currentColor"></path>
                        </svg>
                      )}
                      
                      {service.id === "starter" && (
                        <svg className="service-card-icon" fill="none" viewBox="0 0 44 42" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#FDF822" height="41.5299" rx="9.96716" width="43.191"></rect>
                          <path d="M21.5783 11.6519L12.4512 20.7983V29.9091L21.5783 20.7627V11.6519Z" fill="currentColor"></path>
                          <path d="M21.5918 20.7829V29.8939L30.7191 20.7473V11.6363L21.5918 20.7829Z" fill="currentColor"></path>
                        </svg>
                      )}

                      {service.id === "custom" && (
                        <svg className="service-card-icon" fill="none" viewBox="0 0 42 42" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#FDF822" height="41.5299" rx="9.96716" width="41.5299"></rect>
                          <path clipRule="evenodd" d="M29.9264 16.8302C29.9264 15.7569 29.113 14.8984 28.0963 14.8984C27.0795 14.8984 26.2661 15.7569 26.2661 16.8302C26.2661 17.5278 26.2661 20.2109 26.2661 20.9085C26.2661 21.9817 25.4527 22.8403 24.436 22.8403C23.4192 22.8403 22.6059 21.9817 22.6059 20.9085C22.6059 20.2109 22.6059 14.2544 22.6059 13.5568C22.6059 12.4836 21.7925 11.625 20.7757 11.625C19.759 11.625 18.9456 12.4836 18.9456 13.5568C18.9456 14.2544 18.9456 20.2109 18.9456 20.9085C18.9456 21.9817 18.1322 22.8403 17.1154 22.8403C16.0987 22.8403 15.2853 21.9817 15.2853 20.9085C15.2853 20.2109 15.2853 17.5278 15.2853 16.8302C15.2853 15.7569 14.4719 14.8984 13.4551 14.8984C12.4384 14.8984 11.625 15.7569 11.625 16.8302V26.5966C11.625 28.4211 12.9976 29.8699 14.7261 29.8699H26.6728C28.4013 29.8699 29.7739 28.4211 29.7739 26.5966L29.9264 16.8302Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                      )}

                      <h3 className="service-card-heading">{service.name}</h3>
                    </div>

                    <div className="service-price-item">
                      <p>{service.price}</p>
                      {service.hours && <div className="services-hours-text">{service.hours}</div>}
                    </div>
                  </div>

                  {/* Service description */}
                  <p className="service-card-desc" dangerouslySetInnerHTML={{ __html: service.desc }} />

                  {/* Service checklist items */}
                  <div className="service-list">
                    {service.items.map((item, idx) => (
                      <div className="service-list-item" key={idx}>
                        <div className="service-list-bullet-icon"></div>
                        <p dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom tooltip text with info icon */}
                <div className="service-bottom-content">
                  <svg className="services-tooltip-icon" fill="none" viewBox="0 0 22 23" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1846 5.16699C14.5029 5.18253 17.1537 7.85043 17.1777 11.1299C17.2021 14.438 14.5506 17.1168 11.292 17.1768C7.89133 17.2395 5.201 14.5009 5.16699 11.2363C5.13341 7.98119 7.74996 5.17702 11.1846 5.16699Z" stroke="currentColor" strokeWidth="1.58333"></path>
                    <rect fill="currentColor" height="1.67711" rx="0.838555" width="1.67711" x="10.3281" y="7.38281"></rect>
                    <rect fill="currentColor" height="5.03133" rx="0.838555" width="1.67711" x="10.3281" y="9.90234"></rect>
                  </svg>
                  <p>{service.footer}</p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

