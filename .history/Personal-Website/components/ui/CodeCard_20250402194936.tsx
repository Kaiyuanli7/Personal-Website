"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import Link from "next/link";

export function CodeCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-black/90 relative group/card border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-white mb-2"
        >
          C:\Users\KaiyuanLi
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-white/80 text-sm max-w-sm mt-2 mb-5"
        >
          Command Prompt
        </CardItem>
        
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
                <span className="text-green-400">hobbies</span>: [<span className="text-yellow-300">'Music'</span>, <span className="text-yellow-300">'Python'</span>, <span className="text-yellow-300">'Java'</span>]
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

      </CardBody>
    </CardContainer>
  );
} 