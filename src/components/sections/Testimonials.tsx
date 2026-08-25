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
    };
  }, []);

  return (
    <section className="testimonial_section" id="clients">
      <div className="container">
        
        {/* Header Title */}
        <div className="testimonial-title-layout">
          <div className="label">CLIENTS & TESTIMONIALS</div>
          <h2 className="h2-style">What clients say.</h2>
        </div>

        {/* Swiper wrapper */}
        <div className="swiper-main-wrap">
          <div className="swiper w-node-_71d2b781-bb03-b09e-7df2-2f3b8908d132-be2d4114">
            <div className="swiper-wrapper">
              
              {TESTIMONIALS.map(t => (
                <div className="swiper-slide" key={t.id}>
                  <div className="testimonial-card">
                    <p className="testimonial-text">{t.quote}</p>
                    <div className="testimonial-author-wrap">
                      <p className="testimonial-author-name">{t.author}</p>
                      <p className="testimonial-author-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Pagination Bullet shapes */}
            <div className="swiper-pagination"></div>
          </div>
        </div>

        {/* Custom Drag Cursor Follower */}
        <div className="drag-wrap">
          <div className="drag-item">
            <div className="drag-left-icon"></div>
            <div className="drag-text">DRAG</div>
            <div className="drag-right-icon"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
