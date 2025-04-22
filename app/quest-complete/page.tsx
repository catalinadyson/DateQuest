"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy, Heart, MessageCircle, Award } from "lucide-react"
import Image from "next/image"
import Confetti from "react-confetti"
import { AchievementNotification } from "@/components/achievement-notification"
import { type Achievement, achievements } from "@/lib/achievements"

export default function QuestCompletePage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)
  const [totalPoints, setTotalPoints] = useState(225) // Sum of all quest card points
  const [earnedAchievements, setEarnedAchievements] = useState<Achievement[]>([])
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate checking for newly earned achievements
  useEffect(() => {
    // In a real app, this would check against user progress and quest data
    // For demo purposes, we'll simulate earning some achievements
    const newAchievements = [
      achievements.find((a) => a.id === "first_quest"),
      achievements.find((a) => a.id === "creative_1"),
      achievements.find((a) => a.id === "weekend_warrior"),
    ].filter(Boolean) as Achievement[]

    setEarnedAchievements(newAchievements)
  }, [])

  const handleBack = () => {
    router.push("/discover")
  }

  const handleChat = () => {
    router.push("/chat/alex")
  }

  const handleContinueQuest = () => {
    // This would be a premium feature
    router.push("/rewards/purchase")
  }

  const handleAchievementClose = () => {
    setCurrentAchievementIndex((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50">
      <div className="container max-w-md mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Home
        </Button>

        <Card className="p-6 border-2 border-amber-200 bg-white shadow-md relative overflow-hidden">
          {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

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
                  <Award className="h-5 w-5 text-blue-700" />
                </div>
                <span>Experience Points</span>
              </div>
              <span className="font-bold text-blue-700">+{totalPoints}</span>
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

          {earnedAchievements.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <h3 className="font-medium text-center mb-3 text-blue-800">Achievements Unlocked</h3>
              <div className="flex justify-around">
                {earnedAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center`}>
                      <div className="text-white">{achievement.icon}</div>
                    </div>
                    <p className="text-xs text-center mt-1 font-medium">{achievement.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => router.push("/achievements")}
                >
                  <Trophy className="h-4 w-4 mr-1" />
                  View All Achievements
                </Button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <h3 className="font-medium text-center mb-3 text-blue-800">What's Next?</h3>
            <div className="flex items-center mb-3">
              <Image src="/images/alex-profile.png" alt="Alex" width={40} height={40} className="rounded-full mr-3" />
              <div>
                <p className="font-medium">Alex enjoyed the quest!</p>
                <p className="text-sm text-gray-500">Continue your adventure together</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-blue-700 hover:bg-blue-800 flex items-center justify-center" onClick={handleChat}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with Alex
              </Button>
              <Button
                className="bg-amber-600 hover:bg-amber-700 flex items-center justify-center"
                onClick={handleContinueQuest}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Continue Quest
              </Button>
            </div>
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

      {/* Achievement notifications */}
      {earnedAchievements.length > 0 && currentAchievementIndex < earnedAchievements.length && (
        <AchievementNotification
          achievement={earnedAchievements[currentAchievementIndex]}
          onClose={handleAchievementClose}
        />
      )}
    </div>
  )
}
