"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import HeroBackground from "./components/HeroBackground";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <main className="relative">
      {/* Fixed Background Layer (Behind everything) */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-50" 
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />
      </div>

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
      <Skills />
      <Projects />
      {/* Spacer for Contact Reveal */}
      <div id="contact-spacer" className="h-[100vh] w-full invisible pointer-events-none" style={{ height: "100vh" }} />
    </main>
  );
}
