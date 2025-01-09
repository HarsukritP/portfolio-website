"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
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
      {/* Add fading edges */}
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

export function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-24 mt-24">
      <div className="mb-16 flex flex-col items-center">
        <div className="relative mb-12 h-40 w-40 overflow-hidden rounded-full bg-primary sm:h-56 sm:w-56">
          <Image
            src="./Portrait.PNG"
            alt="Harsukrit Pall"
            fill
            className="object-cover object-top"
          />
        </div>
        <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">About Me</h2>
        <div className="prose prose-lg dark:prose-invert text-center max-w-2xl">
          <p className="py-10">
            I am a dedicated Computer Engineer at UW with a specific interest in 
            blending software, hardware, and AI technologies to create 
            intuitive and impactful solutions. My passion lies in turning 
            complex challenges into elegant systems through a combination 
            of technical precision and artistic thinking.
          </p>

          <p>
            I attribute my passion and inspiration for making impactful software and 
            hardware solutions to the inspiring pieces of media around me all throughout 
            my life. This includes everything from my note-taking app, to my favourite 
            video games.
          </p>

          <p className="py-10">
            My goal is to create creative yet practical applications and 
            projects that make a real difference while continually growing 
            as an engineer at the University of Waterloo.
          </p>

          <p>
            In my freetime, I spend my time listening to music, playing video 
            games, at the gym, or spending time with friends.
          </p>
        </div>
      </div>
      
      <h3 className="mb-12 text-center text-2xl font-semibold sm:text-3xl">Tech Stack</h3>
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

