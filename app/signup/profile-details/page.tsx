"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfileDetailsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState("If you were a breakfast food, what would you be?")
  const [profilePicture, setProfilePicture] = useState("/images/profile-user.jpg")
  const [formData, setFormData] = useState({
    age: "",
    bio: "",
    height: "",
    religion: "",
    quirkyAnswer: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRandomizeQuestion = () => {
    const quirkyQuestions = [
      "If you were a breakfast food, what would you be?",
      "What's your go-to karaoke song?",
      "If you could have dinner with anyone, who would it be?",
      "What's your most controversial food opinion?",
      "If you could time travel, which era would you visit?",
      "What's the most adventurous thing you've ever done?",
      "What's your favorite way to spend a rainy day?",
      "If you had a superpower, what would it be?",
      "What's the best piece of advice you've ever received?",
      "What's your favorite childhood memory?",
    ]

    let newIndex
    do {
      newIndex = Math.floor(Math.random() * quirkyQuestions.length)
    } while (quirkyQuestions[newIndex] === selectedQuestion)

    setSelectedQuestion(quirkyQuestions[newIndex])
    // Clear the previous answer when changing questions
    setFormData((prev) => ({ ...prev, quirkyAnswer: "" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Store user data in localStorage to use in profile
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")

    const updatedUserData = {
      ...userData,
      age: formData.age,
      bio: formData.bio,
      height: formData.height,
      religion: formData.religion,
      quirkyQuestion: selectedQuestion,
      quirkyAnswer: formData.quirkyAnswer,
      profilePicture: profilePicture,
    }

    localStorage.setItem("userData", JSON.stringify(updatedUserData))

    // Redirect to preferences page
    setTimeout(() => {
      setLoading(false)
      router.push("/signup/preferences")
    }, 1000)
  }

  const heightOptions = [
    "4'10\"",
    "4'11\"",
    "5'0\"",
    "5'1\"",
    "5'2\"",
    "5'3\"",
    "5'4\"",
    "5'5\"",
    "5'6\"",
    "5'7\"",
    "5'8\"",
    "5'9\"",
    "5'10\"",
    "5'11\"",
    "6'0\"",
    "6'1\"",
    "6'2\"",
    "6'3\"",
    "6'4\"",
    "6'5\"",
    "6'6\"",
    "6'7\"",
    "6'8\"",
    "6'9\"",
    "6'10\"",
  ]

  const religionOptions = [
    { value: "christianity", label: "Christianity ✝️" },
    { value: "islam", label: "Islam ☪️" },
    { value: "judaism", label: "Judaism ✡️" },
    { value: "hinduism", label: "Hinduism 🕉️" },
    { value: "buddhism", label: "Buddhism ☸️" },
    { value: "atheism", label: "Atheism 🧠" },
    { value: "agnosticism", label: "Agnosticism 🤔" },
    { value: "other", label: "Other 🌟" },
    { value: "prefer-not-to-say", label: "Prefer not to say 🤐" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <Link href="/signup">
          <Button variant="default" className="flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back</span>
          </Button>
        </Link>
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
          <Card className="w-full border-2 border-datequest-dark">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Tell us about yourself</CardTitle>
              <CardDescription className="text-center">
                Share some details to help us find your perfect match
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-center block">
                    Age
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    min="18"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="border-datequest-dark text-center"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="text-center block">
                    Height
                  </Label>
                  <Select
                    name="height"
                    onValueChange={(value) => handleSelectChange("height", value)}
                    value={formData.height}
                  >
                    <SelectTrigger className="border-datequest-dark text-center">
                      <SelectValue placeholder="Select your height" />
                    </SelectTrigger>
                    <SelectContent>
                      {heightOptions.map((height) => (
                        <SelectItem key={height} value={height}>
                          {height} 📏
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="religion" className="text-center block">
                    Religion (Optional)
                  </Label>
                  <Select
                    name="religion"
                    onValueChange={(value) => handleSelectChange("religion", value)}
                    value={formData.religion}
                  >
                    <SelectTrigger className="border-datequest-dark text-center">
                      <SelectValue placeholder="Select your religion" />
                    </SelectTrigger>
                    <SelectContent>
                      {religionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-center block">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us a bit about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="border-datequest-dark text-center min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quirkyAnswer" className="text-center block flex-1">
                      {selectedQuestion}
                    </Label>
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={handleRandomizeQuestion}
                      className="h-8 w-8 p-0"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="quirkyAnswer"
                    name="quirkyAnswer"
                    placeholder="Your answer..."
                    value={formData.quirkyAnswer}
                    onChange={handleChange}
                    className="border-datequest-dark text-center min-h-[80px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 text-center"
                  disabled={loading}
                >
                  {loading ? "Saving details..." : "Continue"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
