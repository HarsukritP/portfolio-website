"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function FixedActionButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href="https://ece.engineering" target="_blank" rel="noopener noreferrer">
        <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-lg md:h-14 md:w-14">
          <Image src="/ece_ascii.svg?height=100&width=100" alt="Action Button" fill className="object-cover" />
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Webring
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

