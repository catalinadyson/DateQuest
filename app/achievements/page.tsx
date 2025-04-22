"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, User, Calendar, Gift, Trophy } from "lucide-react"
import { AchievementsShowcase } from "@/components/achievements-showcase"
import { AchievementBadge } from "@/components/achievement-badge"
import { achievements } from "@/lib/achievements"

export default function AchievementsPage() {
  // In a real app, this would come from a database or API
  // For demo purposes, we'll simulate some earned achievements
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([
    "first_quest",
    "creative_1",
    "social_1",
    "adventure_1",
    "streak_2",
    "weekend_warrior",
  ])

  // Simulate progress for achievements
  const [achievementProgress, setAchievementProgress] = useState<Record<string, number>>({
    quest_5: 3,
    creative_5: 2,
    social_5: 3,
    adventure_5: 1,
    streak_3: 2,
  })

  // Get featured achievements (most recent or most impressive)
  const featuredAchievements = earnedAchievements
    .slice(0, 3)
    .map((id) => achievements.find((a) => a.id === id))
    .filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <Link href="/profile" className="flex items-center justify-center">
          <ArrowLeft className="h-5 w-5 mr-2 text-datequest-dark" />
          <span className="font-medium text-datequest-dark">Back</span>
        </Link>
        <h1 className="ml-4 text-xl font-semibold text-center flex-1 text-datequest-dark">Achievements</h1>
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
          <div className="bg-white rounded-lg border-2 border-datequest-dark p-4 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-datequest-teal-100 flex items-center justify-center mr-3">
                <Trophy className="h-6 w-6 text-datequest-teal-700" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Your Achievement Collection</h2>
                <p className="text-sm text-gray-500">Complete quests to earn more badges</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Achievement Progress</span>
              <span className="text-sm text-gray-600">
                {earnedAchievements.length} / {achievements.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-datequest-teal-500 h-2.5 rounded-full"
                style={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
              ></div>
            </div>

            {featuredAchievements.length > 0 && (
              <div className="text-center">
                <h3 className="font-medium mb-2 text-center">Featured Achievements</h3>
                <div className="flex justify-around mb-2">
                  {featuredAchievements.map(
                    (achievement) =>
                      achievement && (
                        <div key={achievement.id} className="flex flex-col items-center">
                          <AchievementBadge
                            id={achievement.id}
                            name={achievement.name}
                            description={achievement.description}
                            icon={achievement.icon}
                            color={achievement.color}
                            isEarned={true}
                            size="md"
                          />
                          <p className="text-xs text-center mt-1 font-medium">{achievement.name}</p>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>

          <AchievementsShowcase earnedAchievements={earnedAchievements} progress={achievementProgress} />
        </div>
      </main>
      <nav className="flex justify-around items-center p-4 border-t border-datequest-dark bg-white">
        <Link href="/discover" className="flex flex-col items-center text-datequest-dark">
          <Heart className="h-6 w-6" />
          <span className="text-xs text-center">Discover</span>
        </Link>
        <Link href="/matches" className="flex flex-col items-center text-datequest-dark">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs text-center">Matches</span>
        </Link>
        <Link href="/quests" className="flex flex-col items-center text-datequest-dark">
          <Calendar className="h-6 w-6" />
          <span className="text-xs text-center">Quests</span>
        </Link>
        <Link href="/rewards" className="flex flex-col items-center text-datequest-dark">
          <Gift className="h-6 w-6" />
          <span className="text-xs text-center">Rewards</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-datequest-dark">
          <User className="h-6 w-6 fill-datequest-lime stroke-datequest-dark" />
          <span className="text-xs text-center">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
