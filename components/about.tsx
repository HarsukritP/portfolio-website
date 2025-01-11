"use client"

import Image from "next/image"

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
    </section>
  )
}

