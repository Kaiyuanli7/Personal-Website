'use client'

import { useEffect, useRef } from 'react'
import { useCursor, TRAIL_COLORS } from '@/context/CursorContext'

interface Point {
  x: number
  y: number
  createdAt: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isHovering, trailColor, trailEnabled } = useCursor()
  const trailRef = useRef<Point[]>([])
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()
  const isMouseDownRef = useRef(false)

  if (!trailEnabled) return null;

  const TTL = 300
  const HELD_TTL = 800 // Longer duration when mouse is held
  const BASE_RADIUS = 2 // Increased from 1.5 to 2
  const MAX_SPEED = 60
  
  // Get color from context
  const getColors = () => {
    const colors = TRAIL_COLORS[trailColor] || TRAIL_COLORS.red;
    return {
      baseColor: colors[0],
      targetColor: colors[1]
    };
  };

  const colorFn = (mix: number) => {
    const { baseColor, targetColor } = getColors();
    return `rgb(${baseColor.map((color, i) => {
      return color + mix * (targetColor[i] - color)
    })})`;
  };

  const bezierTrail = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    let points: (Point | null)[] = [null, null, null, null]

    for (let i = 0; i < trailRef.current.length; i++) {
      let trailPoint = trailRef.current[i]
      points[0] = points[1]
      points[1] = points[2]
      points[2] = trailPoint

      if (points[0] === null || points[1] === null || points[2] === null) continue

      let lifeLeft = 1 - (Date.now() - trailPoint.createdAt) / (isMouseDownRef.current ? HELD_TTL : TTL)
      let radius = BASE_RADIUS * lifeLeft

      const p0 = points[0]
      const p1 = points[1]
      const p2 = points[2]

      const x0 = (p0.x + p1.x) / 2
      const y0 = (p0.y + p1.y) / 2

      const x1 = (p1.x + p2.x) / 2
      const y1 = (p1.y + p2.y) / 2

      ctx.beginPath()
      ctx.lineWidth = radius * 1.5
      ctx.lineCap = "round"

      let x = x1 - x0
      let y = y1 - y0

      let speed = Math.min(Math.sqrt(x * x + y * y), MAX_SPEED) / MAX_SPEED

      ctx.strokeStyle = colorFn(speed)

      ctx.moveTo(x0, y0)
      ctx.quadraticCurveTo(p1.x, p1.y, x1, y1)
      ctx.stroke()
    }
  }

  const currentPos = (ctx: CanvasRenderingContext2D) => {
    let lastSpeed = 0

    if (trailRef.current.length > 1) {
      let x = mousePosRef.current.x - trailRef.current[trailRef.current.length - 2].x
      let y = mousePosRef.current.y - trailRef.current[trailRef.current.length - 2].y
      lastSpeed = Math.min(Math.sqrt(x * x + y * y), MAX_SPEED) / MAX_SPEED
    }

    let timeSinceMoved = Math.min(
      trailRef.current.length > 1
        ? (Date.now() - trailRef.current[trailRef.current.length - 2].createdAt) / 1000
        : 1,
      1
    )

    ctx.beginPath()
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, BASE_RADIUS, 0, 2 * Math.PI, false)
    ctx.fillStyle = colorFn((1 - timeSinceMoved) * lastSpeed)
    ctx.fill()
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Filter trail points based on current TTL
    trailRef.current = trailRef.current.filter((tp) => 
      Date.now() - tp.createdAt < (isMouseDownRef.current ? HELD_TTL : TTL)
    )

    // Draw trail with blur
    ctx.filter = "blur(0.5px)"
    bezierTrail(ctx, canvas.width, canvas.height)
    currentPos(ctx)
    ctx.filter = "none"
    bezierTrail(ctx, canvas.width, canvas.height)
    currentPos(ctx)

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  const addPoint = (point: { x: number; y: number }) => {
    trailRef.current.push({
      x: point.x,
      y: point.y,
      createdAt: Date.now()
    })

    mousePosRef.current.x = point.x
    mousePosRef.current.y = point.y
  }

  useEffect(() => {
    // Don't initialize if trail is disabled
    if (!trailEnabled) return;
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set initial canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      addPoint({
        x: e.clientX,
        y: e.clientY
      })
    }

    // Handle mouse down
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left click only
        isMouseDownRef.current = true
      }
    }

    // Handle mouse up
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) { // Left click only
        isMouseDownRef.current = false
      }
    }

    // Handle touch movement
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      addPoint({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      })
    }

    // Handle window resize
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }, 250)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('resize', handleResize)

    // Start animation
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [trailColor, trailEnabled]) // Re-initialize when trail color or enabled state changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{
        opacity: 1,
        transition: 'opacity 0.3s ease'
      }}
    />
  )
} 