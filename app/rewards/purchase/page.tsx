"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, CreditCard, Gift, MessageCircle, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function HeartsPurchasePage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [showSuccess, setShowSuccess] = useState(false)

  const heartPackages = [
    {
      id: "basic",
      hearts: 5,
      price: "$2.99",
      popular: false,
      savings: "0%",
    },
    {
      id: "standard",
      hearts: 20,
      price: "$9.99",
      popular: true,
      savings: "16%",
    },
    {
      id: "premium",
      hearts: 50,
      price: "$19.99",
      popular: false,
      savings: "33%",
    },
    {
      id: "ultimate",
      hearts: 100,
      price: "$29.99",
      popular: false,
      savings: "50%",
    },
  ]

  const handlePurchase = () => {
    // Simulate purchase process
    setShowSuccess(true)

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "/quest-active"
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-datequest-dark">
        <Link href="/quest-active" className="flex items-center justify-center">
          <ArrowLeft className="h-5 w-5 mr-2 text-datequest-dark" />
          <span className="font-medium text-datequest-dark">Back</span>
        </Link>
        <h1 className="ml-4 text-xl font-semibold text-center flex-1 text-datequest-dark">Purchase Hearts</h1>
      </header>
      <main className="flex-1 flex flex-col items-center p-4 md:p-8 relative">
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
          <Card className="w-full overflow-hidden mb-6 border-2 border-datequest-dark">
            <CardHeader className="bg-datequest-dark text-white">
              <CardTitle className="text-center">QuestCard Hearts</CardTitle>
              <CardDescription className="text-center text-gray-200">
                Unlock additional QuestCards to enhance your date experience
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {heartPackages.map((pkg) => (
                  <motion.div key={pkg.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="relative">
                    <Card
                      className={`cursor-pointer overflow-hidden ${
                        selectedPackage === pkg.id
                          ? "border-2 border-datequest-dark ring-2 ring-datequest-dark"
                          : "border border-gray-200"
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-datequest-dark text-white text-xs px-2 py-1 rounded-bl-lg">
                          Popular
                        </div>
                      )}
                      <CardContent className="p-4 text-center">
                        <div className="flex justify-center mb-2">
                          {Array.from({ length: Math.min(5, pkg.hearts) }).map((_, i) => (
                            <Heart
                              key={i}
                              className="h-5 w-5 text-red-500 fill-red-500"
                              style={{ marginLeft: i > 0 ? "-6px" : "0" }}
                            />
                          ))}
                        </div>
                        <h3 className="font-bold">{pkg.hearts} Hearts</h3>
                        <p className="text-lg font-semibold">{pkg.price}</p>
                        {pkg.savings !== "0%" && <p className="text-xs text-green-600">Save {pkg.savings}</p>}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <RadioGroup
                    defaultValue="credit-card"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
                      <Label
                        htmlFor="credit-card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-datequest-dark [&:has([data-state=checked])]:border-datequest-dark"
                      >
                        <CreditCard className="mb-2 h-6 w-6" />
                        Credit Card
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="apple-pay" id="apple-pay" className="peer sr-only" />
                      <Label
                        htmlFor="apple-pay"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-datequest-dark [&:has([data-state=checked])]:border-datequest-dark"
                      >
                        <svg
                          className="mb-2 h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 8.5C7.5 7 9 6.5 10.5 6.5C13.5 6.5 14.5 8.5 17.5 8.5C19 8.5 20.5 8 21.5 6.5C20.5 8 19 8.5 17.5 8.5C14.5 8.5 13.5 6.5 10.5 6.5C9 6.5 7.5 7 6.5 8.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.5 12.5C7.5 11 9 10.5 10.5 10.5C13.5 10.5 14.5 12.5 17.5 12.5C19 12.5 20.5 12 21.5 10.5C20.5 12 19 12.5 17.5 12.5C14.5 12.5 13.5 10.5 10.5 10.5C9 10.5 7.5 11 6.5 12.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.5 16.5C7.5 15 9 14.5 10.5 14.5C13.5 14.5 14.5 16.5 17.5 16.5C19 16.5 20.5 16 21.5 14.5C20.5 16 19 16.5 17.5 16.5C14.5 16.5 13.5 14.5 10.5 14.5C9 14.5 7.5 15 6.5 16.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Apple Pay
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" className="border-datequest-dark" />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="border-datequest-dark" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="border-datequest-dark" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 bg-white">
              <Button
                onClick={handlePurchase}
                className="w-full bg-datequest-dark text-white hover:bg-black"
                disabled={!selectedPackage}
              >
                {selectedPackage
                  ? `Purchase ${selectedPackage === "basic" ? "5" : selectedPackage === "standard" ? "20" : selectedPackage === "premium" ? "50" : "100"} Hearts`
                  : "Select a Package"}
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-gray-500">
            <p>Hearts are used to unlock additional QuestCards during your dates.</p>
            <p className="mt-1">Each QuestCard costs 1 heart to unlock.</p>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-sm w-full mx-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Purchase Successful!</h3>
                <p className="text-gray-600 mb-4">Your hearts have been added to your account.</p>
                <p className="text-sm text-gray-500">Redirecting back to your quest...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
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
