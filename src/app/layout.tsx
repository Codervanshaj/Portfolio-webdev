import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Developer — Vanshaj | VANSHAJ",
  description: "Creative developer delivering custom builds, Next.js apps, animations, and premium web experiences.",
};


export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-screen overflow-x-hidden bg-[#D7D1C1] text-[#171715] selection:bg-[#171715] selection:text-[#D7D1C1]">
        {children}
      </body>
    </html>
  );
}
