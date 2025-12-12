"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import HeroBackground from "./components/HeroBackground";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <main className="relative">
      <Contact />
      <HeroBackground onReady={() => setIsVideoReady(true)} className="fixed inset-0 -z-50 bg-black" />
      
      {isLoading && (
        <LoadingScreen 
          onComplete={() => setIsLoading(false)} 
          // Only allow completion if video is ready
          canComplete={isVideoReady}
        />
      )}
      <Hero 
        title="ashetian"
        subtitle="WANT LACTOSE ON MY JEANS"
      />
      <About />
      <Projects />
      {/* Spacer for Contact Reveal */}
      <div className="h-screen w-full invisible pointer-events-none" />
    </main>
  );
}
