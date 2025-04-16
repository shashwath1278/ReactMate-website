"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, GraduationCap, Lightbulb, KeyRound, ZapFast } from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("basics")

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

  const lessonsByLevel = {
    beginner: [
      { id: "chess-pieces", title: "Chess Pieces", description: "Learn how each piece moves on the board", path: "/learn/chess-pieces" },
      { id: "basic-rules", title: "Basic Rules", description: "Understanding the fundamental rules of chess", path: "/learn/basic-rules" },
      { id: "check-checkmate", title: "Check & Checkmate", description: "How to attack the king and win the game", path: "/learn/check-checkmate" },
      { id: "special-moves", title: "Special Moves", description: "Castling, en passant, and pawn promotion", path: "/learn/special-moves" },
      { id: "basic-tactics", title: "Basic Tactics", description: "Simple tactical patterns for beginners", path: "/learn/basic-tactics" },
    ],
    intermediate: [
      { id: "opening-principles", title: "Opening Principles", description: "Key concepts for starting the game well", path: "/learn/opening-principles" },
      { id: "tactical-patterns", title: "Tactical Patterns", description: "Common tactical motifs and combinations", path: "/learn/tactical-patterns" },
      { id: "positional-play", title: "Positional Play", description: "Understanding pawn structure and piece placement", path: "/learn/positional-play" },
      { id: "endgame-basics", title: "Endgame Basics", description: "Essential endgame techniques and principles", path: "/learn/endgame-basics" },
      { id: "planning", title: "Planning", description: "How to create and execute plans in chess", path: "/learn/planning" },
      { id: "common-mistakes", title: "Common Mistakes", description: "Avoiding typical intermediate-level errors", path: "/learn/common-mistakes" },

    ],
    advanced: [
      { id: "advanced-openings", title: "Advanced Openings", description: "Deep dive into opening theory and variations", path: "/learn/advanced-openings" },
      { id: "calculation", title: "Calculation", description: "How to analyze positions and calculate variations", path: "/learn/calculation" },
      { id: "strategic-concepts", title: "Strategic Concepts", description: "Complex positional and strategic ideas", path: "/learn/strategic-concepts" },
      { id: "endgame-theory", title: "Endgame Theory", description: "Complex endgame positions and techniques", path: "/learn/endgame-theory" },
      { id: "attack-defense", title: "Attack & Defense", description: "Advanced attacking and defensive techniques", path: "/learn/attack-defense" },
      { id: "study-analysis", title: "Study & Analysis", description: "How to analyze your games and improve", path: "/learn/study-analysis" },
    ],
  }

  return (
    <div className="container py-12 space-y-12">
      <motion.div
        className="text-center max-w-3xl mx-auto space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">Learn Chess</h1>
        <p className="text-xl text-muted-foreground">
          From basic moves to advanced strategies, improve your chess skills with our comprehensive guides.
        </p>
      </motion.div>

      <Tabs defaultValue="basics" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="basics">
              <BookOpen className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Basics</span>
            </TabsTrigger>
            <TabsTrigger value="intermediate">
              <GraduationCap className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Intermediate</span>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Lightbulb className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basics">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {lessonsByLevel.beginner.map((lesson, index) => (
              <motion.div key={lesson.id} variants={item}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={lesson.path || ""}>
                        Start Lesson
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="intermediate">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {lessonsByLevel.intermediate.map((lesson, index) => (
              <motion.div key={lesson.id} variants={item}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={lesson.path}>
                        Start Lesson
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="advanced">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {lessonsByLevel.advanced.map((lesson, index) => (
              <motion.div key={lesson.id} variants={item}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={lesson.path}>
                        Start Lesson
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

