"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AuroraBackground = ({
  className,
  children,
}: AuroraBackgroundProps) => {
  return (
    <div className={cn(
      'h-full w-full overflow-hidden bg-black flex items-center justify-center relative',
      className
    )}>
      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Violet purple blob */}
        <motion.div
          className="absolute top-[-20%] left-[20%] h-[40%] w-[30%] rounded-full bg-[#7000FF] opacity-[0.15] blur-[100px] animate-aurora-slow"
          style={{ 
            filter: 'blur(100px)',
          }}
        />
        {/* Teal blob */}
        <motion.div
          className="absolute top-[60%] left-[55%] h-[30%] w-[25%] rounded-full bg-[#00FFFF] opacity-[0.2] blur-[100px] animate-aurora-medium"
          style={{ 
            filter: 'blur(100px)',
          }}
        />
        {/* Pink blob */}
        <motion.div
          className="absolute top-[40%] left-[15%] h-[35%] w-[40%] rounded-full bg-[#FF00FF] opacity-[0.15] blur-[100px] animate-aurora-medium-reverse"
          style={{ 
            filter: 'blur(100px)',
          }}
        />
        {/* Blue blob */}
        <motion.div
          className="absolute top-[25%] left-[60%] h-[40%] w-[35%] rounded-full bg-[#0066FF] opacity-[0.15] blur-[100px] animate-aurora-fast"
          style={{ 
            filter: 'blur(100px)',
          }}
        />
        {/* Green blob */}
        <motion.div
          className="absolute top-[60%] left-[10%] h-[30%] w-[30%] rounded-full bg-[#00FF66] opacity-[0.15] blur-[100px] animate-aurora-slow"
          style={{ 
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Mask layer for radial gradient effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #000000 80%)',
          mixBlendMode: 'overlay',
          opacity: 0.8,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground; 