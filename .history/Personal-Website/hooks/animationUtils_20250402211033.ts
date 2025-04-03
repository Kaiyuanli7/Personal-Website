import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  animate, 
  useMotionTemplate, 
  useTransform, 
  useScroll 
} from 'framer-motion';

// Bundle animation utilities for dynamic importing
const animationUtils = {
  gsap,
  ScrollTrigger,
  animate,
  useMotionTemplate,
  useTransform,
  useScroll
};

export default animationUtils; 