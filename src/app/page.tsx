import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import AboutTimeline from "@/components/AboutTimeline";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="w-full h-full relative font-sans bg-[#D7D1C1]">
        <Sidebar />
        <Hero />
        <AboutIntro />
        <AboutTimeline />
      </main>
    </SmoothScroll>
  );
}
