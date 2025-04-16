"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check, X, Search, Share2, UserPlus, MessageCircle, Mail, Copy } from "lucide-react"

interface ShareContactsProps {
  locationName: string
  onClose: () => void
}

export function ShareContacts({ locationName, onClose }: ShareContactsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [shared, setShared] = useState(false)

  // Updated contacts with emojis
  const contacts = [
    { id: "1", name: "Jiya Gupta", emoji: "🏹", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Tanisha Jain", emoji: "❤️", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Cole Chiles", emoji: "🐔", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "James Zhu", emoji: "🇨🇳", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Ian Chang", emoji: "😊", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "6", name: "Mallika Jade", emoji: "🍆", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "7", name: "Lara Fazio", emoji: "🇮🇹", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "8", name: "Alicia Valenciano", emoji: "💃", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  const handleShare = () => {
    setShared(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

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
                <h2 className="text-xl font-bold">Share Location Details</h2>
                <p className="text-sm opacity-80">{locationName}</p>
              </div>
            </div>

            {shared ? (
              <div className="p-6 bg-white text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Shared Successfully!</h3>
                <p className="text-gray-600">Your friends will receive the location details.</p>
              </div>
            ) : (
              <div className="p-4 bg-white">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-9 border-datequest-dark"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Select Contacts</h3>
                    <Button variant="ghost" size="sm" className="h-8 text-datequest-dark hover:text-datequest-lime">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Import
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                            selectedContacts.includes(contact.id)
                              ? "bg-datequest-lime/20 border border-datequest-lime"
                              : "hover:bg-gray-100 border border-transparent"
                          }`}
                          onClick={() => toggleContact(contact.id)}
                        >
                          <img
                            src={contact.avatar || "/placeholder.svg"}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <span className="flex-1">
                            {contact.name} {contact.emoji}
                          </span>
                          {selectedContacts.includes(contact.id) && <Check className="h-5 w-5 text-datequest-dark" />}
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">No contacts found</p>
                    )}
                  </div>
                </div>

                {/* Share options - always visible */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Share Options</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                      <MessageCircle className="h-5 w-5 mb-1" />
                      <span className="text-xs">SMS</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                      <Mail className="h-5 w-5 mb-1" />
                      <span className="text-xs">Email</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                      <Copy className="h-5 w-5 mb-1" />
                      <span className="text-xs">Copy</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                      <Share2 className="h-5 w-5 mb-1" />
                      <span className="text-xs">More</span>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-datequest-dark text-datequest-dark hover:bg-datequest-lime/20"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-datequest-dark text-white hover:bg-black" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
