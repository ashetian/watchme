"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
  canComplete?: boolean;
}

export default function LoadingScreen({ onComplete, canComplete = true }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Wait for canComplete before exiting
          const checkComplete = setInterval(() => {
            if (canComplete) {
              clearInterval(checkComplete);
              // Exit animation
              gsap.to(containerRef.current, {
                yPercent: 100, // Slide down
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: onComplete,
              });
            }
          }, 100);
        }
      });

      // Animate fill
      tl.to(fillRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 2,
        ease: "power2.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, canComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white"
    >
      <div className="relative">
        {/* Background Asterisk (Empty/Dim) */}
        <div className="text-[20vh] md:text-[30vh] font-bold leading-none text-white/20 select-none">
          ✱
        </div>
        
        {/* Foreground Asterisk (Filling) */}
        <div 
          ref={fillRef}
          className="absolute inset-0 text-[20vh] md:text-[30vh] font-bold leading-none text-transparent select-none"
          style={{ 
            clipPath: "inset(100% 0 0 0)",
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          ✱
        </div>
      </div>
    </div>
  );
}
