"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TechItem {
  name: string
  category: string
}

const techStack: TechItem[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "TailwindCSS", category: "Frontend" },
  { name: "HTML | CSS", category: "Frontend" },
  { name: "C++", category: "Backend" },
  { name: "C", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "JavaScript", category: "Backend" },
  { name: "Tensorflow", category: "Backend" },
  { name: "NumPy", category: "Backend" },
  { name: "Matplotlib", category: "Backend" },
  { name: "Figma", category: "Tools" },
  { name: "FreeRTOS", category: "Tools" },
  { name: "I2C", category: "Tools" },
  { name: "SPI", category: "Tools" },
  { name: "CMake", category: "Tools" },
]

const groupedTechStack = techStack.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = []
  }
  acc[item.category].push(item)
  return acc
}, {} as Record<string, TechItem[]>)

const RotatingTechStack: React.FC<{ items: TechItem[], speed?: number, reverse?: boolean }> = ({ items, speed = 20, reverse = false }) => {
  const itemWidth = 200;
  const totalWidth = items.length * itemWidth;

  return (
    <div className="relative h-24 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>

      <motion.div
        className="flex absolute left-0 top-0 h-full"
        animate={{
          x: reverse ? [`-${totalWidth}px`, `0px`] : [`0px`, `-${totalWidth}px`]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: items.length * speed,
            ease: "linear"
          }
        }}
      >
        {[...items, ...items].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0"
            style={{ width: `${itemWidth}px` }}
          >
            <div className="mx-2 h-full relative overflow-hidden rounded-lg bg-muted/80 backdrop-blur-sm p-4 text-center shadow-sm flex flex-col justify-center group">
              <div className="relative z-10">
                <h4 className="font-semibold text-lg">{tech.name}</h4>
                <p className="text-sm text-muted-foreground">{tech.category}</p>
              </div>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function TechStack() {
  return (
    <section id="tech-stack" className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">Tech Stack</h2>
      <div className="space-y-12">
        {Object.entries(groupedTechStack).map(([category, items], index) => (
          <div key={category} className="flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto overflow-hidden">
              <RotatingTechStack 
                items={items} 
                speed={index === 1 ? 15 : 20} 
                reverse={index === 1}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
