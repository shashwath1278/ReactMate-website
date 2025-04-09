"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, Cpu, Users, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlayPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Choose Game Mode</h1>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-8"
      >
        {/* Play vs AI Card */}
        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-md overflow-hidden">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Play vs AI</CardTitle>
              <CardDescription className="text-center">
                Challenge our sophisticated chess AI at various difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="bg-muted rounded-lg p-4 mb-4">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Multiple difficulty levels</li>
                  <li>Instant play, no waiting</li>
                  <li>Analyze your moves with evaluation</li>
                  <li>Perfect for practice and learning</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <a href="https://react-mate--two.vercel.app/play/ai" target="_blank" rel="noopener noreferrer">
                  Play vs AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Game opens in new tab. Close the tab when finished to return here.
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Play Local Card */}
        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-md overflow-hidden">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Play Locally</CardTitle>
              <CardDescription className="text-center">
                Play chess with a friend on the same device, taking turns
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="bg-muted rounded-lg p-4 mb-4">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>No account required</li>
                  <li>Pass-and-play format</li>
                  <li>Auto-flip board option</li>
                  <li>Great for teaching chess</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <a href="https://react-mate--two.vercel.app/play/offline" target="_blank" rel="noopener noreferrer">
                  Play Locally
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Game opens in new tab. Close the tab when finished to return here.
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Play Online Card */}
        <motion.div variants={item}>
          <Card className="h-full transition-all hover:shadow-md overflow-hidden">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Play Online</CardTitle>
              <CardDescription className="text-center">
                Challenge players from around the world in online matches
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="bg-muted rounded-lg p-4 mb-4">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Quick matchmaking</li>
                  <li>Live chess ratings</li>
                  <li>Chat with opponents</li>
                  <li>Save and share games</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <a href="https://react-mate--two.vercel.app/play/online" target="_blank" rel="noopener noreferrer">
                  Play Online
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Game opens in new tab. Close the tab when finished to return here.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

