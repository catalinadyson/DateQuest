"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AchievementBadge } from "@/components/achievement-badge"
import { type AchievementCategory, achievements, getAchievementsByCategory } from "@/lib/achievements"

interface AchievementsShowcaseProps {
  earnedAchievements: string[]
  progress: Record<string, number>
}

export function AchievementsShowcase({ earnedAchievements, progress }: AchievementsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>("milestone")

  const categories: { value: AchievementCategory; label: string }[] = [
    { value: "milestone", label: "Milestones" },
    { value: "creative", label: "Creative" },
    { value: "social", label: "Social" },
    { value: "adventure", label: "Adventure" },
    { value: "streak", label: "Streaks" },
    { value: "collection", label: "Collections" },
    { value: "special", label: "Special" },
  ]

  const filteredAchievements = getAchievementsByCategory(selectedCategory)

  // Calculate stats
  const totalEarned = earnedAchievements.length
  const totalAchievements = achievements.filter((a) => !a.secret).length
  const percentComplete = Math.round((totalEarned / totalAchievements) * 100)

  return (
    <div className="bg-white rounded-lg border-2 border-datequest-dark p-4">
      <h2 className="text-xl font-bold text-datequest-dark mb-4 text-center">Achievements</h2>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-datequest-dark">{totalEarned}</span> of {totalAchievements} achievements
            earned
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-datequest-teal-500 h-2 rounded-full" style={{ width: `${percentComplete}%` }}></div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-2xl text-datequest-dark">{percentComplete}%</p>
          <p className="text-xs text-gray-500">Complete</p>
        </div>
      </div>

      <Tabs
        defaultValue="milestone"
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as AchievementCategory)}
      >
        <TabsList className="grid grid-cols-4 mb-4 bg-datequest-teal-100">
          {categories.slice(0, 4).map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="text-datequest-teal-700 data-[state=active]:bg-datequest-teal-500 data-[state=active]:text-white bg-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsList className="grid grid-cols-3 mb-4 bg-datequest-teal-100">
          {categories.slice(4).map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="text-datequest-teal-700 data-[state=active]:bg-datequest-teal-500 data-[state=active]:text-white bg-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="mt-0">
            <div className="grid grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => {
                // Skip secret achievements that haven't been earned
                if (achievement.secret && !earnedAchievements.includes(achievement.id)) {
                  return null
                }

                return (
                  <div key={achievement.id} className="flex flex-col items-center text-center">
                    <AchievementBadge
                      id={achievement.id}
                      name={achievement.name}
                      description={achievement.description}
                      icon={achievement.icon}
                      color={achievement.color}
                      isEarned={earnedAchievements.includes(achievement.id)}
                      progress={progress[achievement.id] || 0}
                      total={achievement.requirement}
                    />
                    <p className="text-xs mt-2 font-medium text-gray-700 truncate w-full text-center">
                      {achievement.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
