"use client";

import { SITE_CONFIG } from "@/lib/constants/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        {/* Footer info/copyright links grid */}
        <div className="footer-links-layout">
          <p className="copyright-text">
            © {new Date().getFullYear()} {SITE_CONFIG.developer}. All rights reserved.
          </p>

          <div className="footer-social-wrap">
            <a className="footer-social-link" href="https://x.com/NenadPopadicc" target="_blank">X.com</a>
            <a className="footer-social-link" href="https://www.linkedin.com/in/nenad-popadic-3a8649197/" target="_blank">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
