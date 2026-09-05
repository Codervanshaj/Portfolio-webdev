"use client";

import { useGSAP } from "@/hooks/useGSAP";

export default function Hero() {
  useGSAP(() => {
    // Entrance animations are handled in page.tsx
  }, []);

  return (
    <section className="hero" data-flip-start="top top" data-flip-start-trigger="" id="hero">
      <div className="hero-sticky" style={{ position: "relative", zIndex: 3 }}>

        {/* Nesh Logo Preload wrapper containing logo ghost and copyright ghost */}
        <div className="nesh-logo-preload">
          <div className="nesh-logo-wrap" data-flip-origin="">
            <div className="nesh-logo-ghost-wrap">

              {/* Nesh Logo Ghost */}

              <svg className="nesh-logo-ghost" data-flip-target="" width="100%" viewBox="0 0 851 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M678 167V0H724.634V65.2344H786.366V0H833V167H786.366V101.766H724.634V167H678Z" fill="currentColor" />
                <path d="M617.639 53.1219C617.207 47.8203 615.182 43.6851 611.564 40.7162C607.999 37.7473 602.572 36.2629 595.282 36.2629C590.638 36.2629 586.831 36.8195 583.861 37.9328C580.945 38.9932 578.785 40.4511 577.381 42.3067C575.976 44.1622 575.247 46.2829 575.193 48.6686C575.085 50.6302 575.436 52.4062 576.246 53.9967C577.11 55.5341 578.461 56.939 580.297 58.2114C582.133 59.4308 584.482 60.5441 587.344 61.5514C590.206 62.5587 593.608 63.46 597.55 64.2552L611.159 67.1181C620.339 69.0267 628.196 71.5449 634.73 74.6729C641.264 77.8008 646.611 81.4854 650.769 85.7267C654.927 89.9149 657.978 94.6333 659.922 99.8819C661.92 105.13 662.946 110.856 663 117.059C662.946 127.768 660.219 136.834 654.819 144.256C649.419 151.678 641.696 157.325 631.652 161.195C621.662 165.065 609.646 167 595.606 167C581.188 167 568.605 164.906 557.859 160.718C547.167 156.529 538.85 150.088 532.91 141.393C527.024 132.646 524.054 121.459 524 107.834H566.769C567.039 112.818 568.308 117.006 570.576 120.399C572.844 123.792 576.031 126.363 580.135 128.113C584.293 129.862 589.234 130.737 594.958 130.737C599.764 130.737 603.787 130.154 607.027 128.988C610.267 127.821 612.725 126.204 614.399 124.137C616.073 122.069 616.937 119.71 616.991 117.059C616.937 114.567 616.1 112.394 614.48 110.538C612.914 108.63 610.322 106.933 606.703 105.449C603.085 103.911 598.198 102.48 592.042 101.154L575.518 97.6552C560.829 94.5273 549.246 89.3052 540.767 81.9891C532.343 74.6198 528.158 64.5733 528.212 51.8495C528.158 41.5114 530.966 32.4722 536.636 24.7319C542.361 16.9386 550.272 10.8683 560.37 6.52095C570.522 2.17365 582.16 0 595.282 0C608.674 0 620.258 2.20016 630.032 6.60048C639.806 11.0008 647.34 17.2037 652.632 25.2091C657.978 33.1614 660.678 42.4657 660.732 53.1219H617.639Z" fill="currentColor" />
                <path d="M507 0V167H463.009L392.851 79.2598H391.713V167H339V0H383.749L452.77 87.4141H454.287V0H507Z" fill="currentColor" />
                <path d="M196.716 167H147L203.013 0H265.987L322 167H272.284L235.163 45.9902H233.837L196.716 167ZM187.436 101.113H280.901V135.035H187.436V101.113Z" fill="currentColor" />
                <path d="M53.5227 0L89.3182 117.748H90.6818L126.477 0H180L122.386 167H57.6136L0 0H53.5227Z" fill="currentColor" />
              </svg>

              {/* Copyright Ghost */}
              <svg className="nesh-copyright-icon-ghost" fill="none" viewBox="0 0 9 9" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.343933 5.97697C0.114645 5.44236 0 4.8828 0 4.29829C0 3.71378 0.114645 3.156 0.343933 2.62495C0.573221 2.0939 0.883118 1.6377 1.27362 1.25634C1.66413 0.871419 2.12808 0.56669 2.66547 0.342152C3.20645 0.114051 3.7743 0 4.36901 0C4.96373 0 5.52978 0.114051 6.06718 0.342152C6.60815 0.56669 7.0739 0.871419 7.4644 1.25634C7.85491 1.6377 8.1648 2.0939 8.39409 2.62495C8.62338 3.156 8.73802 3.71378 8.73802 4.29829C8.73802 5.07526 8.54277 5.7952 8.15226 6.45812C7.76176 7.11748 7.23153 7.63962 6.56158 8.02454C5.89163 8.40946 5.16077 8.60192 4.36901 8.60192C3.7743 8.60192 3.20645 8.48787 2.66547 8.25977C2.12808 8.03523 1.66413 7.73228 1.27362 7.35093C0.883118 6.96601 0.573221 6.50802 0.343933 5.97697ZM1.08017 4.29829C1.08017 4.7438 1.16615 5.16971 1.33811 5.57601C1.51008 5.97875 1.74295 6.32625 2.03672 6.61851C2.3305 6.91076 2.6798 7.14421 3.08464 7.31885C3.49306 7.48993 3.92118 7.57546 4.36901 7.57546C4.81684 7.57546 5.24317 7.48993 5.64801 7.31885C6.05643 7.14421 6.40752 6.91076 6.7013 6.61851C6.99507 6.32625 7.22794 5.97875 7.39991 5.57601C7.57546 5.16971 7.66324 4.7438 7.66324 4.29829C7.66324 3.85278 7.57546 3.42865 7.39991 3.02591C7.22794 2.6196 6.99507 2.27032 6.7013 1.97807C6.40752 1.68581 6.05643 1.45415 5.64801 1.28307C5.24317 1.11199 4.81684 1.02646 4.36901 1.02646C3.77071 1.02646 3.21899 1.17258 2.71384 1.46484C2.20869 1.75353 1.80922 2.14914 1.51545 2.65168C1.22526 3.15422 1.08017 3.70309 1.08017 4.29829ZM2.64398 6.58643V1.99945H4.91178C5.33811 1.99945 5.691 2.12954 5.97045 2.38972C6.25347 2.64633 6.39499 2.97958 6.39499 3.38945C6.39499 3.71378 6.29109 3.98821 6.0833 4.21275C5.87909 4.43729 5.62651 4.56916 5.32557 4.60836L5.26109 4.61905L6.34125 6.56505H5.0515L4.11644 4.75805H3.84237V6.58643H2.64398ZM3.84237 3.82783H4.74519C4.88491 3.82783 4.99597 3.79219 5.07837 3.72091C5.16436 3.64962 5.20735 3.55161 5.20735 3.42687C5.20735 3.29143 5.16615 3.18629 5.08375 3.11145C5.00135 3.0366 4.88849 2.99918 4.74519 2.99918H3.84237V3.82783Z" fill="currentColor"></path>
              </svg>

            </div>
          </div>

          {/* Hero link placeholders split in left and right sections */}
          <div className="hero-navigation-wrap">
            <div className="hero-links-ghost-wrapper">
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="home">home</div>
              </div>
              <div className="hero-navigation-sep" data-tl-end="5% top" data-tl-from="{'opacity': 1}" data-tl-start="top top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ height: "0.8vw" }}></div>
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="about-me">about me</div>
              </div>
              <div className="hero-navigation-sep" data-tl-end="4% top" data-tl-from="{'opacity': 1}" data-tl-start="top top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ height: "0.8vw" }}></div>
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="projects">projects</div>
              </div>
            </div>

            <div className="hero-links-ghost-wrapper is-hero-right-nav-item">
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="what-you-get">what you get</div>
              </div>
              <div className="hero-navigation-sep" data-tl-end="3% top" data-tl-from="{'opacity': 1}" data-tl-start="top top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ height: "0.8vw" }}></div>
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="services">services</div>
              </div>
              <div className="hero-navigation-sep" data-tl-end="2% top" data-tl-from="{'opacity': 1}" data-tl-start="top top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ height: "0.8vw" }}></div>
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="clients">clients</div>
              </div>
              <div className="hero-navigation-sep" data-tl-end="1% top" data-tl-from="{'opacity': 1}" data-tl-start="top top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll" style={{ height: "0.8vw" }}></div>
              <div className="ghost-link-item">
                <div className="hero-link-ghost" data-link-id="faq">faq</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero content wrapper */}
        <div className="hero-container">
          <div className="hero-left-text" data-split-initialized="true" data-tl-desktop="" data-tl-end="10% top" data-tl-from="{'opacity': 1}" data-tl-split="lines" data-tl-start="5% top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll">
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>The Webflow Expert. </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>That’s Nenad.</div>
            </div>
          </div>

          <div className="hero-content-layout">
            <h1 className="hero-heading" data-split-initialized="true">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>Webflow, </div>
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>Applied </div>
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>Differently.</div>
            </h1>
            <div className="hero-buttons-wrap">
              <div className="hero-cta-button">
                <p className="button-text">Book a Call</p>
              </div>
              <div className="hero-button">
                <p className="button-text">About Me</p>
              </div>
            </div>
          </div>

          <div className="hero-right-text" data-split-initialized="true" data-tl-desktop="" data-tl-end="10% top" data-tl-from="{'opacity': 1}" data-tl-split="lines" data-tl-start="5% top" data-tl-to="{'opacity': 0}" data-tl-trigger=".hero" data-tl-type="scroll">
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>Working closely with your team to deliver </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>Webflow builds that merge creativity, technical </div>
            </div>
            <div className="line-mask">
              <div className="line" style={{ position: "relative", display: "block", textAlign: "start" }}>excellence, and long-term value.</div>
            </div>
          </div>

          {/* Stats cards wrappers */}
          <div className="hero-cards-wrap">
            <div className="hero-cards-left">

              {/* Webflow projects card */}
              <div className="hero-card-2-wrap">
                <div className="hero-card-2" data-flip-id="hero-card-2">
                  <div className="hero-card-2-bg"></div>
                  <div className="hero-webflow-icon-wrap">
                    <svg className="hero-webflow-icon" data-flip-id="icon" fill="none" viewBox="0 0 91 57" width="100%" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" d="M90.0571 0L61.3209 56.1824H34.3296L46.3557 32.898H45.8162C35.8948 45.7787 21.0919 54.2582 0 56.1824V33.2204C0 33.2204 13.493 32.4233 21.4251 24.0827H0V0.00044379H24.0795V19.8078L24.62 19.8056L34.4597 0.00044379H52.6705V19.6822L53.2109 19.6813L63.4197 0H90.0571Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="hero-c-projects-text-wrap">
                    <p className="hero-webflow-projects-text" data-flip-id="hero-card-2-text">80+<br />Projects</p>
                  </div>
                </div>
              </div>

              {/* Experience number card */}
              <div className="hero-card-1-wrap">
                <div className="hero-card-1">
                  <div className="experience-bg"></div>
                  <div className="experience-number-wrap">
                    <svg className="experience-number" fill="none" viewBox="0 0 41 28" width="100%" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 5.99609V0H21.3672V6.71875C20.5729 7.01823 19.8828 7.31771 19.2969 7.61719C18.724 7.91667 18.1055 8.32031 17.4414 8.82812C16.7904 9.32292 16.2305 9.88281 15.7617 10.5078C15.293 11.1198 14.8307 11.8945 14.375 12.832C13.9323 13.7695 13.5742 14.8307 13.3008 16.0156C13.0273 17.1875 12.806 18.5872 12.6367 20.2148C12.4805 21.8294 12.4023 23.6263 12.4023 25.6055V27.5977H4.6875V25.6055C4.6875 23.0273 4.9349 20.7096 5.42969 18.6523C5.9375 16.5951 6.60156 14.8893 7.42188 13.5352C8.24219 12.168 9.25781 10.9896 10.4688 10C11.6797 8.9974 12.9102 8.22917 14.1602 7.69531C15.4232 7.16146 16.8229 6.73177 18.3594 6.40625V5.91797L0 5.99609Z" fill="currentColor"></path>
                      <path d="M20.7422 19.9609V14.5508H27.793V7.59766H33.5547V14.5508H40.5469V19.9609H33.5547V27.2852H27.793V19.9609H20.7422Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="experience-text-wrap">
                    <p className="experience-text" id="yrs_small_text_start">Years of <br />experience</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Rolling tags list card on desktop */}
            <div className="hero-card-3" data-tl-desktop="" data-tl-end="20% top" data-tl-from="{'scale': 1, 'opacity': 1, 'x': '0vw', 'y': '0vw'}" data-tl-start="5% top" data-tl-to="{'scale': 0.3, 'opacity': 0, 'x': '-25vw', 'y': '-5vw'}" data-tl-trigger=".hero" data-tl-type="scroll">
              <div className="hero-card-3-item">
                <svg className="hero-card-3-icon" fill="none" viewBox="0 0 19 19" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1767 11.4071C17.1458 15.2983 13.5104 18.1767 9.22398 18.1767C4.12366 18.1767 0 14.1256 0 9.06168C0 3.9978 4.12366 0 9.22398 0C13.2934 0 16.7659 2.6119 18.0139 6.18327C14.8126 7.14274 9.22398 9.06168 9.22398 9.06168L18.1767 11.4071Z" fill="currentColor"></path>
                </svg>
                <p>Creative</p>
              </div>
              <div className="hero-card-3-item">
                <svg className="hero-card-3-icon" fill="none" viewBox="0 0 19 19" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.841 10.3586C16.1506 9.66516 15.2934 9.24405 14.3993 9.08831C15.2934 8.93257 16.1506 8.5114 16.841 7.81797C18.6218 6.02947 18.6218 3.12982 16.841 1.34138C15.0602 -0.447068 12.173 -0.447068 10.3922 1.34138C9.63338 2.1035 9.20101 3.06774 9.0889 4.06146C9.06854 3.8842 9.04074 3.70646 8.99891 3.5285C8.42036 1.06686 5.96436 -0.457558 3.51329 0.123545C1.06227 0.704649 -0.455592 3.17124 0.123015 5.63289C0.554265 7.46749 2.02869 8.78011 3.76628 9.08992C2.87614 9.24722 2.02317 9.66807 1.33561 10.3586C-0.4452 12.1471 -0.4452 15.0468 1.33561 16.8353C3.11637 18.6238 6.00362 18.6238 7.78444 16.8353C8.54425 16.0722 8.97684 15.1065 9.08831 14.1115C9.19978 15.1066 9.63237 16.0723 10.3922 16.8353C12.173 18.6238 15.0602 18.6238 16.8411 16.8353C18.6219 15.0468 18.6218 12.1471 16.841 10.3586ZM9.08831 13.0824C8.97684 12.0873 8.54425 11.1217 7.78444 10.3586C7.09286 9.66403 6.2339 9.2427 5.33813 9.08761C5.42828 9.07185 5.51838 9.05921 5.60864 9.03779C7.53418 8.58128 8.87855 6.95987 9.0882 5.09257C9.19935 6.08811 9.6321 7.05445 10.3923 7.81792C11.0827 8.51129 11.9399 8.93246 12.834 9.0882C11.9398 9.24389 11.0826 9.66511 10.3922 10.3585C9.63237 11.1216 9.19978 12.0874 9.08831 13.0824Z" fill="currentColor"></path>
                </svg>
                <p>Reliable</p>
              </div>
              <div className="hero-card-3-item">
                <svg className="hero-card-3-icon" fill="none" viewBox="0 0 19 19" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M18.29 5.15376C18.29 4.09113 17.4771 3.24102 16.461 3.24102C15.4449 3.24102 14.632 4.09113 14.632 5.15376C14.632 5.84447 14.632 8.50105 14.632 9.19176C14.632 10.2544 13.8191 11.1045 12.803 11.1045C11.7869 11.1045 10.974 10.2544 10.974 9.19176C10.974 8.50105 10.974 2.60345 10.974 1.91274C10.974 0.850105 10.1611 0 9.145 0C8.12889 0 7.316 0.850105 7.316 1.91274C7.316 2.60345 7.316 8.50105 7.316 9.19176C7.316 10.2544 6.50311 11.1045 5.487 11.1045C4.47089 11.1045 3.658 10.2544 3.658 9.19176C3.658 8.50105 3.658 5.84447 3.658 5.15376C3.658 4.09113 2.84511 3.24102 1.829 3.24102C0.812889 3.24102 0 4.09113 0 5.15376V14.8237C0 16.6302 1.37175 18.0647 3.09914 18.0647H15.0384C16.7658 18.0647 18.1376 16.6302 18.1376 14.8237L18.29 5.15376Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <p>Strategist</p>
              </div>
              <div className="hero-card-3-item">
                <svg className="hero-card-3-icon" fill="none" viewBox="0 0 19 22" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.3256 12.9481L14.4763 10.808L17.3256 8.66787C18.3103 7.92827 18.3103 6.48246 17.3256 5.74279L10.1925 0.385134C9.50883 -0.128378 8.55529 -0.128378 7.87166 0.385134L0.738579 5.74279C-0.246193 6.48246 -0.246193 7.92821 0.738579 8.66787L3.58792 10.808L0.738642 12.9481C-0.24613 13.6877 -0.24613 15.1336 0.738642 15.8732L7.87178 21.2309C8.55542 21.7444 9.50895 21.7444 10.1926 21.2309L17.3257 15.8732C18.3104 15.1336 18.3103 13.6877 17.3256 12.9481Z" fill="currentColor"></path>
                </svg>
                <p>Builder</p>
              </div>
              <div className="hero-card-3-item">
                <svg className="hero-card-3-icon" fill="none" viewBox="0 0 18 18" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.855 8.75897C21.1849 15.3054 15.7305 20.6123 9.00227 15.4265C2.27397 20.6123 -3.18034 15.3054 2.14955 8.75897C-3.18034 2.21252 2.27403 -3.09438 9.00227 2.09146C15.7306 -3.09438 21.1849 2.21257 15.855 8.75897Z" fill="currentColor"></path>
                </svg>
                <p>Efficient</p>
              </div>
            </div>
          </div>

          {/* Mobile profile photo */}
          <div className="mobile-hero-image-wrap">
            <img
              alt="Vanshaj"
              className="mobile-hero-image"
              fetchPriority="high"
              loading="lazy"
              src="/vanshaj-assets/mobile-avatar.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
