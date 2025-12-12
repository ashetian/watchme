"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    { id: 1, title: "Project Alpha", category: "Web Design", image: "/bg.jpg" },
    { id: 2, title: "Project Beta", category: "Development", image: "/bg.jpg" },
    { id: 3, title: "Project Gamma", category: "Branding", image: "/bg.jpg" },
    { id: 4, title: "Project Delta", category: "Mobile App", image: "/bg.jpg" },
    { id: 5, title: "Project Epsilon", category: "UI/UX", image: "/bg.jpg" },
    { id: 6, title: "Project Zeta", category: "Strategy", image: "/bg.jpg" },
    { id: 7, title: "Project Eta", category: "Web Design", image: "/bg.jpg" },
    { id: 8, title: "Project Theta", category: "Development", image: "/bg.jpg" },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 md:mb-24 pt-8">
          <Link 
            href="/"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="uppercase tracking-wider text-sm">Back</span>
          </Link>
          
          <h1 className="font-unifraktur text-4xl md:text-6xl">All Projects</h1>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card group relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs font-mono text-white/60 mb-2 block tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h2 className="font-unifraktur text-2xl md:text-3xl leading-none">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center text-white/40 text-sm">
          <p>More works coming soon.</p>
        </div>
      </div>
    </main>
  );
}
