"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const bouncerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch/Shake effect for 404
      gsap.to(textRef.current, {
        x: "random(-5, 5)",
        y: "random(-5, 5)",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      // Flame Flicker Animation
      gsap.to(textRef.current, {
        filter: "brightness(1.5) contrast(1.2) drop-shadow(0 0 20px rgba(255,50,0,0.8)) drop-shadow(0 0 40px rgba(255,100,0,0.6))",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "linear",
        keyframes: [
          { filter: "brightness(1.6) contrast(1.3) drop-shadow(0 0 25px rgba(255,60,0,0.9)) drop-shadow(0 0 50px rgba(255,120,0,0.7))" },
          { filter: "brightness(1.4) contrast(1.1) drop-shadow(0 0 15px rgba(255,40,0,0.7)) drop-shadow(0 0 30px rgba(255,80,0,0.5))" },
          { filter: "brightness(1.7) contrast(1.4) drop-shadow(0 -5px 30px rgba(255,70,0,0.8)) drop-shadow(0 -10px 60px rgba(255,140,0,0.6))" },
        ]
      });

      // SVG Turbulence Animation (Heat Haze)
      const turbulence = document.querySelector("#fire-distortion feTurbulence");
      if (turbulence) {
        gsap.to(turbulence, {
          attr: { baseFrequency: "0.01 0.008" }, // Animate vertical frequency
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Glow Turbulence Animation (Smoke/Heat)
      const glowTurbulence = document.querySelector("#glow-distortion feTurbulence");
      if (glowTurbulence) {
        gsap.to(glowTurbulence, {
          attr: { baseFrequency: "0.02 0.04" },
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // DVD Bounce Animation
      if (bouncerRef.current && containerRef.current) {
        const bouncer = bouncerRef.current;
        const container = containerRef.current;
        
        const updateBounce = () => {
          const bounds = container.getBoundingClientRect();
          const element = bouncer.getBoundingClientRect();
          
          const maxX = bounds.width - element.width;
          const maxY = bounds.height - element.height;
          
          // Random start position
          gsap.set(bouncer, { x: Math.random() * maxX, y: Math.random() * maxY });

          const speed = 200; // pixels per second

          // X Animation
          const currentX = Number(gsap.getProperty(bouncer, "x"));
          gsap.to(bouncer, {
            x: maxX,
            duration: (maxX - currentX) / speed,
            ease: "linear",
            onComplete: () => {
              gsap.fromTo(bouncer, 
                { x: maxX }, 
                { x: 0, duration: maxX / speed, ease: "linear", repeat: -1, yoyo: true }
              );
            }
          });

          // Y Animation
          const currentY = Number(gsap.getProperty(bouncer, "y"));
          gsap.to(bouncer, {
            y: maxY,
            duration: (maxY - currentY) / speed,
            ease: "linear",
            onComplete: () => {
              gsap.fromTo(bouncer, 
                { y: maxY }, 
                { y: 0, duration: maxY / speed, ease: "linear", repeat: -1, yoyo: true }
              );
            }
          });
        };

        // Initial start
        // Small delay to ensure layout is ready
        setTimeout(updateBounce, 100);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center overflow-hidden relative"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Bouncing 404 */}
      <div ref={bouncerRef} className="absolute top-0 left-0 z-10">
        <div className="relative inline-block">
          {/* Main Text (Crisp White) */}
          <h1 
            ref={textRef}
            className="font-unifraktur text-[30vw] md:text-[20vw] leading-none text-white select-none relative z-10"
            style={{ 
              // filter: "url(#fire-distortion)" // Moved to CSS
            }}
          >
            404
          </h1>
          <style jsx>{`
            .fire-text {
              filter: none;
            }
            @media (min-width: 768px) {
              .fire-text {
                filter: url(#fire-distortion);
              }
            }
          `}</style>

          {/* Glow Layer (Distorted) */}
          <h1 
            className="font-unifraktur text-[30vw] md:text-[20vw] leading-none text-white select-none absolute inset-0 z-0 opacity-80"
            style={{
              // filter: "url(#glow-distortion) blur(10px) drop-shadow(0 0 30px rgba(255,50,0,1)) drop-shadow(0 0 60px rgba(255,100,0,0.8))"
            }}
          >
            404
          </h1>
           <style jsx>{`
            .glow-text {
              filter: blur(5px) drop-shadow(0 0 15px rgba(255,50,0,0.8));
            }
            @media (min-width: 768px) {
              .glow-text {
                filter: url(#glow-distortion) blur(10px) drop-shadow(0 0 30px rgba(255,50,0,1)) drop-shadow(0 0 60px rgba(255,100,0,0.8));
              }
            }
          `}</style>
        </div>
      </div>
      
      {/* Fixed Bottom Controls */}
      <div className="absolute z-20 w-full flex flex-col items-center inset-0 justify-center pointer-events-none md:top-auto md:bottom-12 md:h-auto">
        <p 
          ref={subtextRef}
          className="font-mono text-center text-white/50 text-sm md:text-xl tracking-[0.2em] uppercase mb-8 pointer-events-auto px-4"
        >
          It seems like you've found a page that doesn't exist. yet?
        </p>

        <Link 
          ref={buttonRef}
          href="/"
          className="group relative inline-flex items-center gap-4 px-8 py-4 transition-colors duration-500 pointer-events-auto"
        >
          <span className="text-5xl md:text-9xl hover:line-through active:line-through tracking-widest font-unifraktur uppercase text-white">home</span>
        </Link>
      </div>

      {/* SVG Filters */}
      <svg className="hidden">
        <defs>
          <filter id="fire-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
          <filter id="glow-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
