"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, Compass, CheckCircle, Heart, MessageCircle, Gift, Crown, Lock } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function QuestActivePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneOwner = searchParams.get("phone") || "mine"

  const [stage, setStage] = useState("quest-instructions") // quest-instructions, quest-active
  const [questCompleted, setQuestCompleted] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [availableHearts, setAvailableHearts] = useState(3)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [completedCards, setCompletedCards] = useState<number[]>([])
  const [showCompleteQuestModal, setShowCompleteQuestModal] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  // Mock data for the quest
  const questData = {
    title: "Art Adventure",
    location: "The Broad Museum",
    address: "221 S Grand Ave, Los Angeles, CA 90012",
    time: "Today at 3:00 PM",
    category: "Creative",
    matchName: "Alex",
    matchImage: "/images/alex-profile.png",
    tasks: [
      {
        category: "Romantic",
        color: "bg-red-600",
        task: "Find your favorite artwork and share why it speaks to you. Take turns explaining what emotions it evokes.",
        points: 10,
      },
      {
        category: "Bold",
        color: "bg-purple-600",
        task: "Ask a museum staff member about the most controversial piece in the museum and discuss your thoughts about it.",
        points: 20,
      },
      {
        category: "Funny",
        color: "bg-yellow-600",
        task: "Take turns creating silly backstories for the people in portraits or sculptures. Who were they really?",
        points: 30,
      },
    ],
  }

  const handleBack = () => {
    router.back()
  }

  const handleStartQuest = () => {
    // Start the countdown if this is on the user's phone
    if (phoneOwner === "mine") {
      setCountdown(3)

      // Countdown from 3 to 1
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer)
            setTimeout(() => {
              setCountdown(null)
              setStage("quest-active")
            }, 1000)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      // If it's on their phone, just show a message
      setStage("quest-active")
    }
  }

  const handleCardSelect = (index: number) => {
    if (completedCards.includes(index)) {
      return // Don't allow selecting completed cards
    }

    if (availableHearts > 0) {
      setSelectedCard(index)
      setAvailableHearts(availableHearts - 1)
    } else {
      // Show purchase modal or notification
      router.push("/rewards/purchase")
    }
  }

  const handleCardFlip = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter((i) => i !== index))
    } else {
      setFlippedCards([...flippedCards, index])
    }
  }

  const handleCompleteQuest = () => {
    if (selectedCard !== null) {
      // Add the current card to completed cards
      const newCompletedCards = [...completedCards, selectedCard]
      setCompletedCards(newCompletedCards)

      // If we've completed all 3 cards, show the completion modal
      if (newCompletedCards.length === 3) {
        setShowCompleteQuestModal(true)
      } else {
        // Otherwise just show "completed" status temporarily
        setQuestCompleted(true)

        // Return to card selection after a short delay
        setTimeout(() => {
          setSelectedCard(null)
          setQuestCompleted(false)
        }, 1500)
      }
    }
  }

  const handleChatWithAlex = () => {
    router.push(`/chat/${questData.matchName.toLowerCase()}`)
  }

  const handleContinueQuest = () => {
    setShowPremiumModal(true)
  }

  const handlePurchasePremium = () => {
    router.push("/rewards/purchase")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-datequest-teal-50 to-amber-50">
      <div className="container max-w-md mx-auto px-4 py-8">
        <Button variant="default" className="mb-4" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="p-6 border-2 border-datequest-teal-200 bg-white shadow-md">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-datequest-teal-100 flex items-center justify-center mr-2">
              <Compass className="h-5 w-5 text-datequest-teal-700" />
            </div>
            <h1 className="text-2xl font-bold text-datequest-teal-700">DateQuest</h1>
          </div>

          {stage === "quest-instructions" && (
            <div className="space-y-4">
              <div className="bg-datequest-teal-50 p-4 rounded-lg border border-datequest-teal-200">
                <h3 className="font-medium text-center mb-2 text-datequest-teal-700">Your Quest Location</h3>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-datequest-teal-100 flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-datequest-teal-700" />
                  </div>
                  <div>
                    <p className="font-medium">{questData.location}</p>
                    <p className="text-sm text-gray-500">{questData.address}</p>
                  </div>
                </div>

                <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <Image src="/images/broad-museum.jpg" alt="Location Map" fill style={{ objectFit: "cover" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-datequest-teal-600 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span>You arrived</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span>{questData.matchName} arrived</span>
                  </div>
                </div>
              </div>

              <div className="bg-datequest-teal-50 p-4 rounded-lg border border-datequest-teal-200">
                <h3 className="font-medium text-center mb-2 text-datequest-teal-700">Quest Instructions</h3>
                <p className="text-center mb-3">
                  You're about to embark on a special adventure with {questData.matchName}!
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  This quest will help you connect in a meaningful way. Complete all 3 cards to earn points and unlock
                  new adventures.
                </p>

                {countdown !== null && (
                  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="text-white text-8xl font-bold">{countdown === 0 ? "Go!" : countdown}</div>
                  </div>
                )}

                <Button
                  className="w-full bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                  onClick={handleStartQuest}
                >
                  Start Quest
                </Button>
              </div>
            </div>
          )}

          {stage === "quest-active" && (
            <div className="space-y-4">
              {selectedCard === null ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-datequest-teal-700">Select a Quest Card</h3>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 fill-red-500 mr-1" />
                      <span className="text-sm font-medium">{availableHearts} left</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {questData.tasks.map((task, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: completedCards.includes(index) ? 1 : 1.05 }}
                        whileTap={{ scale: completedCards.includes(index) ? 1 : 0.95 }}
                        className={`${completedCards.includes(index) ? "bg-gray-400" : task.color} rounded-lg p-3 text-white text-center cursor-pointer shadow-md ${completedCards.includes(index) ? "opacity-50" : ""}`}
                        onClick={() => handleCardSelect(index)}
                      >
                        <div className="text-2xl mb-1">{index === 0 ? "❤️" : index === 1 ? "🔥" : "😂"}</div>
                        <div className="text-xs font-medium">{task.category}</div>
                        <div className="text-xs mt-1">{task.points} pts</div>
                        {completedCards.includes(index) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                            <CheckCircle className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center justify-center mt-3 mb-1">
                    <div className="text-sm text-datequest-teal-700">{completedCards.length} of 3 cards completed</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-datequest-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(completedCards.length / 3) * 100}%` }}
                    ></div>
                  </div>

                  {availableHearts === 0 && (
                    <div className="text-center mt-2">
                      <Button
                        size="sm"
                        className="bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                        onClick={() => router.push("/rewards/purchase")}
                      >
                        <Heart className="h-4 w-4 mr-1" /> Get More Cards
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-datequest-teal-500 text-white"
                      onClick={() => setSelectedCard(null)}
                    >
                      ← Back to cards
                    </Button>
                    <div className="text-xs px-2 py-1 bg-datequest-teal-100 text-datequest-teal-700 rounded-full">
                      {questData.tasks[selectedCard].category}
                    </div>
                  </div>

                  <div className="relative w-full h-48 perspective mb-4">
                    <motion.div
                      className="absolute w-full h-full"
                      initial={false}
                      animate={{ rotateY: flippedCards.includes(selectedCard) ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: "preserve-3d" }}
                      onClick={() => handleCardFlip(selectedCard)}
                    >
                      <div
                        className={`absolute w-full h-full ${questData.tasks[selectedCard].color} rounded-lg p-4 flex flex-col items-center justify-center text-white backface-hidden`}
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="text-4xl mb-3">
                          {selectedCard === 0 ? "❤️" : selectedCard === 1 ? "🔥" : "😂"}
                        </div>
                        <h3 className="text-lg font-bold mb-1">{questData.tasks[selectedCard].category} Quest</h3>
                        <p className="text-sm text-center">Tap to reveal your quest</p>
                        <div className="mt-2 text-xs">{questData.tasks[selectedCard].points} points</div>
                      </div>
                      <div
                        className="absolute w-full h-full bg-white rounded-lg p-4 flex flex-col items-center justify-center backface-hidden"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <h3 className="text-lg font-bold mb-2 text-datequest-teal-700">
                          {questData.tasks[selectedCard].category} Quest
                        </h3>
                        <p className="text-sm text-center mb-3">{questData.tasks[selectedCard].task}</p>
                        <div className="mt-auto">
                          <p className="text-xs text-gray-500 text-center">Tap card to flip back</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-datequest-teal-50 p-4 rounded-lg border border-datequest-teal-200">
                    <h3 className="font-medium text-center mb-3 text-datequest-teal-700">Quest Progress</h3>
                    <div className="h-2 bg-gray-200 rounded-full mb-3">
                      <div
                        className="h-2 bg-datequest-teal-600 rounded-full"
                        style={{ width: questCompleted ? "100%" : "0%", transition: "width 1s ease-in-out" }}
                      ></div>
                    </div>
                    <Button
                      className={`w-full ${questCompleted ? "bg-green-600 hover:bg-green-700" : "bg-datequest-teal-500 hover:bg-datequest-teal-600"} text-white`}
                      onClick={handleCompleteQuest}
                      disabled={questCompleted}
                    >
                      {questCompleted ? "Quest Completed!" : "Complete Quest"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>This quest is being displayed on {phoneOwner === "mine" ? "your" : "their"} phone</p>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Quest Complete Modal */}
      <Dialog open={showCompleteQuestModal} onOpenChange={setShowCompleteQuestModal}>
        <DialogContent className="sm:max-w-md border-4 border-datequest-lime">
          <DialogTitle className="text-center text-2xl font-bold text-datequest-teal-700">Quest Complete!</DialogTitle>
          <div className="flex flex-col items-center py-4">
            <div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-datequest-lime">
              <img
                src={questData.matchImage || "/placeholder.svg"}
                alt={questData.matchName}
                className="w-full h-full object-cover"
              />
            </div>
            <DialogDescription className="text-center text-lg mb-2">
              {questData.matchName} enjoyed the quest with you!
            </DialogDescription>
            <p className="text-center text-gray-600 mb-6">
              You've earned 60 DateQuest points and deepened your connection.
            </p>

            <div className="w-full space-y-3">
              <Button
                variant="default"
                className="w-full bg-datequest-teal-500 text-white"
                onClick={handleChatWithAlex}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with {questData.matchName}
              </Button>

              <Button
                variant="default"
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleContinueQuest}
              >
                <Crown className="mr-2 h-4 w-4" />
                Continue the Quest at New Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Feature Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="sm:max-w-md border-4 border-purple-300">
          <DialogTitle className="text-center text-xl font-bold text-purple-700">
            <Crown className="h-5 w-5 inline-block mr-1 text-yellow-500" />
            Premium Feature
          </DialogTitle>
          <div className="py-4">
            <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
              <h3 className="font-medium text-center mb-2 text-purple-800">Extend Your Adventure</h3>
              <p className="text-center text-gray-600 mb-2">
                Continue your date with {questData.matchName} to a new exciting location with our premium feature!
              </p>
              <div className="flex justify-center mb-3">
                <Lock className="h-8 w-8 text-purple-500" />
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span>Unlock multi-location date adventures</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span>Curated follow-up locations based on your preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span>Special bonuses for completing extended quests</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                variant="default"
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={handlePurchasePremium}
              >
                <Gift className="mr-2 h-4 w-4" />
                Upgrade to DateQuest Premium
              </Button>
              <Button variant="outline" className="border-gray-300" onClick={() => setShowPremiumModal(false)}>
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <h3 className="text-xl font-bold text-center mb-4">Rate Your Quest</h3>
            <p className="text-center mb-6">How was your experience at {questData.location}?</p>

            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="text-3xl focus:outline-none">
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="default"
                onClick={() => {
                  setShowRatingModal(false)
                }}
              >
                Submit
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
