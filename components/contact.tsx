"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail } from 'lucide-react'
import { useState, FormEvent } from 'react'

export function Contact() {
  
  return (
    <section id="contact" className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mt-12">
          <h3 className="mb-4 text-center text-lg font-semibold">Connect with me</h3>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/harsukritp/" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/harsukritpall/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:harsukritspall@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

