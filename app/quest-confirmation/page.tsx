"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Users, Share2, Navigation, ExternalLink } from "lucide-react"
import { ShareContacts } from "@/components/share-contacts"
import { DatePlanner } from "@/components/date-planner"
import { LocationReveal } from "@/components/location-reveal"

export default function QuestConfirmationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showLocationReveal, setShowLocationReveal] = useState(false)
  const [locationRevealed, setLocationRevealed] = useState(false)
  const [dateTimeSelected, setDateTimeSelected] = useState(false)
  const [showShareContacts, setShowShareContacts] = useState(false)
  const [showPhoneChoice, setShowPhoneChoice] = useState(false)

  // Mock data for the quest
  const questData = {
    title: "Art Adventure",
    location: "The Broad Museum",
    address: "221 S Grand Ave, Los Angeles, CA 90012",
    time: "Today at 3:00 PM",
    category: "Creative",
    matchName: "Alex",
    budget: "$20-$50 per person",
    mapUrl: "https://maps.apple.com/?address=221%20S%20Grand%20Ave,%20Los%20Angeles,%20CA%2090012",
    googleMapsUrl: "https://maps.google.com/?q=The+Broad+Museum+Los+Angeles",
  }

  const handleBack = () => {
    router.back()
  }

  // Modified to immediately show location reveal after date selection
  const handleDateSelected = (date, time) => {
    setDateTimeSelected(true)
    // Show location reveal animation after a short delay
    setTimeout(() => {
      setShowLocationReveal(true)
    }, 500)
  }

  // Handle when location reveal animation completes
  const handleLocationRevealComplete = () => {
    setShowLocationReveal(false)
    setLocationRevealed(true)
  }

  // Handle start quest button
  const handleStartQuest = () => {
    setShowPhoneChoice(true)
  }

  // Handle phone choice
  const handlePhoneChoice = (choice) => {
    router.push(`/quest-active?phone=${choice}`)
  }

  // Open maps app with the location
  const openMaps = (isAppleMaps = true) => {
    window.open(isAppleMaps ? questData.mapUrl : questData.googleMapsUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-datequest-teal-50">
      <div className="container max-w-md mx-auto px-4 py-8">
        <Button variant="default" className="mb-4" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="p-6 border-2 border-datequest-teal-200 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-datequest-teal-700">Quest Confirmation</h1>

          {!dateTimeSelected ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-datequest-teal-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-datequest-teal-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quest with</p>
                  <p className="font-medium">{questData.matchName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-datequest-teal-100 flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-datequest-teal-700"
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
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{questData.budget}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-center mb-3">Plan Your Date</h3>
                <DatePlanner
                  onDateSelected={handleDateSelected}
                  partnerName={questData.matchName}
                  partnerImage="/images/alex-profile.png"
                />
              </div>
            </div>
          ) : locationRevealed ? (
            <div className="space-y-4">
              <div className="bg-datequest-teal-50 p-4 rounded-lg border border-datequest-teal-200">
                <h3 className="font-medium text-center mb-3 text-datequest-teal-800">Your Quest Location</h3>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-datequest-teal-100 flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-datequest-teal-700" />
                  </div>
                  <div>
                    <p className="font-medium">{questData.location}</p>
                    <p className="text-sm text-gray-500">{questData.address}</p>
                  </div>
                </div>

                <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img src="/images/broad-museum.jpg" alt="The Broad Museum" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-datequest-teal-600 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Button
                    variant="default"
                    className="flex-1 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                    onClick={() => openMaps(true)}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Apple Maps
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                    onClick={() => openMaps(false)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Google Maps
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  The Broad is a contemporary art museum featuring a diverse collection of postwar and contemporary art.
                  Your quest will involve exploring the exhibits and connecting through shared artistic experiences.
                </p>
              </div>

              {!showPhoneChoice ? (
                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                    onClick={handleStartQuest}
                  >
                    Start Quest
                  </Button>

                  {/* Always visible Share button */}
                  <Button
                    variant="default"
                    className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                    onClick={() => setShowShareContacts(true)}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share Location
                  </Button>
                </div>
              ) : (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-medium text-center mb-3 text-datequest-teal-800">Who will lead the quest?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                      onClick={() => handlePhoneChoice("mine")}
                    >
                      On My Phone
                    </Button>
                    <Button
                      className="bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                      onClick={() => handlePhoneChoice("theirs")}
                    >
                      On Their Phone
                    </Button>
                  </div>

                  {/* Keep Share button visible even in phone choice view */}
                  <Button
                    variant="default"
                    className="w-full mt-3 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                    onClick={() => setShowShareContacts(true)}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share Location
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </Card>
      </div>

      {/* Location Reveal Animation */}
      {showLocationReveal && <LocationReveal location={questData.location} onComplete={handleLocationRevealComplete} />}

      {showShareContacts && (
        <ShareContacts locationName={questData.location} onClose={() => setShowShareContacts(false)} />
      )}
    </div>
  )
}
