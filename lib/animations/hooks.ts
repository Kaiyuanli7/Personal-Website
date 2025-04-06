import { useState, useEffect, useRef } from 'react';
import { useInView, useAnimate, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Hook for text reveal animation
export function useTextReveal() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        { 
          opacity: 1,
          y: 0
        },
        { 
          duration: 0.5,
          delay: stagger(0.025),
          ease: [0.33, 1, 0.68, 1]  
        }
      );
    }
  }, [isInView, animate]);
  
  return { scope, isInView };
}

// Hook for getting mouse position
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}

// Hook for parallax effect based on mouse movement
export function useParallax(strength: number = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const moveHandler = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized position (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normalizedY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      setPosition({
        x: normalizedX * strength,
        y: normalizedY * strength
      });
    };
    
    window.addEventListener('mousemove', moveHandler);
    
    return () => {
      window.removeEventListener('mousemove', moveHandler);
    };
  }, [strength]);
  
  return { ref, x: position.x, y: position.y };
}

// Utility for staggered animations
function stagger(duration: number = 0.05) {
  return (i: number) => i * duration;
}

// Export animation hooks from framer-motion for convenience
export { useInView, useAnimate, useMotionValue, useSpring, useTransform }; 