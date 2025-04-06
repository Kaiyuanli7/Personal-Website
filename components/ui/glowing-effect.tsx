"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  className?: string;
}

export function GlowingEffect({
  spread = 60,
  glow = true,
  disabled = false,
  proximity = 100,
  inactiveZone = 0.01,
  className,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [radius, setRadius] = useState(spread);
  const { theme } = useTheme();

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Calculate the distance from the mouse to the center of the container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceToCenter = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      // Max distance is half the diagonal of the container
      const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
      
      // If we're outside the proximity zone, fade out
      if (distanceToCenter > maxDistance + proximity) {
        setOpacity(0);
        return;
      }

      // Calculate relative position within the container
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Calculate the distance as a percentage of the max distance
      const distancePercentage = Math.min(distanceToCenter / (maxDistance + proximity), 1);
      
      // More gentle opacity falloff for a more diffused look
      const calculatedOpacity = distancePercentage < inactiveZone 
        ? 0 
        : Math.min(0.8 * (1 - distancePercentage), 0.8); // Capped at 0.8 for softer effect
      
      setPosition({ x, y });
      setOpacity(calculatedOpacity);
      
      // Make the radius larger and more consistent
      const dynamicRadius = spread * (1.3 + 0.5 * distancePercentage);
      setRadius(dynamicRadius);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, proximity, inactiveZone, spread]);

  if (disabled) return null;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden rounded-2.5xl ${className}`}
    >
      <div
        className={`pointer-events-none absolute rounded-full transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-tr from-blue-600/70 via-indigo-500/60 to-purple-500/70" 
            : "bg-gradient-to-tr from-blue-500/60 via-indigo-400/50 to-purple-400/50"
        } ${
          glow ? "blur-3xl" : "blur-2xl"
        }`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%)`,
          width: `${radius}%`,
          height: `${radius}%`,
          opacity: opacity,
          transition: "opacity 0.25s ease-out, width 0.2s ease-out, height 0.2s ease-out", // Smoother transitions
        }}
      />
    </div>
  );
} 