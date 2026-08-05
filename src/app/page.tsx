import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import AboutTimeline from "@/components/AboutTimeline";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="w-full h-full relative font-sans bg-[#D7D1C1]">
        {/* Fixed Background Portrait */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none flex justify-center items-end"
          style={{ zIndex: 10, width: "37vw", height: "96.5vh" }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <div className="relative w-full h-full gsap-portrait-inner">
              <Image
                src="/Vanshaj-pic.png"
                alt="Vanshaj"
                fill
                sizes="37vw"
                className="object-cover object-top"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        <Sidebar />
        <Hero />
        <AboutTimeline />
      </main>
    </SmoothScroll>
  );
}
