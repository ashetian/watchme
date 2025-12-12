"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - below viewport
      gsap.set(contentRef.current, { y: 100, opacity: 0 });
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });

      // Parallax entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      });

      tl.to(contentRef.current, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
      });

      // Title and text reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          });
          gsap.to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
          });
        },
        once: true,
      });

      // Marquee animation
      gsap.to(".marquee-row", {
        xPercent: -50,
        repeat: -1,
        duration: 50,
        ease: "linear",
      });

      // Masonry animation
      const masonryItems = document.querySelectorAll(".masonry-item");
      if (masonryItems.length > 0) {
        // Premium Entrance Animation
        gsap.fromTo(masonryItems, 
          { 
            y: 120, 
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 65%",
            }
          }
        );

        // Refined Parallax effect for masonry columns
        gsap.to(".masonry-col-odd", {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });

        gsap.to(".masonry-col-even", {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const masonryImages = [
    { height: "h-72", src: "/masonry/image2.png", alt: "Project 2" },
    { height: "h-64", src: "/masonry/image3.png", alt: "Project 3" },
    { height: "h-72", src: "/masonry/image1.png", alt: "Project 1" },
    { height: "h-84", src: "/masonry/image4.png", alt: "Project 4" },
  ];

  return (
    <section 
      ref={sectionRef}
      className={`relative h-[100dvh] overflow-hidden w-full bg-black z-30 ${className}`}
    >
      {/* Scrollable Content Wrapper */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* Fullscreen Text Loop */}
        <div className="w-full flex items-center justify-center overflow-hidden relative py-6 md:py-12 mb-4 md:mb-8">
          <div className="absolute inset-0 flex flex-col justify-center">
            {/* Marquee Row 1 */}
            <div className="marquee-row h-auto flex whitespace-nowrap w-max will-change-transform">
              {[...Array(8)].map((_, i) => (
                <span 
                  key={i}
                  className="font-unifraktur text-[4vh] md:text-[10vh] leading-none text-white/10 px-2 md:px-6 will-change-transform"
                  style={{ 
                    WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                    color: "transparent"
                  }}
                >
                  ASHETIAN ✱ MILK ✱ 
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={contentRef} className="max-w-7xl mx-auto will-change-transform px-4 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="sticky top-4 md:top-32">
            <h2 
              ref={titleRef}
              className="font-unifraktur text-4xl md:text-7xl lg:text-9xl leading-none text-white/90 mb-4 md:mb-12 will-change-transform relative -ml-1 md:-ml-8 lg:-ml-12"
              style={{
                textShadow: "0 10px 30px rgba(255,255,255,0.1)",
                mixBlendMode: "difference"
              }}
            >
              About Me
            </h2>
            
            <div ref={textRef} className="text-white/60 text-[10px] md:text-base max-w-xl will-change-transform pl-3 md:pl-12 border-l border-white/20">
              <p className="mb-3 md:mb-6 leading-relaxed">
                I’m a creative developer and designer focused on pushing the boundaries of what digital experiences can be.
              </p>
              <p className="leading-relaxed">
                For me, every project is an exploration—a chance to combine aesthetics, technology, and storytelling into something that feels intentional and unique.
                I’m driven by minimalism, clarity, and an obsession with detail.
                I build with purpose, design with attitude.
              </p>
            </div>
          </div>

          {/* Right Column: Animated Masonry */}
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide flex gap-3 pb-4">
            {masonryImages.map((item, i) => (
              <div 
                key={`mobile-${i}`}
                className={`relative flex-shrink-0 w-32 ${item.height} backdrop-blur-sm border border-white/10 rounded-none overflow-hidden`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            ))}
          </div>

          {/* Desktop: Vertical Grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 relative">
            <div className="flex flex-col gap-4 masonry-col-odd pt-8">
              {masonryImages.slice(0, 2).map((item, i) => (
                <div 
                  key={`odd-${i}`}
                  className={`masonry-item relative w-full ${item.height} backdrop-blur-sm border border-white/10 rounded-none transition-colors duration-500 hover:bg-white/20 overflow-hidden`}
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
                  className={`masonry-item relative w-full ${item.height} backdrop-blur-sm border border-white/10 rounded-none transition-colors duration-500 hover:bg-white/20 overflow-hidden`}
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
    </section>
  );
}
