"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AchievementBadge } from "@/components/achievement-badge"
import type { Achievement } from "@/lib/achievements"

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for exit animation
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="bg-white rounded-lg shadow-lg border-2 border-datequest-teal-200 overflow-hidden">
            <div className="bg-datequest-teal-500 p-2 flex justify-between items-center">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-white mr-2" />
                <h3 className="font-bold text-white">Achievement Unlocked!</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-datequest-teal-600 rounded-full"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 flex items-center">
              <AchievementBadge
                id={achievement.id}
                name={achievement.name}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
                isEarned={true}
                showTooltip={false}
              />
              <div className="ml-4">
                <h4 className="font-bold">{achievement.name}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
