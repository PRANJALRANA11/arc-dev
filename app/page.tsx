"use client";
import Hero from "@/components/ui/neural-network-hero";
import { HeroSection } from "@/components/blocks/hero-section-1";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col relative  ">
      <Hero />
      <HeroSection />
    </div>
  );
}
