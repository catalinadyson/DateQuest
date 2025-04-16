"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, MoreVertical, Phone, Video, Info, Flag, MapPin } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Message {
  id: number
  text: string
  sender: "user" | "match"
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! I'm excited for our coffee date tomorrow! 😊",
      sender: "match",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      text: "Me too! I've been looking forward to it all week.",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: 3,
      text: "Have you been to The Grove before?",
      sender: "match",
      timestamp: new Date(Date.now() - 3400000),
    },
  ])
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Match data based on ID
  const matchProfiles = {
    alex: {
      id: "alex",
      name: "Alex",
      avatar: "/images/alex-profile.png",
      lastActive: "Online now",
      personalityType: "Adventure Seeker",
    },
    jordan: {
      id: "jordan",
      name: "Jordan",
      avatar: "/images/jordan-profile.png",
      lastActive: "Online 5m ago",
      personalityType: "Creative Explorer",
    },
    taylor: {
      id: "taylor",
      name: "Taylor",
      avatar: "/images/profile-taylor.jpg",
      lastActive: "Online 20m ago",
      personalityType: "Culture Enthusiast",
    },
  }

  // Get match data based on ID from URL
  const matchId = params.id as string
  const matchData = matchProfiles[matchId] || matchProfiles.alex

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInput("")

      // Simulate reply after 1-3 seconds
      setTimeout(
        () => {
          const replies = [
            "That sounds great!",
            "I'm looking forward to our quest tomorrow!",
            "Have you done one of these DateQuests before?",
            "I wonder what our quest will be! 😄",
            "What kind of coffee do you usually order?",
          ]
          const randomReply = replies[Math.floor(Math.random() * replies.length)]
          const replyMessage: Message = {
            id: messages.length + 2,
            text: randomReply,
            sender: "match",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, replyMessage])
        },
        1000 + Math.random() * 2000,
      )
    }
  }

  const handleBack = () => {
    // Store the current profile index in localStorage to show Jordan's profile
    localStorage.setItem("currentProfileIndex", "1") // Index 1 is Jordan's profile
    router.push("/discover")
  }

  const handleStartQuest = () => {
    router.push("/quest-confirmation")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Image
              src={matchData.avatar || "/placeholder.svg"}
              alt={matchData.name}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <h2 className="font-medium">{matchData.name}</h2>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <p className="text-xs text-green-600">{matchData.lastActive}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="default"
            size="sm"
            className="mr-2 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
            onClick={handleStartQuest}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Start Quest
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600">
            <Info className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Block User</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)} className="text-red-600">
                Report Conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-datequest-teal-500 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 text-right ${message.sender === "user" ? "text-datequest-teal-100" : "text-gray-500"}`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSend} className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-2 border-datequest-teal-200 focus:border-datequest-teal-500"
          />
          <Button
            type="submit"
            size="icon"
            className="ml-2 bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white rounded-full h-10 w-10"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Conversation</DialogTitle>
            <DialogDescription>
              Please let us know why you're reporting this conversation. Your report will be anonymous.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {["Inappropriate content", "Harassment", "Spam", "Fake profile", "Offensive language", "Other"].map(
              (reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <input type="radio" id={reason} name="report-reason" className="text-datequest-teal-600" />
                  <label htmlFor={reason}>{reason}</label>
                </div>
              ),
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                alert("Report submitted. Thank you for helping keep DateQuest safe.")
                setIsReportDialogOpen(false)
              }}
            >
              <Flag className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
