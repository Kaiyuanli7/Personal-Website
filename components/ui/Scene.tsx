'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Suspense>
    </Canvas>
  )
} 