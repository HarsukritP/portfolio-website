"use client"

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Experience {
  title: string
  company: string
  description: string
  icon: React.ReactNode
  tools: string[]
}

const experiences: Experience[] = [
  { 
    title: "Programming & Game Development Instructor",
    company: "Code Ninjas",
    description: "I collaborated with a team of nine partners to establish a non-profit organization supporting the Oakville Milton Humane Society. I spearheaded efforts to generate revenue through bracelet sales and the development of a React-based website to increase community outreach and engagement. Leveraging my expertise in social media marketing, I developed strategies to amplify brand awareness, resulting in a 40% growth in online engagement. I also managed financial transactions, maintained expense reports, and oversaw fundraising events, ultimately helping the organization secure over $1,000 in donations.",
    icon: "💻",
    tools: ["Unity", "MakeCode", "VSCode"]
  },
  { 
    title: "Financial Officer",
    company: "WilderCare",
    description: "I collaborated with a team of nine partners to establish a non-profit organization supporting the Oakville Milton Humane Society. I spearheaded efforts to generate revenue through bracelet sales and the development of a React-based website to increase community outreach and engagement. Leveraging my expertise in social media marketing, I developed strategies to amplify brand awareness, resulting in a 40% growth in online engagement. I also managed financial transactions, maintained expense reports, and oversaw fundraising events, ultimately helping the organization secure over $1,000 in donations.",
    icon: "💰",
    tools: ["React", "Social Media"]
  },
  { 
    title: "Programmer",
    company: "Orbit Robotics",
    description: "I contributed to the team’s success in the FIRST Robotics Competition at the regional level by designing and optimizing firmware for our robot. Using Java, WPILib, and version control tools like GitHub, I developed critical functions for motor and servo control, enabling precise and efficient robot motion. Additionally, I worked on the integration of pneumatic systems to enhance the robot’s grabbing mechanism, achieving a 50% improvement in its functionality during competitive tasks. My role also involved collaborating with mechanical and electrical team members to ensure seamless hardware-software integration.",
    icon: "🤖",
    tools: ["WPILib", "Java", "GitHub"]
  },
  { 
    title: "Firmware Developer",
    company: "UW Orbital",
    description: "I played a critical role in the development of systems for a nanosatellite project, collaborating with a multidisciplinary team to design, test, and implement embedded software solutions. Leveraging my expertise in C/C++, RTOS, and I2C/SPI communication protocols, I contributed to the creation of reliable and efficient firmware to control and monitor the satellite's subsystems. My responsibilities included writing low-level drivers for sensors and actuators, integrating hardware components with the satellite's onboard computer, and performing rigorous simulations to validate functionality under various spaceflight conditions.",
    icon: "🛰️",
    tools: ["C++", "FreeRTOS", "Git"]
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
      <div style={{ transform: "translateZ(75px)" }}>
        <div className="text-4xl mb-4">{experience.icon}</div>
        <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{experience.company}</p>
        <p className="text-sm text-muted-foreground mb-4">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.tools.map((tool, index) => (
            <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Experiences() {
  return (
    <section id="experiences" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div key={index} className="h-64">
              <TiltCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

