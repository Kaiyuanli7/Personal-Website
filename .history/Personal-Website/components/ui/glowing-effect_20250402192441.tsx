"use client";

import React, { useRef, useState, useEffect } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  className?: string;
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  className,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [radius, setRadius] = useState(spread);

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
      
      // If distance is less than inactiveZone, opacity is 0, otherwise it scales
      const calculatedOpacity = distancePercentage < inactiveZone 
        ? 0 
        : Math.min(1 - distancePercentage, 1);
      
      setPosition({ x, y });
      setOpacity(calculatedOpacity);
      
      // Adjust radius based on distance
      const dynamicRadius = spread * (1 + distancePercentage);
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
        className={`pointer-events-none absolute rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 ${
          glow ? "blur-xl" : "blur-md"
        }`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%)`,
          width: `${radius}%`,
          height: `${radius}%`,
          opacity: opacity,
          transition: "opacity 0.15s ease-out",
        }}
      />
    </div>
  );
} 