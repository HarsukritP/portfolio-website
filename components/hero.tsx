"use client"

import { TypewriterEffect } from "./ui/typewriter-effect"
import { BackgroundBeams } from "./ui/background-beams"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Hero() {
  const [showSubtext, setShowSubtext] = useState(false)

  const words = [
    {
      text: "Hi,",
    },
    {
      text: "I'm",
    },
    {
      text: "Harsukrit!",
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtext(true)
    }, 2000) // Adjust this value to match your typewriter effect duration

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-[80vh] w-full relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center">
        <TypewriterEffect words={words} />
        <AnimatePresence>
          {showSubtext && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 font-light text-muted-foreground md:text-xl"
            >
              I am a Software Developer and Computer Engineering Student at the University of Waterloo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <BackgroundBeams />
    </div>
  )
}

