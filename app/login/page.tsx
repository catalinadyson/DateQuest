"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/discover")
    }, 1500)
  }

  const handleSignup = () => {
    router.push("/signup")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-datequest-teal-50 to-amber-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-datequest-teal-600">DateQuest</h1>
          <p className="text-gray-600">Find your adventure partner</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-datequest-teal-100">
            <TabsTrigger
              value="login"
              className="text-datequest-teal-700 data-[state=active]:bg-datequest-teal-500 data-[state=active]:text-white bg-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="text-datequest-teal-700 data-[state=active]:bg-datequest-teal-500 data-[state=active]:text-white bg-white"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="border-2 border-datequest-teal-200">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="border-2 border-datequest-teal-200"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">
                          Password
                        </label>
                        <a href="#" className="text-sm text-datequest-teal-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input id="password" type="password" className="border-2 border-datequest-teal-200" required />
                    </div>
                    <Button
                      type="submit"
                      className="bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-2 border-datequest-teal-200 text-datequest-teal-700 hover:bg-datequest-teal-50 bg-white"
                  >
                    <Image
                      src="/placeholder.svg?height=20&width=20"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-datequest-teal-200 text-datequest-teal-700 hover:bg-datequest-teal-50 bg-white"
                  >
                    <Image
                      src="/placeholder.svg?height=20&width=20"
                      alt="Apple"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Apple
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="border-2 border-datequest-teal-200">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  type="button"
                  className="w-full bg-datequest-teal-500 hover:bg-datequest-teal-600 text-white"
                  onClick={handleSignup}
                >
                  Start Registration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
