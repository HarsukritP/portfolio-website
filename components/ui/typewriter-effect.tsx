"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimate } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
}) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const typewriterAnimation = async () => {
      const letters = scope.current.querySelectorAll('.letter')
      
      for (let i = 0; i < letters.length; i++) {
        await animate(
          letters[i],
          { opacity: 1, y: 0 },
          { duration: 0.1 }
        )
      }
    }

    typewriterAnimation()
  }, [])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <span key={`${word.text}-${idx}`} className="inline-block mr-3.5">
              {word.text.split("").map((letter, letterIdx) => (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  key={`${letter}-${letterIdx}`}
                  className={cn("letter inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold", word.className)}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("text-center", className)}>
      {renderWords()}
    </div>
  )
}

