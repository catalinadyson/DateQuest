"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

interface DateQuestLogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}

export function DateQuestLogo({ size = "md", withText = true, className = "" }: DateQuestLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    sm: { logo: 32, text: "text-lg" },
    md: { logo: 48, text: "text-xl" },
    lg: { logo: 64, text: "text-2xl" },
  }

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative">
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <svg
            width={sizes[size].logo}
            height={sizes[size].logo}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Compass-inspired logo */}
            <circle cx="50" cy="50" r="45" fill="#5f9ea0" />
            <circle cx="50" cy="50" r="40" fill="#f5f5dc" />

            {/* Compass rose elements */}
            <path d="M50 10 L53 20 L50 15 L47 20 Z" fill="#2d3b45" />
            <path d="M90 50 L80 53 L85 50 L80 47 Z" fill="#2d3b45" />
            <path d="M50 90 L47 80 L50 85 L53 80 Z" fill="#2d3b45" />
            <path d="M10 50 L20 47 L15 50 L20 53 Z" fill="#2d3b45" />

            {/* Compass center */}
            <circle cx="50" cy="50" r="8" fill="#2d3b45" />
            <circle cx="50" cy="50" r="3" fill="#f5f5dc" />

            {/* Map elements */}
            <path d="M30 30 Q40 20 50 30 T70 30" stroke="#2d3b45" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <path d="M30 70 Q40 60 50 70 T70 70" stroke="#2d3b45" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <circle cx="35" cy="35" r="2" fill="#d8b589" />
            <circle cx="65" cy="65" r="2" fill="#d8b589" />
          </svg>
        </motion.div>

        {/* Hearts animation on hover */}
        {isHovered && (
          <>
            <motion.div
              initial={{ scale: 0, y: 0, x: 0 }}
              animate={{ scale: 1, y: -30, x: 15 }}
              transition={{ duration: 1 }}
              className="absolute top-1/2 left-1/2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.5 12.572L12 20L4.5 12.572C3.5 11.572 3 10.286 3 9C3 6.5 5 4.5 7.5 4.5C8.5 4.5 9.5 4.9 10.5 5.5L12 6.5L13.5 5.5C14.5 4.9 15.5 4.5 16.5 4.5C19 4.5 21 6.5 21 9C21 10.286 20.5 11.572 19.5 12.572Z"
                  fill="#FF6B6B"
                  stroke="#FF6B6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <motion.div
              initial={{ scale: 0, y: 0, x: 0 }}
              animate={{ scale: 1, y: -20, x: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-1/2 left-1/2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.5 12.572L12 20L4.5 12.572C3.5 11.572 3 10.286 3 9C3 6.5 5 4.5 7.5 4.5C8.5 4.5 9.5 4.9 10.5 5.5L12 6.5L13.5 5.5C14.5 4.9 15.5 4.5 16.5 4.5C19 4.5 21 6.5 21 9C21 10.286 20.5 11.572 19.5 12.572Z"
                  fill="#FF6B6B"
                  stroke="#FF6B6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <motion.div
              initial={{ scale: 0, y: 0, x: 0 }}
              animate={{ scale: 1, y: -25, x: 5 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute top-1/2 left-1/2"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.5 12.572L12 20L4.5 12.572C3.5 11.572 3 10.286 3 9C3 6.5 5 4.5 7.5 4.5C8.5 4.5 9.5 4.9 10.5 5.5L12 6.5L13.5 5.5C14.5 4.9 15.5 4.5 16.5 4.5C19 4.5 21 6.5 21 9C21 10.286 20.5 11.572 19.5 12.572Z"
                  fill="#FF6B6B"
                  stroke="#FF6B6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </>
        )}
      </div>

      {withText && <span className={`ml-2 font-bold text-datequest-dark ${sizes[size].text}`}>DateQuest</span>}
    </Link>
  )
}
