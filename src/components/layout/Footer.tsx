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

      </div>
    </footer>
  );
}
