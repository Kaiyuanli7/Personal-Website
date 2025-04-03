"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AuroraBackground({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-gray-950",
        containerClassName
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blobs */}
        <div 
          className="aurora-blob-1 absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full 
                      bg-blue-500/20 blur-[100px] animate-aurora-slow"
        />
        <div 
          className="aurora-blob-2 absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full 
                      bg-purple-500/20 blur-[100px] animate-aurora-medium"
        />
        <div 
          className="aurora-blob-3 absolute top-[30%] right-[30%] w-[400px] h-[400px] rounded-full 
                      bg-fuchsia-500/20 blur-[100px] animate-aurora-fast"
        />
        <div 
          className="aurora-blob-4 absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full 
                      bg-sky-500/20 blur-[100px] animate-aurora-medium-reverse"
        />
      </div>

      <div 
        className="absolute inset-0 bg-gray-950 [mask-image:radial-gradient(transparent,white)] opacity-90"
      />
      
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
} 