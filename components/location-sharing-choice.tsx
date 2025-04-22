"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Users, X } from "lucide-react"

interface LocationSharingChoiceProps {
  onClose: () => void
  onChoice: (choice: "mine" | "theirs") => void
}

export function LocationSharingChoice({ onClose, onChoice }: LocationSharingChoiceProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <Card className="border-2 border-datequest-dark overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-datequest-dark p-4 text-white relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-white hover:bg-white/20 rounded-full h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="text-center pt-2">
                <h2 className="text-xl font-bold">You've Both Arrived!</h2>
                <p className="text-sm opacity-80">Who will lead the quest?</p>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center justify-center border-2 border-datequest-dark hover:bg-datequest-lime/20"
                  onClick={() => onChoice("mine")}
                >
                  <Smartphone className="h-10 w-10 mb-2 text-datequest-dark" />
                  <span className="text-datequest-dark font-medium">My Phone</span>
                  <span className="text-xs text-gray-500 mt-1">I'll lead the quest</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center justify-center border-2 border-datequest-dark hover:bg-datequest-lime/20"
                  onClick={() => onChoice("theirs")}
                >
                  <Users className="h-10 w-10 mb-2 text-datequest-dark" />
                  <span className="text-datequest-dark font-medium">Their Phone</span>
                  <span className="text-xs text-gray-500 mt-1">They'll lead the quest</span>
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Choose who will lead the quest on their device. You can always switch later.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
