"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import Link from "next/link";
import { GlowingEffect } from "./glowing-effect";

export function CodeCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card w-auto sm:w-[30rem] h-auto rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <CardItem
          translateZ="50"
          className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm"
        >
          <div className="text-2xl font-bold text-white mb-2">
            C:\Users\KaiyuanLi
          </div>
          <div
            className="text-white/80 text-sm max-w-sm mt-2 mb-5"
          >
            Command Prompt
          </div>
          
          <CardItem translateZ="100" className="w-full">
            <div className="bg-black/80 w-full rounded-xl p-4 h-[220px] overflow-hidden border border-white/10">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="text-blue-400 font-mono text-sm">
                <div className="mb-1">
                  <span className="text-pink-400">const</span> <span className="text-green-400">developer</span> = {"{"}
                </div>
                <div className="ml-4 mb-1">
                  <span className="text-green-400">name</span>: <span className="text-yellow-300">'Kaiyuan Li'</span>,
                </div>
                <div className="ml-4 mb-1">
                  <span className="text-green-400">skills</span>: [<span className="text-yellow-300">'JS'</span>, <span className="text-yellow-300">'Python'</span>, <span className="text-yellow-300">'Java'</span>],
                </div>
                <div className="ml-4 mb-1">
                  <span className="text-green-400">hobbies</span>: [<span className="text-yellow-300">'Music'</span>, <span className="text-yellow-300">'Gaming'</span>, <span className="text-yellow-300">'Coding'</span>]
                </div>
                <div>
                  {"}"};
                </div>
                
                {/* Animated cursor */}
                <div 
                  className="h-4 w-2 bg-white/70 inline-block ml-1 animate-pulse"
                  style={{ animationDuration: '1s' }}
                />
              </div>
            </div>
          </CardItem>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
} 