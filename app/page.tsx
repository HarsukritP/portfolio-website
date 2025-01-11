import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { About } from "@/components/about"
import { Experiences } from "@/components/experiences"
import { Footer } from "@/components/footer"
import { Interactive } from "@/components/interactive"
import { TechStack } from "@/components/techstack"


export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Interactive />
      <TechStack />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </>
  )
}

