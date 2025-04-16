"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy, Star, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function QuestCompletePage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.push("/discover")
  }

  const handleChat = () => {
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50">
      <div className="container max-w-md mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Home
        </Button>

        <Card className="p-6 border-2 border-amber-200 bg-white shadow-md relative overflow-hidden">
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ["#FCD34D", "#60A5FA", "#F87171", "#34D399"][i % 4],
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{
                    y: 400,
                    opacity: [0, 1, 1, 0],
                    x: Math.random() * 100 - 50,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto mb-3 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-blue-800 mb-1">Quest Complete!</h1>
            <p className="text-gray-600">You've successfully completed your adventure</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
            <h3 className="font-medium text-center mb-3 text-amber-800">Rewards Earned</h3>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Star className="h-5 w-5 text-blue-700" />
                </div>
                <span>Experience Points</span>
              </div>
              <span className="font-bold text-blue-700">+50</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <span>Connection Level</span>
              </div>
              <span className="font-bold text-red-500">+1</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <h3 className="font-medium text-center mb-3 text-blue-800">What's Next?</h3>
            <div className="flex items-center mb-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Match"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-medium">Jordan enjoyed the quest!</p>
                <p className="text-sm text-gray-500">Continue your adventure together</p>
              </div>
            </div>
            <Button
              className="w-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center"
              onClick={handleChat}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Jordan
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Your adventure continues...</p>
            <Button
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
              onClick={handleBack}
            >
              Explore More Quests
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
