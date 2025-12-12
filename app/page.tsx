"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <main>
      {isLoading && (
        <LoadingScreen 
          onComplete={() => setIsLoading(false)} 
          // Only allow completion if video is ready
          canComplete={isVideoReady}
        />
      )}
      <Hero 
        videoSrc="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        title="ashetian"
        subtitle="WANT LACTOSE ON MY JEANS"
        onVideoReady={() => setIsVideoReady(true)}
      />
      <About />
    </main>
  );
}
