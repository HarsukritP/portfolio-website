"use client"

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Correctly typed dynamic import
const ThreeScene = dynamic(
  () => import('@/components/threescene').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading 3D Scene...</div>
      </div>
    )
  }
)

export function Interactive() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Things I Use Daily
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={cn(
            "w-full h-[500px]",
            "bg-gradient-to-br from-primary/5 to-primary/10",
            "rounded-xl overflow-hidden"
          )}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-muted-foreground">Loading 3D Scene...</div>
            </div>
          }>
            <ThreeScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}