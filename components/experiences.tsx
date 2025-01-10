"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Experience {
  title: string
  company: string
  description: string[]
  icon: React.ReactNode
  tools: string[]
}

const experiences: Experience[] = [
  { 
    title: "Programming & Game Development Instructor",
    company: "Code Ninjas",
    description: [
      "Worked with a team to teach game development, robotics, and programming fundamentals",
      "Used proprietary platforms such as Unity, MakeCode, and VSCode",
      "Instructed over 200 students of various ages",
      "Developed custom curriculum to engage and challenge students"
    ],
    icon: "💻",
    tools: ["Unity", "MakeCode", "VSCode"]
  },
  { 
    title: "Financial Officer",
    company: "WilderCare",
    description: [
      "Co-founded a non-profit organization supporting the Oakville Milton Humane Society",
      "Spearheaded revenue generation through bracelet sales and React-based website development",
      "Implemented social media marketing strategies, resulting in 40% growth in online engagement",
      "Managed financial transactions, expense reports, and fundraising events",
      "Helped secure over $1,000 in donations for the organization"
    ],
    icon: "💰",
    tools: ["React", "Social Media", "Financial Management"]
  },
  { 
    title: "Programmer",
    company: "Orbit Robotics",
    description: [
      "Contributed to the team's success in the FIRST Robotics Competition at the regional level",
      "Designed and optimized firmware for the team robot using WPILib and Java",
      "Developed critical functions for motor and servo control",
      "Integrated pneumatic systems, improving grabbing mechanism functionality by 50%",
      "Collaborated with mechanical and electrical team members for seamless hardware-software integration"
    ],
    icon: "🤖",
    tools: ["WPILib", "Java", "GitHub"]
  },
  { 
    title: "Firmware Developer",
    company: "UW Orbital",
    description: [
      "Played a critical role in developing systems for a nanosatellite project",
      "Designed, tested, and implemented embedded software solutions",
      "Created reliable and efficient firmware to control and monitor satellite subsystems",
      "Wrote low-level drivers for sensors and actuators",
      "Integrated hardware components with the satellite's onboard computer",
      "Performed rigorous simulations to validate functionality under various spaceflight conditions"
    ],
    icon: "🛰️",
    tools: ["C++", "FreeRTOS", "Git", "I2C/SPI"]
  }
]

const TiltCard: React.FC<{ experience: Experience }> = ({ experience }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 shadow-lg"
    >
      <div style={{ transform: "translateZ(75px)" }} className="h-full flex flex-col">
        <div className="text-4xl mb-4">{experience.icon}</div>
        <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{experience.company}</p>
        <ul className="text-sm text-muted-foreground mb-4 list-disc pl-5 flex-grow">
          {experience.description.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-auto">
          {experience.tools.map((tool, index) => (
            <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {tool}
            </span>
          ))}
        </div>g
      </div>
    </motion.div>
  )
}

export function Experiences() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>(0)

  useEffect(() => {
    if (!gridRef.current) return

    const updateHeights = () => {
      if (!gridRef.current) return
      
      // Reset the height to auto to get true content height
      const cards = gridRef.current.querySelectorAll('.experience-card')
      cards.forEach(card => {
        (card as HTMLElement).style.height = 'auto'
      })

      // Wait for next frame to ensure content is reflowed
      requestAnimationFrame(() => {
        if (!gridRef.current) return
        
        // Calculate max height
        const heights = Array.from(cards).map(card => card.getBoundingClientRect().height)
        const newMaxHeight = Math.max(...heights)
        
        // Apply max height to all cards
        cards.forEach(card => {
          (card as HTMLElement).style.height = `${newMaxHeight}px`
        })
        
        setMaxHeight(newMaxHeight)
      })
    }

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeights()
    })

    // Observe the grid container
    resizeObserver.observe(gridRef.current)

    // Initial height calculation
    updateHeights()

    // Cleanup
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <section id="experiences" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Experiences</h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card" style={{ height: maxHeight || 'auto' }}>
              <TiltCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

