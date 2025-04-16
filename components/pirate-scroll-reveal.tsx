"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { MapPin } from "lucide-react"

interface PirateScrollRevealProps {
  location: string
  onComplete: () => void
}

export default function PirateScrollReveal({ location, onComplete }: PirateScrollRevealProps) {
  const [isRevealing, setIsRevealing] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAnimationComplete = () => {
    if (isRevealing) {
      setIsRevealed(true)
      setTimeout(() => {
        onComplete()
      }, 3000)
    }
  }

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-xs">
          <AnimatePresence>
            {!isRevealing ? (
              <motion.div
                key="scroll-closed"
                className="relative w-full h-48 bg-amber-100 rounded-lg border-4 border-amber-800 flex items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=300')] bg-cover opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-8 bg-amber-800"></div>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-amber-800"></div>
                <div className="text-center z-10">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Compass"
                    width={50}
                    height={50}
                    className="mx-auto mb-2"
                  />
                  <p className="text-amber-800 font-bold">Your Quest Awaits</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scroll-open"
                className="relative w-full bg-amber-100 rounded-lg border-4 border-amber-800 overflow-hidden"
                initial={{ height: 48 }}
                animate={{ height: 200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                onAnimationComplete={handleAnimationComplete}
              >
                <div className="absolute top-0 left-0 w-full h-8 bg-amber-800 flex items-center justify-center">
                  <p className="text-amber-100 font-bold text-sm">Secret Location</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-amber-800"></div>

                <div className="h-full pt-12 pb-12 px-4 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto mb-2 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-1">{location}</h3>
                    <p className="text-amber-800 text-sm">Your adventure destination</p>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=300')] bg-cover"
                  style={{ backgroundPosition: "center" }}
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: 0.15 }}
                />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-amber-800 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <div className="w-2 h-8 bg-amber-800 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
