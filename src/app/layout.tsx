import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen w-screen overflow-hidden bg-[#F1F0EA] text-[#171717] selection:bg-[#171717] selection:text-[#F1F0EA]">
        {children}
      </body>
    </html>
  );
}
