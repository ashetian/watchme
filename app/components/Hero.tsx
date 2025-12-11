"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const ChromeText = dynamic(() => import("./ChromeText"), { 
  ssr: false,
  loading: () => <div className="h-20" /> 
});

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
}

export default function Hero({ 
  videoSrc, 
  title = "ashetian",
  subtitle = "Where is my watch?"
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // HLS Video Setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => video.play().catch(() => {}));
    }
  }, [videoSrc]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(blurRef.current, { y: 0, opacity: 0 });
      gsap.set(titleRef.current, { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });

      // Entrance animation timeline
      const enterTl = gsap.timeline({ 
        defaults: { ease: "power3.out", duration: 1.2 } 
      });

      enterTl
        .to(blurRef.current, { opacity: 1, duration: 1 })
        .to(titleRef.current, { opacity: 1, y: 0, scale: 1 }, "-=0.6")
        .to(subtitleRef.current, { opacity: 1, y: 0 }, "-=0.8");

      // Scroll animation - smooth parallax
      gsap.to(blurRef.current, {
        y: "-100%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // Smooth scrubbing
        }
      });

      gsap.to(contentRef.current, {
        y: "-80%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1.5,
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[200vh] w-full">
      {/* Fixed video background */}
      <div className="fixed inset-0 h-screen w-full -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Single Blur Container */}
      <div 
        ref={blurRef}
        className="fixed top-0 left-0 right-0 h-[50vh] z-10 will-change-transform"
        style={{
          backdropFilter: "blur(50px) saturate(1.3)",
          WebkitBackdropFilter: "blur(50px) saturate(1.3)",
          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      >
        {/* Content */}
        <div 
          ref={contentRef}
          className="flex flex-col items-center justify-center h-full px-4 will-change-transform"
        >
          <div ref={titleRef} className="mb-6 will-change-transform">
            <ChromeText text={title} />
          </div>

          <p 
            ref={subtitleRef}
            className="font-unifraktur text-xl md:text-2xl lg:text-3xl text-white/60 text-center tracking-widest will-change-transform"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
