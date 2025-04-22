"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, ArrowLeft, Share2, Trophy } from "lucide-react"
import ArrivalConfirmation from "@/components/arrival-confirmation"
import QuestCard from "@/components/quest-card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LocationSharingChoice } from "@/components/location-sharing-choice"

export default function QuestActivePage() {
  const router = useRouter()
  const [stage, setStage] = useState("arrival") // arrival, quest, completed
  const [currentCard, setCurrentCard] = useState(0)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showLocationChoice, setShowLocationChoice] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)

  // Quest cards data
  const questCards = [
    {
      id: "art-exploration",
      title: "Art Exploration",
      description:
        "Find your favorite artwork and explain why it resonates with you. Take a selfie with your date and the artwork to capture the moment.",
      category: "creative" as const,
      points: 75,
    },
    {
      id: "creative-connection",
      title: "Creative Connection",
      description:
        "Find two contrasting artworks and ask your date which they prefer and why. Create a story together about one of the pieces that caught your attention.",
      category: "social" as const,
      points: 85,
    },
    {
      id: "reflection",
      title: "Reflection & Connection",
      description:
        "Find a quiet spot to sit and talk. Share your impressions of the museum and what you've learned about each other. Suggest ideas for your next adventure together.",
      category: "adventure" as const,
      points: 65,
    },
  ]

  const handleArrivalComplete = () => {
    setShowLocationChoice(true)
  }

  const handleLocationChoice = (choice: "mine" | "theirs") => {
    setShowLocationChoice(false)
    setStage("quest")
  }

  const handleCardComplete = () => {
    // Add points from the completed card
    setTotalPoints(totalPoints + questCards[currentCard].points)

    if (currentCard < questCards.length - 1) {
      setCurrentCard(currentCard + 1)
    } else {
      setStage("completed")
      // Navigate to completion page after a delay
      setTimeout(() => {
        router.push("/quest-complete")
      }, 3000)
    }
  }

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions)
  }

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <Link href="/quests" className="mr-auto">
          <Button variant="ghost" size="icon" className="text-datequest-dark">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-center flex-1 text-datequest-dark">Active Quest</h1>
        <Button variant="ghost" size="icon" className="text-datequest-dark ml-auto" onClick={toggleShareOptions}>
          <Share2 className="h-5 w-5" />
        </Button>
      </header>
      <main className="flex-1 flex flex-col p-4 md:p-8 relative">
        {/* Decorative dotted lines */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M10,50 Q30,30 50,10"
              fill="none"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1,10"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M10,50 Q30,30 50,10"
              fill="none"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1,10"
            />
          </svg>
        </div>

        <div className="w-full max-w-md mx-auto z-10">
          <Card className="w-full overflow-hidden border-2 border-datequest-dark mb-6">
            <CardContent className="p-0">
              <div className="bg-datequest-dark p-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <div>
                    <h3 className="font-bold">The Broad Museum</h3>
                    <p className="text-sm opacity-90">221 S Grand Ave, Los Angeles, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm">Saturday, March 23, 2024</p>
                    <p className="text-sm">3:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/images/alex-profile.png"
                    alt="Alex"
                    className="w-12 h-12 rounded-full object-cover border-2 border-datequest-dark"
                  />
                  <div>
                    <p className="font-medium">With Alex</p>
                    <p className="text-sm text-gray-500">Art Adventure</p>
                  </div>

                  {stage !== "arrival" && (
                    <div className="ml-auto flex items-center">
                      <Trophy className="h-5 w-5 text-amber-500 mr-1" />
                      <span className="font-bold">{totalPoints}</span>
                    </div>
                  )}
                </div>

                {stage !== "arrival" && (
                  <div className="text-black text-sm mb-2">The Broad Museum - Art Exploration Quest</div>
                )}

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quest Progress</span>
                    <span>
                      {stage === "arrival" ? "0" : stage === "completed" ? questCards.length : currentCard + 1}/
                      {questCards.length} Cards
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-datequest-lime h-2.5 rounded-full"
                      style={{
                        width:
                          stage === "arrival"
                            ? "0%"
                            : stage === "completed"
                              ? "100%"
                              : `${((currentCard + 1) / questCards.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {stage === "arrival" && (
              <motion.div
                key="arrival"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ArrivalConfirmation onComplete={handleArrivalComplete} />
              </motion.div>
            )}

            {stage === "quest" && (
              <motion.div
                key={`quest-${currentCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestCard
                  id={questCards[currentCard].id}
                  title={questCards[currentCard].title}
                  description={questCards[currentCard].description}
                  category={questCards[currentCard].category}
                  points={questCards[currentCard].points}
                  onComplete={handleCardComplete}
                  cardNumber={currentCard + 1}
                  totalCards={questCards.length}
                />
              </motion.div>
            )}

            {stage === "completed" && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="w-full border-2 border-datequest-dark bg-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-datequest-dark mb-2">Quest Completed!</h3>
                    <p className="mb-4 text-gray-600">
                      Congratulations! You've completed all the quest cards. Redirecting to summary...
                    </p>
                    <div className="flex justify-center">
                      <div className="w-12 h-12 border-4 border-t-datequest-teal-500 border-datequest-teal-200 rounded-full animate-spin"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location sharing choice modal */}
        {showLocationChoice && (
          <LocationSharingChoice onClose={() => setShowLocationChoice(false)} onChoice={handleLocationChoice} />
        )}

        {/* Share options */}
        {showShareOptions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md border-2 border-datequest-dark">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-datequest-dark mb-4">Share Your Quest</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-datequest-dark text-datequest-dark hover:bg-datequest-lime"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Share on Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-datequest-dark text-datequest-dark hover:bg-datequest-lime"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Share on Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-datequest-dark text-datequest-dark hover:bg-datequest-lime"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h4v4h-4v-4zm0-12h4v8h-4V4z" />
                    </svg>
                    Share with Contacts
                  </Button>
                  <Button
                    className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                    onClick={toggleShareOptions}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
