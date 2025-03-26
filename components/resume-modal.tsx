"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import emailjs from '@emailjs/browser'

// Use environment variables for sensitive information
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_NOTIFICATION_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID || "";

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

  // Initialize EmailJS with the official recommended approach
  useEffect(() => {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Validate that environment variables are set
      if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_NOTIFICATION_TEMPLATE_ID) {
        throw new Error("EmailJS configuration is incomplete. Missing environment variables.");
      }

      // Instead of using sendForm, let's use send with explicit parameters
      // This gives us more control over what's being sent
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject || "Resume Request",
        message: message || "No message provided",  // Ensure message is never empty
        date: new Date().toLocaleDateString(), // Simpler date format
      };
      
      console.log("Sending with params:", templateParams);
      
      // Use the direct send method
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFICATION_TEMPLATE_ID,
        templateParams
      );
      
      console.log("SUCCESS!", response);
      setSubmitSuccess(true);
      
      // Reset form states
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("FAILED...", error);
      
      if (error instanceof Error) {
        setSubmitError(`Error: ${error.message}`);
      } else {
        setSubmitError("Failed to send email. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Input 
                name="from_name" 
                placeholder="Your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <Input
                name="from_email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input 
                name="subject" 
                placeholder="Subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                required 
              />
            </div>
            <div>
              <Textarea
                name="message"
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