"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const GlowingEffect = ({
  spread = 120,
  glow = true,
  disabled = false,
  proximity = 32,
  inactiveZone = 0.01,
  initialX = 0,
  initialY = 0,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState({
    x: initialX,
    y: initialY,
  });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (disabled || !targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2)
      );

      const maxDistance = Math.sqrt(
        Math.pow(rect.width / 2 + proximity, 2) + Math.pow(rect.height / 2 + proximity, 2)
      );

      if (distance < maxDistance * inactiveZone) {
        // Inside the inactive zone, use the initial position
        setMousePosition({
          x: initialX,
          y: initialY,
        });
      } else if (distance < maxDistance) {
        // Inside the active zone
        setMousePosition({
          x: event.clientX - rect.left - rect.width / 2,
          y: event.clientY - rect.top - rect.height / 2,
        });
      } else {
        // Beyond the active zone, but we'll still adjust the effect
        const ratio = maxDistance / distance;
        setMousePosition({
          x: (event.clientX - centerX) * ratio,
          y: (event.clientY - centerY) * ratio,
        });
      }
    },
    [initialX, initialY, disabled, proximity, inactiveZone]
  );

  useEffect(() => {
    const element = targetRef.current?.parentElement?.parentElement;
    if (!element) return;

    const handleMouseLeave = () => {
      // Smoothly reset the position on mouse leave
      requestRef.current = requestAnimationFrame(() => {
        setMousePosition((prevPosition) => {
          const newX = prevPosition.x * 0.9;
          const newY = prevPosition.y * 0.9;

          if (Math.abs(newX) < 0.1 && Math.abs(newY) < 0.1) {
            cancelAnimationFrame(requestRef.current!);
            return { x: initialX, y: initialY };
          }

          return { x: newX, y: newY };
        });
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, initialX, initialY]);

  // Calculate percentage distance for glow intensity
  const moveX = mousePosition.x / spread;
  const moveY = mousePosition.y / spread;

  return (
    <div
      ref={targetRef}
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{
        "--x": `${moveX}`,
        "--y": `${moveY}`,
        "--glow-opacity": glow ? 1 : 0,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_calc(50%+calc(var(--x,0)*1px))_calc(50%+calc(var(--y,0)*1px)),hsl(var(--glow-hsl,217_100%_56.5%)/calc(var(--glow-opacity,0)*0.25))_10%,transparent_80%)]"
        style={{
          transform: `translateX(calc(var(--x, 0) * 1px)) translateY(calc(var(--y, 0) * 1px))`,
        }}
      />
      <div
        className="absolute inset-[-1px] rounded-[inherit] bg-[radial-gradient(circle_at_calc(50%+calc(var(--x,0)*1px))_calc(50%+calc(var(--y,0)*1px)),hsl(var(--glow-hsl,217_100%_56.5%)/calc(var(--glow-opacity,0)*1))_10%,transparent_80%)] opacity-0 blur-sm transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          transform: `translateX(calc(var(--x, 0) * 1px)) translateY(calc(var(--y, 0) * 1px))`,
        }}
      />
      <div className="absolute inset-0 rounded-[inherit]">
        <div
          className="h-full w-full rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at calc(50% + calc(var(--x, 0) * 1px)) calc(50% + calc(var(--y, 0) * 1px)), hsl(var(--glow-hsl, 217 100% 56.5%) / calc(var(--glow-opacity, 0) * 0.5)) 5%, transparent 50%), linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0)) 0% 0% / cover no-repeat`,
          }}
        />
      </div>
    </div>
  );
}; 