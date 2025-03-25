"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // For now, we'll use mailto as a fallback since EmailJS requires API keys
    const mailtoLink = `mailto:harsukritspall@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailtoLink

    // Reset form
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Close modal after success
    setTimeout(() => {
      onClose()
      setSubmitSuccess(false)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Request Resume</h2>
          <p className="text-xs text-muted-foreground">
            Send an email to: <span className="text-blue-500 underline">harsukritspall@gmail.com</span>
          </p>
        </div>

        {submitSuccess ? (
          <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-center text-green-800 dark:text-green-200">Email sent successfully!</p>
          </div>
        ) : submitError ? (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-center text-red-800 dark:text-red-200">{submitError}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div>
              <Textarea
                placeholder="Your message"
                className="resize-none h-[100px] overflow-y-auto"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1 italic">
                I will try to get back to you within 24 hours.
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="w-full" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

