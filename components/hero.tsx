"use client"

import { TypewriterEffect } from "./ui/typewriter-effect"
import { BackgroundBeams } from "./ui/background-beams"

export function Hero() {
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

  return (
    <div className="h-[80vh] w-full relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center">
        <TypewriterEffect words={words} />
        <p className="mt-4 font-light text-muted-foreground md:text-xl">
          I am a Software Developer and Computer Engineering Student at the University of Waterloo.
        </p>
      </div>
      <BackgroundBeams />
    </div>
  )
}

