"use client";

import { useState, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { scaleSidebar } from "@/lib/animations/flipAnimations";
import { NAV_LINKS } from "@/lib/constants/data";
import { SITE_CONFIG } from "@/lib/constants/site";

export default function Navigation() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "projects", "overview", "services", "testimonial", "faq"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, {
        threshold: 0.35,
        rootMargin: "-10% 0px -40% 0px"
      });
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nenad@popadic.co");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <header
      className={`navigation ${activeSection === "projects" ? "is-dark" : ""}`}
      data-tl-desktop=""
      data-tl-from="{'zIndex': 2}"
      data-tl-start="53% top"
      data-tl-to="{'zIndex': 100, 'duration': 0.1}"
      data-tl-trigger=".hero"
      data-tl-type="trigger"
      style={{ zIndex: 2 }}
    >
      <div className="nav-container">

        {/* Profile Image Fade */}
        <div className="profile-img-wrap" data-tl-desktop="" data-tl-start="top 70%" data-tl-trigger=".hero" data-tl-type="trigger">
          <div className="profile-img-item">
            <img
              alt={SITE_CONFIG.developer}
              className="hero-profile-img"
              data-tl-desktop=""
              data-tl-end="70% top"
              data-tl-from="{'filter': 'blur(0px)', 'opacity': 1}"
              data-tl-start="top top"
              data-tl-to="{'filter': 'blur(90px)', 'opacity': 0.3}"
              data-tl-trigger=".hero"
              data-tl-type="scroll"
              fetchPriority="high"
              loading="lazy"
              sizes="100vw"
              src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6926f8e053a878c5f61cc622_nenad_edit-photo_final-201.avif"
              srcSet="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6926f8e053a878c5f61cc622_nenad_edit-photo_final-201-p-500.avif 500w, /heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6926f8e053a878c5f61cc622_nenad_edit-photo_final-201.avif 1670w"
            />
          </div>
        </div>

        {/* Top Logo, Socials & Mobile Menu bar */}
        <div className="nav-top-layout" id="w-node-_5e7c5502-ddba-215f-98c3-2549ffbe61a2-be2d4114">
          <div className="nav-top-bg" data-tl-desktop="" data-tl-end="39% top" data-tl-from="{'scale' : 0.5, 'opacity' : 0}" data-tl-start="35% top" data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll"></div>
          <div className="nav-top-item">
            <div className="nav-logo" data-tl-desktop="" data-tl-end="44% top" data-tl-from="{'color' : '#ffff23', 'backgroundColor': 'transparent'}" data-tl-start="42% top" data-tl-to="{'color' : '#000', 'backgroundColor': '#ffff23'}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ backgroundColor: "transparent", color: "#ffff23" }}>
              <div className="nav-logo-item">

                {/* SVG Logo */}
                <div className="nesh-logo" data-flip-end="44% top" data-flip-start="top top" data-flip-trigger=".hero">


                  <svg className="nesh-logo-svg" width="100%" viewBox="0 0 851 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M678 167V0H724.634V65.2344H786.366V0H833V167H786.366V101.766H724.634V167H678Z" fill="currentColor" />
                    <path d="M617.639 53.1219C617.207 47.8203 615.182 43.6851 611.564 40.7162C607.999 37.7473 602.572 36.2629 595.282 36.2629C590.638 36.2629 586.831 36.8195 583.861 37.9328C580.945 38.9932 578.785 40.4511 577.381 42.3067C575.976 44.1622 575.247 46.2829 575.193 48.6686C575.085 50.6302 575.436 52.4062 576.246 53.9967C577.11 55.5341 578.461 56.939 580.297 58.2114C582.133 59.4308 584.482 60.5441 587.344 61.5514C590.206 62.5587 593.608 63.46 597.55 64.2552L611.159 67.1181C620.339 69.0267 628.196 71.5449 634.73 74.6729C641.264 77.8008 646.611 81.4854 650.769 85.7267C654.927 89.9149 657.978 94.6333 659.922 99.8819C661.92 105.13 662.946 110.856 663 117.059C662.946 127.768 660.219 136.834 654.819 144.256C649.419 151.678 641.696 157.325 631.652 161.195C621.662 165.065 609.646 167 595.606 167C581.188 167 568.605 164.906 557.859 160.718C547.167 156.529 538.85 150.088 532.91 141.393C527.024 132.646 524.054 121.459 524 107.834H566.769C567.039 112.818 568.308 117.006 570.576 120.399C572.844 123.792 576.031 126.363 580.135 128.113C584.293 129.862 589.234 130.737 594.958 130.737C599.764 130.737 603.787 130.154 607.027 128.988C610.267 127.821 612.725 126.204 614.399 124.137C616.073 122.069 616.937 119.71 616.991 117.059C616.937 114.567 616.1 112.394 614.48 110.538C612.914 108.63 610.322 106.933 606.703 105.449C603.085 103.911 598.198 102.48 592.042 101.154L575.518 97.6552C560.829 94.5273 549.246 89.3052 540.767 81.9891C532.343 74.6198 528.158 64.5733 528.212 51.8495C528.158 41.5114 530.966 32.4722 536.636 24.7319C542.361 16.9386 550.272 10.8683 560.37 6.52095C570.522 2.17365 582.16 0 595.282 0C608.674 0 620.258 2.20016 630.032 6.60048C639.806 11.0008 647.34 17.2037 652.632 25.2091C657.978 33.1614 660.678 42.4657 660.732 53.1219H617.639Z" fill="currentColor" />
                    <path d="M507 0V167H463.009L392.851 79.2598H391.713V167H339V0H383.749L452.77 87.4141H454.287V0H507Z" fill="currentColor" />
                    <path d="M196.716 167H147L203.013 0H265.987L322 167H272.284L235.163 45.9902H233.837L196.716 167ZM187.436 101.113H280.901V135.035H187.436V101.113Z" fill="currentColor" />
                    <path d="M53.5227 0L89.3182 117.748H90.6818L126.477 0H180L122.386 167H57.6136L0 0H53.5227Z" fill="currentColor" />
                  </svg>

                  {/* Copyright symbol inside Logo container */}
                  <div className="nesh-copyright-wrap">
                    <svg className="nesh-copyright-icon" data-tl-desktop="" data-tl-end="5%" data-tl-from="{'opacity': 0}" data-tl-start="2% top" data-tl-to="{'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll" fill="none" viewBox="0 0 9 9" width="100%" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.343933 5.97697C0.114645 5.44236 0 4.8828 0 4.29829C0 3.71378 0.114645 3.156 0.343933 2.62495C0.573221 2.0939 0.883118 1.6377 1.27362 1.25634C1.66413 0.871419 2.12808 0.56669 2.66547 0.342152C3.20645 0.114051 3.7743 0 4.36901 0C4.96373 0 5.52978 0.114051 6.06718 0.342152C6.60815 0.56669 7.0739 0.871419 7.4644 1.25634C7.85491 1.6377 8.1648 2.0939 8.39409 2.62495C8.62338 3.156 8.73802 3.71378 8.73802 4.29829C8.73802 5.07526 8.54277 5.7952 8.15226 6.45812C7.76176 7.11748 7.23153 7.63962 6.56158 8.02454C5.89163 8.40946 5.16077 8.60192 4.36901 8.60192C3.7743 8.60192 3.20645 8.48787 2.66547 8.25977C2.12808 8.03523 1.66413 7.73228 1.27362 7.35093C0.883118 6.96601 0.573221 6.50802 0.343933 5.97697ZM1.08017 4.29829C1.08017 4.7438 1.16615 5.16971 1.33811 5.57601C1.51008 5.97875 1.74295 6.32625 2.03672 6.61851C2.3305 6.91076 2.6798 7.14421 3.08464 7.31885C3.49306 7.48993 3.92118 7.57546 4.36901 7.57546C4.81684 7.57546 5.24317 7.48993 5.64801 7.31885C6.05643 7.14421 6.40752 6.91076 6.7013 6.61851C6.99507 6.32625 7.22794 5.97875 7.39991 5.57601C7.57546 5.16971 7.66324 4.7438 7.66324 4.29829C7.66324 3.85278 7.57546 3.42865 7.39991 3.02591C7.22794 2.6196 6.99507 2.27032 6.7013 1.97807C6.40752 1.68581 6.05643 1.45415 5.64801 1.28307C5.24317 1.11199 4.81684 1.02646 4.36901 1.02646C3.77071 1.02646 3.21899 1.17258 2.71384 1.46484C2.20869 1.75353 1.80922 2.14914 1.51545 2.65168C1.22526 3.15422 1.08017 3.70309 1.08017 4.29829ZM2.64398 6.58643V1.99945H4.91178C5.33811 1.99945 5.691 2.12954 5.97045 2.38972C6.25347 2.64633 6.39499 2.97958 6.39499 3.38945C6.39499 3.71378 6.29109 3.98821 6.0833 4.21275C5.87909 4.43729 5.62651 4.56916 5.32557 4.60836L5.26109 4.61905L6.34125 6.56505H5.0515L4.11644 4.75805H3.84237V6.58643H2.64398ZM3.84237 3.82783H4.74519C4.88491 3.82783 4.99597 3.79219 5.07837 3.72091C5.16436 3.64962 5.20735 3.55161 5.20735 3.42687C5.20735 3.29143 5.16615 3.18629 5.08375 3.11145C5.00135 3.0366 4.88849 2.99918 4.74519 2.99918H3.84237V3.82783Z" fill="currentColor"></path>
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Links wrapper (Nested inside nav-top-item to match original design structure) */}
            <div className="social-wrap">
              <a aria-label="x" className="social-link w-inline-block" data-tl-end="46% top" data-tl-from="{'scale' : 0.3, 'opacity' : 0}" data-tl-start="44% top" data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll" href="https://x.com/NenadPopadicc" target="_blank">
                <svg className="instagram" fill="none" viewBox="0 0 15 15" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path className="social-bg-path" d="M2.41049 0C1.07921 0 0 1.07921 0 2.41049V12.0525C0 13.3837 1.07921 14.463 2.41049 14.463H12.0525C13.3837 14.463 14.463 13.3837 14.463 12.0525V2.41049C14.463 1.07921 13.3837 0 12.0525 0H2.41049Z" fill="currentColor"></path>
                  <path className="social-path-white" clipRule="evenodd" d="M5.86448 3.09766H3.13116L6.30703 7.60993L3.10156 11.3622H3.96245L6.69578 8.16211L8.94822 11.3622H11.6809L8.19427 6.40805L11.0218 3.09766H10.1609L7.80552 5.85587L5.86448 3.09766ZM4.44939 3.78637L9.30737 10.6735H10.3626L5.50466 3.78637H4.44939Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </a>
              <a aria-label="linkedin" className="social-link w-inline-block" data-tl-end="48% top" data-tl-from="{'scale' : 0.3, 'opacity' : 0}" data-tl-start="46% top" data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll" href="https://www.linkedin.com/in/nenad-popadic-3a8649197/" target="_blank">
                <svg className="instagram" fill="none" viewBox="0 0 15 15" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path className="social-bg-path" clipRule="evenodd" d="M12.0521 0C13.3833 0 14.463 1.07909 14.4632 2.41026V12.0521C14.4632 13.3834 13.3834 14.4632 12.0521 14.4632H2.41026C1.07909 14.463 0 13.3833 0 12.0521V2.41026C0.000124725 1.07916 1.07916 0.000124725 2.41026 0H12.0521Z" fill="currentColor" fillRule="evenodd"></path>
                  <path className="social-path-white" d="M7.39823 6.15968C7.62386 5.81218 8.02679 5.31565 8.92879 5.31561C10.0467 5.31571 10.8846 6.04581 10.8846 7.61502V10.5447H9.18613V7.81139C9.18613 7.12494 8.94063 6.65624 8.32622 6.65614C7.85676 6.65614 7.57742 6.97159 7.45444 7.27692C7.40968 7.38619 7.39823 7.53811 7.39823 7.69104V10.5439H5.6998C5.70002 10.4993 5.72239 5.91233 5.6998 5.43518H7.39823V6.15968Z" fill="currentColor"></path>
                  <path className="social-path-white" d="M4.75992 10.5439H3.0615V5.43518H4.75992V10.5439Z" fill="currentColor"></path>
                  <path className="social-path-white" d="M2.96094 3.85473C2.96113 3.35378 3.34138 2.97267 3.92219 2.97266C4.5033 2.97266 4.86099 3.35373 4.87236 3.85473C4.87236 4.34528 4.50332 4.73839 3.91111 4.73839H3.90002C3.33027 4.73839 2.96094 4.34528 2.96094 3.85473Z" fill="currentColor"></path>
                </svg>
              </a>
            </div>

            {/* Mobile menu trigger (Nested inside nav-top-item) */}
            <div className="mobile-menu-wrap" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <a className="nav-button-mobile w-button" href="https://cal.com/nenad-popadic/intro-call" target="_blank" onClick={e => e.stopPropagation()}>Book a Call</a>
              <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
                <div className="mobile-menu-icons">
                  <svg className="mobile-menu-icon" fill="none" viewBox="0 0 16 7" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M13.6 0H11.2C9.8744 0 8.8 1.00725 8.8 2.25V4.5C8.8 5.74275 9.8744 6.75 11.2 6.75H13.6C14.9256 6.75 16 5.74275 16 4.5V2.25C16 1.00725 14.9256 0 13.6 0ZM7.2 2.25V4.5C7.2 5.74275 6.1256 6.75 4.8 6.75H2.4C1.0744 6.75 0 5.74275 0 4.5V2.25C0 1.00725 1.0744 0 2.4 0H4.8C6.1256 0 7.2 1.00725 7.2 2.25Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Brand/Working Statement block */}
          <div aria-label="Working closely with your team to deliver Webflow builds that merge creativity, technical excellence, and long-term value." className="nav-top-text" data-split-initialized="true" data-tl-end="42% top" data-tl-from="{ 'y': '100%'}" data-tl-split="lines" data-tl-start="38% top" data-tl-to="{ 'y': '0%'}" data-tl-trigger=".hero" data-tl-type="scroll">
            <div className="line-mask"><div aria-hidden="true" className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>Working closely with your team to </div></div>
            <div className="line-mask"><div aria-hidden="true" className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>deliver Webflow builds that merge </div></div>
            <div className="line-mask"><div aria-hidden="true" className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>creativity, technical excellence, and </div></div>
            <div className="line-mask"><div aria-hidden="true" className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>long-term value.</div></div>
          </div>
        </div>

        {/* Navigation Stats Cards Column */}
        <div className="nav-stats-wrap">

          {/* Projects Stats Card */}
          <div className="nav-stats-card" id="stats_projects" style={{ zIndex: 10 }}>
            <div className="nav-webflow-bg" data-flip-end="40% top" data-flip-start="top top" data-flip-trigger=".hero"></div>
            <div className="nav-webflow-icon-wrap">
              <svg className="nav-webflow-icon" data-flip-end="40% top" data-flip-id="icon" data-flip-start="top top" data-flip-trigger=".hero" fill="none" viewBox="0 0 91 57" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M90.0571 0L61.3209 56.1824H34.3296L46.3557 32.898H45.8162C35.8948 45.7787 21.0919 54.2582 0 56.1824V33.2204C0 33.2204 13.493 32.4233 21.4251 24.0827H0V0.00044379H24.0795V19.8078L24.62 19.8056L34.4597 0.00044379H52.6705V19.6822L53.2109 19.6813L63.4197 0H90.0571Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <div className="nav-webflow-text-wrap">
              <p className="nav-webflow-text" data-flip-end="40% top" data-flip-start="top top" data-flip-trigger=".hero" data-tl-end="22% top" data-tl-from="{'color': 'white'}" data-tl-start="20% top" data-tl-to="{'color': 'black'}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ color: "white" }}>
                80+<br />Projects
              </p>
            </div>
          </div>

          <div className="nav-stats-sep" data-tl-end="41% top" data-tl-from="{'opacity' : 0}" data-tl-start="39% top" data-tl-to="{'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll"></div>

          {/* Years of Experience Stats Card */}
          <div className="nav-stats-card" id="stats_years" style={{ zIndex: 10 }}>
            <div className="nav-experience-bg" data-flip-end="40% top" data-flip-start="top top" data-flip-trigger=".hero"></div>
            <div className="nav-experience-numb-wrap" id="yrs_big_text">
              <svg className="nav-experience-numb" data-flip-end="40% top" data-flip-start="top top" data-flip-trigger=".hero" fill="none" viewBox="0 0 41 28" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.99609V0H21.3672V6.71875C20.5729 7.01823 19.8828 7.31771 19.2969 7.61719C18.724 7.91667 18.1055 8.32031 17.4414 8.82812C16.7904 9.32292 16.2305 9.88281 15.7617 10.5078C15.293 11.1198 14.8307 11.8945 14.375 12.832C13.9323 13.7695 13.5742 14.8307 13.3008 16.0156C13.0273 17.1875 12.806 18.5872 12.6367 20.2148C12.4805 21.8294 12.4023 23.6263 12.4023 25.6055V27.5977H4.6875V25.6055C4.6875 23.0273 4.9349 20.7096 5.42969 18.6523C5.9375 16.5951 6.60156 14.8893 7.42188 13.5352C8.24219 12.168 9.25781 10.9896 10.4688 10C11.6797 8.9974 12.9102 8.22917 14.1602 7.69531C15.4232 7.16146 16.8229 6.73177 18.3594 6.40625V5.91797L0 5.99609Z" fill="currentColor"></path>
                <path d="M20.7422 19.9609V14.5508H27.793V7.59766H33.5547V14.5508H40.5469V19.9609H33.5547V27.2852H27.793V19.9609H20.7422Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="nav-experience-text-wrap" id="yrs_small_text_end">
              <p className="nav-experience-text" data-flip-end="40% top" data-flip-start="top top" data-flip-trigger=".hero" data-tl-end="22% top" data-tl-from="{'color': 'white'}" data-tl-start="20% top" data-tl-to="{'color': 'black'}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ color: "white" }}>
                Years of <br />experience
              </p>
            </div>
          </div>

          {/* Stats background block overlays */}
          <div className="nav-top-bg" data-tl-end="38% top" data-tl-from="{'scale' : 0.5, 'opacity' : 0}" data-tl-start="34% top" data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll"></div>

        </div>

        {/* Navigation Menu List Wrapper */}
        <div className="nav-menu-wrap">
          <nav className="nav-menu">
            {NAV_LINKS.map((link, idx) => (
              <div
                className={`nav-menu-item ${activeSection === link.sectionId ? "is-active" : ""}`}
                key={link.id}
                data-flip-end={`${30 + idx}% top`}
                data-flip-start={`${idx === 2 ? 4 : idx === 3 ? 5 : 7 - idx}% top`}
                data-flip-trigger=".hero"
              >
                <a
                  aria-label={link.label}
                  className={`nav-link w-inline-block ${activeSection === link.sectionId ? "w--current" : ""}`}
                  data-tl-desktop=""
                  data-tl-from="{'scale': 0}"
                  data-tl-start="50% top"
                  data-tl-to="{'scale': 1}"
                  data-tl-trigger=".hero"
                  data-tl-type="trigger"
                  href={link.href}
                />

                {/* GSAP scroll reveal background pill */}
                <div className="nav-item-bg" data-tl-desktop="" data-tl-end={`${30 + idx}% top`} data-tl-from="{'scale' : 0.5, 'opacity' : 0}" data-tl-start={`${28 + idx}% top`} data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll"></div>

                {/* Icon */}
                <svg className="nav-item-icon" data-tl-desktop="" data-tl-end={`${31 + idx}% top`} data-tl-from="{'scale' : 0.2, 'opacity' : 0}" data-tl-start={`${29 + idx}% top`} data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll" fill="none" viewBox="0 0 16 16" width="100%" xmlns="http://www.w3.org/2000/svg">
                  {idx === 0 && <path d="M7.99108 15.9986C6.2723 15.9986 4.55352 16.0026 2.83474 15.9971C1.39106 15.9925 0.265085 15.0252 0.0285645 13.5918C0.00300833 13.438 0.00150497 13.2786 0.00150497 13.1218C1.66682e-06 10.9077 0.00150503 8.69304 1.72796e-06 6.47893C-0.00100048 5.42887 0.433956 4.61586 1.29335 4.02526C2.96953 2.87282 4.64422 1.71785 6.3189 0.563387C7.39978 -0.182045 8.58689 -0.189106 9.66225 0.550274C11.349 1.70978 13.0342 2.8708 14.7189 4.03333C15.5637 4.61636 15.9977 5.42232 15.9982 6.45725C15.9992 8.68396 16.0022 10.9112 15.9972 13.1379C15.9937 14.598 15.0406 15.7262 13.6154 15.9678C13.4441 15.9971 13.2667 15.9976 13.0923 15.9981C11.3921 16.0001 9.69232 15.9991 7.99208 15.9991L7.99108 15.9986ZM8.0021 13.1858C8.62648 13.1858 9.25035 13.1868 9.87472 13.1843C9.96091 13.1843 10.0521 13.1803 10.1328 13.153C10.3042 13.095 10.3954 12.9619 10.3964 12.7813C10.3974 12.6003 10.3062 12.4676 10.1363 12.4071C10.0621 12.3804 9.97695 12.3758 9.89677 12.3758C8.62948 12.3738 7.3622 12.3743 6.09541 12.3758C6.02726 12.3758 5.9571 12.3809 5.89196 12.399C5.60533 12.4787 5.49208 12.8358 5.70705 13.039C5.79976 13.1263 5.96061 13.1772 6.0924 13.1803C6.7288 13.1944 7.3657 13.1868 8.0026 13.1868L8.0021 13.1858Z" fill="currentColor" fillOpacity="0.9" />}
                  {idx === 1 && <path d="M16 10.0411C15.0925 13.4663 11.8925 16 8.1194 16C3.62985 16 0 12.434 0 7.97654C0 3.51906 3.62985 0 8.1194 0C11.7015 0 14.7582 2.29912 15.8567 5.44282C13.0388 6.28739 8.1194 7.97654 8.1194 7.97654L16 10.0411Z" fill="currentColor" fillOpacity="0.9" />}
                  {idx === 2 && <>
                    <path d="M1.33594 8C1.33594 6.8954 2.23137 6 3.33594 6H12.6693C13.7739 6 14.6693 6.8954 14.6693 8V13.3333C14.6693 14.4379 13.7739 15.3333 12.6693 15.3333H3.33594C2.23137 15.3333 1.33594 14.4379 1.33594 13.3333V8Z" fill="currentColor" fillOpacity="0.9" />
                    <path d="M2.66406 4.0026C2.66406 3.63442 2.96254 3.33594 3.33073 3.33594H12.6641C13.0323 3.33594 13.3307 3.63442 13.3307 4.0026C13.3307 4.37079 13.0323 4.66927 12.6641 4.66927H3.33073C2.96254 4.66927 2.66406 4.37079 2.66406 4.0026Z" fill="currentColor" fillOpacity="0.9" />
                    <path d="M4 1.33073C4 0.962542 4.29848 0.664062 4.66667 0.664062H11.3333C11.7015 0.664062 12 0.962542 12 1.33073C12 1.69892 11.7015 1.9974 11.3333 1.9974H4.66667C4.29848 1.9974 4 1.69892 4 1.33073Z" fill="currentColor" fillOpacity="0.9" />
                  </>}
                  {idx === 3 && <>
                    <path d="M3.02695 10.5054C2.68978 10.3628 2.30764 10.3628 1.97048 10.5054L0.89209 10.9614C0.588053 11.0899 0.588054 11.6259 0.89209 11.7545L7.5656 14.5764C7.8456 14.6948 8.1492 14.6948 8.4292 14.5764L15.1027 11.7545C15.4067 11.6259 15.4067 11.0899 15.1027 10.9614L14.0247 10.5055C13.6875 10.3629 13.3053 10.3629 12.9682 10.5055L8.588 12.3577C8.2052 12.5196 7.7902 12.5196 7.4074 12.3577L3.02695 10.5054Z" fill="currentColor" fillOpacity="0.9" />
                    <path d="M3.0269 6.80226C2.68973 6.65966 2.30758 6.65966 1.97042 6.80226L0.89209 7.25819C0.588053 7.38679 0.588054 7.92272 0.89209 8.05126L7.5656 10.8732C7.8456 10.9917 8.1492 10.9917 8.4292 10.8732L15.1027 8.05126C15.4067 7.92272 15.4067 7.38679 15.1027 7.25819L14.0246 6.80232C13.6874 6.65976 13.3053 6.65976 12.9681 6.80232L8.58793 8.65452C8.20513 8.81639 7.79013 8.81639 7.40733 8.65452L3.0269 6.80226Z" fill="currentColor" fillOpacity="0.9" />
                    <path d="M7.45662 0.795795C7.84082 0.630568 8.25735 0.630568 8.64162 0.795795L14.7775 3.43428C15.1947 3.61367 15.1947 4.36142 14.7775 4.5408L8.64162 7.17928C8.25735 7.34454 7.84082 7.34454 7.45662 7.17928L1.32069 4.5408C0.903521 4.36142 0.903521 3.61367 1.32069 3.43428L7.45662 0.795795Z" fill="currentColor" fillOpacity="0.9" />
                  </>}
                  {idx === 4 && <path d="M3.4666 9.36814C2.71166 9.36814 2.0262 9.35713 1.34073 9.37035C0.342642 9.39018 -0.111245 8.89651 0.0230685 7.99513C0.368116 5.67444 0.773373 3.36037 1.13926 1.04189C1.25042 0.338853 1.65336 0.0104747 2.38282 0.0104747C3.57775 0.0104747 4.775 -0.0181757 5.96761 0.0192902C7.0097 0.0523484 7.38948 0.596706 7.06296 1.56641C6.62992 2.85348 6.15519 4.12732 5.63183 5.5929C6.66234 5.5929 7.56548 5.57527 8.46631 5.59731C9.95302 5.63477 10.3884 6.37748 9.64271 7.61165C8.13979 10.091 6.61371 12.555 5.10846 15.0321C4.74026 15.6382 4.33269 16.1958 3.48512 15.9335C2.6885 15.6867 2.68155 15.0365 2.77187 14.3842C2.9965 12.7533 3.22344 11.1246 3.46891 9.36814H3.4666Z" fill="currentColor" />}
                  {idx === 5 && <>
                    <path d="M8 8.61178C10.2091 8.61178 12 6.85535 12 4.6887C12 2.52204 10.2091 0.765625 8 0.765625C5.79087 0.765625 4 2.52204 4 4.6887C4 6.85535 5.79087 8.61178 8 8.61178Z" fill="currentColor" fillOpacity="0.9" />
                    <path d="M8.0026 9.92188C3.5026 9.92188 1.33594 12.6759 1.33594 14.2804V15.1527C1.33594 15.4995 1.47642 15.832 1.72646 16.0773C1.97651 16.3225 2.31564 16.4604 2.66927 16.4604H13.3359C13.6895 16.4604 14.0287 16.3225 14.2787 16.0773C14.5287 15.832 14.6693 15.4995 14.6693 15.1527V14.2804C14.6693 12.6759 12.5026 9.92188 8.0026 9.92188Z" fill="currentColor" fillOpacity="0.9" />
                  </>}
                  {idx === 6 && <path d="M16 7.49851V8.46742C15.9912 8.51752 15.9804 8.56761 15.9733 8.61771C15.9299 8.93163 15.9024 9.2489 15.8423 9.55991C15.2206 12.7806 12.6152 15.3266 9.38017 15.8773C9.08934 15.9269 8.79559 15.9595 8.50309 16H7.50333C7.46912 15.9912 7.4349 15.9766 7.40027 15.9745C6.60581 15.9186 5.84139 15.7353 5.09783 15.4519C1.69424 14.154 -0.441297 10.5372 0.0773575 6.9316C0.351915 5.02299 1.17725 3.38907 2.61263 2.09829C4.51909 0.382968 6.76478 -0.278283 9.29797 0.105777C10.8214 0.33663 12.162 0.992454 13.3099 2.0219C14.6894 3.25882 15.5514 4.79214 15.8769 6.6206C15.9286 6.91156 15.9595 7.20587 16 7.49851ZM7.34227 9.09402C7.34227 9.18795 7.3381 9.28188 7.34311 9.37497C7.36063 9.69934 7.61558 9.964 7.9377 9.99615C8.26275 10.0287 8.57945 9.80829 8.64871 9.48977C8.67041 9.38958 8.67166 9.28188 8.6654 9.17877C8.64245 8.7993 8.80852 8.56511 9.15443 8.39687C10.0353 7.96898 10.5477 7.24762 10.6503 6.2762C10.8577 4.31457 8.96458 2.83886 7.10235 3.4926C6.0471 3.8633 5.31564 4.90861 5.34151 6.00986C5.34985 6.36595 5.62107 6.64648 5.9699 6.65984C6.33375 6.67361 6.63251 6.41646 6.66381 6.06204C6.67132 5.97897 6.67591 5.89589 6.68676 5.81324C6.7869 5.02717 7.57427 4.4995 8.33618 4.70656C8.89698 4.85893 9.27711 5.31939 9.33135 5.91301C9.38017 6.4486 9.06597 6.97293 8.54148 7.21672C7.74159 7.58826 7.34853 8.21695 7.34227 9.09402ZM8.66582 11.9966C8.66332 11.6238 8.3729 11.3358 8.00071 11.3366C7.62976 11.3374 7.34019 11.6297 7.34144 12.002C7.34311 12.374 7.6331 12.662 8.00655 12.662C8.37666 12.662 8.66832 12.3673 8.66582 11.9966Z" fill="currentColor" fillOpacity="0.9" />}
                </svg>

                {/* Text link */}
                <a className={`hero-navigation-link ${activeSection === link.sectionId ? "w--current" : "is-text-link"}`} data-button-hover="" data-link-id={link.id} href={link.href} style={{ overflow: "hidden", pointerEvents: "auto" }}>
                  <div className="nav-link-mask-inner">
                    {idx === 0 ? (
                      "Home"
                    ) : (
                      <>
                        <span>{link.label}</span>
                        <span className="clone-text">{link.label}</span>
                      </>
                    )}
                  </div>
                </a>
              </div>
            ))}

            {/* Menu backdrop */}
            <div className="nav-menu-bg" data-tl-desktop="" data-tl-end="35% top" data-tl-from="{'scale' : 0.5, 'opacity' : 0}" data-tl-start="31% top" data-tl-to="{'scale' : 1, 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll"></div>
          </nav>
        </div>

        {/* Marquee Row loops - Duplicate row is rendered to enable infinite loop marquee effect */}
        <div className="nav-comapny-wrap" data-tl-desktop="" data-tl-end="35% top" data-tl-from="{'opacity' : 0}" data-tl-start="30% top" data-tl-to="{ 'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll">
          <div className="nav-comapny-item">

            {/* 1. 1910 */}
            <svg className="_1910" fill="none" viewBox="0 0 51 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3853_7543)">
                <mask height="18" id="mask0_3853_7543" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="51" x="0" y="0">
                  <path d="M51 0H0V18H51V0Z" fill="white"></path>
                </mask>
                <g mask="url(#mask0_3853_7543)">
                  <path d="M49.1205 4.28529V5.10911H48.8187V4.28529H48.5V4.03125H49.4383V4.28529H49.1196H49.1205Z" fill="currentColor"></path>
                  <path d="M50.6233 5.10911V4.5929C50.6233 4.4606 50.6266 4.32912 50.6323 4.19764H50.6289C50.5992 4.34292 50.5685 4.47359 50.5383 4.58803L50.4042 5.10911H50.0391L49.905 4.58803C49.8748 4.47278 49.8441 4.34292 49.8144 4.19764H49.8111C49.8167 4.32912 49.82 4.4606 49.82 4.5929V5.10911H49.5391V4.03125H50.0188L50.1378 4.49469C50.1718 4.62212 50.1997 4.75441 50.2195 4.89159H50.2228C50.2408 4.7682 50.2682 4.63592 50.3045 4.49469L50.4235 4.03125H50.9033V5.10911H50.6228H50.6233Z" fill="currentColor"></path>
                  <path d="M30.1542 13.3451C29.5959 12.8435 29.2827 12.1496 29.2148 11.2632H30.9625C31.0304 11.721 31.1907 12.0668 31.4431 12.3005C31.6956 12.5343 32.0305 12.6511 32.448 12.6511C33.0888 12.6511 33.5201 12.376 33.9036 11.8257C34.2871 11.2754 34.4126 10.4403 34.4417 9.32019H34.4126C33.8203 10.0799 33.0435 10.4597 32.0823 10.4597C31.4609 10.4597 30.9099 10.3234 30.4292 10.0507C29.9486 9.77796 29.5773 9.39812 29.3151 8.91117C29.053 8.42418 28.9219 7.86414 28.9219 7.23106C28.9219 6.55905 29.0699 5.96495 29.3661 5.44873C29.6622 4.93256 30.0773 4.53079 30.6113 4.24348C31.1453 3.95616 31.757 3.8125 32.4464 3.8125C33.6115 3.8125 34.5048 4.21669 35.1262 5.02507C35.7476 5.83346 36.0583 7.0314 36.0583 8.61895C36.0583 10.3818 35.8042 11.7356 35.1343 12.6804C34.4643 13.6251 33.5937 14.0974 32.3606 14.0974C31.4479 14.0974 30.7124 13.8467 30.1542 13.3451ZM33.6698 8.56055C33.9902 8.20017 34.1504 7.73264 34.1504 7.15802C34.1504 6.58339 33.9975 6.12321 33.6916 5.77747C33.3858 5.43168 32.9707 5.25883 32.4464 5.25883C31.9221 5.25883 31.49 5.43168 31.1793 5.77747C30.8686 6.12321 30.7132 6.59315 30.7132 7.18725C30.7132 7.78139 30.8662 8.23669 31.1721 8.58243C31.4779 8.92817 31.8929 9.10107 32.4172 9.10107C32.9416 9.10107 33.3494 8.92088 33.6698 8.56055Z" fill="currentColor"></path>
                  <path d="M48.0179 5.14193C48.6587 6.02824 48.9794 7.29927 48.9794 8.95498C48.9794 10.6107 48.6587 11.8817 48.0179 12.768C47.3771 13.6543 46.4547 14.0974 45.2508 14.0974C44.0468 14.0974 43.122 13.6543 42.4763 12.768C41.8306 11.8817 41.5078 10.6107 41.5078 8.95498C41.5078 7.29927 41.8306 6.02824 42.4763 5.14193C43.122 4.25565 44.0468 3.8125 45.2508 3.8125C46.4547 3.8125 47.3771 4.25565 48.0179 5.14193ZM43.8017 6.23036C43.4667 6.85856 43.2992 7.76675 43.2992 8.95498C43.2992 10.1432 43.4667 11.0563 43.8017 11.6942C44.1366 12.3322 44.6197 12.6511 45.2508 12.6511C45.8819 12.6511 46.3504 12.3322 46.6853 11.6942C47.0203 11.0563 47.1878 10.1432 47.1878 8.95498C47.1878 7.76675 47.0203 6.85856 46.6853 6.23036C46.3504 5.60216 45.8722 5.28806 45.2508 5.28806C44.6294 5.28806 44.1366 5.60216 43.8017 6.23036Z" fill="currentColor"></path>
                  <path d="M26.2318 4.03125V5.61557H23.9453V6.95311H26.2318V13.8779H27.9504V4.03125H26.2318Z" fill="currentColor"></path>
                  <path d="M38.8178 4.03125V5.61557H36.5312V6.95311H38.8178V13.8779H40.5364V4.03125H38.8178Z" fill="currentColor"></path>
                  <mask height="18" id="mask1_3853_7543" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="21" x="0" y="0">
                    <path d="M19.2405 0H0.944441C0.422841 0 0 0.424151 0 0.947368V16.9623C0 17.4856 0.422841 17.9097 0.944441 17.9097H19.2405C19.7621 17.9097 20.1849 17.4856 20.1849 16.9623V0.947368C20.1849 0.424151 19.7621 0 19.2405 0Z" fill="white"></path>
                  </mask>
                  <g mask="url(#mask1_3853_7543)">
                    <path d="M20.3055 16.5789C20.3055 17.3638 19.6712 18 18.8888 18H1.41666C0.634258 18 0 17.3638 0 16.5789V1.42105C0 0.636229 0.634263 0 1.41666 0H18.8888C19.6712 0 20.3055 0.636229 20.3055 1.42105V16.5789ZM15.1051 2.96238C13.7305 2.96238 12.6162 5.64503 12.6162 8.95419C12.6162 12.2633 13.7305 14.946 15.1051 14.946C16.4796 14.9459 17.5939 12.2633 17.5939 8.95419C17.5939 5.64508 16.4796 2.96248 15.1051 2.96238ZM7.77364 4.49491C7.61597 4.40182 7.41688 4.51591 7.41674 4.69937V13.209C7.41683 13.3925 7.61597 13.5066 7.77364 13.4135L11.1382 11.4267C11.2826 11.3414 11.3711 11.1859 11.3711 11.0178V6.89063C11.3711 6.72257 11.2826 6.56701 11.1382 6.4817L7.77364 4.49491ZM2.82732 6.57653C2.69667 6.57653 2.59076 6.68325 2.59076 6.81427V11.0941C2.59076 11.2252 2.69667 11.3314 2.82732 11.3314H5.90922C6.03989 11.3314 6.14576 11.2252 6.14576 11.0941V6.81427C6.14576 6.68321 6.03989 6.57653 5.90922 6.57653H2.82732Z" fill="currentColor"></path>
                  </g>
                </g>
              </g>
            </svg>

            {/* 2. Alosant */}
            <svg className="alosant" fill="none" viewBox="0 0 71 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3908_13207)">
                <path d="M6.4757 11.1421C3.83528 11.8986 2.0226 12.6552 2.0226 14.8057C2.0226 16.1052 2.61286 16.8128 3.76543 16.8128C4.94243 16.8128 5.74576 16.1508 6.38142 15.3731L6.4757 11.1421ZM10.4328 14.5186C10.2442 16.6937 9.55968 17.4257 8.40713 17.4257C7.43965 17.4257 6.77959 16.9039 6.4757 15.8425H6.40587C5.53271 16.9073 4.14262 17.4747 2.92021 17.4747C1.29264 17.4747 0.234375 16.5991 0.234375 15.0895C0.234375 13.1526 1.36599 12.5361 2.543 12.0878C3.88767 11.5694 5.44187 11.1421 6.45473 10.5746V8.96695C6.45473 7.71652 5.84352 6.60265 4.19152 6.60265C3.29741 6.60265 2.82591 7.10002 2.63731 7.38375C2.66176 7.80761 2.80146 8.58871 2.80146 8.99144C2.80146 9.48881 2.32995 9.88817 1.6454 9.88817C1.05514 9.88817 0.845586 9.32074 0.845586 8.77776C0.845586 7.38375 2.63731 6.27344 4.38013 6.27344C6.57002 6.27344 8.15219 6.77081 8.15219 9.7725C8.15219 11.8286 8.03342 14.2874 8.03342 15.065C8.03342 15.8671 8.29189 16.4836 9.04627 16.4836C9.73084 16.4836 10.0138 15.8215 10.129 14.5221H10.4328V14.5186Z" fill="currentColor"></path>
                <path d="M16.1359 17.2411H11.1414V17.0028C11.5675 16.9784 11.847 16.9784 12.1788 16.8627C12.6258 16.7227 12.8144 16.2954 12.8144 15.777V2.72277C12.8144 2.13086 12.5559 1.63695 12.1788 1.37425C11.8958 1.18517 10.9773 0.950497 10.5547 0.925927V0.687797L14.3023 0.453125L14.4664 0.617734V15.6333C14.4664 16.1517 14.6794 16.5545 15.102 16.7437C15.4548 16.9083 15.7133 16.9818 16.1394 17.0028V17.2411H16.1359Z" fill="currentColor"></path>
                <path d="M26.2253 11.804C26.2253 9.25068 25.3522 6.6062 22.8794 6.6062C20.218 6.6062 19.488 9.44328 19.488 11.7586C19.488 14.6411 20.4765 17.2156 22.8794 17.2156C25.1427 17.2156 26.2253 14.7077 26.2253 11.804ZM28.0415 11.7795C28.0415 14.8758 26.0856 17.5448 22.7152 17.5448C20.0748 17.5448 17.6719 15.3942 17.6719 11.9686C17.6719 8.61315 19.7709 6.27344 22.9248 6.27344C26.0367 6.27344 28.0415 8.68321 28.0415 11.7795Z" fill="currentColor"></path>
                <path d="M37.1855 14.2849C37.1855 16.2709 35.5369 17.5459 33.4867 17.5459C32.2853 17.5459 31.2969 17.0485 30.6367 16.6001L30.1896 17.3322H29.9312L29.8125 13.7875H30.0954C30.5425 15.7035 31.7928 17.143 33.5845 17.143C35.4461 17.143 36.1761 16.1973 36.1761 14.8734C36.1761 13.6195 35.233 13.1711 33.3261 12.5827C31.4401 11.9908 30.0989 11.2587 30.0989 9.27627C30.0989 7.54946 31.3493 6.27449 33.3506 6.27449C34.3879 6.27449 35.2366 6.60725 35.8024 6.98203L36.2494 6.25H36.5078L36.672 9.39181H36.3891C36.0364 7.87867 34.8104 6.62824 33.2317 6.62824C31.7719 6.62824 31.1117 7.45486 31.1117 8.54069C31.1117 9.95928 32.0059 10.1939 33.9862 10.8313C35.9351 11.4724 37.1855 12.3234 37.1855 14.2849Z" fill="currentColor"></path>
                <path d="M45.3819 11.1421C42.7415 11.8986 40.9288 12.6552 40.9288 14.8057C40.9288 16.1052 41.5191 16.8128 42.6716 16.8128C43.8486 16.8128 44.652 16.1508 45.2876 15.3731L45.3819 11.1421ZM49.3425 14.5186C49.154 16.6937 48.4694 17.4257 47.3169 17.4257C46.3494 17.4257 45.6893 16.9039 45.3854 15.8425H45.3156C44.4424 16.9073 43.0523 17.4747 41.8264 17.4747C40.1989 17.4747 39.1406 16.5991 39.1406 15.0895C39.1406 13.1526 40.2722 12.5361 41.4492 12.0878C42.7939 11.5694 44.3481 11.1421 45.361 10.5746V8.96695C45.361 7.71652 44.7497 6.60265 43.0978 6.60265C42.2036 6.60265 41.7321 7.10002 41.5436 7.38375C41.5679 7.80761 41.7076 8.58871 41.7076 8.99144C41.7076 9.48881 41.2362 9.88817 40.5516 9.88817C39.9613 9.88817 39.7518 9.32074 39.7518 8.77776C39.7518 7.38375 41.5436 6.27344 43.2863 6.27344C45.4762 6.27344 47.055 6.77081 47.055 9.7725C47.055 11.8286 46.9362 14.2874 46.9362 15.065C46.9362 15.8671 47.1947 16.4836 47.9489 16.4836C48.6335 16.4836 48.9165 15.8215 49.0317 14.5221H49.3425V14.5186Z" fill="currentColor"></path>
                <path d="M62.2532 17.2374H56.9968V16.9537C57.4685 16.9291 57.8456 16.9081 58.1982 16.8136C58.6943 16.6735 58.9284 16.2461 58.9284 15.7277V9.6788C58.9284 8.02564 57.8456 7.10442 56.7349 7.10442C54.8734 7.10442 53.8117 8.28479 53.5287 8.83119V15.6122C53.5287 16.1306 53.7873 16.5088 54.234 16.698C54.6115 16.8626 55.0131 16.9362 55.4358 16.9572V17.2409H50.2034V16.9572C50.6261 16.9327 50.9092 16.9327 51.2411 16.817C51.6878 16.677 51.9008 16.2497 51.9008 15.7313V8.57194C51.9008 8.07457 51.6427 7.58075 51.2656 7.32151C50.9825 7.13241 50.5354 6.96781 50.1094 6.94327V6.7051L53.3613 6.4459L53.5249 6.61051V8.21824H53.5705C54.4648 7.34254 55.3624 6.28125 57.388 6.28125C59.5778 6.28125 60.5699 7.76994 60.5699 10.015V15.6402C60.5699 16.1586 60.7829 16.5369 61.2056 16.7261C61.5371 16.8661 61.8201 16.9397 62.2429 16.9607V17.2374H62.2532Z" fill="currentColor"></path>
                <path d="M70.7682 14.4279C70.5307 16.0601 69.7794 17.4296 67.9879 17.4296C66.2204 17.4296 65.3473 16.3193 65.3473 14.2387V7.2931H63.0391V6.63113H65.3962V2.92188H66.9751V6.63113H70.2021V7.2931H66.9958V14.0986C66.9958 15.6327 67.3033 16.5574 68.6443 16.5574C69.5875 16.5574 70.1532 15.8009 70.3873 14.4314H70.7682V14.4279Z" fill="currentColor"></path>
              </g>
            </svg>

            {/* 3. Happy Ring */}
            <div className="happy-ring-wrap">
              <img alt="Happy Ring" className="happy-ring" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69206dcc9ccb58439ffc32dc_happyring.svg" />
              <img alt="Happy Ring" className="happy-ring-white" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694c7edad5fcbae840a6a5aa_semi-white.svg" />
            </div>

            {/* 4. SemiconBio */}
            <div className="semiconbio-wrap">
              <img alt="SemiconBio" className="semiconbio" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69206e2857c9f02ac3669c72_semiconBio.svg" />
              <img alt="SemiconBio" className="semiconbio-white" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/694c7edad5fcbae840a6a5aa_semi-white.svg" />
            </div>

            {/* 5. Curri */}
            <svg className="curri" fill="none" viewBox="0 0 101 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.7725 4.03125V13.8779H6.06456V4.03125H7.7725Z" fill="currentColor"></path>
              <path d="M12.4419 13.8779C11.5309 13.8779 10.8222 13.626 10.3159 13.1221C9.80958 12.6074 9.55642 11.9056 9.55642 11.0167V4.03125H11.2644V11.0167C11.2644 11.4552 11.3789 11.7946 11.6079 12.0348C11.8369 12.275 12.1868 12.3951 12.6577 12.3951C13.2082 12.3951 13.5937 12.2536 13.814 11.9708V4.03125H15.522V13.8779H13.814V13.1202C13.4862 13.6251 13.0286 13.8779 12.4419 13.8779Z" fill="currentColor"></path>
              <path d="M18.8998 12.6105V9.4589H20.478C21.3213 9.4589 21.9961 9.29742 22.5024 8.97446C23.0195 8.6515 23.2781 8.16335 23.2781 7.51001C23.2781 6.84589 23.0195 6.35339 22.5024 6.03251C21.9961 5.70087 21.3213 5.53505 20.478 5.53505H18.8998V12.6105ZM18.8998 4.03125H20.478C21.7828 4.03125 22.8222 4.31688 23.5962 4.88816C24.3702 5.45944 24.7572 6.31291 24.7572 7.44857C24.7572 8.01211 24.6186 8.52223 24.3414 8.97893C24.0642 9.43563 23.6894 9.79979 23.217 10.0714V10.1037C23.8211 10.3704 24.3101 10.7483 24.6841 11.2374C25.0689 11.7157 25.2613 12.3592 25.2613 13.1679C25.2613 14.3986 24.8452 15.3409 24.0131 15.9949C23.181 16.6381 22.0039 16.9597 20.4818 16.9597H17.1912V4.03125H18.8998V4.03125ZM20.4818 15.4565C21.3468 15.4565 22.0128 15.2891 22.4798 14.9542C22.9576 14.6086 23.1965 14.0739 23.1965 13.3499C23.1965 12.6965 22.9463 12.1866 22.4459 11.8202C21.9563 11.4538 21.3015 11.2706 20.4818 11.2706H18.8998V15.4565H20.4818Z" fill="currentColor"></path>
              <path d="M28.0062 13.8779V4.03125H29.7141V13.8779H28.0062Z" fill="currentColor"></path>
              <path d="M32.2223 13.8779V4.03125H33.9302V13.8779H32.2223Z" fill="currentColor"></path>
              <path d="M43.0805 13.8779C42.1695 13.8779 41.4608 13.626 40.9545 13.1221C40.4482 12.6074 40.195 11.9056 40.195 11.0167V4.03125H41.903V11.0167C41.903 11.4552 42.0175 11.7946 42.2465 12.0348C42.4755 12.7946 42.8254 12.3951 43.2963 12.3951C43.8468 12.3951 44.2323 12.2536 44.4526 11.9708V4.03125H46.1605V13.8779H44.4526V13.1202C44.1248 13.6251 43.6672 13.8779 43.0805 13.8779Z" fill="currentColor"></path>
              <path d="M51.1554 12.6105V9.4589H52.7336C53.577 9.4589 54.2518 9.29742 54.758 8.97446C55.2751 8.6515 55.5337 8.16335 55.5337 7.51001C55.5337 6.84589 55.2751 6.35339 54.758 6.03251C54.2518 5.70087 53.577 5.53505 52.7336 5.53505H51.1554V12.6105ZM51.1554 4.03125H52.7336C54.0384 4.03125 55.0778 4.31688 55.8518 4.88816C56.6258 5.45944 57.0128 6.31291 57.0128 7.44857C57.0128 8.01211 56.8742 8.52223 56.597 8.97893C56.3198 9.43563 55.945 9.79979 55.4727 10.0714V10.1037C56.0768 10.3704 56.5658 10.7483 56.9398 11.2374C57.3246 11.7157 57.517 12.3592 57.517 13.1679C57.517 14.3986 57.1009 15.3409 56.2687 15.9949C55.4366 16.6381 54.2595 16.9597 52.7374 16.9597H49.4468V4.03125H51.1554V4.03125ZM52.7374 15.4565C53.6025 15.4565 54.2684 15.2891 54.7354 14.9542C55.2132 14.6086 55.4522 14.0739 55.4522 13.3499C55.4522 12.6965 55.202 12.1866 54.7015 11.8202C54.212 11.4538 53.5572 11.2706 52.7374 11.2706H51.1554V15.4565H52.7374Z" fill="currentColor"></path>
              <path d="M63.8569 13.8779V4.03125H65.5649V13.8779H63.8569Z" fill="currentColor"></path>
              <path d="M69.043 13.8779C68.132 13.8779 67.4233 13.626 66.9171 13.1221C66.4108 12.6074 66.1576 11.9056 66.1576 11.0167V4.03125H67.8655V11.0167C67.8655 11.4552 67.9801 11.7946 68.2091 12.0348C68.4381 12.275 68.7879 12.3951 69.2589 12.3951C69.8094 12.3951 70.1949 12.2536 70.4152 11.9708V4.03125H72.1231V13.8779H70.4152V13.1202C70.0874 13.6251 69.6298 13.8779 69.043 13.8779Z" fill="currentColor"></path>
              <path d="M78.7495 13.8779C77.8385 13.8779 77.1298 13.626 76.6235 13.1221C76.1172 12.6074 75.864 11.9056 75.864 11.0167V4.03125H77.5719V11.0167C77.5719 11.4552 77.6865 11.7946 77.9154 12.0348C78.1444 12.275 78.4943 12.3951 78.9652 12.3951C79.5157 12.3951 79.9012 12.2536 80.1215 11.9708V4.03125H81.8294V13.8779H80.1215V13.1202C79.7937 13.6251 79.3361 13.8779 78.7495 13.8779Z" fill="currentColor"></path>
              <path d="M83.2505 13.8779V4.03125H84.9584V13.8779H83.2505Z" fill="currentColor"></path>
              <path d="M88.756 12.6105V9.4589H90.3342C91.1775 9.4589 91.8523 9.29742 92.3586 8.97446C92.8757 8.6515 93.1343 8.16335 93.1343 7.51001C93.1343 6.84589 92.8757 6.35339 92.3586 6.03251C91.8523 5.70087 91.1775 5.53505 90.3342 5.53505H88.756V12.6105ZM88.756 4.03125H90.3342C91.639 4.03125 92.6784 4.31688 93.4524 4.88816C94.2264 5.45944 94.6134 6.31291 94.6134 7.44857C94.6134 8.01211 94.4748 8.52223 94.1976 8.97893C93.9204 9.43563 93.5456 9.79979 93.0732 10.0714V10.1037C93.6773 10.3704 94.1663 10.7483 94.5403 11.2374C94.9251 11.7157 95.1175 12.3592 95.1175 13.1679C95.1175 14.3986 94.7014 15.3409 93.8693 15.9949C93.0371 16.6381 91.8601 16.9597 90.3379 16.9597H87.0474V4.03125H88.756V4.03125ZM90.3379 15.4565C91.203 15.4565 91.8689 15.2891 92.3359 14.9542C92.8137 14.0739 93.0527 13.3499 93.0527 13.3499C93.0527 12.6965 92.8025 12.1866 92.3021 11.8202C91.8126 11.4538 91.1577 11.2706 90.3379 11.2706H88.756V15.4565H90.3379Z" fill="currentColor"></path>
              <path d="M100.548 13.8779C99.637 13.8779 98.9284 13.626 98.4221 13.1221C97.9158 12.6074 97.6626 11.9056 97.6626 11.0167V4.03125H99.3705V11.0167C99.3705 11.4552 99.4851 11.7946 99.7141 12.0348C99.9431 12.275 100.293 12.3951 100.764 12.3951C101.314 12.3951 101.7 12.2536 101.92 11.9708V4.03125H103.628V13.8779H101.92V13.1202C101.592 13.6251 101.135 13.8779 100.548 13.8779Z" fill="currentColor"></path>
            </svg>

            {/* 6. Omicron */}
            <svg className="omicron" fill="none" viewBox="0 0 102 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1562 8.95498C10.1562 10.6107 9.83547 11.8817 9.1947 12.768C8.55393 13.6543 7.63158 14.0974 6.42767 14.0974C5.22376 14.0974 4.29883 13.6543 3.65317 12.768C3.0075 11.8817 2.68471 10.6107 2.68471 8.95498C2.68471 7.29927 3.0075 6.02824 3.65317 5.14193C4.29883 4.25565 5.22376 3.8125 6.42767 3.8125C7.63158 3.8125 8.55393 4.25565 9.1947 5.14193C9.83547 6.02824 10.1562 7.29927 10.1562 8.95498ZM14.1979 8.95498C14.1979 5.64722 13.2094 3.14811 11.2323 1.45763C9.91422 0.485558 8.31269 0 6.42767 0C4.54266 0 2.94112 0.485558 1.62305 1.45763C0.541016 2.3814 0 3.80521 0 5.72906V12.1809C0 14.1047 0.541016 15.5286 1.62305 16.4523C2.94112 17.4244 4.54266 17.9099 6.42767 17.9099C8.31269 17.9099 9.91422 17.4244 11.2323 16.4523C12.3143 15.5286 12.8553 14.1047 12.8553 12.1809V11.2632C13.2094 11.0883 13.5186 10.8543 13.783 10.5614C14.0592 10.091 14.1972 9.55554 14.1979 8.95498Z" fill="currentColor"></path>
              <path d="M22.5694 17.2374H17.313V16.9537C17.7847 16.9291 18.1618 16.9081 18.5144 16.8136C19.0105 16.6735 19.2446 16.2461 19.2446 15.7277V9.6788C19.2446 8.02564 18.1618 7.10442 17.0511 7.10442C15.1896 7.10442 14.1279 8.28479 13.8449 8.83119V15.6122C13.8449 16.1306 14.1035 16.5088 14.5502 16.698C14.9277 16.8626 15.3293 16.9362 15.752 16.9572V17.2409H10.5196V16.9572C10.9423 16.9327 11.2254 16.9327 11.5573 16.817C12.004 16.677 12.217 16.2497 12.217 15.7313V8.57194C12.217 8.07457 11.9589 7.58075 11.5818 7.32151C11.2987 7.13241 10.8516 6.96781 10.4256 6.94327V6.7051L13.6775 6.4459L13.8411 6.61051V8.21824H13.8867C14.781 7.34254 15.6786 6.28125 17.7042 6.28125C19.894 6.28125 20.8861 7.76994 20.8861 10.015V15.6402C20.8861 16.1586 21.0991 16.5369 21.5218 16.7261C21.8533 16.8661 22.1363 16.9397 22.5591 16.9607V17.2374H22.5694Z" fill="currentColor"></path>
              <path d="M29.5638 12.768C28.923 13.6543 28.0006 14.0974 26.7967 14.0974C25.5928 14.0974 24.6679 13.6543 24.0222 12.768C23.3766 11.8817 23.0538 10.6107 23.0538 8.95498C23.0538 7.29927 23.3766 6.02824 24.0222 5.14193C24.6679 4.25565 25.5928 3.8125 26.7967 3.8125C28.0006 3.8125 28.923 4.25565 29.5638 5.14193C30.2045 6.02824 30.5253 7.29927 30.5253 8.95498C30.5253 10.6107 30.2045 11.8817 29.5638 12.768ZM26.7967 17.9099C28.6817 17.9099 30.2833 17.4244 31.6013 16.4523C32.6834 15.5286 33.2244 14.1047 33.2244 12.1809V5.72906C33.2244 3.80521 32.6834 2.3814 31.6013 1.45763C30.2833 0.485558 28.6817 0 26.7967 0C24.9117 0 23.3102 0.485558 21.9921 1.45763C20.9101 2.3814 20.3691 3.80521 20.3691 5.72906V12.1809C20.3691 14.1047 20.9101 15.5286 21.9921 16.4523C23.3102 17.4244 24.9117 17.9099 26.7967 17.9099Z" fill="currentColor"></path>
              <path d="M38.9381 12.768C38.2974 13.6543 37.375 14.0974 36.1711 14.0974C34.9672 14.0974 34.0423 13.6543 33.3966 12.768C32.751 11.8817 32.4282 10.6107 32.4282 8.95498C32.4282 7.29927 32.751 6.02824 33.3966 5.14193C34.0423 4.25565 34.9672 3.8125 36.1711 3.8125C37.375 3.8125 38.2974 4.25565 38.9381 5.14193C39.5788 6.02824 39.8996 7.29927 39.8996 8.95498C39.8996 10.6107 39.5788 11.8817 38.9381 12.768ZM36.1711 17.9099C38.0561 17.9099 39.6577 17.4244 40.9757 16.4523C42.0578 15.5286 42.5988 14.1047 42.5988 12.1809V5.72906C42.5988 3.80521 42.0578 2.3814 40.9757 1.45763C39.6577 0.485558 38.0561 0 36.1711 0C34.2861 0 32.6846 0.485558 31.3665 1.45763C30.2845 2.3814 29.7435 3.80521 29.7435 5.72906V12.1809C29.7435 14.1047 30.2845 15.5286 31.3665 16.4523C32.6846 17.4244 34.2861 17.9099 36.1711 17.9099Z" fill="currentColor"></path>
              <path d="M51.9409 17.2374H46.6845V16.9537C47.1562 16.9291 47.5333 16.9081 47.8859 16.8136C48.382 16.6735 48.6161 16.2461 48.6161 15.7277V9.6788C48.6161 8.02564 47.5333 7.10442 46.4226 7.10442C44.5611 7.10442 43.4994 8.28479 43.2164 8.83119V15.6122C43.2164 16.1306 43.475 16.5088 43.9217 16.698C44.2992 16.8626 44.7008 16.9362 45.1235 16.9572V17.2409H39.8911V16.9572C40.3138 16.9327 40.5969 16.9327 40.9288 16.817C41.3755 16.677 41.5885 16.2497 41.5885 15.7313V8.57194C41.5885 8.07457 41.3304 7.58075 40.9533 7.32151C40.6702 7.13241 40.2231 6.96781 39.7971 6.94327V6.7051L43.049 6.4459L43.2126 6.61051V8.21824H43.2582C44.1525 7.34254 45.0501 6.28125 47.0757 6.28125C49.2655 6.28125 50.2576 7.76994 50.2576 10.015V15.6402C50.2576 16.1586 50.4706 16.5369 50.8933 16.7261C51.2248 16.8661 51.5078 16.9397 51.9306 16.9607V17.2374H51.9409Z" fill="currentColor"></path>
            </svg>

            {/* 7. Puck */}
            <svg className="puck" fill="none" viewBox="0 0 54 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4836 12.6122V9.6788H8.0618C8.90513 9.6788 9.58 9.51732 10.0863 9.19436C10.6034 8.8714 10.862 8.38325 10.862 7.72991C10.862 7.06579 10.6034 6.57329 10.0863 6.25241C9.58 5.92077 8.90513 5.75495 8.0618 5.75495H6.4836V12.6122ZM6.4836 4.03125H8.0618C9.3666 4.03125 10.406 4.31688 11.18 4.88816C11.954 5.45944 12.341 6.31291 12.341 7.44857C12.341 8.01211 12.2024 8.52223 11.9252 8.97893C11.648 9.43563 11.2732 9.79979 10.8008 10.0714V10.1037C11.405 10.3704 11.8939 10.7483 12.2679 11.2374C12.6528 11.7157 12.8451 12.3592 12.8451 13.1679C12.8451 14.3986 12.429 15.3409 11.5969 15.9949C10.7648 16.6381 9.5877 16.9597 8.06563 16.9597H4.775V4.03125H6.4836V4.03125ZM8.06563 15.4565C8.93067 15.4565 9.5966 15.2891 10.0636 14.9542C10.5414 14.6086 10.7803 14.0739 10.7803 13.3499C10.7803 12.6965 10.5301 12.1866 10.0297 11.8202C9.5401 11.4538 8.88537 11.2706 8.06563 11.2706H6.4836V15.4565H8.06563Z" fill="currentColor"></path>
              <path d="M16.5828 13.8779C15.6718 13.8779 14.9631 13.626 14.4569 13.1221C13.9506 12.6074 13.6974 11.9056 13.6974 11.0167V4.03125H15.4053V11.0167C15.4053 11.4552 15.5199 11.7946 15.7489 12.0348C15.9779 12.275 16.3277 12.3951 16.7986 12.3951C17.3491 12.3951 17.7346 12.2536 17.9549 11.9708V4.03125H19.6628V13.8779H17.9549V13.1202C17.6271 13.6251 17.1695 13.8779 16.5828 13.8779Z" fill="currentColor"></path>
              <path d="M23.9541 12.768C23.3134 13.6543 22.391 14.0974 21.1871 14.0974C19.9832 14.0974 19.0583 13.6543 18.4126 12.768C17.7669 11.8817 17.4441 10.6107 17.4441 8.95498C17.4441 7.29927 17.7669 6.02824 18.4126 5.14193C19.0583 4.25565 19.9832 3.8125 21.1871 3.8125C22.391 3.8125 23.3134 4.25565 23.9541 5.14193C24.5948 6.02824 24.9156 7.29927 24.9156 8.95498C24.9156 10.6107 24.5948 11.8817 23.9541 12.768ZM21.1871 17.9099C23.0721 17.9099 24.6737 17.4244 25.9917 16.4523C27.0738 15.5286 27.6148 14.1047 27.6148 12.1809V5.72906C27.6148 3.80521 27.0738 2.3814 25.9917 1.45763C24.6737 0.485558 23.0721 0 21.1871 0C19.3021 0 17.7006 0.485558 16.3825 1.45763C15.3005 2.3814 14.7595 3.80521 14.7595 5.72906V12.1809C14.7595 14.1047 15.3005 15.5286 16.3825 16.4523C17.7006 17.4244 19.3021 17.9099 21.1871 17.9099Z" fill="currentColor"></path>
              <path d="M33.9541 13.8779C33.4907 13.8779 33.1098 13.6841 32.8113 13.2962L30.9859 10.5966L29.9302 11.6527V13.8779H28.2223V4.03125H29.9302V10.1557L33.7259 6.2745H35.8821L32.2223 9.93297L36.0469 13.8779H33.9541Z" fill="currentColor"></path>
            </svg>

          </div>

          {/* SECOND identical marquee row (for seamless loop) */}
          <div className="nav-comapny-item">

            {/* 1. 1910 */}
            <svg className="_1910" fill="none" viewBox="0 0 51 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3853_7543)">
                <mask height="18" id="mask0_3853_7543" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="51" x="0" y="0">
                  <path d="M51 0H0V18H51V0Z" fill="white"></path>
                </mask>
                <g mask="url(#mask0_3853_7543)">
                  <path d="M49.1205 4.28529V5.10911H48.8187V4.28529H48.5V4.03125H49.4383V4.28529H49.1196H49.1205Z" fill="currentColor"></path>
                  <path d="M50.6233 5.10911V4.5929C50.6233 4.4606 50.6266 4.32912 50.6323 4.19764H50.6289C50.5992 4.34292 50.5685 4.47359 50.5383 4.58803L50.4042 5.10911H50.0391L49.905 4.58803C49.8748 4.47278 49.8441 4.34292 49.8144 4.19764H49.8111C49.8167 4.32912 49.82 4.4606 49.82 4.5929V5.10911H49.5391V4.03125H50.0188L50.1378 4.49469C50.1718 4.62212 50.1997 4.75441 50.2195 4.89159H50.2228C50.2408 4.7682 50.2682 4.63592 50.3045 4.49469L50.4235 4.03125H50.9033V5.10911H50.6228H50.6233Z" fill="currentColor"></path>
                  <path d="M30.1542 13.3451C29.5959 12.8435 29.2827 12.1496 29.2148 11.2632H30.9625C31.0304 11.721 31.1907 12.0668 31.4431 12.3005C31.6956 12.5343 32.0305 12.6511 32.448 12.6511C33.0888 12.6511 33.5201 12.376 33.9036 11.8257C34.2871 11.2754 34.4126 10.4403 34.4417 9.32019H34.4126C33.8203 10.0799 33.0435 10.4597 32.0823 10.4597C31.4609 10.4597 30.9099 10.3234 30.4292 10.0507C29.9486 9.77796 29.5773 9.39812 29.3151 8.91117C29.053 8.42418 28.9219 7.86414 28.9219 7.23106C28.9219 6.55905 29.0699 5.96495 29.3661 5.44873C29.6622 4.93256 30.0773 4.53079 30.6113 4.24348C31.1453 3.95616 31.757 3.8125 32.4464 3.8125C33.6115 3.8125 34.5048 4.21669 35.1262 5.02507C35.7476 5.83346 36.0583 7.0314 36.0583 8.61895C36.0583 10.3818 35.8042 11.7356 35.1343 12.6804C34.4643 13.6251 33.5937 14.0974 32.3606 14.0974C31.4479 14.0974 30.7124 13.8467 30.1542 13.3451ZM33.6698 8.56055C33.9902 8.20017 34.1504 7.73264 34.1504 7.15802C34.1504 6.58339 33.9975 6.12321 33.6916 5.77747C33.3858 5.43168 32.9707 5.25883 32.4464 5.25883C31.9221 5.25883 31.49 5.43168 31.1793 5.77747C30.8686 6.12321 30.7132 6.59315 30.7132 7.18725C30.7132 7.78139 30.8662 8.23669 31.1721 8.58243C31.4779 8.92817 31.8929 9.10107 32.4172 9.10107C32.9416 9.10107 33.3494 8.92088 33.6698 8.56055Z" fill="currentColor"></path>
                  <path d="M48.0179 5.14193C48.6587 6.02824 48.9794 7.29927 48.9794 8.95498C48.9794 10.6107 48.6587 11.8817 48.0179 12.768C47.3771 13.6543 46.4547 14.0974 45.2508 14.0974C44.0468 14.0974 43.122 13.6543 42.4763 12.768C41.8306 11.8817 41.5078 10.6107 41.5078 8.95498C41.5078 7.29927 41.8306 6.02824 42.4763 5.14193C43.122 4.25565 44.0468 3.8125 45.2508 3.8125C46.4547 3.8125 47.3771 4.25565 48.0179 5.14193ZM43.8017 6.23036C43.4667 6.85856 43.2992 7.76675 43.2992 8.95498C43.2992 10.1432 43.4667 11.0563 43.8017 11.6942C44.1366 12.3322 44.6197 12.6511 45.2508 12.6511C45.8819 12.6511 46.3504 12.3322 46.6853 11.6942C47.0203 11.0563 47.1878 10.1432 47.1878 8.95498C47.1878 7.76675 47.0203 6.85856 46.6853 6.23036C46.3504 5.60216 45.8722 5.28806 45.2508 5.28806C44.6294 5.28806 44.1366 5.60216 43.8017 6.23036Z" fill="currentColor"></path>
                  <path d="M26.2318 4.03125V5.61557H23.9453V6.95311H26.2318V13.8779H27.9504V4.03125H26.2318Z" fill="currentColor"></path>
                  <path d="M38.8178 4.03125V5.61557H36.5312V6.95311H38.8178V13.8779H40.5364V4.03125H38.8178Z" fill="currentColor"></path>
                  <mask height="18" id="mask2_3853_7543" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="21" x="0" y="0">
                    <path d="M19.2405 0H0.944441C0.422841 0 0 0.424151 0 0.947368V16.9623C0 17.4856 0.422841 17.9097 0.944441 17.9097H19.2405C19.7621 17.9097 20.1849 17.4856 20.1849 16.9623V0.947368C20.1849 0.424151 19.7621 0 19.2405 0Z" fill="white"></path>
                  </mask>
                  <g mask="url(#mask2_3853_7543)">
                    <path d="M20.3055 16.5789C20.3055 17.3638 19.6712 18 18.8888 18H1.41666C0.634258 18 0 17.3638 0 16.5789V1.42105C0 0.636229 0.634263 0 1.41666 0H18.8888C19.6712 0 20.3055 0.636229 20.3055 1.42105V16.5789ZM15.1051 2.96238C13.7305 2.96238 12.6162 5.64503 12.6162 8.95419C12.6162 12.2633 13.7305 14.946 15.1051 14.946C16.4796 14.9459 17.5939 12.2633 17.5939 8.95419C17.5939 5.64508 16.4796 2.96248 15.1051 2.96238ZM7.77364 4.49491C7.61597 4.40182 7.41688 4.51591 7.41674 4.69937V13.209C7.41683 13.3925 7.61597 13.5066 7.77364 13.4135L11.1382 11.4267C11.2826 11.3414 11.3711 11.1859 11.3711 11.0178V6.89063C11.3711 6.72257 11.2826 6.56701 11.1382 6.4817L7.77364 4.49491ZM2.82732 6.57653C2.69667 6.57653 2.59076 6.68325 2.59076 6.81427V11.0941C2.59076 11.2252 2.69667 11.3314 2.82732 11.3314H5.90922C6.03989 11.3314 6.14576 11.2252 6.14576 11.0941V6.81427C6.14576 6.68321 6.03989 6.57653 5.90922 6.57653H2.82732Z" fill="currentColor"></path>
                  </g>
                </g>
              </g>
            </svg>

            {/* 2. Alosant */}
            <svg className="alosant" fill="none" viewBox="0 0 71 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3908_13207)">
                <path d="M6.4757 11.1421C3.83528 11.8986 2.0226 12.6552 2.0226 14.8057C2.0226 16.1052 2.61286 16.8128 3.76543 16.8128C4.94243 16.8128 5.74576 16.1508 6.38142 15.3731L6.4757 11.1421ZM10.4328 14.5186C10.2442 16.6937 9.55968 17.4257 8.40713 17.4257C7.43965 17.4257 6.77959 16.9039 6.4757 15.8425H6.40587C5.53271 16.9073 4.14262 17.4747 2.92021 17.4747C1.29264 17.4747 0.234375 16.5991 0.234375 15.0895C0.234375 13.1526 1.36599 12.5361 2.543 12.0878C3.88767 11.5694 5.44187 11.1421 6.45473 10.5746V8.96695C6.45473 7.71652 5.84352 6.60265 4.19152 6.60265C3.29741 6.60265 2.82591 7.10002 2.63731 7.38375C2.66176 7.80761 2.80146 8.58871 2.80146 8.99144C2.80146 9.48881 2.32995 9.88817 1.6454 9.88817C1.05514 9.88817 0.845586 9.32074 0.845586 8.77776C0.845586 7.38375 2.63731 6.27344 4.38013 6.27344C6.57002 6.27344 8.15219 6.77081 8.15219 9.7725C8.15219 11.8286 8.03342 14.2874 8.03342 15.065C8.03342 15.8671 8.29189 16.4836 9.04627 16.4836C9.73084 16.4836 10.0138 15.8215 10.129 14.5221H10.4328V14.5186Z" fill="currentColor"></path>
                <path d="M16.1359 17.2411H11.1414V17.0028C11.5675 16.9784 11.847 16.9784 12.1788 16.8627C12.6258 16.7227 12.8144 16.2954 12.8144 15.777V2.72277C12.8144 2.13086 12.5559 1.63695 12.1788 1.37425C11.8958 1.18517 10.9773 0.950497 10.5547 0.925927V0.687797L14.3023 0.453125L14.4664 0.617734V15.6333C14.4664 16.1517 14.6794 16.5545 15.102 16.7437C15.4548 16.9083 15.7133 16.9818 16.1394 17.0028V17.2411H16.1359Z" fill="currentColor"></path>
                <path d="M26.2253 11.804C26.2253 9.25068 25.3522 6.6062 22.8794 6.6062C20.218 6.6062 19.488 9.44328 19.488 11.7586C19.488 14.6411 20.4765 17.2156 22.8794 17.2156C25.1427 17.2156 26.2253 14.7077 26.2253 11.804ZM28.0415 11.7795C28.0415 14.8758 26.0856 17.5448 22.7152 17.5448C20.0748 17.5448 17.6719 15.3942 17.6719 11.9686C17.6719 8.61315 19.7709 6.27344 22.9248 6.27344C26.0367 6.27344 28.0415 8.68321 28.0415 11.7795Z" fill="currentColor"></path>
                <path d="M37.1855 14.2849C37.1855 16.2709 35.5369 17.5459 33.4867 17.5459C32.2853 17.5459 31.2969 17.0485 30.6367 16.6001L30.1896 17.3322H29.9312L29.8125 13.7875H30.0954C30.5425 15.7035 31.7928 17.143 33.5845 17.143C35.4461 17.143 36.1761 16.1973 36.1761 14.8734C36.1761 13.6195 35.233 13.1711 33.3261 12.5827C31.4401 11.9908 30.0989 11.2587 30.0989 9.27627C30.0989 7.54946 31.3493 6.27449 33.3506 6.27449C34.3879 6.27449 35.2366 6.60725 35.8024 6.98203L36.2494 6.25H36.5078L36.672 9.39181H36.3891C36.0364 7.87867 34.8104 6.62824 33.2317 6.62824C31.7719 6.62824 31.1117 7.45486 31.1117 8.54069C31.1117 9.95928 32.0059 10.1939 33.9862 10.8313C35.9351 11.4724 37.1855 12.3234 37.1855 14.2849Z" fill="currentColor"></path>
                <path d="M45.3819 11.1421C42.7415 11.8986 40.9288 12.6552 40.9288 14.8057C40.9288 16.1052 41.5191 16.8128 42.6716 16.8128C43.8486 16.8128 44.652 16.1508 45.2876 15.3731L45.3819 11.1421ZM49.3425 14.5186C49.154 16.6937 48.4694 17.4257 47.3169 17.4257C46.3494 17.4257 45.6893 16.9039 45.3854 15.8425H45.3156C44.4424 16.9073 43.0523 17.4747 41.8264 17.4747C40.1989 17.4747 39.1406 16.5991 39.1406 15.0895C39.1406 13.1526 40.2722 12.5361 41.4492 12.0878C42.7939 11.5694 44.3481 11.1421 45.361 10.5746V8.96695C45.361 7.71652 44.7497 6.60265 43.0978 6.60265C42.2036 6.60265 41.7321 7.10002 41.5436 7.38375C41.5679 7.80761 41.7076 8.58871 41.7076 8.99144C41.7076 9.48881 41.2362 9.88817 40.5516 9.88817C39.9613 9.88817 39.7518 9.32074 39.7518 8.77776C39.7518 7.38375 41.5436 6.27344 43.2863 6.27344C45.4762 6.27344 47.055 6.77081 47.055 9.7725C47.055 11.8286 46.9362 14.2874 46.9362 15.065C46.9362 15.8671 47.1947 16.4836 47.9489 16.4836C48.6335 16.4836 48.9165 15.8215 49.0317 14.5221H49.3425V14.5186Z" fill="currentColor"></path>
                <path d="M62.2532 17.2374H56.9968V16.9537C57.4685 16.9291 57.8456 16.9081 58.1982 16.8136C58.6943 16.6735 58.9284 16.2461 58.9284 15.7277V9.6788C58.9284 8.02564 57.8456 7.10442 56.7349 7.10442C54.8734 7.10442 53.8117 8.28479 53.5287 8.83119V15.6122C53.5287 16.1306 53.7873 16.5088 54.234 16.698C54.6115 16.8626 55.0131 16.9362 55.4358 16.9572V17.2409H50.2034V16.9572C50.6261 16.9327 50.9092 16.9327 51.2411 16.817C51.6878 16.677 51.9008 16.2497 51.9008 15.7313V8.57194C51.9008 8.07457 51.6427 7.58075 51.2656 7.32151C50.9825 7.13241 50.5354 6.96781 50.1094 6.94327V6.7051L53.3613 6.4459L53.5249 6.61051V8.21824H53.5705C54.4648 7.34254 55.3624 6.28125 57.388 6.28125C59.5778 6.28125 60.5699 7.76994 60.5699 10.015V15.6402C60.5699 16.1586 60.7829 16.5369 61.2056 16.7261C61.5371 16.8661 61.8201 16.9397 62.2429 16.9607V17.2374H62.2532Z" fill="currentColor"></path>
                <path d="M70.7682 14.4279C70.5307 16.0601 69.7794 17.4296 67.9879 17.4296C66.2204 17.4296 65.3473 16.3193 65.3473 14.2387V7.2931H63.0391V6.63113H65.3962V2.92188H66.9751V6.63113H70.2021V7.2931H66.9958V14.0986C66.9958 15.6327 67.3033 16.5574 68.6443 16.5574C69.5875 16.5574 70.1532 15.8009 70.3873 14.4314H70.7682V14.4279Z" fill="currentColor"></path>
              </g>
            </svg>

            {/* 3. Happy Ring */}
            <div className="happy-ring-wrap">
              <img alt="Happy Ring" className="happy-ring" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69206dcc9ccb58439ffc32dc_happyring.svg" />
              <img alt="Happy Ring" className="happy-ring-white" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694c7edad5fcbae840a6a5aa_semi-white.svg" />
            </div>

            {/* 4. SemiconBio */}
            <div className="semiconbio-wrap">
              <img alt="SemiconBio" className="semiconbio" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69206e2857c9f02ac3669c72_semiconBio.svg" />
              <img alt="SemiconBio" className="semiconbio-white" loading="lazy" src="/heynesh-assets/cdn.prod.website-files.com/694c7edad5fcbae840a6a5aa_semi-white.svg" />
            </div>

            {/* 5. Curri */}
            <svg className="curri" fill="none" viewBox="0 0 101 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.7725 4.03125V13.8779H6.06456V4.03125H7.7725Z" fill="currentColor"></path>
              <path d="M12.4419 13.8779C11.5309 13.8779 10.8222 13.626 10.3159 13.1221C9.80958 12.6074 9.55642 11.9056 9.55642 11.0167V4.03125H11.2644V11.0167C11.2644 11.4552 11.3789 11.7946 11.6079 12.0348C11.8369 12.275 12.1868 12.3951 12.6577 12.3951C13.2082 12.3951 13.5937 12.2536 13.814 11.9708V4.03125H15.522V13.8779H13.814V13.1202C13.4862 13.6251 13.0286 13.8779 12.4419 13.8779Z" fill="currentColor"></path>
              <path d="M18.8998 12.6105V9.4589H20.478C21.3213 9.4589 21.9961 9.29742 22.5024 8.97446C23.0195 8.6515 23.2781 8.16335 23.2781 7.51001C23.2781 6.84589 23.0195 6.35339 22.5024 6.03251C21.9961 5.70087 21.3213 5.53505 20.478 5.53505H18.8998V12.6105ZM18.8998 4.03125H20.478C21.7828 4.03125 22.8222 4.31688 23.5962 4.88816C24.3702 5.45944 24.7572 6.31291 24.7572 7.44857C24.7572 8.01211 24.6186 8.52223 24.3414 8.97893C24.0642 9.43563 23.6894 9.79979 23.217 10.0714V10.1037C23.8211 10.3704 24.3101 10.7483 24.6841 11.2374C25.0689 11.7157 25.2613 12.3592 25.2613 13.1679C25.2613 14.3986 24.8452 15.3409 24.0131 15.9949C23.181 16.6381 22.0039 16.9597 20.4818 16.9597H17.1912V4.03125H18.8998V4.03125ZM20.4818 15.4565C21.3468 15.4565 22.0128 15.2891 22.4798 14.9542C22.9576 14.6086 23.1965 14.0739 23.1965 13.3499C23.1965 12.6965 22.9463 12.1866 22.4459 11.8202C21.9563 11.4538 21.3015 11.2706 20.4818 11.2706H18.8998V15.4565H20.4818Z" fill="currentColor"></path>
              <path d="M28.0062 13.8779V4.03125H29.7141V13.8779H28.0062Z" fill="currentColor"></path>
              <path d="M32.2223 13.8779V4.03125H33.9302V13.8779H32.2223Z" fill="currentColor"></path>
              <path d="M43.0805 13.8779C42.1695 13.8779 41.4608 13.626 40.9545 13.1221C40.4482 12.6074 40.195 11.9056 40.195 11.0167V4.03125H41.903V11.0167C41.903 11.4552 42.0175 11.7946 42.2465 12.0348C42.4755 12.7946 42.8254 12.3951 43.2963 12.3951C43.8468 12.3951 44.2323 12.2536 44.4526 11.9708V4.03125H46.1605V13.8779H44.4526V13.1202C44.1248 13.6251 43.6672 13.8779 43.0805 13.8779Z" fill="currentColor"></path>
              <path d="M51.1554 12.6105V9.4589H52.7336C53.577 9.4589 54.2518 9.29742 54.758 8.97446C55.2751 8.6515 55.5337 8.16335 55.5337 7.51001C55.5337 6.84589 55.2751 6.35339 54.758 6.03251C54.2518 5.70087 53.577 5.53505 52.7336 5.53505H51.1554V12.6105ZM51.1554 4.03125H52.7336C54.0384 4.03125 55.0778 4.31688 55.8518 4.88816C56.6258 5.45944 57.0128 6.31291 57.0128 7.44857C57.0128 8.01211 56.8742 8.52223 56.597 8.97893C56.3198 9.43563 55.945 9.79979 55.4727 10.0714V10.1037C56.0768 10.3704 56.5658 10.7483 56.9398 11.2374C57.3246 11.7157 57.517 12.3592 57.517 13.1679C57.517 14.3986 57.1009 15.3409 56.2687 15.9949C55.4366 16.6381 54.2595 16.9597 52.7374 16.9597H49.4468V4.03125H51.1554V4.03125ZM52.7374 15.4565C53.6025 15.4565 54.2684 15.2891 54.7354 14.9542C55.2132 14.6086 55.4522 14.0739 55.4522 13.3499C55.4522 12.6965 55.202 12.1866 54.7015 11.8202C54.212 11.4538 53.5572 11.2706 52.7374 11.2706H51.1554V15.4565H52.7374Z" fill="currentColor"></path>
              <path d="M63.8569 13.8779V4.03125H65.5649V13.8779H63.8569Z" fill="currentColor"></path>
              <path d="M69.043 13.8779C68.132 13.8779 67.4233 13.626 66.9171 13.1221C66.4108 12.6074 66.1576 11.9056 66.1576 11.0167V4.03125H67.8655V11.0167C67.8655 11.4552 67.9801 11.7946 68.2091 12.0348C68.4381 12.275 68.7879 12.3951 69.2589 12.3951C69.8094 12.3951 70.1949 12.2536 70.4152 11.9708V4.03125H72.1231V13.8779H70.4152V13.1202C70.0874 13.6251 69.6298 13.8779 69.043 13.8779Z" fill="currentColor"></path>
              <path d="M78.7495 13.8779C77.8385 13.8779 77.1298 13.626 76.6235 13.1221C76.1172 12.6074 75.864 11.9056 75.864 11.0167V4.03125H77.5719V11.0167C77.5719 11.4552 77.6865 11.7946 77.9154 12.0348C78.1444 12.275 78.4943 12.3951 78.9652 12.3951C79.5157 12.3951 79.9012 12.2536 80.1215 11.9708V4.03125H81.8294V13.8779H80.1215V13.1202C79.7937 13.6251 79.3361 13.8779 78.7495 13.8779Z" fill="currentColor"></path>
              <path d="M83.2505 13.8779V4.03125H84.9584V13.8779H83.2505Z" fill="currentColor"></path>
              <path d="M88.756 12.6105V9.4589H90.3342C91.1775 9.4589 91.8523 9.29742 92.3586 8.97446C92.8757 8.6515 93.1343 8.16335 93.1343 7.51001C93.1343 6.84589 92.8757 6.35339 92.3586 6.03251C91.8523 5.70087 91.1775 5.53505 90.3342 5.53505H88.756V12.6105ZM88.756 4.03125H90.3342C91.639 4.03125 92.6784 4.31688 93.4524 4.88816C94.2264 5.45944 94.6134 6.31291 94.6134 7.44857C94.6134 8.01211 94.4748 8.52223 94.1976 8.97893C93.9204 9.43563 93.5456 9.79979 93.0732 10.0714V10.1037C93.6773 10.3704 94.1663 10.7483 94.5403 11.2374C94.9251 11.7157 95.1175 12.3592 95.1175 13.1679C95.1175 14.3986 94.7014 15.3409 93.8693 15.9949C93.0371 16.6381 91.8601 16.9597 90.3379 16.9597H87.0474V4.03125H88.756V4.03125ZM90.3379 15.4565C91.203 15.4565 91.8689 15.2891 92.3359 14.9542C92.8137 14.0739 93.0527 13.3499 93.0527 13.3499C93.0527 12.6965 92.8025 12.1866 92.3021 11.8202C91.8126 11.4538 91.1577 11.2706 90.3379 11.2706H88.756V15.4565H90.3379Z" fill="currentColor"></path>
              <path d="M100.548 13.8779C99.637 13.8779 98.9284 13.626 98.4221 13.1221C97.9158 12.6074 97.6626 11.9056 97.6626 11.0167V4.03125H99.3705V11.0167C99.3705 11.4552 99.4851 11.7946 99.7141 12.0348C99.9431 12.275 100.293 12.3951 100.764 12.3951C101.314 12.3951 101.7 12.2536 101.92 11.9708V4.03125H103.628V13.8779H101.92V13.1202C101.592 13.6251 101.135 13.8779 100.548 13.8779Z" fill="currentColor"></path>
            </svg>

            {/* 6. Omicron */}
            <svg className="omicron" fill="none" viewBox="0 0 102 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1562 8.95498C10.1562 10.6107 9.83547 11.8817 9.1947 12.768C8.55393 13.6543 7.63158 14.0974 6.42767 14.0974C5.22376 14.0974 4.29883 13.6543 3.65317 12.768C3.0075 11.8817 2.68471 10.6107 2.68471 8.95498C2.68471 7.29927 3.0075 6.02824 3.65317 5.14193C4.29883 4.25565 5.22376 3.8125 6.42767 3.8125C7.63158 3.8125 8.55393 4.25565 9.1947 5.14193C9.83547 6.02824 10.1562 7.29927 10.1562 8.95498ZM14.1979 8.95498C14.1979 5.64722 13.2094 3.14811 11.2323 1.45763C9.91422 0.485558 8.31269 0 6.42767 0C4.54266 0 2.94112 0.485558 1.62305 1.45763C0.541016 2.3814 0 3.80521 0 5.72906V12.1809C0 14.1047 0.541016 15.5286 1.62305 16.4523C2.94112 17.4244 4.54266 17.9099 6.42767 17.9099C8.31269 17.9099 9.91422 17.4244 11.2323 16.4523C12.3143 15.5286 12.8553 14.1047 12.8553 12.1809V11.2632C13.2094 11.0883 13.5186 10.8543 13.783 10.5614C14.0592 10.091 14.1972 9.55554 14.1979 8.95498Z" fill="currentColor"></path>
              <path d="M22.5694 17.2374H17.313V16.9537C17.7847 16.9291 18.1618 16.9081 18.5144 16.8136C19.0105 16.6735 19.2446 16.2461 19.2446 15.7277V9.6788C19.2446 8.02564 18.1618 7.10442 17.0511 7.10442C15.1896 7.10442 14.1279 8.28479 13.8449 8.83119V15.6122C13.8449 16.1306 14.1035 16.5088 14.5502 16.698C14.9277 16.8626 15.3293 16.9362 15.752 16.9572V17.2409H10.5196V16.9572C10.9423 16.9327 11.2254 16.9327 11.5573 16.817C12.004 16.677 12.217 16.2497 12.217 15.7313V8.57194C12.217 8.07457 11.9589 7.58075 11.5818 7.32151C11.2987 7.13241 10.8516 6.96781 10.4256 6.94327V6.7051L13.6775 6.4459L13.8411 6.61051V8.21824H13.8867C14.781 7.34254 15.6786 6.28125 17.7042 6.28125C19.894 6.28125 20.8861 7.76994 20.8861 10.015V15.6402C20.8861 16.1586 21.0991 16.5369 21.5218 16.7261C21.8533 16.8661 22.1363 16.9397 22.5591 16.9607V17.2374H22.5694Z" fill="currentColor"></path>
              <path d="M29.5638 12.768C28.923 13.6543 28.0006 14.0974 26.7967 14.0974C25.5928 14.0974 24.6679 13.6543 24.0222 12.768C23.3766 11.8817 23.0538 10.6107 23.0538 8.95498C23.0538 7.29927 23.3766 6.02824 24.0222 5.14193C24.6679 4.25565 25.5928 3.8125 26.7967 3.8125C28.0006 3.8125 28.923 4.25565 29.5638 5.14193C30.2045 6.02824 30.5253 7.29927 30.5253 8.95498C30.5253 10.6107 30.2045 11.8817 29.5638 12.768ZM26.7967 17.9099C28.6817 17.9099 30.2833 17.4244 31.6013 16.4523C32.6834 15.5286 33.2244 14.1047 33.2244 12.1809V5.72906C33.2244 3.80521 32.6834 2.3814 31.6013 1.45763C30.2833 0.485558 28.6817 0 26.7967 0C24.9117 0 23.3102 0.485558 21.9921 1.45763C20.9101 2.3814 20.3691 3.80521 20.3691 5.72906V12.1809C20.3691 14.1047 20.9101 15.5286 21.9921 16.4523C23.3102 17.4244 24.9117 17.9099 26.7967 17.9099Z" fill="currentColor"></path>
              <path d="M38.9381 12.768C38.2974 13.6543 37.375 14.0974 36.1711 14.0974C34.9672 14.0974 34.0423 13.6543 33.3966 12.768C32.751 11.8817 32.4282 10.6107 32.4282 8.95498C32.4282 7.29927 32.751 6.02824 33.3966 5.14193C34.0423 4.25565 34.9672 3.8125 36.1711 3.8125C37.375 3.8125 38.2974 4.25565 38.9381 5.14193C39.5788 6.02824 39.8996 7.29927 39.8996 8.95498C39.8996 10.6107 39.5788 11.8817 38.9381 12.768ZM36.1711 17.9099C38.0561 17.9099 39.6577 17.4244 40.9757 16.4523C42.0578 15.5286 42.5988 14.1047 42.5988 12.1809V5.72906C42.5988 3.80521 42.0578 2.3814 40.9757 1.45763C39.6577 0.485558 38.0561 0 36.1711 0C34.2861 0 32.6846 0.485558 31.3665 1.45763C30.2845 2.3814 29.7435 3.80521 29.7435 5.72906V12.1809C29.7435 14.1047 30.2845 15.5286 31.3665 16.4523C32.6846 17.4244 34.2861 17.9099 36.1711 17.9099Z" fill="currentColor"></path>
              <path d="M51.9409 17.2374H46.6845V16.9537C47.1562 16.9291 47.5333 16.9081 47.8859 16.8136C48.382 16.6735 48.6161 16.2461 48.6161 15.7277V9.6788C48.6161 8.02564 47.5333 7.10442 46.4226 7.10442C44.5611 7.10442 43.4994 8.28479 43.2164 8.83119V15.6122C43.2164 16.1306 43.475 16.5088 43.9217 16.698C44.2992 16.8626 44.7008 16.9362 45.1235 16.9572V17.2409H39.8911V16.9572C40.3138 16.9327 40.5969 16.9327 40.9288 16.817C41.3755 16.677 41.5885 16.2497 41.5885 15.7313V8.57194C41.5885 8.07457 41.3304 7.58075 40.9533 7.32151C40.6702 7.13241 40.2231 6.96781 39.7971 6.94327V6.7051L43.049 6.4459L43.2126 6.61051V8.21824H43.2582C44.1525 7.34254 45.0501 6.28125 47.0757 6.28125C49.2655 6.28125 50.2576 10.015V15.6402C50.2576 16.1586 50.4706 16.5369 50.8933 16.7261C51.2248 16.8661 51.5078 16.9397 51.9306 16.9607V17.2374H51.9409Z" fill="currentColor"></path>
            </svg>

            {/* 7. Puck */}
            <svg className="puck" fill="none" viewBox="0 0 54 18" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4836 12.6122V9.6788H8.0618C8.90513 9.6788 9.58 9.51732 10.0863 9.19436C10.6034 8.8714 10.862 8.38325 10.862 7.72991C10.862 7.06579 10.6034 6.57329 10.0863 6.25241C9.58 5.92077 8.90513 5.75495 8.0618 5.75495H6.4836V12.6122ZM6.4836 4.03125H8.0618C9.3666 4.03125 10.406 4.31688 11.18 4.88816C11.954 5.45944 12.341 6.31291 12.341 7.44857C12.341 8.01211 12.2024 8.52223 11.9252 8.97893C11.648 9.43563 11.2732 9.79979 10.8008 10.0714V10.1037C11.405 10.3704 11.8939 10.7483 12.2679 11.2374C12.6528 11.7157 12.8451 12.3592 12.8451 13.1679C12.8451 14.3986 12.429 15.3409 11.5969 15.9949C10.7648 16.6381 9.5877 16.9597 8.06563 16.9597H4.775V4.03125H6.4836V4.03125ZM8.06563 15.4565C8.93067 15.4565 9.5966 15.2891 10.0636 14.9542C10.5414 14.6086 10.7803 14.0739 10.7803 13.3499C10.7803 12.6965 10.5301 12.1866 10.0297 11.8202C9.5401 11.4538 8.88537 11.2706 8.06563 11.2706H6.4836V15.4565H8.06563Z" fill="currentColor"></path>
              <path d="M16.5828 13.8779C15.6718 13.8779 14.9631 13.626 14.4569 13.1221C13.9506 12.6074 13.6974 11.9056 13.6974 11.0167V4.03125H15.4053V11.0167C15.4053 11.4552 15.5199 11.7946 15.7489 12.0348C15.9779 12.275 16.3277 12.3951 16.7986 12.3951C17.3491 12.3951 17.7346 12.2536 17.9549 11.9708V4.03125H19.6628V13.8779H17.9549V13.1202C17.6271 13.6251 17.1695 13.8779 16.5828 13.8779Z" fill="currentColor"></path>
              <path d="M23.9541 12.768C23.3134 13.6543 22.391 14.0974 21.1871 14.0974C19.9832 14.0974 19.0583 13.6543 18.4126 12.768C17.7669 11.8817 17.4441 10.6107 17.4441 8.95498C17.4441 7.29927 17.7669 6.02824 18.4126 5.14193C19.0583 4.25565 19.9832 3.8125 21.1871 3.8125C22.391 3.8125 23.3134 4.25565 23.9541 5.14193C24.5948 6.02824 24.9156 7.29927 24.9156 8.95498C24.9156 10.6107 24.5948 11.8817 23.9541 12.768ZM21.1871 17.9099C23.0721 17.9099 24.6737 17.4244 25.9917 16.4523C27.0738 15.5286 27.6148 14.1047 27.6148 12.1809V5.72906C27.6148 3.80521 27.0738 2.3814 25.9917 1.45763C24.6737 0.485558 23.0721 0 21.1871 0C19.3021 0 17.7006 0.485558 16.3825 1.45763C15.3005 2.3814 14.7595 3.80521 14.7595 5.72906V12.1809C14.7595 14.1047 15.3005 15.5286 16.3825 16.4523C17.7006 17.4244 19.3021 17.9099 21.1871 17.9099Z" fill="currentColor"></path>
              <path d="M33.9541 13.8779C33.4907 13.8779 33.1098 13.6841 32.8113 13.2962L30.9859 10.5966L29.9302 11.6527V13.8779H28.2223V4.03125H29.9302V10.1557L33.7259 6.2745H35.8821L32.2223 9.93297L36.0469 13.8779H33.9541Z" fill="currentColor"></path>
            </svg>

          </div>
        </div>

        {/* Contact info and Email clipboard */}
        <div className="nav-email-wrap" data-tl-desktop="" data-tl-end="38% top" data-tl-from="{'opacity' : 0}" data-tl-start="33% top" data-tl-to="{'opacity' : 1}" data-tl-trigger=".hero" data-tl-type="scroll">
          <div className="nav-email-item" onClick={handleCopyEmail}>

            <p className="email-text">nenad@popadic.co</p>

            {/* Tooltip */}
            <div className="clipboard-item" style={{ display: copied ? "flex" : undefined }}>
              <svg className="clipboard-icon" fill="none" style={{ display: copied ? "block" : "none" }} viewBox="0 0 14 14" width="100%" xmlns="http://www.w3.org/2000/svg">
                <rect fill="currentColor" height="14" rx="7" width="14"></rect>
                <path className="text-color-white" d="M6.94231 9.43099L10.2791 6.23416C10.5736 5.95167 10.5736 5.49388 10.2793 5.21194C10.1378 5.07602 9.94541 5 9.74562 5C9.54555 4.99973 9.35347 5.07602 9.21162 5.21166L6.54359 7.76803C6.50763 7.80249 6.45911 7.82163 6.4083 7.82163C6.35807 7.82163 6.30955 7.80222 6.27359 7.76803L5.28806 6.82375C5.14678 6.68811 4.95499 6.61182 4.75491 6.61182C4.55455 6.61182 4.36276 6.68811 4.22119 6.82375C4.07934 6.95939 4 7.14316 4 7.33514C4 7.52684 4.07934 7.71088 4.22119 7.84652L5.87487 9.43099C6.16941 9.71348 6.64748 9.71348 6.94231 9.43099Z" fill="currentColor"></path>
              </svg>
              <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
            </div>

            {/* Email copy paper icon overlay */}
            <div className="clipboard-wrap">
              <svg className="copy-email-icon" fill="none" viewBox="0 0 13 13" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.000482947 8.26401C0.000482947 7.10632 -0.000996063 5.94864 0.00122242 4.79096C0.00233167 4.18199 0.358029 3.71278 0.917458 3.58299C1.02875 3.55711 1.14596 3.54861 1.26058 3.54861C3.57188 3.54676 5.88317 3.54639 8.19447 3.5475C8.95208 3.5475 9.45494 4.04777 9.45531 4.80316C9.45679 7.11853 9.45679 9.43426 9.45531 11.7496C9.45494 12.4973 8.95134 12.9994 8.20297 12.9997C5.88724 13.0012 3.57114 13.0012 1.25541 12.9997C0.501861 12.9994 0.00233168 12.4947 0.00159218 11.737C0.000482937 10.5794 0.00159218 9.42169 0.00159218 8.26401H0.000482947Z" fill="currentColor" fillOpacity="0.9"></path>
                <path d="M8.27693 0.000639714C9.43942 0.000639714 10.6019 -0.00120904 11.7644 0.00137919C12.366 0.00248844 12.8307 0.355228 12.9627 0.911329C12.9901 1.02669 12.9994 1.14871 12.9994 1.26777C13.0016 3.57388 13.0016 5.88037 13.0005 8.18649C13.0005 8.95261 12.5013 9.4514 11.7367 9.45399C11.5843 9.45436 11.4324 9.4551 11.28 9.45399C10.8777 9.45029 10.6344 9.2081 10.6341 8.80434C10.633 7.36047 10.6359 5.91698 10.6326 4.47311C10.6307 3.62713 10.2495 3.00041 9.51004 2.59405C9.20056 2.42397 8.86261 2.36592 8.51024 2.36666C7.09411 2.36962 5.6776 2.36777 4.26147 2.36777C3.76674 2.36777 3.54305 2.14592 3.54711 1.64861C3.54896 1.40938 3.53676 1.16461 3.58076 0.932035C3.68762 0.369278 4.17754 0.00248844 4.7891 0.00174895C5.95159 -9.97919e-05 7.11407 0.00100944 8.27656 0.00137919L8.27693 0.000639714Z" fill="currentColor" fillOpacity="0.9"></path>
              </svg>
            </div>

          </div>
        </div>

        {/* Book Call and About Me buttons with hover slide-up */}
        <div className="nav-button-wrap" data-flip-end="35% top" data-flip-start="5% top" data-flip-target=".hero">
          <a className="nav-button w-inline-block" data-button-hover="" href="https://cal.com/nenad-popadic/intro-call" target="_blank">
            <div className="nav-button-mask">
              <div className="button-text">Book a Call</div>
              <div className="button-text clone-p">Book a Call</div>
            </div>
          </a>
          <a className="nav-button-secondary w-inline-block" data-button-hover="" href="#about">
            <div className="nav-button-mask">
              <div className="button-text">About Me</div>
              <div className="button-text clone-p">About Me</div>
            </div>
          </a>
        </div>

      </div>
    </header>
  );
}
