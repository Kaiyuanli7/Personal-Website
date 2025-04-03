"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AuroraBackground({
  children,
  className = "",
}: AuroraBackgroundProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!blurRef.current) return;

    const updateBlurPosition = () => {
      if (blurRef.current) {
        // Convert cursor position to percentage of window
        const x = (cursorPosition.x / windowSize.width) * 100;
        const y = (cursorPosition.y / windowSize.height) * 100;

        // Move the blur with a slight delay for smoother effect
        blurRef.current.style.transform = `translate(${x}%, ${y}%)`;
      }
    };

    updateBlurPosition();
  }, [cursorPosition, windowSize]);

  return (
    <div className={`h-screen w-full overflow-hidden bg-gray-950 ${className}`}>
      {/* Aurora effect container */}
      <div className="relative h-full w-full">
        {/* Base color gradient */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute -left-[50%] -top-[100%] h-[200%] w-[200%] animate-aurora-slow bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-fuchsia-500/30 opacity-70" />
          <div className="absolute -right-[50%] -top-[110%] h-[200%] w-[200%] animate-aurora-medium bg-gradient-to-bl from-blue-500/30 via-indigo-600/30 to-violet-600/30" />
          <div className="absolute -bottom-[80%] -left-[60%] h-[200%] w-[200%] animate-aurora-fast bg-gradient-to-tr from-blue-500/20 via-violet-600/20 to-purple-600/20" />
        </div>

        {/* Responsive blur that follows cursor */}
        <div 
          ref={blurRef}
          className="absolute left-0 top-0 h-[50vh] w-[50vh] rounded-full bg-blue-500/10 opacity-40 blur-3xl transition-transform duration-1000 ease-out"
        />
        
        {/* Glowing spots */}
        <div className="absolute left-1/4 top-1/4 h-[30vh] w-[30vh] animate-pulse-slow rounded-full bg-blue-500/20 opacity-40 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[25vh] w-[25vh] animate-pulse-slow rounded-full bg-purple-500/20 opacity-30 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-[35vh] w-[35vh] animate-pulse-medium rounded-full bg-violet-500/20 opacity-30 blur-3xl" />

        {/* Content container */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
} 