"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface InterestSelectorProps {
  interests?: string[]
  onInterestsChange?: (interests: string[]) => void
}

export default function InterestSelector({ interests = [], onInterestsChange }: InterestSelectorProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(interests)

  const predefinedInterests = [
    { name: "Art", emoji: "🎨" },
    { name: "Hiking", emoji: "🥾" },
    { name: "Coffee", emoji: "☕" },
    { name: "Photography", emoji: "📸" },
    { name: "Museums", emoji: "🏛️" },
    { name: "Live Music", emoji: "🎵" },
    { name: "Cooking", emoji: "👨‍🍳" },
    { name: "Reading", emoji: "📚" },
    { name: "Travel", emoji: "✈️" },
    { name: "Yoga", emoji: "🧘" },
    { name: "Movies", emoji: "🎬" },
    { name: "Dancing", emoji: "💃" },
    { name: "Wine Tasting", emoji: "🍷" },
    { name: "Gaming", emoji: "🎮" },
    { name: "Fitness", emoji: "💪" },
    { name: "Painting", emoji: "🖌️" },
    { name: "Cycling", emoji: "🚴" },
    { name: "Baking", emoji: "🍰" },
    { name: "Gardening", emoji: "🌱" },
    { name: "Volunteering", emoji: "❤️" },
    { name: "History", emoji: "📜" },
    { name: "Science", emoji: "🔬" },
    { name: "Theater", emoji: "🎭" },
    { name: "Crafts", emoji: "🧶" },
    { name: "Camping", emoji: "⛺" },
    { name: "Meditation", emoji: "🧠" },
    { name: "Writing", emoji: "✍️" },
    { name: "Concerts", emoji: "🎤" },
    { name: "Philosophy", emoji: "🤔" },
    { name: "Comedy", emoji: "😂" },
  ]

  const toggleInterest = (interest: string) => {
    let newInterests: string[]
    if (selectedInterests.includes(interest)) {
      newInterests = selectedInterests.filter((i) => i !== interest)
    } else {
      if (selectedInterests.length < 5) {
        newInterests = [...selectedInterests, interest]
      } else {
        // If already 5 interests, don't add more
        return
      }
    }
    setSelectedInterests(newInterests)
    onInterestsChange?.(newInterests)
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedInterests.map((interest) => {
          const interestObj = predefinedInterests.find((i) => i.name === interest) || { name: interest, emoji: "✨" }
          return (
            <motion.div
              key={interest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex items-center px-3 py-1.5 rounded-full bg-datequest-teal-500 text-white"
              onClick={() => toggleInterest(interest)}
            >
              <span className="mr-1">{interestObj.emoji}</span>
              <span className="text-sm font-medium">{interest}</span>
              <span className="ml-1">✓</span>
            </motion.div>
          )
        })}
      </div>
      <div className="text-sm text-gray-500 mb-2">{selectedInterests.length}/5 interests selected</div>
      <div className="flex flex-wrap gap-2">
        {predefinedInterests
          .filter((interest) => !selectedInterests.includes(interest.name))
          .map((interest) => (
            <motion.div
              key={interest.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex items-center px-3 py-1.5 rounded-full border-2 border-datequest-teal-300 bg-white text-datequest-teal-700 hover:bg-datequest-teal-50"
              onClick={() => toggleInterest(interest.name)}
            >
              <span className="mr-1">{interest.emoji}</span>
              <span className="text-sm font-medium">{interest.name}</span>
            </motion.div>
          ))}
      </div>
    </div>
  )
}
