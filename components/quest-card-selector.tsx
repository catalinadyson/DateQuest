"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuestCard from "./quest-card"
import { Button } from "@/components/ui/button"
import { Heart, Plus, Award } from "lucide-react"
import { useRouter } from "next/navigation"

interface QuestCardData {
  id: string
  title: string
  description: string
  image?: string
  category: "creative" | "social" | "adventure"
  points: number
}

interface QuestCardSelectorProps {
  questCards: QuestCardData[]
  onCardComplete: (cardId: string) => void
  availableHearts?: number
  onHeartsChange?: (newHeartCount: number) => void
  onPointsEarned?: (points: number) => void
}

export function QuestCardSelector({
  questCards,
  onCardComplete,
  availableHearts = 3,
  onHeartsChange,
  onPointsEarned,
}: QuestCardSelectorProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [completedCards, setCompletedCards] = useState<string[]>([])
  const [showHeartWarning, setShowHeartWarning] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const router = useRouter()

  const handleCardSelect = (index: number) => {
    // If we're out of hearts, show warning
    if (availableHearts <= 0) {
      setShowHeartWarning(true)
      return
    }

    // If the card is already completed, don't allow selection
    if (completedCards.includes(questCards[index].id)) {
      return
    }

    // Set the active card
    setActiveCardIndex(index)

    // Use setTimeout to move the parent state update outside of the render cycle
    setTimeout(() => {
      // Deduct a heart when selecting a card
      if (onHeartsChange) {
        onHeartsChange(availableHearts - 1)
      }
    }, 0)
  }

  const handleCardComplete = (cardId: string) => {
    const completedCard = questCards.find((card) => card.id === cardId)

    if (completedCard) {
      // Add points
      const newTotalPoints = totalPoints + completedCard.points
      setTotalPoints(newTotalPoints)

      // Notify parent component about points
      if (onPointsEarned) {
        onPointsEarned(completedCard.points)
      }
    }

    setCompletedCards([...completedCards, cardId])
    setActiveCardIndex(null)
    onCardComplete(cardId)
  }

  // Handle the "out of hearts" case with useEffect
  useEffect(() => {
    if (availableHearts <= 0 && activeCardIndex === null) {
      setShowHeartWarning(true)
    }
  }, [availableHearts, activeCardIndex])

  const handlePurchaseCards = () => {
    router.push("/rewards/purchase")
  }

  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className={`h-5 w-5 ${availableHearts > 0 ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
          <span className="ml-2 font-medium">{availableHearts} Hearts remaining</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 text-datequest-dark mr-1" />
          <span className="font-medium">{totalPoints} Points earned</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full mb-4 border-datequest-dark text-datequest-dark hover:bg-datequest-lime/20"
        onClick={handlePurchaseCards}
      >
        <Plus className="h-4 w-4 mr-1" />
        Get More Cards
      </Button>

      <div className="grid grid-cols-1 gap-4">
        {questCards.map((card, index) => (
          <QuestCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            category={card.category}
            points={card.points}
            isActive={activeCardIndex === index}
            isCompleted={completedCards.includes(card.id)}
            onSelect={() => handleCardSelect(index)}
            onComplete={() => handleCardComplete(card.id)}
          />
        ))}
      </div>

      {/* Heart warning modal */}
      <AnimatePresence>
        {showHeartWarning && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Out of Hearts</h3>
                <p className="text-gray-600 mb-4">
                  You need hearts to unlock more quest cards. Purchase hearts to continue your adventure!
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-datequest-dark text-datequest-dark hover:bg-datequest-lime/20"
                    onClick={() => setShowHeartWarning(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-datequest-dark text-white hover:bg-black" onClick={handlePurchaseCards}>
                    Get Hearts
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
