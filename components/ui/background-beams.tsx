"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const beams = beamsRef.current
    if (!beams) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = beams.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      beams.style.setProperty("--x", `${x}px`)
      beams.style.setProperty("--y", `${y}px`)
    }

    beams.addEventListener("mousemove", handleMouseMove)
    return () => {
      beams.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={beamsRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      <div
        className="absolute left-[var(--x)] top-[var(--y)] h-56 w-56 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-purple-500/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--purple-500) 0%, transparent 50%, transparent 100%)",
        }}
      />
    </div>
  )
}

