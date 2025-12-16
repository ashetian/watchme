"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";

interface ProjectsProps {
  className?: string;
}

export default function Projects({ className = "" }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      // Parallax Project Images & Entrance Animations
      const projectItems = document.querySelectorAll(".project-item");
      projectItems.forEach((item, index) => {
        const img = item.querySelector(".project-img");
        
        // Parallax Effect (Desktop only)
        if (window.innerWidth >= 768) {
          gsap.fromTo(img, 
            { y: "-20%" },
            {
              y: "20%",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }

        // Directional Entrance Animation
        gsap.from(item, {
          x: index % 2 === 0 ? -150 : 150,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects-section"
      ref={sectionRef}
      className={`relative min-h-screen-fix border-b border-white/50 w-full bg-black z-30 py-24 md:py-32 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-24 md:mb-32">
          <h2 
            ref={titleRef}
            className="font-unifraktur text-7xl md:text-9xl lg:text-[10rem] leading-none text-white mb-8 mix-blend-difference"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.3)" }}
          >
            Selected Works
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/20 pt-8">
            <p className="text-white/70 max-w-xl text-lg md:text-xl leading-relaxed">
              A collection of digital experiences where design meets function. 
            </p>
          </div>
        </div>

        {/* Parallax Projects List */}
        <div ref={projectsRef} className="flex flex-col gap-24 md:gap-48">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-item flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
            >
              {/* Image Container */}
              <Link href={`/projects/${project.id}`} className="w-full md:w-2/3 aspect-[4/3] md:aspect-[16/9] relative overflow-hidden border border-white/10 group cursor-pointer will-change-transform gpu">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="project-img absolute inset-0 w-full h-[140%] -top-[20%] will-change-transform">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Text Content */}
              <div className="w-full md:w-1/3 flex flex-col justify-center">
                <span className="text-white/50 font-mono text-sm mb-4 tracking-wider uppercase">
                  {String(index + 1).padStart(2, '0')} — {project.category}
                </span>
                <h3 className="font-unifraktur text-5xl md:text-7xl text-white mb-6 leading-none">
                  {project.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                <Link href={`/projects/${project.id}`} className="text-white uppercase tracking-widest text-sm font-bold flex items-center gap-2 group/btn w-max">
                  Details
                  <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
