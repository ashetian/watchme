import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - scrollPosition;
      
      // Calculate opacity: 0 when 100vh away, 1 when at bottom
      // We use window.innerHeight as the fade distance
      const opacity = Math.max(0, Math.min(1, 1 - (distanceFromBottom / window.innerHeight)));
      
      // Use set for immediate response during scroll, or a very quick tween
      gsap.to(containerRef.current, { opacity: opacity, duration: 0.1, overwrite: true });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-[#050505] text-white z-0 opacity-0 px-4"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center">
        <p className="text-white/50 font-mono text-sm md:text-base mb-8 uppercase tracking-widest">
          What's Next?
        </p>
        
        <a 
          href="mailto:caner19741@outlook.com"
          className="group relative inline-block"
        >
          <h2 className="font-unifraktur text-[20vw] md:text-[12vw] leading-[0.8] text-white mix-blend-difference hover:text-white/90 transition-colors duration-300">
            let's create
            <br />
            <span className="text-white/30 group-hover:text-white transition-colors duration-500">together</span>
          </h2>
        </a>

        <div className="mt-24 flex flex-col md:flex-row gap-8 md:gap-24 text-sm md:text-base font-mono text-white/50 uppercase tracking-wider">
          <a href="https://www.instagram.com/ashetian_/" className="hover:text-white hover:line-through transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/in/caner-gorez/" className="hover:text-white hover:line-through transition-colors">LinkedIn</a>
        </div>

        <div className="absolute bottom-8 text-white/20 text-xs font-mono">
          © 2025 ASHETIAN. ALL MILK RESERVED.
        </div>
      </div>
    </div>
  );
}
