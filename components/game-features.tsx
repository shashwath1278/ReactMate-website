"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RotateCw, Users, Cpu, Zap } from "lucide-react"

export default function GameFeatures() {
  const [difficulty, setDifficulty] = useState(4)
  const [boardFlipped, setBoardFlipped] = useState(false)
  const [autoFlip, setAutoFlip] = useState(false)
  const [aiMode, setAiMode] = useState(true)

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Game Features</h2>
          <p className="text-xl text-muted-foreground">Customize your chess experience with these powerful features</p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <Tabs defaultValue="board" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="board">
                  <RotateCw className="mr-2 h-4 w-4 hidden sm:inline" />
                  <span>Board</span>
                </TabsTrigger>
                <TabsTrigger value="auto-flip">
                  <Zap className="mr-2 h-4 w-4 hidden sm:inline" />
                  <span>Auto-Flip</span>
                </TabsTrigger>
                <TabsTrigger value="mode">
                  <Users className="mr-2 h-4 w-4 hidden sm:inline" />
                  <span>Game Mode</span>
                </TabsTrigger>
              </TabsList>
            </div>

           
            <TabsContent value="board" className="space-y-8">
              <div className="bg-card rounded-xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Board Orientation</h3>
                    <p className="text-muted-foreground">Flip the board to view from either side</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-[200px] h-[200px] bg-amber-100 rounded-lg overflow-hidden shadow-md">
                      <motion.div
                        className="absolute inset-0 grid grid-cols-8 grid-rows-8"
                        animate={{ rotateX: boardFlipped ? 180 : 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                      >
                        {Array.from({ length: 64 }).map((_, i) => {
                          const row = Math.floor(i / 8)
                          const col = i % 8
                          const isDark = (row + col) % 2 === 1
                          return <div key={i} className={`${isDark ? "bg-amber-800" : "bg-amber-100"}`} />
                        })}

                        {/* Sample pieces */}
                        <div className="absolute top-[25px] left-[25px] w-[25px] h-[25px] rounded-full bg-slate-800 border-2 border-slate-700" />
                        <div className="absolute top-[150px] left-[150px] w-[25px] h-[25px] rounded-full bg-slate-100 border-2 border-slate-300" />
                      </motion.div>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="board-flip" className="text-base cursor-pointer">
                          {boardFlipped ? "Black's Perspective" : "White's Perspective"}
                        </Label>
                        <Switch id="board-flip" checked={boardFlipped} onCheckedChange={setBoardFlipped} />
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Flipping the board helps you see the game from your opponent's perspective, which can improve
                          your strategic thinking.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setBoardFlipped(!boardFlipped)} className="flex-1">
                          <RotateCw className="mr-2 h-4 w-4" />
                          Flip Board
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="auto-flip" className="space-y-8">
              <div className="bg-card rounded-xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Auto-Flip Mode</h3>
                    <p className="text-muted-foreground">Automatically flip the board after each move</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-[200px] h-[200px] bg-amber-100 rounded-lg overflow-hidden shadow-md">
                      <motion.div
                        className="absolute inset-0 grid grid-cols-8 grid-rows-8"
                        animate={{ rotateX: autoFlip ? [0, 180, 0] : 0 }}
                        transition={{
                          duration: 2,
                          repeat: autoFlip ? Number.POSITIVE_INFINITY : 0,
                          repeatDelay: 1,
                        }}
                      >
                        {Array.from({ length: 64 }).map((_, i) => {
                          const row = Math.floor(i / 8)
                          const col = i % 8
                          const isDark = (row + col) % 2 === 1
                          return <div key={i} className={`${isDark ? "bg-amber-800" : "bg-amber-100"}`} />
                        })}

                        {/* Sample pieces */}
                        <motion.div
                          className="absolute top-[25px] left-[25px] w-[25px] h-[25px] rounded-full bg-slate-800 border-2 border-slate-700"
                          animate={{
                            top: autoFlip ? ["25px", "25px", "150px"] : "25px",
                            left: autoFlip ? ["25px", "25px", "150px"] : "25px",
                          }}
                          transition={{
                            duration: 2,
                            repeat: autoFlip ? Number.POSITIVE_INFINITY : 0,
                            repeatDelay: 1,
                          }}
                        />
                        <motion.div
                          className="absolute top-[150px] left-[150px] w-[25px] h-[25px] rounded-full bg-slate-100 border-2 border-slate-300"
                          animate={{
                            top: autoFlip ? ["150px", "150px", "25px"] : "150px",
                            left: autoFlip ? ["150px", "150px", "25px"] : "150px",
                          }}
                          transition={{
                            duration: 2,
                            repeat: autoFlip ? Number.POSITIVE_INFINITY : 0,
                            repeatDelay: 1,
                          }}
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-flip" className="text-base cursor-pointer">
                          Auto-Flip Mode
                        </Label>
                        <Switch id="auto-flip" checked={autoFlip} onCheckedChange={setAutoFlip} />
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Auto-flip mode automatically rotates the board after each move, allowing you to always play
                          from the bottom perspective. This is especially useful for local two-player games.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          variant={autoFlip ? "default" : "outline"}
                          onClick={() => setAutoFlip(!autoFlip)}
                          className="flex-1"
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          {autoFlip ? "Disable Auto-Flip" : "Enable Auto-Flip"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mode" className="space-y-8">
              <div className="bg-card rounded-xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Game Mode</h3>
                    <p className="text-muted-foreground">Choose between playing against AI or another player</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      className={`p-6 rounded-xl border-2 cursor-pointer ${aiMode ? "border-primary bg-primary/5" : "border-muted"}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAiMode(true)}
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Cpu className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">Play vs AI</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Challenge the computer at various difficulty levels
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`p-6 rounded-xl border-2 cursor-pointer ${!aiMode ? "border-primary bg-primary/5" : "border-muted"}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAiMode(false)}
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">Two Players</h4>
                          <p className="text-sm text-muted-foreground mt-1">Play against a friend on the same device</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {aiMode
                        ? "AI mode lets you play against the computer. Adjust the difficulty level to match your skill."
                        : "Two-player mode allows you to play chess with a friend on the same device, taking turns to make moves."}
                    </p>
                  </div>

                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

