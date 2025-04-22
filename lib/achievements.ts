import type React from "react"
import {
  Award,
  Flame,
  Heart,
  Map,
  Palette,
  Users,
  Mountain,
  Calendar,
  Clock,
  Trophy,
  Coffee,
  Camera,
  Music,
  Utensils,
  Sparkles,
} from "lucide-react"

export interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  category: AchievementCategory
  requirement: number
  secret?: boolean
}

export type AchievementCategory =
  | "milestone"
  | "creative"
  | "social"
  | "adventure"
  | "streak"
  | "special"
  | "collection"

export const achievements: Achievement[] = [
  // Milestone Achievements
  {
    id: "first_quest",
    name: "First Steps",
    description: "Complete your first quest",
    icon: <Award />,
    color: "bg-blue-500",
    category: "milestone",
    requirement: 1,
  },
  {
    id: "quest_5",
    name: "Quest Enthusiast",
    description: "Complete 5 quests",
    icon: <Award />,
    color: "bg-blue-600",
    category: "milestone",
    requirement: 5,
  },
  {
    id: "quest_10",
    name: "Quest Master",
    description: "Complete 10 quests",
    icon: <Trophy />,
    color: "bg-blue-700",
    category: "milestone",
    requirement: 10,
  },
  {
    id: "quest_25",
    name: "Quest Legend",
    description: "Complete 25 quests",
    icon: <Trophy />,
    color: "bg-blue-800",
    category: "milestone",
    requirement: 25,
  },

  // Creative Achievements
  {
    id: "creative_1",
    name: "Creative Explorer",
    description: "Complete your first creative quest",
    icon: <Palette />,
    color: "bg-purple-500",
    category: "creative",
    requirement: 1,
  },
  {
    id: "creative_5",
    name: "Creative Genius",
    description: "Complete 5 creative quests",
    icon: <Palette />,
    color: "bg-purple-600",
    category: "creative",
    requirement: 5,
  },
  {
    id: "creative_10",
    name: "Creative Virtuoso",
    description: "Complete 10 creative quests",
    icon: <Palette />,
    color: "bg-purple-700",
    category: "creative",
    requirement: 10,
  },

  // Social Achievements
  {
    id: "social_1",
    name: "Social Butterfly",
    description: "Complete your first social quest",
    icon: <Users />,
    color: "bg-pink-500",
    category: "social",
    requirement: 1,
  },
  {
    id: "social_5",
    name: "Social Maven",
    description: "Complete 5 social quests",
    icon: <Users />,
    color: "bg-pink-600",
    category: "social",
    requirement: 5,
  },
  {
    id: "social_10",
    name: "Social Superstar",
    description: "Complete 10 social quests",
    icon: <Users />,
    color: "bg-pink-700",
    category: "social",
    requirement: 10,
  },

  // Adventure Achievements
  {
    id: "adventure_1",
    name: "Adventure Seeker",
    description: "Complete your first adventure quest",
    icon: <Mountain />,
    color: "bg-green-500",
    category: "adventure",
    requirement: 1,
  },
  {
    id: "adventure_5",
    name: "Adventure Enthusiast",
    description: "Complete 5 adventure quests",
    icon: <Mountain />,
    color: "bg-green-600",
    category: "adventure",
    requirement: 5,
  },
  {
    id: "adventure_10",
    name: "Adventure Master",
    description: "Complete 10 adventure quests",
    icon: <Mountain />,
    color: "bg-green-700",
    category: "adventure",
    requirement: 10,
  },

  // Streak Achievements
  {
    id: "streak_2",
    name: "Dynamic Duo",
    description: "Complete 2 quests in a row",
    icon: <Flame />,
    color: "bg-orange-500",
    category: "streak",
    requirement: 2,
  },
  {
    id: "streak_3",
    name: "Triple Threat",
    description: "Complete 3 quests in a row",
    icon: <Flame />,
    color: "bg-orange-600",
    category: "streak",
    requirement: 3,
  },
  {
    id: "streak_5",
    name: "Unstoppable",
    description: "Complete 5 quests in a row",
    icon: <Flame />,
    color: "bg-orange-700",
    category: "streak",
    requirement: 5,
  },

  // Special Achievements
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Complete a quest after 10 PM",
    icon: <Clock />,
    color: "bg-indigo-600",
    category: "special",
    requirement: 1,
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Complete a quest before 9 AM",
    icon: <Clock />,
    color: "bg-yellow-500",
    category: "special",
    requirement: 1,
  },
  {
    id: "weekend_warrior",
    name: "Weekend Warrior",
    description: "Complete a quest on a weekend",
    icon: <Calendar />,
    color: "bg-red-500",
    category: "special",
    requirement: 1,
  },
  {
    id: "perfect_match",
    name: "Perfect Match",
    description: "Complete a quest with someone who has the same personality type",
    icon: <Heart />,
    color: "bg-red-600",
    category: "special",
    requirement: 1,
    secret: true,
  },

  // Collection Achievements
  {
    id: "museum_maven",
    name: "Museum Maven",
    description: "Complete all quests at a museum",
    icon: <Palette />,
    color: "bg-teal-600",
    category: "collection",
    requirement: 1,
  },
  {
    id: "foodie",
    name: "Foodie",
    description: "Complete all food-related quests",
    icon: <Utensils />,
    color: "bg-yellow-600",
    category: "collection",
    requirement: 1,
  },
  {
    id: "photographer",
    name: "Photographer",
    description: "Take photos during 5 different quests",
    icon: <Camera />,
    color: "bg-blue-500",
    category: "collection",
    requirement: 5,
  },
  {
    id: "music_lover",
    name: "Music Lover",
    description: "Complete all music-related quests",
    icon: <Music />,
    color: "bg-purple-500",
    category: "collection",
    requirement: 1,
  },
  {
    id: "coffee_connoisseur",
    name: "Coffee Connoisseur",
    description: "Visit 3 different coffee shops during quests",
    icon: <Coffee />,
    color: "bg-amber-700",
    category: "collection",
    requirement: 3,
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Complete quests in 5 different locations",
    icon: <Map />,
    color: "bg-emerald-600",
    category: "collection",
    requirement: 5,
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Earn 10 different achievements",
    icon: <Sparkles />,
    color: "bg-amber-500",
    category: "special",
    requirement: 10,
    secret: true,
  },
]

// Helper function to get achievement by ID
export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((achievement) => achievement.id === id)
}

// Helper function to get achievements by category
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return achievements.filter((achievement) => achievement.category === category)
}

// Helper function to check if an achievement should be awarded
export function checkAchievementEligibility(
  achievementId: string,
  userProgress: Record<string, number>,
  earnedAchievements: string[],
): boolean {
  // If already earned, return false
  if (earnedAchievements.includes(achievementId)) {
    return false
  }

  const achievement = getAchievementById(achievementId)
  if (!achievement) return false

  const progress = userProgress[achievementId] || 0
  return progress >= achievement.requirement
}
