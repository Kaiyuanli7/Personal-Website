// Animation helpers
export type Direction = 'up' | 'down' | 'left' | 'right';

// Fade animation variants for Framer Motion
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Slide animation variants for Framer Motion
export const slideVariants = (direction: Direction = 'up', distance: number = 20) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return {
    hidden: { 
      ...directions[direction], 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      ...directions[direction], 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
}; 