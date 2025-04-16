"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft, Heart, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profilePicture, setProfilePicture] = useState("/images/profile-user.jpg")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Store basic user data in localStorage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        profilePicture: profilePicture,
      }),
    )

    // Redirect to profile details page
    setTimeout(() => {
      setLoading(false)
      router.push("/signup/profile-details")
    }, 1500)
  }

  const handleProfilePictureChange = () => {
    // In a real app, this would open a file picker
    // For the prototype, we'll use the preloaded image
    setProfilePicture("/images/profile-user.jpg")
  }

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <Link href="/">
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
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-datequest-dark flex items-center justify-center">
              <Heart className="h-8 w-8 text-datequest-lime" />
            </div>
          </div>

          <Card className="w-full border-2 border-datequest-dark">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your details below to start your dating adventure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-picture" className="text-center block">
                    Profile Picture
                  </Label>
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-datequest-dark"
                      />
                      <Button
                        type="button"
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-datequest-teal-500 text-white hover:bg-datequest-teal-600"
                        onClick={handleProfilePictureChange}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-center block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-datequest-dark text-center"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-center block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-datequest-dark text-center"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-center block w-full">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-datequest-dark pr-10 text-center"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">Password must be at least 8 characters long</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 text-center"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-500">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="text-datequest-teal-600 underline underline-offset-4 hover:text-datequest-teal-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-datequest-teal-600 underline underline-offset-4 hover:text-datequest-teal-700"
                >
                  Privacy Policy
                </Link>
              </div>
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-datequest-teal-600 underline underline-offset-4 hover:text-datequest-teal-700"
                >
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
