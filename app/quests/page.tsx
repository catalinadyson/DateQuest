"use client"

import Link from "next/link"
import { Heart, MessageCircle, User, Calendar, MapPin, Clock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function QuestsPage() {
  const activeQuests = [
    {
      id: 1,
      location: "The Broad Museum",
      address: "221 S Grand Ave, Los Angeles, CA",
      date: "Saturday, March 23, 2024",
      time: "3:00 PM",
      partner: {
        name: "Alex",
        image: "/images/alex-profile.png",
      },
      type: "Art Adventure",
      progress: 1,
      total: 3,
      budget: "$30-50 per person",
      budgetDetails: "Museum admission + nearby café",
      isToday: true,
      timeRemaining: "2 hours remaining",
    },
  ]

  const pastQuests = [
    {
      id: 2,
      location: "Runyon Canyon Park",
      address: "2000 N Fuller Ave, Los Angeles, CA",
      date: "Saturday, March 16, 2024",
      time: "10:00 AM",
      partner: {
        name: "Jordan",
        image: "/images/jordan-profile.png",
      },
      type: "Outdoor Adventure",
      progress: 3,
      total: 3,
      budget: "$10-20 per person",
      budgetDetails: "Trail access + picnic",
      completed: true,
    },
  ]

  const upcomingQuests = [
    {
      id: 3,
      location: "Nobu Malibu",
      address: "22706 Pacific Coast Hwy, Malibu, CA",
      date: "Saturday, March 30, 2024",
      time: "7:00 PM",
      partner: {
        name: "Taylor",
        image: "/images/profile-taylor.jpg",
      },
      type: "Dinner Experience",
      progress: 0,
      total: 3,
      budget: "$50-70 per person",
      budgetDetails: "Dinner + drinks",
      isLocked: true,
      daysUntil: 7,
    },
    {
      id: 4,
      location: "Griffith Observatory",
      address: "2800 E Observatory Rd, Los Angeles, CA",
      date: "Friday, March 29, 2024",
      time: "8:00 PM",
      partner: {
        name: "Jordan",
        image: "/images/jordan-profile.png",
      },
      type: "Stargazing Adventure",
      progress: 0,
      total: 3,
      budget: "$20-30 per person",
      budgetDetails: "Observatory admission + snacks",
      isLocked: false,
      daysUntil: 6,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <h1 className="text-xl font-semibold text-center w-full text-datequest-dark">Your Quests</h1>
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
          <h2 className="text-xl font-bold text-datequest-dark mb-4">Today's Quest</h2>

          {activeQuests.length > 0 ? (
            <div className="space-y-4 mb-8">
              {activeQuests.map((quest) => (
                <Card key={quest.id} className="w-full overflow-hidden border-2 border-datequest-dark">
                  <CardContent className="p-0">
                    <div className="bg-datequest-dark p-4 text-black">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 shrink-0" />
                        <div>
                          <h3 className="font-bold">{quest.location}</h3>
                          <p className="text-sm opacity-90">{quest.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 shrink-0" />
                        <div>
                          <p className="text-sm">{quest.date}</p>
                          <p className="text-sm">{quest.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      {/* Time Progress Bar */}
                      <div className="w-full mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Time until date</span>
                          <span className="text-gray-500">{quest.timeRemaining}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                          <div className="bg-datequest-lime h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={quest.partner.image || "/placeholder.svg"}
                          alt={quest.partner.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-datequest-dark"
                        />
                        <div>
                          <p className="font-medium">With {quest.partner.name}</p>
                          <p className="text-sm text-gray-500">{quest.type}</p>
                        </div>
                        <Badge className="ml-auto bg-datequest-lime text-datequest-dark">Today</Badge>
                      </div>

                      <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50 rounded-lg">
                        <svg
                          className="h-5 w-5 text-datequest-dark"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">Budget: {quest.budget}</p>
                          <p className="text-xs text-gray-500">{quest.budgetDetails}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quest Progress</span>
                          <span>
                            {quest.progress}/{quest.total} Completed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-datequest-lime h-2.5 rounded-full"
                            style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <Link href="/quest-active">
                        <Button className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600">
                          Continue Quest
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full overflow-hidden border-2 border-datequest-dark mb-8">
              <CardContent className="p-6 bg-white text-center">
                <p className="mb-4">You don't have any active quests today.</p>
                <Link href="/matches">
                  <Button className="bg-datequest-teal-500 text-white hover:bg-datequest-teal-600">Plan a Quest</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <h2 className="text-xl font-bold text-datequest-dark mb-4">Upcoming Quests</h2>

          {upcomingQuests.length > 0 ? (
            <div className="space-y-4 mb-8">
              {upcomingQuests.map((quest) => (
                <Card key={quest.id} className="w-full overflow-hidden border-2 border-datequest-dark">
                  <CardContent className="p-0">
                    <div className="bg-gray-100 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 shrink-0 text-gray-600" />
                        <div>
                          <h3 className="font-bold text-datequest-dark">{quest.location}</h3>
                          <p className="text-sm text-gray-500">{quest.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 shrink-0 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">{quest.date}</p>
                          <p className="text-sm text-gray-500">{quest.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={quest.partner.image || "/placeholder.svg"}
                          alt={quest.partner.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <p className="font-medium">With {quest.partner.name}</p>
                          <p className="text-sm text-gray-500">{quest.type}</p>
                        </div>
                        <Badge className="ml-auto bg-gray-200 text-gray-700">In {quest.daysUntil} days</Badge>
                      </div>

                      <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50 rounded-lg">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">Budget: {quest.budget}</p>
                          <p className="text-xs text-gray-500">{quest.budgetDetails}</p>
                        </div>
                      </div>

                      {quest.isLocked ? (
                        <Button
                          disabled
                          className="w-full bg-gray-200 text-gray-500 cursor-not-allowed relative overflow-hidden"
                        >
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80">
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                            <span className="ml-1">Locked</span>
                          </div>
                          View Quest
                        </Button>
                      ) : (
                        <Link href="/quest-confirmation">
                          <Button className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600">
                            View Quest
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full overflow-hidden border-2 border-datequest-dark mb-8">
              <CardContent className="p-6 bg-white text-center">
                <p className="text-gray-500">You don't have any upcoming quests.</p>
              </CardContent>
            </Card>
          )}

          <h2 className="text-xl font-bold text-datequest-dark mb-4">Past Quests</h2>

          {pastQuests.length > 0 ? (
            <div className="space-y-4">
              {pastQuests.map((quest) => (
                <Card key={quest.id} className="w-full overflow-hidden border-2 border-datequest-dark">
                  <CardContent className="p-0">
                    <div className="bg-gray-100 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 shrink-0 text-gray-600" />
                        <div>
                          <h3 className="font-bold text-datequest-dark">{quest.location}</h3>
                          <p className="text-sm text-gray-500">{quest.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 shrink-0 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">{quest.date}</p>
                          <p className="text-sm text-gray-500">{quest.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={quest.partner.image || "/placeholder.svg"}
                          alt={quest.partner.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <p className="font-medium">With {quest.partner.name}</p>
                          <p className="text-sm text-gray-500">{quest.type}</p>
                        </div>
                        <Badge className="ml-auto bg-gray-200 text-gray-700">Completed</Badge>
                      </div>

                      <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50 rounded-lg">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">Budget: {quest.budget}</p>
                          <p className="text-xs text-gray-500">{quest.budgetDetails}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quest Progress</span>
                          <span>
                            {quest.progress}/{quest.total} Completed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-gray-400 h-2.5 rounded-full"
                            style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button
                        variant="default"
                        className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full overflow-hidden border-2 border-datequest-dark">
              <CardContent className="p-6 bg-white text-center">
                <p className="text-gray-500">You haven't completed any quests yet.</p>
              </CardContent>
            </Card>
          )}
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
          <Calendar className="h-6 w-6 fill-datequest-lime stroke-datequest-dark" />
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
