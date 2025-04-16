"use client"

import { useState } from "react"
import { CalendarIcon, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format, startOfToday } from "date-fns"

interface DatePlannerProps {
  onDateSelected?: (date: Date, time: string) => void
  partnerName: string
  partnerImage: string
}

export function DatePlanner({ onDateSelected, partnerName, partnerImage }: DatePlannerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [partnerResponse, setPartnerResponse] = useState<"pending" | "accepted" | "declined">("pending")

  const today = startOfToday()
  const disabledDays = { before: today }

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ]

  const handleSubmit = () => {
    if (date && time) {
      setIsSubmitted(true)
      if (onDateSelected) {
        onDateSelected(date, time)
      }

      // Simulate partner response after a delay
      setTimeout(() => {
        // 80% chance of accepting
        const willAccept = Math.random() < 0.8
        setPartnerResponse(willAccept ? "accepted" : "declined")
      }, 3000)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setPartnerResponse("pending")
    setDate(undefined)
    setTime(undefined)
  }

  return (
    <div className="w-full">
      {!isSubmitted ? (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-datequest-dark",
                    !date && "text-gray-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={disabledDays} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <Select onValueChange={setTime}>
              <SelectTrigger className="border-datequest-dark">
                <SelectValue placeholder="Pick a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
            disabled={!date || !time}
          >
            Propose Date & Time
          </Button>
        </div>
      ) : (
        <div className="border-2 border-datequest-dark rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Date Proposal</h3>
            <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">{date ? format(date, "EEEE, MMMM d, yyyy") : ""}</p>
              <p className="text-xs text-gray-500">{time}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-datequest-lime flex items-center justify-center mr-2">
                <span className="text-xs font-bold text-datequest-dark">You</span>
              </div>
              <div className="h-0.5 w-8 bg-datequest-dark"></div>
              <img
                src={partnerImage || "/placeholder.svg"}
                alt={partnerName}
                className="w-10 h-10 rounded-full object-cover border-2 border-datequest-dark"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Waiting for {partnerName}</p>
              <p className="text-xs text-gray-500">
                {partnerResponse === "pending" ? (
                  "Pending response..."
                ) : partnerResponse === "accepted" ? (
                  <span className="text-green-600 flex items-center justify-end">
                    <Check className="h-3 w-3 mr-1" /> Accepted
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center justify-end">
                    <X className="h-3 w-3 mr-1" /> Declined
                  </span>
                )}
              </p>
            </div>
          </div>

          {partnerResponse === "pending" && (
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-datequest-lime h-1.5 rounded-full animate-pulse" style={{ width: "30%" }}></div>
            </div>
          )}

          {partnerResponse === "accepted" && (
            <Button className="w-full bg-datequest-dark text-white hover:bg-black">Continue Planning</Button>
          )}

          {partnerResponse === "declined" && (
            <Button onClick={handleReset} className="w-full bg-datequest-dark text-white hover:bg-black">
              Suggest Another Time
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
