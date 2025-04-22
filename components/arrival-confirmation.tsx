"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Check, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ArrivalConfirmation({ onComplete }) {
  const [userArrived, setUserArrived] = useState(false)
  const [partnerArrived, setPartnerArrived] = useState(false)
  const [bothArrived, setBothArrived] = useState(false)

  useEffect(() => {
    // Check if both participants have arrived
    if (userArrived && partnerArrived && !bothArrived) {
      setBothArrived(true)
      // Automatically proceed to the next step when both have arrived
      setTimeout(() => {
        onComplete()
      }, 1500)
    }
  }, [userArrived, partnerArrived, bothArrived, onComplete])

  const handleUserArrival = () => {
    setUserArrived(true)
    // Simulate partner arriving after a short delay
    setTimeout(() => {
      setPartnerArrived(true)
    }, 3000)
  }

  return (
    <Card className="w-full border-2 border-datequest-dark">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="h-5 w-5 text-datequest-dark" />
          <div>
            <h3 className="font-bold text-datequest-dark">The Broad Museum</h3>
            <p className="text-sm text-gray-600">221 S Grand Ave, Los Angeles, CA</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                userArrived ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              {userArrived ? <Check className="h-5 w-5 text-white" /> : <Clock className="h-5 w-5 text-gray-500" />}
            </div>
            <div>
              <p className="font-medium text-datequest-dark">You</p>
              <p className="text-sm text-gray-500">{userArrived ? "Arrived" : "Not arrived yet"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                partnerArrived ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              {partnerArrived ? <Check className="h-5 w-5 text-white" /> : <Clock className="h-5 w-5 text-gray-500" />}
            </div>
            <div>
              <p className="font-medium text-datequest-dark">Alex</p>
              <p className="text-sm text-gray-500">{partnerArrived ? "Arrived" : "Not arrived yet"}</p>
            </div>
          </div>
        </div>

        {!userArrived && (
          <Button
            className="w-full mt-4 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
            onClick={handleUserArrival}
          >
            I've Arrived
          </Button>
        )}

        {userArrived && !partnerArrived && (
          <div className="mt-4 p-3 bg-datequest-lime/20 rounded-lg text-center">
            <p className="text-datequest-dark">Waiting for Alex to arrive...</p>
          </div>
        )}

        {bothArrived && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-100 rounded-lg text-center"
            >
              <p className="text-green-800 font-medium">Both of you have arrived! Starting quest...</p>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  )
}
