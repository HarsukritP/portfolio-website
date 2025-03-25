"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import emailjs from '@emailjs/browser'

// Replace these with your actual EmailJS IDs
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"
const EMAILJS_NOTIFICATION_TEMPLATE_ID = "YOUR_NOTIFICATION_TEMPLATE_ID"
// Only needed if not using template hooks for auto-reply
// const EMAILJS_AUTOREPLY_TEMPLATE_ID = "YOUR_AUTOREPLY_TEMPLATE_ID"

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

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Prepare the template parameters for both email templates
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
      }

      // Send notification email to you
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFICATION_TEMPLATE_ID,
        templateParams
      )

      // If you're not using EmailJS template hooks for auto-reply,
      // uncomment this block to send the auto-reply manually
      /*
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        templateParams
      )
      */

      // Handle success
      setSubmitSuccess(true)
      
      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      
      // Close modal after success
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to send email:", error)
      setSubmitError("Failed to send email. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
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
                placeholder="Your message (optional)"
                className="resize-none h-[100px] overflow-y-auto"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1 italic">
                Feel free to include any specific questions or information.
              </p>
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