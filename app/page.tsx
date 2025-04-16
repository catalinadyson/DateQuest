import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DateQuestLogo } from "@/components/datequest-logo"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-datequest-lime">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <DateQuestLogo size="md" />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium text-datequest-dark hover:underline underline-offset-4">
            Log In
          </Link>
        </nav>
      </header>
      <main className="flex-1 relative overflow-hidden">
        {/* Decorative dotted lines like in the logo */}
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

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          {/* Map-like decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Compass rose */}
            <div className="absolute top-10 right-10 w-32 h-32 opacity-20 hidden md:block">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2d3b45" strokeWidth="1" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2d3b45" strokeWidth="1" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#2d3b45" strokeWidth="1" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#2d3b45" strokeWidth="1" />
                <line x1="15" y1="15" x2="85" y2="85" stroke="#2d3b45" strokeWidth="1" />
                <line x1="15" y1="85" x2="85" y2="15" stroke="#2d3b45" strokeWidth="1" />
                <polygon points="50,10 53,20 50,15 47,20" fill="#2d3b45" />
                <text x="50" y="8" textAnchor="middle" fontSize="8" fill="#2d3b45">
                  N
                </text>
                <text x="93" y="52" textAnchor="middle" fontSize="8" fill="#2d3b45">
                  E
                </text>
                <text x="50" y="95" textAnchor="middle" fontSize="8" fill="#2d3b45">
                  S
                </text>
                <text x="7" y="52" textAnchor="middle" fontSize="8" fill="#2d3b45">
                  W
                </text>
              </svg>
            </div>

            {/* Contour lines */}
            <div className="absolute bottom-0 left-0 w-full h-40 opacity-10">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path d="M0,80 Q100,60 200,80 T400,70" fill="none" stroke="#2d3b45" strokeWidth="1" />
                <path d="M0,60 Q100,40 200,60 T400,50" fill="none" stroke="#2d3b45" strokeWidth="1" />
                <path d="M0,40 Q100,20 200,40 T400,30" fill="none" stroke="#2d3b45" strokeWidth="1" />
                <path d="M0,20 Q100,0 200,20 T400,10" fill="none" stroke="#2d3b45" strokeWidth="1" />
              </svg>
            </div>

            {/* Map pins */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
              <svg width="30" height="40" viewBox="0 0 30 40">
                <path d="M15 0C6.7 0 0 6.7 0 15c0 8.3 15 25 15 25s15-16.7 15-25c0-8.3-6.7-15-15-15z" fill="#5f9ea0" />
                <circle cx="15" cy="15" r="7" fill="#d8b589" />
              </svg>
            </div>

            <div className="absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
              <svg width="24" height="32" viewBox="0 0 30 40">
                <path d="M15 0C6.7 0 0 6.7 0 15c0 8.3 15 25 15 25s15-16.7 15-25c0-8.3-6.7-15-15-15z" fill="#5f9ea0" />
                <circle cx="15" cy="15" r="7" fill="#d8b589" />
              </svg>
            </div>

            {/* Dotted path */}
            <div className="absolute top-1/2 left-0 w-full h-20 opacity-20">
              <svg viewBox="0 0 400 50" className="w-full h-full">
                <path
                  d="M0,25 C50,10 100,40 150,25 S250,10 300,25 S400,40 450,25"
                  fill="none"
                  stroke="#2d3b45"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-datequest-dark text-center">
                    Discover Love Through Adventure
                  </h1>
                  <p className="max-w-[600px] mx-auto text-datequest-dark md:text-xl text-center">
                    DateQuest crafts unforgettable dating experiences based on your interests. No more boring coffee
                    dates - embark on a mystery adventure with your match!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link href="/signup">
                    <Button className="bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 border-2 border-datequest-teal-500 text-center">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button
                      variant="outline"
                      className="border-2 border-datequest-teal-500 text-datequest-teal-500 hover:bg-datequest-teal-500 hover:text-white text-center"
                    >
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[600px] border-8 border-datequest-dark rounded-[40px] overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-white">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-datequest-dark"></div>
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      <div className="flex justify-center mb-4">
                        <DateQuestLogo size="lg" />
                      </div>
                      <p className="text-center text-datequest-dark mb-8">Your next adventure awaits</p>
                      <div className="flex flex-col gap-4 w-full max-w-[250px]">
                        <Link href="/signup">
                          <Button className="bg-datequest-teal-500 text-white hover:bg-datequest-teal-600 border-2 border-datequest-teal-500 text-center w-full">
                            Sign Up
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button
                            variant="outline"
                            className="border-2 border-datequest-teal-500 text-datequest-teal-500 hover:bg-datequest-teal-500 hover:text-white text-center w-full"
                          >
                            Log In
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-datequest-teal-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How DateQuest Works</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A new way to connect through shared experiences
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-datequest-lime text-datequest-dark font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Match & Connect</h3>
                <p className="text-gray-300">
                  Match with someone based on shared interests and start a conversation within 24 hours.
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-datequest-lime text-datequest-dark font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Reveal Your Mystery Date</h3>
                <p className="text-gray-300">
                  DateQuest selects the perfect location based on your shared interests, budget, and local events.
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-datequest-lime text-datequest-dark font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Embark on QuestCards</h3>
                <p className="text-gray-300">
                  Discover fun activities and challenges that make your date memorable and unique.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-datequest-dark">
        <p className="text-xs text-datequest-dark text-center sm:text-left">© 2024 DateQuest. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 justify-center sm:justify-end w-full">
          <Link className="text-xs hover:underline underline-offset-4 text-datequest-dark" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-datequest-dark" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
