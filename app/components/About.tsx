"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";

interface AboutProps {
  className?: string;
}

export default function About({ className = "" }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mobileImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const masonryImages = [
    { height: "h-72", src: "/masonry/image2.png", alt: "Project 2" },
    { height: "h-64", src: "/masonry/image3.png", alt: "Project 3" },
    { height: "h-72", src: "/masonry/image1.png", alt: "Project 1" },
    { height: "h-84", src: "/masonry/image4.png", alt: "Project 4" },
  ];

  const [bgStyles, setBgStyles] = useState<{ top: string; left: string; transform: string }[]>([]);

  useEffect(() => {
    setBgStyles(
      masonryImages.map(() => ({
        top: `${Math.random() * 60 + 10}%`,
        left: `${Math.random() * 40 + 10}%`,
        transform: `rotate(${Math.random() * 20 - 10}deg)`
      }))
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        // Initial state
        gsap.set(contentRef.current, { opacity: 0 });
        gsap.set(titleRef.current, { opacity: 0 });
        gsap.set(textRef.current, { opacity: 0 });
        gsap.set(".masonry-item", { opacity: 0, scale: 0.9 });

        // Marquee animation (always running)
        gsap.to(".about-marquee-row", {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });

        // Main Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isDesktop ? "+=300%" : "+=200%", // Enable scrubbing on mobile
            scrub: 1,
            pin: true, // Enable pinning on mobile
          }
        });

        // 1. Content entrance
        tl.to(contentRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
        // 2. Title reveal
        .to(titleRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, "-=0.5")
        // 3. Text reveal
        .to(textRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, "-=0.5");

        // Desktop: Masonry images one by one
        if (isDesktop) {
          const masonryItems = gsap.utils.toArray(".masonry-item", sectionRef.current);
          masonryItems.forEach((item: any, i) => {
            tl.to(item, {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power4.out",
            }, `-=${i === 0 ? 0 : 0.5}`);
          });

          // Parallax effect for masonry columns (desktop only)
          gsap.to(".masonry-col-odd", {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          });

          gsap.to(".masonry-col-even", {
            y: 60,
            ease: "none",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          });
        } else {
          // Mobile: Simple fade in for all items together
          tl.to(".masonry-item", {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          }, "-=0.5");

          // Mobile: Background images one by one using refs
          const mobileImages = mobileImagesRef.current.filter(Boolean);
          if (mobileImages.length > 0) {
            mobileImages.forEach((img, i) => {
              tl.to(img, {
                opacity: 0.6,
                scale: 1,
                duration: 1.5,
                ease: "power3.out",
              }, 1 + i * 0.5);
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative h-screen-fix overflow-hidden w-full bg-black z-30 isolation-isolate ${className}`}
    >
      {/* Content Wrapper */}
      <div className="h-full w-full relative flex flex-col md:block">
        
        {/* Mobile Background Images */}
        <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {masonryImages.map((item, i) => (
            <div 
              key={`mobile-bg-${i}`}
              ref={(el) => { mobileImagesRef.current[i] = el; }}
              className="absolute"
              style={{
                opacity: 0,
                scale: 0.8,
                top: bgStyles[i]?.top || '50%',
                left: bgStyles[i]?.left || '50%',
                width: '45%',
                height: '35%',
                transform: bgStyles[i]?.transform || 'none',
                filter: 'brightness(0.5)',
              }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        {/* Fullscreen Text Loop */}
        <div className="w-full flex-none flex items-center justify-center overflow-hidden relative py-6 md:py-12 mb-4 md:mb-8 z-10">
          {/* Marquee Row 1 */}
          <div className="about-marquee-row h-auto flex whitespace-nowrap w-max will-change-transform">
            {[...Array(8)].map((_, i) => (
              <span 
                key={i}
                className="font-unifraktur text-[10vh] md:text-[20vh] leading-none px-8 md:px-16 will-change-transform gpu"
                style={{ 
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
                  color: "transparent"
                }}
              >
                ASHETIAN ✱ MILK ✱ 
              </span>
            ))}
          </div>
        </div>

        <div ref={contentRef} className="flex-1 flex items-center md:block max-w-7xl mx-auto w-full px-4 md:px-8 pb-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Left Column: Text Content */}
            <div className="relative z-20">
              <h2 
                ref={titleRef}
                style={{
                  textShadow: "0 10px 30px rgba(255,255,255,0.1)",
                  // Remove mix-blend-mode on mobile for performance
                  mixBlendMode: "normal" 
                }}
                className="font-unifraktur text-6xl md:text-7xl lg:text-9xl leading-none text-white/90 mb-6 md:mb-12 will-change-transform relative -ml-1 md:-ml-8 lg:-ml-12 md:mix-blend-difference"
              >
                About Me
              </h2>
              
              <div ref={textRef} className="text-white/70 text-sm md:text-base max-w-xl will-change-transform pl-3 md:pl-12 border-l border-white/20 backdrop-blur-none bg-transparent p-0">
                <p className="mb-4 md:mb-6 leading-relaxed">
                  I’m a creative developer and designer focused on pushing the boundaries of what digital experiences can be.
                </p>
                <p className="leading-relaxed">
                  For me, every project is an exploration—a chance to combine aesthetics, technology, and storytelling into something that feels intentional and unique.
                  I’m driven by minimalism, clarity, and an obsession with detail.
                  I build with purpose, design with attitude.
                </p>
              </div>
            </div>

            {/* Desktop: Vertical Grid */}
            <div className="hidden md:grid grid-cols-2 gap-4 relative">
              <div className="flex flex-col gap-4 masonry-col-odd pt-8">
                {masonryImages.slice(0, 2).map((item, i) => (
                  <div 
                    key={`odd-${i}`}
                    className={`masonry-item relative w-full ${item.height} border border-white/10 rounded-none transition-colors duration-500 hover:bg-white/20 overflow-hidden`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 masonry-col-even">
                {masonryImages.slice(2, 4).map((item, i) => (
                  <div 
                    key={`even-${i}`}
                    className={`masonry-item relative w-full ${item.height} border border-white/10 rounded-none transition-colors duration-500 hover:bg-white/20 overflow-hidden`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
