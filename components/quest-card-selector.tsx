"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Heart, Zap, SmilePlus } from "lucide-react"

interface QuestCardSelectorProps {
  onCardSelected: (cardIndex: number, cardType: string) => void
}

export function QuestCardSelector({ onCardSelected }: QuestCardSelectorProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isZooming, setIsZooming] = useState(false)

  const cardTypes = [
    {
      name: "Romantic",
      color: "bg-red-100",
      borderColor: "border-red-400",
      textColor: "text-red-700",
      icon: <Heart className="h-12 w-12 text-red-500" />,
    },
    {
      name: "Bold",
      color: "bg-purple-100",
      borderColor: "border-purple-400",
      textColor: "text-purple-700",
      icon: <Zap className="h-12 w-12 text-purple-500" />,
    },
    {
      name: "Funny",
      color: "bg-yellow-100",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-700",
      icon: <SmilePlus className="h-12 w-12 text-yellow-500" />,
    },
  ]

  const handleCardSelect = (index: number) => {
    setSelectedCard(index)
    setIsZooming(true)

    // Simulate card zooming animation
    setTimeout(() => {
      setIsZooming(false)
      onCardSelected(index, cardTypes[index].name)
    }, 1000)
  }

  return (
    <div className="w-full">
      <h3 className="font-bold text-lg mb-4 text-center">Select a QuestCard</h3>

      <div className="flex justify-center gap-4 mb-6">
        {cardTypes.map((card, index) => (
          <motion.div
            key={index}
            initial={{ scale: 1 }}
            animate={{
              scale: selectedCard === index && isZooming ? [1, 1.5, 0.8] : 1,
              y: selectedCard === index && isZooming ? [0, -30, 0] : 0,
              opacity: selectedCard !== null && selectedCard !== index && isZooming ? 0 : 1,
            }}
            transition={{ duration: 0.8 }}
            className="perspective-1000"
          >
            <Card
              className={`w-24 h-36 cursor-pointer transform-style-3d ${card.color} ${card.borderColor} border-2 flex flex-col items-center justify-center ${selectedCard === index ? "ring-4 ring-datequest-dark" : ""}`}
              onClick={() => !selectedCard && handleCardSelect(index)}
            >
              <div className="backface-hidden">
                {card.icon}
                <div className={`text-xs mt-2 font-medium text-center ${card.textColor}`}>{card.name}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">Each card contains a unique quest activity for your date</p>
    </div>
  )
}
