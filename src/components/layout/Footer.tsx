"use client";

import { SITE_CONFIG } from "@/lib/constants/site";
import BigLogo from "../sections/BigLogo";
import FAQ from "../sections/FAQ";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        {/* Big Logo reveal text */}
        <BigLogo />

        {/* FAQ dropdown list */}
        <FAQ />

        {/* Footer info/copyright links grid */}
        <div className="footer-links-layout">
          <div className="footer-links-wrap">
            <a className="footer-link-item w-inline-block" href="https://x.com/NenadPopadicc" target="_blank">
              <div>X.com</div>
            </a>
            <a className="footer-link-item w-inline-block" href="https://www.linkedin.com/in/nenad-popadic-3a8649197/" target="_blank">
              <div>LinkedIn</div>
            </a>
          </div>
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.developer}®. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
