import type { Metadata } from "next";
import Script from "next/script";
import "../../public/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/css/nesh-staging.webflow.shared.bea9f6170.min.css";
import "../../public/heynesh-assets/cdn.jsdelivr.net/npm/swiper-11/swiper-bundle.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NESH Portfolio Rebuild",
  description: "Pixel-perfect portfolio rebuild using Next.js and GSAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <Script 
          src="/heynesh-assets/cdn.prod.website-files.com/gsap/3.15.0/SplitText.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

