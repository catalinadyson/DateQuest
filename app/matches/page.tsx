"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, User, Calendar, MapPin, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)

  const matches = [
    {
      id: 1,
      name: "Alex",
      lastMessage: "Hey, how's it going?",
      time: "2m ago",
      image: "/images/alex-profile.png",
      compatibility: 87,
    },
    {
      id: 2,
      name: "Jordan",
      lastMessage: "I'd love to try that new restaurant!",
      time: "1h ago",
      image: "/images/jordan-profile.png",
      compatibility: 92,
    },
    {
      id: 3,
      name: "Taylor",
      lastMessage: "That movie sounds interesting. When should we go?",
      time: "3h ago",
      image: "/images/profile-taylor.jpg",
      compatibility: 78,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <h1 className="text-xl font-semibold text-center flex-1 text-datequest-dark">Your Matches</h1>
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
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => (
                <Card key={match.id} className="w-full overflow-hidden border-2 border-datequest-dark bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={match.image || "/placeholder.svg"}
                        alt={match.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-datequest-dark"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{match.name}</h3>
                          <div className="bg-datequest-lime text-datequest-dark text-xs font-bold px-2 py-0.5 rounded-full">
                            {match.compatibility}% Match
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{match.lastMessage}</p>
                        <p className="text-xs text-gray-400">{match.time}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href={`/chat/${match.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-datequest-dark text-datequest-dark hover:bg-datequest-lime"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                        </Link>
                        <Link href="/quest-confirmation">
                          <Button
                            size="sm"
                            className="bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 flex items-center border-2 border-datequest-teal-700 font-bold"
                          >
                            <MapPin className="h-4 w-4 mr-1" />
                            Quest
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-lg border-2 border-datequest-dark">
              <h2 className="text-2xl font-bold mb-4">No matches yet!</h2>
              <p className="mb-4">Keep swiping to find your perfect match.</p>
              <Link href="/discover">
                <Button className="bg-datequest-dark text-white hover:bg-black border-2 border-datequest-dark">
                  Discover Profiles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <nav className="flex justify-around items-center p-4 border-t border-datequest-dark bg-white">
        <Link href="/discover" className="flex flex-col items-center text-datequest-dark">
          <Heart className="h-6 w-6" />
          <span className="text-xs text-center">Discover</span>
        </Link>
        <Link href="/matches" className="flex flex-col items-center text-datequest-dark">
          <MessageCircle className="h-6 w-6 fill-datequest-lime stroke-datequest-dark" />
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
