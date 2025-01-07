import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { About } from "@/components/about"
import { Experiences } from "@/components/experiences"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Contact />
    </>
  )
}

