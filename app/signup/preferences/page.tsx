"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Music, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { PersonalityReveal } from "@/components/personality-reveal"

export default function SignupPreferencesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [ageRange, setAgeRange] = useState([21, 35])
  const [distance, setDistance] = useState(25)
  const [newInterest, setNewInterest] = useState("")
  const [selectedInterests, setSelectedInterests] = useState([])
  const [personalityType, setPersonalityType] = useState("")
  const [showPersonalityReveal, setShowPersonalityReveal] = useState(false)

  const [formData, setFormData] = useState({
    gender: "",
    interestedIn: "",
    budget: "moderate",
    profilePicture: "/images/profile-user.jpg", // Default picture
    favSong: "",
  })

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Determine personality type based on interests
    const personalityType = determinePersonalityType(selectedInterests)
    setPersonalityType(personalityType)

    // Store preferences in localStorage to use in profile
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")

    // Only store new data, don't overwrite existing data for these fields
    const newUserData = {
      ...userData,
      ageRange,
      distance,
      interests: selectedInterests,
      personalityType,
      budget: formData.budget,
      gender: formData.gender,
      interestedIn: formData.interestedIn,
      favSong: formData.favSong,
    }

    localStorage.setItem("userData", JSON.stringify(newUserData))

    // Show personality reveal
    setShowPersonalityReveal(true)

    // After personality reveal is closed, we'll navigate to discover
    // This is now handled in the onClose callback of PersonalityReveal
  }

  const determinePersonalityType = (interests) => {
    // Count interests by category
    const categories = {
      creative: ["Art", "Photography", "Painting", "Music", "Writing", "Dancing", "Crafts"],
      outdoor: ["Hiking", "Cycling", "Camping", "Fishing", "Gardening", "Rock Climbing", "Surfing"],
      social: ["Coffee", "Wine Tasting", "Cooking", "Dining", "Volunteering", "Networking", "Parties"],
      intellectual: ["Museums", "Reading", "History", "Science", "Philosophy", "Chess", "Documentaries"],
      entertainment: ["Live Music", "Movies", "Gaming", "Theater", "Concerts", "Comedy", "Festivals"],
      wellness: ["Yoga", "Fitness", "Meditation", "Running", "Swimming", "Nutrition", "Mindfulness"],
    }

    const counts = Object.keys(categories).reduce((acc, category) => {
      acc[category] = interests.filter((interest) =>
        categories[category].some((cat) => interest.toLowerCase().includes(cat.toLowerCase())),
      ).length
      return acc
    }, {})

    // Find the category with the most interests
    const topCategory = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))

    // Map category to personality type
    const personalityTypes = {
      creative: "Creative Explorer",
      outdoor: "Adventure Seeker",
      social: "Social Butterfly",
      intellectual: "Curious Mind",
      entertainment: "Culture Enthusiast",
      wellness: "Wellness Warrior",
    }

    return personalityTypes[topCategory] || "Mystery Explorer"
  }

  const predefinedInterests = [
    { name: "Art", emoji: "🎨" },
    { name: "Hiking", emoji: "🥾" },
    { name: "Coffee", emoji: "☕" },
    { name: "Photography", emoji: "📸" },
    { name: "Museums", emoji: "🏛️" },
    { name: "Live Music", emoji: "🎵" },
    { name: "Cooking", emoji: "👨‍🍳" },
    { name: "Reading", emoji: "📚" },
    { name: "Travel", emoji: "✈️" },
    { name: "Yoga", emoji: "🧘" },
    { name: "Movies", emoji: "🎬" },
    { name: "Dancing", emoji: "💃" },
    { name: "Wine Tasting", emoji: "🍷" },
    { name: "Gaming", emoji: "🎮" },
    { name: "Fitness", emoji: "💪" },
    { name: "Painting", emoji: "🖌️" },
    { name: "Cycling", emoji: "🚴" },
    { name: "Baking", emoji: "🍰" },
    { name: "Gardening", emoji: "🌱" },
    { name: "Volunteering", emoji: "❤️" },
    { name: "History", emoji: "📜" },
    { name: "Science", emoji: "🔬" },
    { name: "Theater", emoji: "🎭" },
    { name: "Crafts", emoji: "🧶" },
    { name: "Camping", emoji: "⛺" },
    { name: "Meditation", emoji: "🧠" },
    { name: "Writing", emoji: "✍️" },
    { name: "Concerts", emoji: "🎤" },
    { name: "Philosophy", emoji: "🤔" },
    { name: "Comedy", emoji: "😂" },
  ]

  // Budget options with emojis
  const budgetOptions = [
    { value: "under-20", label: "Under $20", emoji: "💰" },
    { value: "20-50", label: "$20-$50", emoji: "💰💰" },
    { value: "50-100", label: "$50-$100", emoji: "💰💰💰" },
    { value: "100-plus", label: "$100+", emoji: "💰💰💰💰" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <Link href="/signup/profile-details">
          <Button variant="default" className="flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-center flex-1 text-datequest-dark">Your Preferences</h1>
      </header>
      <main className="flex-1 flex flex-col items-center p-4 md:p-8 relative">
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
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-datequest-dark flex items-center justify-center">
              <Heart className="h-8 w-8 text-datequest-lime" />
            </div>
          </div>

          <Card className="w-full border-2 border-datequest-dark">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Almost there!</CardTitle>
              <CardDescription className="text-center">
                Tell us a bit more about yourself and what you're looking for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-center block">
                      I am a...
                    </Label>
                    <Select
                      name="gender"
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                      required
                    >
                      <SelectTrigger className="border-datequest-dark text-center">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="woman">Woman</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestedIn" className="text-center block">
                      Interested in...
                    </Label>
                    <Select
                      name="interestedIn"
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, interestedIn: value }))}
                      required
                    >
                      <SelectTrigger className="border-datequest-dark text-center">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-center block">Age Range Preference</Label>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{ageRange[0]} years</span>
                    <span>{ageRange[1]} years</span>
                  </div>
                  <div className="relative pt-2 pb-6">
                    <Slider
                      defaultValue={ageRange}
                      min={18}
                      max={70}
                      step={1}
                      onValueChange={setAgeRange}
                      className="mb-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-center block">Maximum Distance</Label>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>1 mile</span>
                    <span>{distance} miles</span>
                    <span>100 miles</span>
                  </div>
                  <div className="relative pt-2 pb-6">
                    <Slider
                      defaultValue={[distance]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => setDistance(value[0])}
                      className="mb-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-center block">Date Budget Preference</Label>
                  <p className="text-xs text-gray-500 text-center mb-2">Select your preferred budget for dates</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {budgetOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        onClick={() => setFormData((prev) => ({ ...prev, budget: option.value }))}
                        className={`cursor-pointer flex items-center px-3 py-1.5 rounded-full border-2 transition-colors ${
                          formData.budget === option.value
                            ? "bg-datequest-teal-500 border-datequest-teal-700 text-white font-bold"
                            : "bg-white border-gray-300 text-gray-700 hover:border-datequest-dark"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1">{option.emoji}</span>
                        <span className="text-sm font-medium">{option.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-center block">Your Interests</Label>
                  <p className="text-xs text-gray-500 text-center mb-2">Select up to 10 interests</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {predefinedInterests.map((interest, index) => (
                      <motion.div
                        key={index}
                        onClick={() => {
                          if (selectedInterests.includes(interest.name)) {
                            handleInterestToggle(interest.name)
                          } else if (selectedInterests.length < 10) {
                            handleInterestToggle(interest.name)
                          }
                        }}
                        className={`cursor-pointer flex items-center px-3 py-1.5 rounded-full border-2 transition-colors ${
                          selectedInterests.includes(interest.name)
                            ? "bg-datequest-teal-500 border-datequest-teal-700 text-white font-bold"
                            : "bg-white border-gray-300 text-gray-700 hover:border-datequest-dark"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1">{interest.emoji}</span>
                        <span className="text-sm font-medium">{interest.name}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-center mt-2 font-medium text-datequest-teal-700">
                    {selectedInterests.length}/10 interests selected
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favSong" className="text-center block">
                    Favorite Song (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="favSong"
                      name="favSong"
                      placeholder="What's your anthem?"
                      value={formData.favSong}
                      onChange={handleChange}
                      className="border-datequest-dark text-center pr-10"
                    />
                    <a
                      href="https://open.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                    >
                      <Music className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 text-center">Connect with Spotify to add your favorite song</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                  disabled={loading}
                >
                  {loading ? "Finalizing your profile..." : "Complete Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        {showPersonalityReveal && (
          <PersonalityReveal
            personalityType={personalityType}
            onClose={() => {
              setShowPersonalityReveal(false)
              // Simulate loading for a more realistic experience
              setTimeout(() => {
                router.push("/discover")
              }, 500)
            }}
          />
        )}
      </main>
    </div>
  )
}
