"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface PersonalityRevealProps {
  personalityType: string
  onClose: () => void
}

// Mapping of personality types to emojis and colors
const personalityTypeMap = {
  "Creative Explorer": { emoji: "🎨", color: "bg-pink-500", text: "text-white" },
  "Adventure Seeker": { emoji: "🏔️", color: "bg-green-600", text: "text-white" },
  "Social Butterfly": { emoji: "🦋", color: "bg-blue-500", text: "text-white" },
  "Curious Mind": { emoji: "🧠", color: "bg-purple-600", text: "text-white" },
  "Culture Enthusiast": { emoji: "🎭", color: "bg-amber-500", text: "text-white" },
  "Wellness Warrior": { emoji: "🧘", color: "bg-teal-500", text: "text-white" },
  "Mystery Explorer": { emoji: "🔮", color: "bg-indigo-600", text: "text-white" },
}

export function PersonalityReveal({ personalityType, onClose }: PersonalityRevealProps) {
  const [description, setDescription] = useState("")
  const typeData = personalityTypeMap[personalityType] || {
    emoji: "✨",
    color: "bg-datequest-teal-500",
    text: "text-white",
  }

  useEffect(() => {
    // Set description based on personality type
    switch (personalityType) {
      case "Creative Explorer":
        setDescription(
          "You're imaginative and artistic, always seeking new forms of expression. You value beauty and originality in your experiences and connections.",
        )
        break
      case "Adventure Seeker":
        setDescription(
          "You thrive on excitement and new challenges. You're drawn to the outdoors and physical activities that get your adrenaline pumping.",
        )
        break
      case "Social Butterfly":
        setDescription(
          "You're energized by social interactions and building connections. You value shared experiences and creating memories with others.",
        )
        break
      case "Curious Mind":
        setDescription(
          "You're intellectually driven and love learning. You seek depth in conversations and appreciate partners who challenge your thinking.",
        )
        break
      case "Culture Enthusiast":
        setDescription(
          "You're passionate about arts, entertainment, and cultural experiences. You value aesthetic appreciation and emotional connection.",
        )
        break
      case "Wellness Warrior":
        setDescription(
          "You prioritize health and balance in all aspects of life. You seek partners who share your commitment to wellbeing and mindful living.",
        )
        break
      default:
        setDescription(
          "You're a unique blend of interests and passions, making you a fascinating date with endless potential for connection.",
        )
    }
  }, [personalityType])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <Card className="border-4 border-datequest-lime overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-datequest-dark p-6 text-white relative">
                <Button
                  variant="default"
                  size="icon"
                  className="absolute right-2 top-2 text-white bg-datequest-teal-500 hover:bg-datequest-teal-600 rounded-full h-8 w-8"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-datequest-teal-500">Your DateQuest Personality Type:</h2>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-datequest-lime mb-3 flex items-center justify-center text-3xl">
                      {typeData.emoji}
                    </div>
                    <Badge className={`${typeData.color} ${typeData.text} text-lg px-4 py-2 mb-2`}>
                      {personalityType}
                    </Badge>
                  </motion.div>
                </div>
              </div>

              <div className="p-6 bg-white">
                <p className="text-center mb-6">{description}</p>

                <div className="space-y-4">
                  <h3 className="font-medium text-center">What This Means For Your Dates</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-datequest-lime">•</span>
                      <span>We'll match you with compatible personality types</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-datequest-lime">•</span>
                      <span>Your QuestCards will be tailored to your interests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-datequest-lime">•</span>
                      <span>Date locations will align with your personality traits</span>
                    </li>
                  </ul>
                </div>

                <Button
                  className="w-full mt-6 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                  onClick={onClose}
                >
                  Continue to DateQuest
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
