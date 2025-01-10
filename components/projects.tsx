"use client"

import { ChevronLeft, ChevronRight, Github } from 'lucide-react'
import { Button } from "./ui/button"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  title: string
  description: string
  image: string
  github: string
  tools: string[]
}

export function Projects() {
  const projects: Project[] = [
    {
      title: "Priority Calculator Plus",
      description: "Manage your work-load with Priority Calculator Plus, an all-in-one productivity platform for scheduling and optimizing your time management.",
      image: "./project1.png",
      github: "https://github.com/HarsukritP/PriorityCalculatorPlus",
      tools: ["React", "Node.js", "Express", "MongoDB"]
    },
    {
      title: "CIFAR-10 Image Classifier",
      description: "An ML model based on the CIFAR-10 database, to recognize and classify any image, with 95% accuracy and 94% improved efficiency.",
      image: "./project2.png",
      github: "https://github.com/HarsukritP/CIFAR10-Image-Classifier",
      tools: ["Python", "TensorFlow", "Keras", "NumPy"]
    },
    {
      title: "Dormitory Security Alarm System",
      description: "Created a dorm room security device to track valuables, detect break-ins and alert users to protect them and their valuables.",
      image: "./project4.png",
      github: "https://github.com/HarsukritP/ECE198-Alarm-System",
      tools: ["Arduino", "C++", "IoT"]
    },
    {
      title: "Elden Ring Weapons Browser",
      description: "Utilizes scraped data from the video game to simulate weapon stats for 1000+ cases by utilizing OOP to factor in game conditions.",
      image: "./project5.png",
      github: "https://github.com/HarsukritP/EldenRingWeaponBrowser",
      tools: ["Python", "BeautifulSoup", "Pandas", "OOP"]
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section id="projects" className="py-24">
      <div className="container mb-12">
        <h2 className="text-center text-3xl font-bold sm:text-4xl mb-4">Projects</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">Explore my latest works and see how I bring ideas to life through code.</p>
      </div>
      <div className="container relative">
        <div className="relative w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-muted shadow-lg">
            <AnimatePresence initial={false} custom={currentIndex}>
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="relative h-full w-full group">
                  <Image
                    src={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <h3 className="mb-4 text-3xl font-bold sm:text-4xl text-white">{projects[currentIndex].title}</h3>
                      <p className="mb-8 max-w-2xl text-lg sm:text-xl text-white/90">{projects[currentIndex].description}</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {projects[currentIndex].tools.map((tool, index) => (
                          <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link 
                          href={projects[currentIndex].github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <Github className="h-5 w-5" />
                          View on GitHub
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full h-12 w-12"
          onClick={prevProject}
          aria-label="Previous project"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full h-12 w-12"
          onClick={nextProject}
          aria-label="Next project"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
        
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

