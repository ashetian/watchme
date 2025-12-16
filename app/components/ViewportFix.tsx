"use client";

import { useEffect } from "react";

export default function ViewportFix() {
  useEffect(() => {
    // Store width to detect orientation changes vs scroll-induced resizes
    let width = window.innerWidth;

    const setVh = () => {
      // Only update if width changes (orientation change or desktop resize)
      // This prevents jumpy resizing when mobile address bar shows/hides
      if (window.innerWidth !== width) {
        width = window.innerWidth;
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
    };

    // Initial set (always run once)
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);
  }, []);

  return null;
}
