"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ViewportFix() {
  useEffect(() => {
    let ticking = false;
    let refreshTimeout: NodeJS.Timeout;

    const setVh = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty("--vh", `${vh}px`);
          ticking = false;
        });
        ticking = true;
      }

      // Debounce ScrollTrigger refresh to avoid jumps during resize
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    // Initial set
    setVh();

    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return null;
}
