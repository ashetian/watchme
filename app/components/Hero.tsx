"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const ChromeText = dynamic(() => import("./ChromeText"), { 
  ssr: false,
  loading: () => <div className="h-20" /> 
});

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  videoSrc?: string; // Kept for compatibility but unused
  title?: string;
  subtitle?: string;
  onVideoReady?: () => void;
}

export default function Hero({ 
  title = "ASHETIAN",
  subtitle = "CREATIVE STUDIO",
  onVideoReady
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(blurRef.current, { y: 0, opacity: 0 });
      gsap.set(titleRef.current, { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(infoBarRef.current, { opacity: 0, x: -30 });

      // Entrance animation timeline
      const enterTl = gsap.timeline({ 
        defaults: { ease: "power3.out", duration: 1.2 } 
      });

      enterTl
        .to(blurRef.current, { opacity: 1, duration: 1 })
        .to(titleRef.current, { opacity: 1, y: 0, scale: 1 }, "-=0.6")
        .to(subtitleRef.current, { opacity: 1, y: 0 }, "-=0.8");

      // Scroll Timeline - blur moves up, letters disappear, then About comes in
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "150% top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        }
      });

      // Phase 1: Blur moves up
      scrollTl.to(blurRef.current, {
        y: "-100%",
        ease: "none",
        duration: 0.5,
      }, 0);

      scrollTl.to(contentRef.current, {
        y: "-50%",
        opacity: 0,
        ease: "none",
        duration: 0.4,
      }, 0);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden">
      {/* Blur Container */}
      <div 
        ref={blurRef}
        className="absolute bg-black/70 top-0 left-0 right-0 h-[50vh] z-10 will-change-transform gpu"
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

