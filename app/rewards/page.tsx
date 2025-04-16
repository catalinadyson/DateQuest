"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, User, Calendar, Gift, Star, Lock, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(850)
  const [showBarcodeModal, setShowBarcodeModal] = useState(false)
  const [currentReward, setCurrentReward] = useState(null)
  const router = useRouter()

  const exclusiveDeals = [
    {
      id: 1,
      title: "Perch LA Rooftop Dinner",
      description: "Exclusive reservation at Perch LA with panoramic downtown views",
      emoji: "🍽️",
      image: "/images/perch-la.jpg",
      points: 1200,
      discount: "20% off total bill",
      available: true,
      expiresIn: "14 days",
      expirationDate: "April 22, 2024",
      code: "PERCH20DQ",
    },
    {
      id: 2,
      title: "San Antonio Winery Experience",
      description: "Private wine tasting for two at LA's historic San Antonio Winery",
      emoji: "🍷",
      image: "/images/san-antonio-winery.jpg",
      points: 800,
      discount: "Complimentary cheese platter",
      available: true,
      expiresIn: "30 days",
      expirationDate: "May 8, 2024",
      code: "SAWINE24",
    },
    {
      id: 3,
      title: "Hollywood Bowl VIP Access",
      description: "Skip-the-line VIP tickets for upcoming concerts at the Hollywood Bowl",
      emoji: "🎵",
      image: "/images/hollywood-bowl.jpg",
      points: 2000,
      discount: "VIP seating + 1 free drink",
      available: false,
      expiresIn: "60 days",
      expirationDate: "June 7, 2024",
      code: "HBOWL24VIP",
    },
  ]

  const premiumFeatures = [
    {
      id: 1,
      title: "10 Extra Swipes",
      description: "Get more chances to find your perfect match",
      emoji: "👆",
      image: "/images/premium-swipes.jpg",
      price: "$4.99",
      popular: true,
    },
    {
      id: 2,
      title: "See Who Likes You",
      description: "Unlock the ability to see who's already interested in you",
      emoji: "👀",
      image: "/images/premium-likes.jpg",
      price: "$7.99",
      popular: true,
      isPremiumFeature: true,
    },
    {
      id: 3,
      title: "Premium Membership",
      description: "Unlimited swipes, priority matching, and ad-free experience",
      emoji: "⭐",
      image: "/images/premium-membership.jpg",
      price: "$19.99/month",
      popular: true,
    },
    {
      id: 4,
      title: "Location Boost",
      description: "Get more visibility in your area for 24 hours",
      emoji: "📍",
      image: "/images/premium-boost.jpg",
      price: "$3.99",
      popular: false,
      isPremiumFeature: true,
    },
    {
      id: 5,
      title: "5 Quest Hearts",
      description: "Unlock additional QuestCards during your dates",
      emoji: "❤️",
      image: "/images/quest-hearts.jpg",
      price: "$2.99",
      popular: true,
    },
    {
      id: 6,
      title: "Free Pictures",
      description: "Get 10 additional swipes by uploading your pictures",
      emoji: "📸",
      image: "/images/free-pictures.jpg",
      price: "FREE",
      popular: true,
      isFree: true,
    },
  ]

  const handleRedeemReward = (reward) => {
    // Deduct points
    setUserPoints(userPoints - reward.points)
    // Show barcode modal
    setCurrentReward(reward)
    setShowBarcodeModal(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <h1 className="text-xl font-semibold text-center w-full text-datequest-dark">Rewards & Premium</h1>
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
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card className="w-full overflow-hidden mb-6 border-2 border-datequest-dark">
              <CardContent className="p-6 bg-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-datequest-lime flex items-center justify-center">
                    <Star className="h-6 w-6 text-datequest-dark" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-datequest-dark">{userPoints}</h2>
                    <p className="text-sm text-gray-500">Available Points</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mb-4">
                  Complete quests and dates to earn more points that you can redeem for exclusive perks!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="rewards" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-datequest-teal-100">
              <TabsTrigger
                value="rewards"
                className="text-datequest-teal-700 data-[state=active]:bg-datequest-teal-500 data-[state=active]:text-white bg-white"
              >
                Rewards
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                className="text-datequest-teal-700 data-[state=active]:bg-datequest-teal-500 data-[state=active]:text-white bg-white"
              >
                Premium
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rewards">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center text-datequest-dark mb-4">Exclusive Experiences</h2>

                {exclusiveDeals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="w-full overflow-hidden border-2 border-datequest-dark">
                      <div className="relative h-40 flex items-center justify-center bg-gray-200">
                        <img
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-datequest-lime text-datequest-dark">
                          {deal.points} points
                        </Badge>
                      </div>
                      <CardContent className="p-4 bg-white">
                        <h3 className="font-bold text-lg text-center mb-1">{deal.title}</h3>
                        <p className="text-sm text-gray-600 text-center mb-3">{deal.description}</p>
                        <div className="bg-gray-100 p-2 rounded-md text-center mb-2">
                          <p className="text-sm font-medium">{deal.discount}</p>
                        </div>
                        <div className="flex items-center justify-center text-xs text-gray-500 mb-4">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Expires: {deal.expirationDate}</span>
                        </div>
                        <Button
                          className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                          disabled={!deal.available || userPoints < deal.points}
                          onClick={() => deal.available && userPoints >= deal.points && handleRedeemReward(deal)}
                        >
                          {deal.available && userPoints >= deal.points ? (
                            "Redeem Reward"
                          ) : (
                            <div className="flex items-center justify-center">
                              <Lock className="h-4 w-4 mr-1" />
                              {!deal.available ? "Currently Unavailable" : "Not Enough Points"}
                            </div>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="premium">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center text-datequest-dark mb-4">Boost Your Experience</h2>

                {premiumFeatures.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="w-full overflow-hidden border-2 border-datequest-dark">
                      <div className="relative h-40 flex items-center justify-center bg-gray-200">
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                        {feature.popular && (
                          <Badge className="absolute top-2 right-2 bg-datequest-teal-500 text-white">Popular</Badge>
                        )}
                        {feature.isPremiumFeature && (
                          <Badge className="absolute top-2 left-2 bg-purple-600 text-white">Premium</Badge>
                        )}
                        {feature.isFree && (
                          <Badge className="absolute top-2 left-2 bg-green-600 text-white">Free</Badge>
                        )}
                      </div>
                      <CardContent className="p-4 bg-white">
                        <h3 className="font-bold text-lg text-center mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 text-center mb-3">{feature.description}</p>
                        <div className="bg-gray-100 p-2 rounded-md text-center mb-4">
                          <p className="text-sm font-medium">{feature.price}</p>
                        </div>
                        <Button
                          className={`w-full ${feature.isFree ? "bg-green-600 hover:bg-green-700" : "bg-datequest-teal-500 hover:bg-datequest-teal-600"} text-white`}
                          onClick={() => (feature.isFree ? router.push("/profile") : null)}
                        >
                          {feature.isFree ? "Upload Pictures" : "Purchase"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
          <Gift className="h-6 w-6 fill-datequest-lime stroke-datequest-dark" />
          <span className="text-xs text-center">Rewards</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-datequest-dark">
          <User className="h-6 w-6" />
          <span className="text-xs text-center">Profile</span>
        </Link>
      </nav>

      {/* Barcode Modal */}
      {showBarcodeModal && currentReward && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl max-w-sm w-full mx-4 border-4 border-datequest-lime"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-datequest-dark">{currentReward.title}</h2>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full bg-datequest-teal-500"
                onClick={() => setShowBarcodeModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-datequest-dark mb-4">
              <div className="flex justify-center mb-4">
                <div className="w-full h-32 bg-white flex items-center justify-center border border-gray-300">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    {/* Simple barcode SVG */}
                    <rect x="10" y="10" width="2" height="80" fill="black" />
                    <rect x="15" y="10" width="1" height="80" fill="black" />
                    <rect x="20" y="10" width="3" height="80" fill="black" />
                    <rect x="25" y="10" width="2" height="80" fill="black" />
                    <rect x="30" y="10" width="4" height="80" fill="black" />
                    <rect x="38" y="10" width="1" height="80" fill="black" />
                    <rect x="42" y="10" width="3" height="80" fill="black" />
                    <rect x="48" y="10" width="2" height="80" fill="black" />
                    <rect x="54" y="10" width="1" height="80" fill="black" />
                    <rect x="58" y="10" width="4" height="80" fill="black" />
                    <rect x="65" y="10" width="2" height="80" fill="black" />
                    <rect x="70" y="10" width="3" height="80" fill="black" />
                    <rect x="76" y="10" width="1" height="80" fill="black" />
                    <rect x="80" y="10" width="2" height="80" fill="black" />
                    <rect x="85" y="10" width="4" height="80" fill="black" />
                    <rect x="92" y="10" width="3" height="80" fill="black" />
                    <rect x="98" y="10" width="1" height="80" fill="black" />
                    <rect x="102" y="10" width="2" height="80" fill="black" />
                    <rect x="108" y="10" width="4" height="80" fill="black" />
                    <rect x="115" y="10" width="1" height="80" fill="black" />
                    <rect x="119" y="10" width="3" height="80" fill="black" />
                    <rect x="125" y="10" width="2" height="80" fill="black" />
                    <rect x="130" y="10" width="1" height="80" fill="black" />
                    <rect x="134" y="10" width="4" height="80" fill="black" />
                    <rect x="142" y="10" width="2" height="80" fill="black" />
                    <rect x="147" y="10" width="3" height="80" fill="black" />
                    <rect x="153" y="10" width="1" height="80" fill="black" />
                    <rect x="158" y="10" width="2" height="80" fill="black" />
                    <rect x="163" y="10" width="4" height="80" fill="black" />
                    <rect x="170" y="10" width="3" height="80" fill="black" />
                    <rect x="176" y="10" width="1" height="80" fill="black" />
                    <rect x="180" y="10" width="2" height="80" fill="black" />
                    <rect x="185" y="10" width="4" height="80" fill="black" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="font-mono text-lg font-bold">{currentReward.code}</p>
                <p className="text-sm text-gray-500">Show this code to the staff</p>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">{currentReward.description}</p>
              <p className="text-sm font-medium mt-1">{currentReward.discount}</p>
            </div>

            <div className="flex items-center justify-center text-sm text-red-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>Expires on {currentReward.expirationDate}</span>
            </div>

            <Button
              className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
              onClick={() => setShowBarcodeModal(false)}
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
