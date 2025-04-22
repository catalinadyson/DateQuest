"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface QuestCardProps {
  id: string
  title: string
  description: string
  category: "creative" | "social" | "adventure"
  points: number
  onComplete: () => void
  cardNumber: number
  totalCards: number
}

export default function QuestCard({
  id,
  title,
  description,
  category,
  points,
  onComplete,
  cardNumber,
  totalCards,
}: QuestCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false)

  // Category-based styling
  const categoryStyles = {
    creative: {
      label: "Creative",
      backColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      frontColor: "bg-gradient-to-br from-purple-400 to-pink-400",
      textColor: "text-white",
      icon: "🎨",
    },
    social: {
      label: "Social",
      backColor: "bg-gradient-to-br from-blue-500 to-teal-500",
      frontColor: "bg-gradient-to-br from-blue-400 to-teal-400",
      textColor: "text-white",
      icon: "👥",
    },
    adventure: {
      label: "Adventure",
      backColor: "bg-gradient-to-br from-amber-500 to-orange-500",
      frontColor: "bg-gradient-to-br from-amber-400 to-orange-400",
      textColor: "text-white",
      icon: "🧭",
    },
  }

  const currentStyle = categoryStyles[category]

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true)
      setShowCompletionAnimation(true)

      // Hide completion animation after a delay
      setTimeout(() => {
        setShowCompletionAnimation(false)
        // Call the parent's onComplete after animation
        setTimeout(() => {
          onComplete()
        }, 500)
      }, 1500)
    }
  }

  return (
    <div className="perspective-1000 w-full relative">
      {/* Completion animation overlay */}
      {showCompletionAnimation && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="flex flex-col items-center"
          >
            <CheckCircle2 className="h-24 w-24 text-green-500" />
            <div className="mt-4 bg-white px-6 py-3 rounded-full flex items-center">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              <span className="font-bold text-lg">{points} Points Earned!</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence initial={false} mode="wait">
        {!flipped ? (
          <motion.div
            key="back"
            className="w-full"
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -180, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`w-full border-2 border-datequest-dark overflow-hidden ${currentStyle.backColor}`}>
              <CardContent className="p-0">
                <div className="p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">{currentStyle.icon}</div>
                  <Badge className="mb-2 px-4 py-1 text-lg bg-white text-black">{currentStyle.label} Quest</Badge>
                  <h3 className={`font-bold text-2xl mb-4 ${currentStyle.textColor}`}>{title}</h3>
                  <p className={`${currentStyle.textColor} opacity-90 mb-6`}>Tap to reveal your quest</p>

                  <Button className="mt-4 bg-white text-black hover:bg-gray-100" onClick={handleFlip}>
                    Reveal Quest
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            className="w-full"
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 180, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`w-full border-2 border-datequest-dark overflow-hidden ${currentStyle.frontColor}`}>
              <CardContent className="p-0">
                <div className="p-6 min-h-[300px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className="px-3 py-1 bg-white text-black">{currentStyle.label}</Badge>
                      <Badge className="px-3 py-1 bg-white text-black flex items-center">
                        <Award className="h-4 w-4 mr-1 text-amber-500" />
                        {points} Points
                      </Badge>
                    </div>

                    <h3 className={`font-bold text-xl mb-3 ${currentStyle.textColor}`}>{title}</h3>
                    <div className="bg-white/90 p-4 rounded-lg mb-4">
                      <p className="text-black">{description}</p>
                    </div>

                    <div className="text-sm text-white/80 text-center">
                      Card {cardNumber} of {totalCards}
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/20 flex items-center"
                      onClick={handleFlip}
                    >
                      Back
                    </Button>

                    <Button
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={handleComplete}
                      disabled={completed}
                    >
                      {completed ? "Completed" : "Complete Quest"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
