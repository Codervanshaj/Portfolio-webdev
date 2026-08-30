"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/animations/gsap";
import { TESTIMONIALS } from "@/lib/constants/data";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";

export default function Testimonials() {
  useGSAP(() => {
    // 1. Locate components
    const swiperEl = document.querySelector(".swiper") as HTMLElement;
    const dragWrap = document.querySelector(".drag-wrap") as HTMLElement;
    if (!swiperEl || !dragWrap) return;

    // 2. Set initial drag cursor properties
    gsap.set(dragWrap, { 
      opacity: 0, 
      scale: 0.8,
      pointerEvents: "none",
      position: "fixed",
      zIndex: 9999
    });

    let isDragging = false;
    let isInsideSwiper = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastDragDirection: "left" | "right" | null = null;

    const updateDragIndicatorPosition = (event: MouseEvent | TouchEvent) => {
      const x = "clientX" in event ? event.clientX : event.touches?.[0]?.clientX || 0;
      const y = "clientY" in event ? event.clientY : event.touches?.[0]?.clientY || 0;
      gsap.set(dragWrap, { x, y, xPercent: -50, yPercent: -50 });
    };

    const showDragIndicator = () => {
      gsap.to(dragWrap, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
      dragWrap.classList.add("is-ready");
      dragWrap.classList.remove("is-dragging");
    };

    const hideDragIndicator = () => {
      gsap.to(dragWrap, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
      dragWrap.classList.remove("is-ready", "is-dragging");
    };

    const startDragging = (event: MouseEvent | TouchEvent) => {
      isDragging = true;
      updateDragIndicatorPosition(event);
      
      const leftIcon = dragWrap.querySelector(".drag-left-icon");
      const rightIcon = dragWrap.querySelector(".drag-right-icon");
      if (leftIcon) gsap.set(leftIcon, { scale: 1 });
      if (rightIcon) gsap.set(rightIcon, { scale: 1 });

      dragWrap.classList.add("is-dragging");
      dragWrap.classList.remove("is-ready");
    };

    const backToIdle = () => {
      isDragging = false;
      const leftIcon = dragWrap.querySelector(".drag-left-icon");
      const rightIcon = dragWrap.querySelector(".drag-right-icon");
      if (leftIcon) gsap.to(leftIcon, { scale: 1, duration: 0.3, ease: "power2.out" });
      if (rightIcon) gsap.to(rightIcon, { scale: 1, duration: 0.3, ease: "power2.out" });

      dragWrap.classList.add("is-ready");
      dragWrap.classList.remove("is-dragging");
    };

    const updateDragDirection = (newDirection: "left" | "right") => {
      if (newDirection === lastDragDirection) return;
      lastDragDirection = newDirection;

      const leftIcon = dragWrap.querySelector(".drag-left-icon");
      const rightIcon = dragWrap.querySelector(".drag-right-icon");
      if (leftIcon && rightIcon) {
        if (newDirection === "left") {
          gsap.to(leftIcon, { scale: 1.5, duration: 0.2, ease: "back.out(2)" });
          gsap.to(rightIcon, { scale: 0.8, duration: 0.2, ease: "power2.out" });
          leftIcon.classList.add("is-active");
          rightIcon.classList.remove("is-active");
        } else {
          gsap.to(rightIcon, { scale: 1.5, duration: 0.2, ease: "back.out(2)" });
          gsap.to(leftIcon, { scale: 0.8, duration: 0.2, ease: "power2.out" });
          rightIcon.classList.add("is-active");
          leftIcon.classList.remove("is-active");
        }
      }
    };

    // 3. Initialize Swiper using npm package
    new Swiper(".swiper", {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 14,
      loop: false,
      autoHeight: true,
      simulateTouch: true,
      grabCursor: false,
      speed: 500,
      resistanceRatio: 0.85,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        bulletClass: "swiper-bullet",
        bulletActiveClass: "is-active"
      },
      on: {
        init: (swiper: any) => {
          const bullets = document.querySelectorAll(".swiper-pagination .swiper-bullet");
          bullets.forEach((bullet, idx) => {
            if (idx === swiper.activeIndex) {
              bullet.classList.add("is-active");
            } else {
              bullet.classList.remove("is-active");
            }
          });
        },
        slideChange: (swiper: any) => {
          const bullets = document.querySelectorAll(".swiper-pagination .swiper-bullet");
          bullets.forEach((bullet, idx) => {
            if (idx === swiper.activeIndex) {
              bullet.classList.add("is-active");
            } else {
              bullet.classList.remove("is-active");
            }
          });
        },
        touchStart: (swiper: any, event: any) => {
          dragStartX = event.touches?.[0]?.clientX || 0;
          dragStartY = event.touches?.[0]?.clientY || 0;
          lastDragDirection = null;
          startDragging(event);
        },
        touchMove: (swiper: any, event: any) => {
          updateDragIndicatorPosition(event);
          const currentX = event.touches?.[0]?.clientX || 0;
          const currentY = event.touches?.[0]?.clientY || 0;
          const deltaX = currentX - dragStartX;
          const deltaY = Math.abs(currentY - dragStartY);

          if (Math.abs(deltaX) > 5 && Math.abs(deltaX) > deltaY * 0.5) {
            updateDragDirection(deltaX < 0 ? "left" : "right");
          }
        },
        touchEnd: () => {
          backToIdle();
        }
      }
    });

    // 4. Mouse movement tracking for custom cursor drag indicator
    const onMouseMove = (e: MouseEvent) => {
      if (isInsideSwiper) {
        updateDragIndicatorPosition(e);
        if (isDragging) {
          const deltaX = e.clientX - dragStartX;
          const deltaY = Math.abs(e.clientY - dragStartY);
          if (Math.abs(deltaX) > 5 && Math.abs(deltaX) > deltaY * 0.5) {
            updateDragDirection(deltaX < 0 ? "left" : "right");
          }
        }
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      isInsideSwiper = true;
      showDragIndicator();
      updateDragIndicatorPosition(e);
    };

    const onMouseLeave = () => {
      isInsideSwiper = false;
      if (!isDragging) {
        hideDragIndicator();
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Do not initiate dragging if clicking directly on a link
      if ((e.target as HTMLElement).closest("a")) {
        return;
      }
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastDragDirection = null;
      startDragging(e);
    };

    const onMouseUp = () => {
      backToIdle();
      if (!isInsideSwiper) {
        hideDragIndicator();
      }
    };

    // 5. Link hover transition to "CLICK"
    const links = swiperEl.querySelectorAll(".client-text-link");
    const leftIcon = dragWrap.querySelector(".drag-left-icon");
    const rightIcon = dragWrap.querySelector(".drag-right-icon");
    const textSpanP = dragWrap.querySelectorAll(".drag-circle-span p");

    const onLinkMouseEnter = () => {
      gsap.to([leftIcon, rightIcon], { scale: 0, opacity: 0, duration: 0.2, ease: "power2.out" });
      gsap.to(textSpanP, { yPercent: -100, duration: 0.3, ease: "power2.out" });
    };

    const onLinkMouseLeave = () => {
      gsap.to([leftIcon, rightIcon], { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(textSpanP, { yPercent: 0, duration: 0.3, ease: "power2.out" });
    };

    links.forEach(link => {
      link.addEventListener("mouseenter", onLinkMouseEnter);
      link.addEventListener("mouseleave", onLinkMouseLeave);
    });

    swiperEl.addEventListener("mouseenter", onMouseEnter);
    swiperEl.addEventListener("mouseleave", onMouseLeave);
    swiperEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      swiperEl.removeEventListener("mouseenter", onMouseEnter);
      swiperEl.removeEventListener("mouseleave", onMouseLeave);
      swiperEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onLinkMouseEnter);
        link.removeEventListener("mouseleave", onLinkMouseLeave);
      });
    };
  }, []);

  return (
    <section className="testimonial_section" id="testimonial">
      <div className="container">
        
        {/* Header Title */}
        <div className="column" id="client_column">
          <div
            className="label"
            data-tl-from="{'width':'0vw','opacity':0}"
            data-tl-once=""
            data-tl-start="top 90%"
            data-tl-to="{ 'width':'auto', 'opacity':1, 'duration':0.7, 'ease':'expo.inOut' }"
            data-tl-trigger="#client_column"
            data-tl-type="trigger"
            style={{ width: "0vw" }}
          >
            TESTIMONIALS
          </div>
          <h2
            aria-label="From People I've Worked with"
            className="h2-style margin-bottom-s"
            data-split-initialized="true"
            data-tl-from="{'yPercent': 100}"
            data-tl-once=""
            data-tl-split="lines"
            data-tl-start="top 90%"
            data-tl-to="{'yPercent': 0,  'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'power2.out'}"
            data-tl-trigger="#client_column"
            data-tl-type="trigger"
            style={{ background: "none", WebkitTextFillColor: "transparent" }}
          >
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                From People 
              </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>
                I've Worked with
              </div>
            </div>
          </h2>
        </div>

        {/* Swiper wrapper */}
        <div className="swiper-main-wrap">
          <div className="swiper-pagination"></div>
          <div className="swiper w-node-_71d2b781-bb03-b09e-7df2-2f3b8908d132-be2d4114">
            <div className="swiper-wrapper">
              
              {TESTIMONIALS.map(t => (
                <div className="swiper-slide" key={t.id}>
                  <div className="swiper-card">
                    <div className="column">
                      <div className="swiper-card-top">
                        <h3 className="swiper-heading" dangerouslySetInnerHTML={{ __html: t.quote }} />
                        <svg className="swiper-quote-icon" fill="none" viewBox="0 0 30 30" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#FFFF23" height="30" rx="4.5" width="30"></rect>
                          <path d="M9.75 20.07V17.97C11.01 17.76 11.91 16.98 11.91 15.06H9.75V10.5H14.31V15.06C14.31 17.76 12.69 19.65 9.75 20.07ZM15.75 20.07V17.97C17.01 17.76 17.91 16.98 17.91 15.06H15.75V10.5H20.31V15.06C20.31 17.76 18.69 19.65 15.75 20.07Z" fill="black" fillOpacity="0.7"></path>
                        </svg>
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: t.text }} />
                    </div>
                    <div className="swiper-card-bottom">
                      <img alt={`${t.author} | ${t.role} ${t.company || ""}`} className="client-img" loading="lazy" src={t.avatar} />
                      <div className="client-info">
                        <p className="text-weight-medium">{t.author}</p>
                        <p className="client-text-small">{t.role}</p>
                        {t.company && (
                          <a className="client-text-link" href={t.companyHref || "#"} target="_blank" rel="noopener noreferrer">
                            {t.company}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Custom Drag Cursor Follower */}
        <div className="drag-wrap">
          <svg className="drag-left-icon" fill="none" viewBox="0 0 10 10" width="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 4.13397C0.833334 4.51887 0.833333 5.48113 1.5 5.86603L6 8.4641C6.66667 8.849 7.5 8.36788 7.5 7.59808L7.5 2.40192C7.5 1.63212 6.66667 1.151 6 1.5359L1.5 4.13397Z" fill="currentColor"></path>
          </svg>
          <div className="drag-circle">
            <div className="drag-circle-span">
              <p>drag</p>
              <p>click</p>
            </div>
          </div>
          <svg className="drag-right-icon" fill="none" viewBox="0 0 10 10" width="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 5.86603C9.16667 5.48113 9.16667 4.51887 8.5 4.13397L4 1.5359C3.33333 1.151 2.5 1.63212 2.5 2.40192L2.5 7.59808C2.5 8.36788 3.33333 8.849 4 8.4641L8.5 5.86603Z" fill="currentColor"></path>
          </svg>
        </div>

      </div>
    </section>
  );
}
