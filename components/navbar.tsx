"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, FileText } from 'lucide-react'
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const scrollToTop = () => {
    window.location.href = '#'
    window.location.reload()
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm grid grid-cols-1">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <button onClick={scrollToTop} className="flex items-center">
            <div className="relative h-8 w-8 overflow-hidden rounded-full  md:h-10 md:w-10">
              <Image
                src="./HP-logo.png"
                alt="Logo Dark"
                fill
                className="object-cover object-center dark:hidden"
              />
              <Image
                src="./HP-logo-light.png"
                alt="Logo Light"
                fill
                className="object-cover object-center hidden dark:block"
              />
            </div>
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </button>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Projects
          </button>
          <button
            onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Experiences
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </button>
        </div>
        <div className="flex items-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
            <Link 
              href="https://drive.google.com/file/d/1wfcqROW9gDPGg2ixuHzVSBuFeL-ECmjj/view?usp=sharing" 
            > <Button variant="outline" size="sm"> <FileText className="h-4 w-4"/> Resume </Button>
            
            </Link>
        </div>
      </div>
    </nav>
  )
}

