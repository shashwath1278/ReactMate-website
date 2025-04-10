"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Zap, Cpu, Palette, BarChart4, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import DynamicChessAnimation from "@/components/dynamic-chess-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GameFeatures from "@/components/game-features"
import CallToAction from "@/components/call-to-action"

export default function Home() {
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
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container min-h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center gap-8 py-12">
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              ReactMate: <span className="text-primary">Play Chess with Style</span>
            </h1>
            <p className="text-xl md:text-2xl mt-4 text-muted-foreground">
              A modern chess platform for players of all skill levels, built with React
            </p>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Experience fluid gameplay, powerful AI opponents, and beautiful animations in our React-powered chess
            application.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button size="lg" asChild>
              <Link href="/play">
                Play Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/learn">Learn Chess</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <DynamicChessAnimation />
        </motion.div>
      </section>

      {/* App Showcase */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Chess Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for an exceptional chess experience</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={item}>
              <Card className="p-2 transition-all hover:shadow-md overflow-hidden group">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Interactive Gameplay</CardTitle>
                  <CardDescription>Smooth drag-and-drop piece movement with legal move highlighting</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-2 transition-all hover:shadow-md overflow-hidden group">
                <CardHeader>
                  <Cpu className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Multiple AI Levels</CardTitle>
                  <CardDescription>Challenge yourself with 8 different AI difficulty settings</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-2 transition-all hover:shadow-md overflow-hidden group">
                <CardHeader>
                  <Palette className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Board Customization</CardTitle>
                  <CardDescription>Choose from multiple board themes and piece styles</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-2 transition-all hover:shadow-md overflow-hidden group">
                <CardHeader>
                  <BarChart4 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Position Analysis</CardTitle>
                  <CardDescription>Real-time evaluation bar and suggested best moves</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-2 transition-all hover:shadow-md overflow-hidden group">
                <CardHeader>
                  <RotateCw className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Game Controls</CardTitle>
                  <CardDescription>Reset, undo moves, flip board, and save games</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Game Features Section */}
      <GameFeatures />
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Player Resources</h2>
            <p className="text-xl text-muted-foreground">Improve your chess skills with our comprehensive guides</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Basic Chess Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Learn how each piece moves, basic rules, and how to win a chess game.
                  </CardDescription>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/learn">View Rules</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Strategy Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Improve your game with opening principles, tactical patterns, and endgame techniques.
                  </CardDescription>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/learn">View Strategies</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </div>
  )
}

