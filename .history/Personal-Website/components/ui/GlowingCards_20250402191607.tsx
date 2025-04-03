"use client";

import Link from "next/link";
import React from "react";
import { GlowingEffect } from "./glowing-effect";

interface GridItemProps {
  area: string;
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  link: string;
  linkText: string;
}

export const GridItem = ({ area, icon, title, description, link, linkText }: GridItemProps) => {
  return (
    <li className={`min-h-[16rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border border-white/10 p-2 group/glow md:rounded-3xl md:p-3 bg-gray-950">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <Link href={link} className="block h-full">
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 p-6 bg-black/40 backdrop-blur-sm">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              {icon && (
                <div className="w-fit rounded-lg border border-white/20 p-2">
                  {icon}
                </div>
              )}
              <div className="space-y-3">
                <h3 className="pt-0.5 text-2xl/[1.375rem] font-bold font-sans tracking-tight md:text-3xl/[1.875rem] text-balance text-white">
                  {title}
                </h3>
                <p className="font-sans text-sm/[1.325rem] md:text-base/[1.375rem] text-white/70">
                  {description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-start">
                <span className="text-white group-hover/glow:text-blue-400 transition-colors duration-300">
                  {linkText} →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};

export function GlowingCardsGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-1 lg:gap-6 max-w-7xl mx-auto">
      <GridItem
        area="md:[grid-area:1/1/2/7]"
        title="Professional"
        description="A clean, traditional portfolio showcasing my experience, skills, and achievements in a formal manner."
        link="/professional"
        linkText="View Professional Portfolio"
      />

      <GridItem
        area="md:[grid-area:1/7/2/13]"
        title="Casual"
        description="An experimental, interactive experience with modern animations and creative design elements."
        link="/casual"
        linkText="View Casual Portfolio"
      />
    </ul>
  );
} 