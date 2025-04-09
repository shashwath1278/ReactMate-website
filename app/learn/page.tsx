"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, GraduationCap, Lightbulb } from "lucide-react"

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
            {[
              { title: "Chess Pieces", description: "Learn how each piece moves on the board" },
              { title: "Basic Rules", description: "Understanding the fundamental rules of chess" },
              { title: "Check & Checkmate", description: "How to attack the king and win the game" },
              { title: "Special Moves", description: "Castling, en passant, and pawn promotion" },
              { title: "Board Setup", description: "How to correctly set up the chess board" },
              { title: "Basic Tactics", description: "Simple tactical patterns for beginners" },
            ].map((lesson, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
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
            {[
              { title: "Opening Principles", description: "Key concepts for starting the game well" },
              { title: "Tactical Patterns", description: "Common tactical motifs and combinations" },
              { title: "Positional Play", description: "Understanding pawn structure and piece placement" },
              { title: "Endgame Basics", description: "Essential endgame techniques and principles" },
              { title: "Planning", description: "How to create and execute plans in chess" },
              { title: "Common Mistakes", description: "Avoiding typical intermediate-level errors" },
            ].map((lesson, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
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
            {[
              { title: "Advanced Tactics", description: "Complex tactical patterns and combinations" },
              { title: "Strategic Concepts", description: "Deep positional understanding and planning" },
              { title: "Opening Theory", description: "Detailed analysis of opening variations" },
              { title: "Complex Endgames", description: "Mastering difficult endgame positions" },
              { title: "Calculation", description: "Improving your calculation abilities" },
              { title: "Analysis Methods", description: "How to analyze your games effectively" },
            ].map((lesson, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
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

