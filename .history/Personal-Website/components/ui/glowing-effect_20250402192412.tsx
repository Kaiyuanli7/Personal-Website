"use client";

import { useState, useEffect, useRef } from 'react';
import { useSpring, animated, to as interpolate } from '@react-spring/web';

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export function GlowingEffect({
  spread = 80,
  glow = false,
  disabled = false,
  proximity = 100,
  inactiveZone = 0.05,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // State to track if cursor is outside the element
  const [isOutside, setIsOutside] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    function onMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      
      // Calculate normalized position (0 to 1) within the element
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const normalizedY = (e.clientY - rect.top) / rect.height;
      
      // Check if cursor is outside or within inactive zone
      const isInactiveX = normalizedX < inactiveZone || normalizedX > (1 - inactiveZone);
      const isInactiveY = normalizedY < inactiveZone || normalizedY > (1 - inactiveZone);
      
      if (isInactiveX || isInactiveY) {
        setIsOutside(true);
        return;
      } else {
        setIsOutside(false);
      }

      // Calculate position within the element
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      api.start({ x, y, immediate: false });
    }

    function onMouseEnter() {
      setIsHovered(true);
    }

    function onMouseLeave() {
      setIsHovered(false);
      setIsOutside(true);
    }

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (!container) return;
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [api, disabled, inactiveZone]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <animated.div
        className="absolute left-0 top-0 -z-10 h-full w-full"
        style={{
          maskImage: !disabled ? 'radial-gradient(circle, black, transparent)' : undefined,
          maskSize: !disabled ? `${spread * 2}px ${spread * 2}px` : undefined,
          maskPosition: !disabled && !isOutside
            ? interpolate([x, y], (x: number, y: number) => `${x - spread}px ${y - spread}px`)
            : undefined,
          maskRepeat: 'no-repeat',
          background: glow
            ? `radial-gradient(circle at center, rgba(179, 171, 242, 0.8) 0%, rgba(134, 218, 250, 0.6) 25%, rgba(170, 142, 245, 0.4) 50%, rgba(145, 232, 225, 0.3) 75%, transparent 100%)`
            : undefined,
          opacity: isHovered && !isOutside ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />
    </div>
  );
} 