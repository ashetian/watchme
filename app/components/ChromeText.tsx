"use client";

import { useEffect, useState } from "react";

interface ChromeTextProps {
  text: string;
  className?: string;
}

export default function ChromeText({ text, className = "" }: ChromeTextProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setTime(t => t + 0.016);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* SVG Filter for liquid distortion */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed="5"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01;0.02;0.01"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="6;10;6"
                dur="4s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* Glass text with backdrop blur - distorts background */}
      <h1
        className="font-unifraktur text-6xl md:text-8xl lg:text-9xl text-center relative"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px) saturate(1.5)",
          WebkitBackdropFilter: "blur(8px) saturate(1.5)",
          filter: "url(#liquid-distort)",
          textShadow: `
            0 0 10px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.4),
            0 0 40px rgba(255, 255, 255, 0.3),
            0 0 60px rgba(255, 255, 255, 0.2),
            0 0 80px rgba(255, 255, 255, 0.1),
            0 0 100px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {text}
      </h1>

      {/* Strong glow layer */}
      <h1
        className="font-unifraktur text-6xl md:text-8xl lg:text-9xl text-center absolute inset-0 pointer-events-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "3px rgba(255, 255, 255, 0.4)",
          filter: "blur(8px)",
          opacity: 0.7 + Math.sin(time * 2) * 0.2,
        }}
      >
        {text}
      </h1>

      {/* Outer glow pulse */}
      <h1
        className="font-unifraktur text-6xl md:text-8xl lg:text-9xl text-center absolute inset-0 pointer-events-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "4px rgba(255, 255, 255, 0.2)",
          filter: "blur(20px)",
          opacity: 0.5 + Math.sin(time * 1.5) * 0.3,
        }}
      >
        {text}
      </h1>
    </div>
  );
}
