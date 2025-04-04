"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

// Project placeholder data
const projectTitles = [
  "AI Assistant", "Data Visualization", "E-Commerce Platform", 
  "Mobile App", "Cloud Solution", "Web Dashboard", 
  "Blockchain App", "IoT System", "AR Experience",
  "Machine Learning", "Portfolio Site", "Social Network"
];

// Gradient colors for cards
const gradients = [
  "from-blue-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-blue-600"
];

export const ThreeDMarquee = ({
  cardCount = 12,
  className,
}: {
  cardCount?: number;
  className?: string;
}) => {
  // Create a placeholder array of the specified length
  const placeholders = Array.from({ length: cardCount }, (_, i) => i.toString());
  
  // Split the placeholders array into 4 equal parts
  const chunkSize = Math.ceil(placeholders.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return placeholders.slice(start, start + chunkSize);
  });
  
  // Direction and phase for each column's animation
  const columnDirections = [1, -1, 1, -1]; // Alternating up/down pattern

  return (
    <div
      className={cn(
        "mx-auto block h-[1200px] w-full relative",
        className,
      )}
    >
      {/* Main container with flexbox centering */}
      <div className="w-full h-full flex items-center justify-center">
        {/* Size wrapper for the 3D scene */}
        <div className="w-full h-full relative flex items-center justify-center">
          {/* 3D transformation container */}
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="absolute grid w-[100%] h-[100%] origin-center grid-cols-4 gap-4 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ 
                  y: colIndex % 2 === 0 ? [0, 100, 0] : [0, -100, 0] 
                }}
                transition={{
                  duration: colIndex % 2 === 0 ? 15 : 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-6 w-full"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((_, placeholderIndex) => {
                  // Get a project title and gradient
                  const titleIndex = colIndex * chunkSize + placeholderIndex;
                  const projectTitle = projectTitles[titleIndex % projectTitles.length];
                  const gradient = gradients[titleIndex % gradients.length];
                  
                  return (
                    <div className="relative w-full h-full" key={placeholderIndex + "-" + colIndex}>
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      <motion.div
                        initial={{ scale: 0.85, y: 0 }}
                        whileHover={{
                          y: -25,
                          boxShadow: "0 30px 35px -10px rgba(0, 0, 0, 0.4)",
                          zIndex: 10,
                          scale: 0.85
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        className="w-full h-full relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20"
                        style={{
                          aspectRatio: "16/9",
                          perspective: "1000px",
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                        />
                        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-white/10 p-3 bg-black/40 backdrop-blur-sm">
                          {/* Website-like header */}
                          <div className="flex justify-between items-center mb-2 border-b border-white/20 pb-1">
                            <div className="text-white font-bold text-sm">{projectTitle}</div>
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            </div>
                          </div>
                          
                          {/* Website-like content */}
                          <div className="flex-grow">
                            {/* Navigation bar */}
                            <div className="flex space-x-3 mb-2">
                              <div className="bg-white/10 h-2 w-10 rounded-sm"></div>
                              <div className="bg-white/10 h-2 w-8 rounded-sm"></div>
                              <div className="bg-white/10 h-2 w-12 rounded-sm"></div>
                            </div>
                            
                            {/* Hero section */}
                            <div className="bg-white/10 h-12 w-full rounded-sm mb-2"></div>
                            
                            {/* Content blocks */}
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div className="bg-white/10 h-8 rounded-sm"></div>
                              <div className="bg-white/10 h-8 rounded-sm"></div>
                            </div>
                            
                            <div className="bg-white/10 h-6 w-3/4 rounded-sm"></div>
                          </div>
                          
                          <div className="flex justify-between items-end mt-2">
                            <div className="text-white/80 text-sm">Coming Soon</div>
                            <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white">Project</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};