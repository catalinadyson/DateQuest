"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface AchievementBadgeProps {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  isEarned?: boolean
  progress?: number
  total?: number
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  className?: string
}

export function AchievementBadge({
  id,
  name,
  description,
  icon,
  color,
  isEarned = false,
  progress = 0,
  total = 1,
  size = "md",
  showTooltip = true,
  className,
}: AchievementBadgeProps) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  }

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  const badge = (
    <motion.div
      className={cn(
        `relative rounded-full flex items-center justify-center ${sizes[size]}`,
        isEarned ? color : "bg-gray-200",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Progress ring for incomplete achievements */}
      {!isEarned && progress > 0 && (
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color.replace("bg-", "text-")}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / total)}`}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      )}

      {/* Icon - ensuring it's centered */}
      <div
        className={cn("flex items-center justify-center", iconSizes[size], isEarned ? "text-white" : "text-gray-400")}
      >
        {icon}
      </div>

      {/* Locked overlay */}
      {!isEarned && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
          <svg
            className="w-1/2 h-1/2 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </motion.div>
  )

  if (!showTooltip) return badge

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="text-center">
            <h4 className="font-bold">{name}</h4>
            <p className="text-sm">{description}</p>
            {!isEarned && progress > 0 && (
              <p className="text-xs mt-1 font-medium">
                {progress}/{total} completed
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
