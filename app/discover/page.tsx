"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Heart, MessageCircle, User, Calendar, Gift, X, Shield } from "lucide-react"

export default function DiscoverPage() {
  const [currentProfile, setCurrentProfile] = useState(() => {
    // Check if we have a stored profile index
    if (typeof window !== "undefined") {
      const storedIndex = localStorage.getItem("currentProfileIndex")
      return storedIndex ? Number.parseInt(storedIndex) : 0
    }
    return 0
  })
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [swipesRemaining, setSwipesRemaining] = useState(5)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  // Default user data if not signed up
  const defaultUserData = {
    name: "Catalina",
    age: 19,
    ageRange: [18, 25],
    distance: 15,
    personalityType: "Social Butterfly",
  }

  // Load user data from localStorage or use default
  const [userData, setUserData] = useState(defaultUserData)

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData({ ...defaultUserData, ...JSON.parse(storedUserData) })
    }
  }, [])

  useEffect(() => {
    // Clear the stored index after it's used
    localStorage.removeItem("currentProfileIndex")
  }, [])

  const profiles = [
    {
      id: "1",
      name: "Alex",
      age: 22,
      personalityType: "Adventure Seeker",
      image: "/images/alex-profile.png",
      bio: "Hiking enthusiast, coffee addict, and always looking for the next adventure. Let's explore the city together!",
      interests: ["Hiking", "Photography", "Coffee", "Travel"],
    },
    {
      id: "2",
      name: "Jordan",
      age: 24,
      personalityType: "Creative Explorer",
      image: "/images/jordan-profile.png",
      bio: "Photographer by day, musician by night. Looking for someone to share creative adventures with.",
      interests: ["Photography", "Music", "Art", "Coffee"],
    },
    {
      id: "3",
      name: "Taylor",
      age: 21,
      personalityType: "Culture Enthusiast",
      image: "/images/profile-taylor.jpg",
      bio: "Film buff and bookworm. I can spend hours in museums and love trying new restaurants.",
      interests: ["Movies", "Reading", "Museums", "Food"],
    },
    {
      id: "4",
      name: "Sophia",
      age: 23,
      personalityType: "Social Butterfly",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hairstyle2-kpYqes2RjcRUdJFHn2og1qXxya6UNO.png",
      bio: "Always up for a good conversation and meeting new people. Let's grab coffee and talk about life!",
      interests: ["Dancing", "Socializing", "Coffee", "Travel"],
    },
    {
      id: "5",
      name: "Mia",
      age: 20,
      personalityType: "Curious Mind",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-10-04%20112811-7EUJjYxI2hs4Yc395LO0UTR1Vt1IQ7.png",
      bio: "Philosophy student with a passion for deep conversations. Looking for someone who challenges my thinking.",
      interests: ["Philosophy", "Reading", "Art", "Debates"],
    },
    {
      id: "6",
      name: "Riley",
      age: 25,
      personalityType: "Wellness Warrior",
      image: "/images/riley-profile.jpg",
      bio: "Yoga instructor and nutrition enthusiast. Seeking someone who values health and mindfulness.",
      interests: ["Yoga", "Nutrition", "Hiking", "Meditation"],
    },
  ]

  const getCompatibilityExplanation = (userType, matchType) => {
    const compatibilityMap = {
      "Creative Explorer": {
        "Adventure Seeker":
          "Your artistic vision combined with their love for excitement creates a dynamic duo. You'll inspire each other to see the world differently!",
        "Social Butterfly":
          "Your creative depth and their social energy make for fascinating conversations. They'll help you share your creations with the world!",
        "Curious Mind":
          "You both appreciate depth and meaning. Your creative expression meets their intellectual curiosity for profound connections.",
        "Culture Enthusiast":
          "A perfect artistic match! You'll inspire each other's creative pursuits and enjoy cultural experiences together.",
        "Wellness Warrior":
          "Your creative spirit and their balanced approach complement each other beautifully. They'll help you find harmony in your artistic journey.",
      },
      "Adventure Seeker": {
        "Creative Explorer":
          "Their artistic perspective gives new meaning to your adventures. You'll push them out of their comfort zone while they help you appreciate the details.",
        "Social Butterfly":
          "You bring the excitement, they bring the people! Together you'll create memorable group adventures and never have a dull moment.",
        "Curious Mind":
          "Their thoughtful nature balances your spontaneity. They'll help you dive deeper into your experiences while you show them how to embrace the unknown.",
        "Culture Enthusiast":
          "You'll take them on adventures, and they'll introduce you to new cultural experiences. A perfect balance of action and appreciation!",
        "Wellness Warrior":
          "Their mindful approach helps you channel your adventurous energy. You'll inspire each other to try new physical challenges with purpose.",
      },
      "Social Butterfly": {
        "Creative Explorer":
          "Their creative depth adds substance to your social connections. You'll introduce them to new people while they show you new perspectives.",
        "Adventure Seeker":
          "You'll never run out of people to meet or places to go! Your social network and their adventurous spirit create endless possibilities.",
        "Curious Mind":
          "Their intellectual curiosity adds depth to your social gatherings. You help them connect with others while they bring fascinating topics to discuss.",
        "Culture Enthusiast":
          "You'll introduce them to your diverse social circle, and they'll bring everyone to interesting cultural events. The perfect hosts!",
        "Wellness Warrior":
          "Their balanced approach helps you create meaningful connections. You'll build a supportive social network together focused on wellbeing.",
      },
      "Curious Mind": {
        "Creative Explorer":
          "Their creativity gives life to your ideas. You'll have deep conversations about their art while they appreciate your intellectual curiosity.",
        "Adventure Seeker":
          "Your thoughtful planning and their spontaneity create balanced experiences. You research the destinations, they make sure you enjoy the journey!",
        "Social Butterfly":
          "They'll help you express your ideas to others, while you'll add depth to conversations. A perfect balance of connection and content.",
        "Culture Enthusiast":
          "You'll dive deep into cultural topics together. Your analytical approach and their appreciation for aesthetics create rich experiences.",
        "Wellness Warrior":
          "Your intellectual curiosity and their holistic approach create a balanced partnership. You'll explore the mind-body connection together.",
      },
      "Culture Enthusiast": {
        "Creative Explorer":
          "A match made in artistic heaven! You'll appreciate their creative process while they value your cultural knowledge.",
        "Adventure Seeker":
          "Their adventurous spirit will take your cultural experiences to new heights. You'll discover hidden gems together!",
        "Social Butterfly":
          "You'll never miss a cultural event with their social network. Together, you'll build a community around shared interests.",
        "Curious Mind":
          "Your shared love for learning makes every experience meaningful. You appreciate culture, they dive deep into the 'why' behind it.",
        "Wellness Warrior":
          "Their balanced approach helps you fully appreciate cultural experiences. You'll find mindfulness through art and expression together.",
      },
      "Wellness Warrior": {
        "Creative Explorer":
          "Their creative expression adds joy to your balanced lifestyle. You'll help them find harmony while they add spontaneity to your routine.",
        "Adventure Seeker":
          "Their energy invigorates your wellness practices. You'll try new physical challenges together while maintaining mindfulness.",
        "Social Butterfly":
          "Their social connections help you build a supportive wellness community. You'll inspire healthy habits in their friend group.",
        "Curious Mind":
          "Their intellectual approach complements your holistic perspective. Together you'll explore the science and philosophy behind wellness.",
        "Culture Enthusiast":
          "You'll discover how cultural practices enhance wellbeing. Their appreciation for beauty complements your mindful approach to life.",
      },
      "Mystery Explorer": {
        "Adventure Seeker":
          "Your unique perspective and their love for excitement will lead to unexpected discoveries together!",
        "Creative Explorer": "You'll inspire each other to see the world in new and beautiful ways!",
        "Social Butterfly": "Your depth and their connections create a perfect balance of meaningful relationships!",
        "Curious Mind": "You'll dive deep into fascinating topics and never run out of things to discuss!",
        "Culture Enthusiast": "Your shared appreciation for experiences will lead to unforgettable adventures!",
        "Wellness Warrior": "Together you'll create a balanced lifestyle full of mindful moments and joy!",
      },
    }

    // Default explanation if specific combination not found
    const defaultExplanation =
      "Your unique personality types complement each other in surprising ways. You'll discover new perspectives and experiences together!"

    // Get the specific explanation or default
    return userType && matchType && compatibilityMap[userType] && compatibilityMap[userType][matchType]
      ? compatibilityMap[userType][matchType]
      : defaultExplanation
  }

  const handleLike = () => {
    if (swipesRemaining <= 0) {
      setShowPurchaseModal(true)
      return
    }

    setSwipesRemaining(swipesRemaining - 1)
    setShowMatchModal(true)
    // Match modal will be closed by the closeMatchModal function
  }

  const handlePass = () => {
    if (swipesRemaining <= 0) {
      setShowPurchaseModal(true)
      return
    }

    setSwipesRemaining(swipesRemaining - 1)
    moveToNextProfile()
  }

  const moveToNextProfile = () => {
    setCurrentProfile((prev) => (prev + 1) % profiles.length)
  }

  const closeMatchModal = () => {
    setShowMatchModal(false)
    moveToNextProfile()
  }

  const currentProfileData = profiles[currentProfile]

  return (
    <div className="flex flex-col min-h-screen bg-datequest-teal-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <h1 className="text-xl font-semibold text-center w-full text-datequest-dark">Discover</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
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
          {/* Add this right above the profile card */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-datequest-dark">
              <Heart className="h-4 w-4 inline mr-1" /> {swipesRemaining} swipes remaining
            </span>
            <span className="text-sm text-datequest-dark">
              <Shield className="h-4 w-4 inline mr-1" /> Safety Features
            </span>
          </div>
          {/* Profile card */}
          <div className="bg-white rounded-lg border-2 border-datequest-dark overflow-hidden shadow-lg mb-6">
            <div className="h-96 bg-gray-200 relative">
              <img
                src={currentProfileData.image || "/placeholder.svg"}
                alt={`${currentProfileData.name}'s profile`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">
                  {currentProfileData.name}, {currentProfileData.age}
                </h2>
                <p className="text-white/90">Los Angeles, CA</p>
                <div className="flex mt-2">
                  <Badge className="bg-datequest-teal-500 text-white font-medium">
                    {currentProfileData.personalityType}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4">{currentProfileData.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProfileData.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="border-datequest-dark">
                    {interest}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="flex-1 mr-2 border-2 border-datequest-dark text-datequest-dark hover:bg-datequest-lime bg-white"
                  onClick={handlePass}
                >
                  <X className="h-5 w-5 mr-1" />
                  Pass
                </Button>
                <Button
                  className="flex-1 ml-2 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 border-2 border-datequest-teal-500"
                  onClick={handleLike}
                >
                  <Heart className="h-5 w-5 mr-1" />
                  Like
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Match modal */}
        {showMatchModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 border-4 border-datequest-lime"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <img
                      src="/images/profile-user.jpg"
                      alt="Your profile"
                      className="w-16 h-16 rounded-full object-cover border-2 border-datequest-dark"
                    />
                    <div className="absolute -right-1 -bottom-1 w-6 h-6 bg-datequest-lime rounded-full flex items-center justify-center border-2 border-white">
                      <Heart className="h-3 w-3 text-datequest-dark" />
                    </div>
                  </div>
                  <div className="mx-2 h-0.5 w-8 bg-datequest-dark mt-8"></div>
                  <div className="relative">
                    <img
                      src={currentProfileData.image || "/placeholder.svg"}
                      alt={`${currentProfileData.name}'s profile`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-datequest-dark"
                    />
                    <div className="absolute -right-1 -bottom-1 w-6 h-6 bg-datequest-lime rounded-full flex items-center justify-center border-2 border-white">
                      <Heart className="h-3 w-3 text-datequest-dark" />
                    </div>
                  </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <p className="mb-2">You and {currentProfileData.name} have liked each other!</p>
                  <div className="flex justify-center gap-2 mb-2">
                    <Badge className="bg-datequest-lime text-datequest-dark">
                      {userData?.personalityType || "Mystery Explorer"}
                    </Badge>
                    <span className="text-gray-500">+</span>
                    <Badge className="bg-datequest-lime text-datequest-dark">
                      {currentProfileData.personalityType}
                    </Badge>
                  </div>
                  <p className="text-sm text-center mb-4">
                    {getCompatibilityExplanation(
                      userData?.personalityType || "Mystery Explorer",
                      currentProfileData.personalityType,
                    )}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Link href={`/chat/${currentProfileData.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-2 border-datequest-teal-500 text-datequest-teal-500 hover:bg-datequest-teal-50 bg-white"
                          onClick={closeMatchModal}
                        >
                          Send Message
                        </Button>
                      </Link>
                      <Link href="/quest-confirmation" className="flex-1">
                        <Button
                          className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 border-2 border-datequest-teal-500"
                          onClick={closeMatchModal}
                        >
                          Plan Date
                        </Button>
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-500 hover:text-datequest-teal-500 hover:bg-gray-100"
                      onClick={closeMatchModal}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Plan Later
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
        {/* Purchase modal for when swipes run out */}
        {showPurchaseModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 border-4 border-datequest-lime"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-datequest-lime flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-datequest-dark" />
                </div>
                <h3 className="text-xl font-bold mb-2">Out of Swipes!</h3>
                <p className="mb-4">
                  You've used all your daily swipes. Purchase more to continue discovering profiles.
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/rewards/purchase">
                    <Button className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 border-2 border-datequest-teal-500">
                      Get More Swipes
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-500 hover:text-datequest-teal-500 hover:bg-gray-100"
                    onClick={() => setShowPurchaseModal(false)}
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <nav className="flex justify-around items-center p-4 border-t border-datequest-dark bg-white">
        <Link href="/discover" className="flex flex-col items-center text-datequest-dark">
          <Heart className="h-6 w-6 fill-datequest-lime stroke-datequest-dark" />
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
          <User className="h-6 w-6" />
          <span className="text-xs text-center">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
