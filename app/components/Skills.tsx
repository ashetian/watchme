"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { stackIcons } from "./StackSlider";

const CrossStar = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor"
  >
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

// Get unique stack items from all projects and add Nginx
const uniqueStack = Array.from(new Set([
  ...projects.flatMap(p => p.stack || []),
  "Nginx"
]));

// Map to icons, filtering out any missing ones
const allSkills = uniqueStack
  .map(tech => ({ name: tech, Icon: stackIcons[tech] }))
  .filter(item => item.Icon);

// Duplicate for seamless loop (4 sets to ensure enough width for large screens)
const marqueeSkills = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee Animation (Always running)
      const rows = document.querySelectorAll(".marquee-row");
      rows.forEach((row, i) => {
        const isLeft = i % 2 === 0;
        
        if (!isLeft) {
          gsap.set(row, { xPercent: -50 });
        }

        gsap.to(row, {
          xPercent: isLeft ? -50 : 0,
          ease: "none",
          duration: 30 + i * 5,
          repeat: -1,
        });
      });

      // Initial State
      gsap.set(marqueeRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(titleRef.current, { y: 0, opacity: 1 });
      gsap.set(".top-text-char", { opacity: 0, y: -20 }); // Initial state for new text
      gsap.set(".bottom-text-char", { opacity: 0, y: 20 }); // Initial state for new text

      // Scroll Reveal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // Increased scroll distance
          scrub: 1,
          pin: true,
        }
      });

      // 1. Reveal Marquee
      tl.to(titleRef.current, {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(marqueeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "<");

      // 2. Animate Top Text (L -> R)
      tl.fromTo(".top-text-char", 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 1, ease: "power2.out" }
      );

      // 3. Animate Bottom Text (R -> L)
      tl.fromTo(".bottom-text-char",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: -0.05, duration: 1, ease: "power2.out" }, // Negative stagger animates from last to first (Right to Left visually if DOM order is L->R)
        "-=0.5" // Overlap slightly
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const topText = "I use these technologies";
  const bottomText = "to build my apps";

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen-fix bg-transparent overflow-hidden z-20 flex items-center justify-center"
    >
      {/* Top Text */}
      <div className="absolute top-8 left-4 md:top-12 md:left-12 z-40 flex overflow-hidden mix-blend-difference">
        {topText.split("").map((char, i) => (
          <span key={i} className="top-text-char font-mono text-xl md:text-3xl text-white uppercase tracking-widest opacity-0 inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 right-4 md:bottom-12 md:right-12 z-40 flex overflow-hidden mix-blend-difference">
        {bottomText.split("").map((char, i) => (
          <span key={i} className="bottom-text-char font-mono text-xl md:text-3xl text-white uppercase tracking-widest opacity-0 inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Title Layer */}
      <div 
        ref={titleRef}
        className="relative z-20 flex items-center justify-center pointer-events-none mix-blend-difference"
      >
        {/* Decorative Stars */}
        <CrossStar className="absolute -top-8 -left-8 md:-top-16 md:-left-16 w-8 h-8 md:w-16 md:h-16 text-white animate-[spin_10s_linear_infinite]" />
        <CrossStar className="absolute -bottom-4 -right-4 md:-bottom-12 md:-right-12 w-6 h-6 md:w-12 md:h-12 text-white animate-[spin_8s_linear_infinite_reverse]" />
        <CrossStar className="absolute top-0 right-[20%] w-4 h-4 md:w-8 md:h-8 text-white/50 animate-pulse" />

        <h2 className="font-unifraktur text-[25vw] md:text-[15vw] leading-none text-white text-center text-wrap">
          My tech stack
        </h2>
      </div>

      {/* Marquee Layer */}
      <div 
        ref={marqueeRef}
        className="absolute inset-0 z-10 flex flex-col justify-center gap-12 md:gap-20 pointer-events-none mix-blend-difference rotate-[-20deg] scale-150"
      >
        {/* Reduced to 2 rows */}
        {[0, 1].map((rowIndex) => (
          <div 
            key={rowIndex} 
            className="marquee-row flex gap-12 md:gap-20 w-max"
          >
            {marqueeSkills.map(({ Icon }, i) => (
              <div 
                key={i}
                className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-white/50"
              >
                <Icon className="w-full h-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Background Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] bg-black/50 pointer-events-none z-0" />
    </section>
  );
}
