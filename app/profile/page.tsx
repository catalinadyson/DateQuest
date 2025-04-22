"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Heart,
  MessageCircle,
  User,
  Calendar,
  Settings,
  Edit,
  LogOut,
  Plus,
  X,
  Check,
  Gift,
  Award,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { AchievementBadge } from "@/components/achievement-badge"

export default function ProfilePage() {
  const [userData, setUserData] = useState(null)
  const [interests, setInterests] = useState([])
  const [newInterest, setNewInterest] = useState("")
  const [points, setPoints] = useState(400)
  const [level, setLevel] = useState("Novice Explorer")
  const [completedQuests, setCompletedQuests] = useState(5)
  const [instagramConnected, setInstagramConnected] = useState(false)
  const [editingInterests, setEditingInterests] = useState(false)

  // Achievements data
  const earnedAchievements = [
    {
      id: "first_quest",
      name: "First Steps",
      description: "Completed your first quest",
      icon: <Award />,
      color: "bg-blue-500",
    },
    {
      id: "creative_1",
      name: "Creative Explorer",
      description: "Completed your first creative quest",
      icon: <Award />,
      color: "bg-purple-500",
    },
    {
      id: "weekend_warrior",
      name: "Weekend Warrior",
      description: "Completed a quest on a weekend",
      icon: <Award />,
      color: "bg-red-500",
    },
  ]

  // Unlockable achievements with silly names
  const unlockableAchievements = [
    {
      id: "selfie_king",
      name: "Selfie Royalty",
      description: "Take 10 selfies during quests",
      icon: <Lock />,
      color: "bg-gray-400",
    },
    {
      id: "art_whisperer",
      name: "Art Whisperer",
      description: "Successfully explain 5 abstract paintings",
      icon: <Lock />,
      color: "bg-gray-400",
    },
    {
      id: "coffee_addict",
      name: "Caffeinated Cupid",
      description: "Visit 3 different coffee shops on dates",
      icon: <Lock />,
      color: "bg-gray-400",
    },
    {
      id: "museum_ninja",
      name: "Museum Ninja",
      description: "Complete a museum quest without talking to any staff",
      icon: <Lock />,
      color: "bg-gray-400",
    },
    {
      id: "awkward_silence",
      name: "Silence Slayer",
      description: "Successfully navigate through 3 awkward silences",
      icon: <Lock />,
      color: "bg-gray-400",
    },
  ]

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}")
    setUserData(storedUserData)

    // Set interests from stored data or use defaults
    if (storedUserData.interests && storedUserData.interests.length > 0) {
      setInterests(storedUserData.interests)
    } else {
      setInterests(["Art", "Hiking", "Coffee", "Photography", "Museums", "Live Music"])
    }

    // Calculate level based on points
    if (points < 500) setLevel("Novice Explorer")
    else if (points < 1000) setLevel("Adventure Seeker")
    else if (points < 2000) setLevel("Quest Master")
    else setLevel("Legendary Dater")
  }, [])

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddInterest()
    }
  }

  const handleConnectInstagram = () => {
    setInstagramConnected(true)
  }

  // Get personality type description
  const getPersonalityDescription = (type) => {
    const descriptions = {
      "Creative Explorer":
        "You're imaginative and artistic, always seeking new forms of expression. You value beauty and originality in your experiences and connections.",
      "Adventure Seeker":
        "You thrive on excitement and new challenges. You're drawn to the outdoors and physical activities that get your adrenaline pumping.",
      "Social Butterfly":
        "You're energized by social interactions and building connections. You value shared experiences and creating memories with others.",
      "Curious Mind":
        "You're intellectually driven and love learning. You seek depth in conversations and appreciate partners who challenge your thinking.",
      "Culture Enthusiast":
        "You're passionate about arts, entertainment, and cultural experiences. You value aesthetic appreciation and emotional connection.",
      "Wellness Warrior":
        "You prioritize health and balance in all aspects of life. You seek partners who share your commitment to wellbeing and mindful living.",
      "Mystery Explorer":
        "You're a unique blend of interests and passions, making you a fascinating date with endless potential for connection.",
    }

    return descriptions[type] || descriptions["Mystery Explorer"]
  }

  // Get budget description
  const getBudgetDescription = (budget) => {
    const descriptions = {
      "under-20": "Under $20 per date",
      "20-50": "$20-$50 per date",
      "50-100": "$50-$100 per date",
      "100-plus": "$100+ per date",
      moderate: "Moderate budget",
    }

    return descriptions[budget] || "Not specified"
  }

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <h1 className="text-xl font-semibold text-datequest-dark">Your Profile</h1>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="text-datequest-dark">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
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
          <Card className="w-full overflow-hidden mb-6 border-2 border-datequest-dark">
            <div className="h-32 bg-datequest-teal-600"></div>
            <CardContent className="pt-0 relative bg-white">
              <div className="absolute -top-16 left-4 border-4 border-white rounded-full overflow-hidden">
                <img
                  src={userData?.profilePicture || "/images/profile-user.jpg"}
                  alt="Profile"
                  className="w-32 h-32 object-cover"
                />
              </div>
              <div className="pt-20 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-datequest-dark">{userData?.name || "Jamie Smith"}</h2>
                    <p className="text-gray-500">{userData?.age || "28"}, Los Angeles</p>
                    {userData?.height && <p className="text-gray-500">{userData.height}</p>}
                    {userData?.personalityType && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-1">
                        <Badge className="bg-datequest-lime text-datequest-dark">{userData.personalityType}</Badge>
                      </motion.div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-datequest-teal-500 text-white bg-datequest-teal-500 hover:bg-datequest-teal-600"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-datequest-teal-700 mb-2">About Me</h3>
                  <p className="text-gray-600">
                    {userData?.bio ||
                      "Art lover, coffee enthusiast, and hiking addict. Looking for someone to explore the city with!"}
                  </p>
                </div>

                {userData?.personalityType && (
                  <div className="mt-6 p-4 bg-datequest-teal-50 rounded-lg border border-datequest-teal-100">
                    <h3 className="font-medium text-datequest-teal-700 mb-2">
                      Your DateQuest Personality: {userData.personalityType}
                    </h3>
                    <p className="text-gray-600 text-sm">{getPersonalityDescription(userData.personalityType)}</p>
                  </div>
                )}

                {userData?.budget && (
                  <div className="mt-6">
                    <h3 className="font-medium text-datequest-teal-700 mb-2">Budget Preference</h3>
                    <p className="text-gray-600">{getBudgetDescription(userData.budget)}</p>
                  </div>
                )}

                {userData?.religion && (
                  <div className="mt-6">
                    <h3 className="font-medium text-datequest-teal-700 mb-2">Religion</h3>
                    <p className="text-gray-600">{userData.religion}</p>
                  </div>
                )}

                {userData?.quirkyQuestion && userData?.quirkyAnswer && (
                  <div className="mt-6">
                    <h3 className="font-medium text-datequest-teal-700 mb-2">{userData.quirkyQuestion}</h3>
                    <p className="text-gray-600">{userData.quirkyAnswer}</p>
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-datequest-teal-700">Interests</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-datequest-teal-500 hover:bg-datequest-teal-50 text-center"
                      onClick={() => setEditingInterests(!editingInterests)}
                    >
                      {editingInterests ? (
                        <>
                          <Check className="h-4 w-4 mr-1" /> Done
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </>
                      )}
                    </Button>
                  </div>

                  {editingInterests ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-datequest-teal-500 text-white rounded-full px-3 py-1"
                          >
                            <span className="text-sm font-medium">{interest}</span>
                            <button
                              className="ml-1 text-white hover:text-datequest-lime"
                              onClick={() => handleRemoveInterest(interest)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Add new interest"
                          className="border-datequest-teal-300"
                          onKeyDown={handleKeyDown}
                        />
                        <Button
                          onClick={handleAddInterest}
                          className="bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 text-center"
                          disabled={!newInterest.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-datequest-teal-100 text-datequest-teal-700"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Achievements Section */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-datequest-teal-700">Your Achievements</h3>
                    <Link href="/achievements">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-datequest-teal-500 hover:bg-datequest-teal-50 text-center"
                      >
                        <Award className="h-4 w-4 mr-1" /> View All
                      </Button>
                    </Link>
                  </div>

                  {/* Earned Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Earned ({earnedAchievements.length})</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {earnedAchievements.map((achievement) => (
                        <div key={achievement.id} className="flex flex-col items-center text-center">
                          <AchievementBadge
                            id={achievement.id}
                            name={achievement.name}
                            description={achievement.description}
                            icon={achievement.icon}
                            color={achievement.color}
                            isEarned={true}
                            size="sm"
                          />
                          <p className="text-xs mt-1 font-medium text-gray-700 truncate w-full">{achievement.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unlockable Achievements */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      Unlockable ({unlockableAchievements.length})
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-1 gap-2">
                        {unlockableAchievements.slice(0, 3).map((achievement) => (
                          <div key={achievement.id} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full ${achievement.color} flex items-center justify-center mr-2`}
                            >
                              <Lock className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{achievement.name}</p>
                              <p className="text-xs text-gray-500">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {unlockableAchievements.length > 3 && (
                        <Button
                          variant="ghost"
                          className="w-full mt-2 text-sm text-datequest-teal-500 hover:bg-datequest-teal-50"
                          onClick={() => {}}
                        >
                          Show {unlockableAchievements.length - 3} more
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-datequest-teal-700">Social Media</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-white bg-datequest-teal-500 hover:bg-datequest-teal-600 text-center"
                      onClick={handleConnectInstagram}
                    >
                      <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Instagram
                    </Button>
                  </div>

                  {instagramConnected ? (
                    <div className="p-4 border-2 border-datequest-teal-200 rounded-lg bg-datequest-teal-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <svg
                            className="h-8 w-8 text-pink-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="pink"
                            />
                          </svg>
                          <h4 className="ml-2 font-medium">Instagram Connected</h4>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Connected</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <img
                          src="/images/profile-user.jpg"
                          alt="Instagram post"
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <img
                          src="/images/profile-user.jpg"
                          alt="Instagram post"
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <img
                          src="/images/profile-user.jpg"
                          alt="Instagram post"
                          className="w-full h-20 object-cover rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-2 border-dashed border-datequest-teal-300 rounded-lg bg-datequest-teal-50">
                      <div className="flex items-center justify-center mb-2">
                        <svg
                          className="h-8 w-8 text-pink-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h4 className="ml-2 font-medium">Instagram</h4>
                      </div>
                      <p className="text-sm text-center text-gray-500 mb-3">
                        Connect your Instagram to import photos and share your adventures
                      </p>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                        onClick={handleConnectInstagram}
                      >
                        Connect Instagram
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full overflow-hidden mb-6 border-2 border-datequest-dark">
            <CardHeader className="bg-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-datequest-teal-700">DateQuest Stats</CardTitle>
                <Badge className="bg-datequest-lime text-datequest-dark">{level}</Badge>
              </div>
              <CardDescription>Your adventure history</CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 border-2 border-datequest-teal-200 rounded-lg">
                  <div className="text-2xl font-bold text-datequest-teal-700">5</div>
                  <div className="text-sm text-gray-500">Dates</div>
                </div>
                <div className="p-3 border-2 border-datequest-teal-200 rounded-lg">
                  <div className="text-2xl font-bold text-datequest-teal-700">{completedQuests}</div>
                  <div className="text-sm text-gray-500">Quests</div>
                </div>
                <div className="p-3 border-2 border-datequest-teal-200 rounded-lg">
                  <div className="text-2xl font-bold text-datequest-teal-700">{points}</div>
                  <div className="text-sm text-gray-500">Points</div>
                </div>
              </div>

              {/* Level progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">{level}</span>
                  <span className="text-gray-500">
                    {level === "Novice Explorer"
                      ? "Adventure Seeker"
                      : level === "Adventure Seeker"
                        ? "Quest Master"
                        : level === "Quest Master"
                          ? "Legendary Dater"
                          : "Max Level"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div
                    className="bg-datequest-teal-500 h-2.5 rounded-full"
                    style={{
                      width:
                        level === "Novice Explorer"
                          ? `${(points / 500) * 100}%`
                          : level === "Adventure Seeker"
                            ? `${((points - 500) / 500) * 100}%`
                            : level === "Quest Master"
                              ? `${((points - 1000) / 1000) * 100}%`
                              : "100%",
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <Award className="h-4 w-4 mr-1 text-datequest-teal-500" />
                  <span className="text-xs text-gray-500">
                    {level === "Novice Explorer"
                      ? `${500 - points} points until next level`
                      : level === "Adventure Seeker"
                        ? `${1000 - points} points until next level`
                        : level === "Quest Master"
                          ? `${2000 - points} points until next level`
                          : "Max level reached!"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-2 border-datequest-teal-500 text-datequest-teal-500 hover:bg-datequest-teal-50 bg-white"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
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
