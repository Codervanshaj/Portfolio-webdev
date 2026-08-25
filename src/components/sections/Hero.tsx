"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { initTextReveal } from "@/lib/animations/textReveal";

export default function Hero() {
  useGSAP(() => {
    // Reveal text headers
    initTextReveal(".hero-heading");
  }, []);

  return (
    <section className="hero" data-flip-start="top top" data-flip-start-trigger="" id="hero">
      <div className="hero-sticky" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Nesh Logo Preload wrapper containing logo ghost and copyright ghost */}
        <div className="nesh-logo-preload">
          <div className="nesh-logo-wrap" data-flip-origin="">
            <div className="nesh-logo-ghost-wrap">
              
              {/* Nesh Logo Ghost */}
              <svg className="nesh-logo-ghost" data-flip-target="" fill="none" viewBox="0 0 1288 338" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 330.469V4.83951H163.391L244.51 292.675H250.272L247.737 4.83951H337.383V330.469H174.683L93.1029 42.6337H87.3416L89.6461 330.469H0Z" fill="currentColor"></path>
                <path d="M463.809 258.798H645.175V330.469H374.163V4.83951H640.797V76.5103H463.809V130.897H626.739V202.568H463.809V258.798Z" fill="currentColor"></path>
                <path d="M651.997 245.432L721.824 205.794C743.333 245.739 774.905 265.712 816.54 265.712C830.982 265.712 842.197 263.331 850.186 258.568C858.329 253.652 862.4 246.661 862.4 237.597C862.4 228.686 858.713 221.619 851.338 216.395C843.964 211.018 830.982 206.562 812.392 203.029L756.161 192.198C727.893 186.82 706.307 176.45 691.404 161.086C676.655 145.569 669.281 125.904 669.281 102.091C669.281 82.7325 675.042 65.2949 686.565 49.7778C698.241 34.107 714.219 21.893 734.499 13.1358C754.779 4.3786 777.286 0 802.021 0C879.454 0 929.001 31.3416 950.663 94.0247L873.692 117.07C866.164 100.17 857.1 88.2634 846.499 81.3498C836.052 74.4362 822.148 70.9794 804.787 70.9794C791.574 70.9794 780.666 73.7449 772.063 79.2757C763.459 84.8066 759.157 92.2579 759.157 101.63C759.157 110.233 762.768 116.532 769.989 120.527C777.209 124.521 790.115 128.285 808.705 131.819L864.244 142.65C923.393 154.019 952.968 184.977 952.968 235.523C952.968 266.557 940.37 291.292 915.174 309.728C889.978 328.011 856.178 337.152 813.775 337.152C774.598 337.152 742.411 329.855 717.215 315.259C692.019 300.51 670.279 277.235 651.997 245.432Z" fill="currentColor"></path>
                <path d="M977.765 330.469V4.83951H1067.41V130.897H1197.62V4.83951H1287.49V330.469H1197.62V202.568H1067.41V330.469H977.765Z" fill="currentColor"></path>
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
                    <p className="hero-webflow-projects-text" data-flip-id="hero-card-2-text" id="projects_start_text">80+<br/>Projects</p>
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
                    <p className="experience-text" id="yrs_small_text_start">Years of <br/>experience</p>
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
              alt="Nenad Popadic" 
              className="mobile-hero-image" 
              fetchPriority="high" 
              loading="lazy" 
              src="/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69708b99545c57d03ebb5cd9_Frame-202147258154.avif" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
