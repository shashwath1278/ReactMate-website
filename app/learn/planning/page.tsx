"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { ChevronLeft, Target, Check, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Import the Chessboard component dynamically to avoid SSR issues
const Chessboard = dynamic(() => import('@/components/chess/Chessboard'), { 
  ssr: false,
  loading: () => <div className="w-full aspect-square bg-muted/30 flex items-center justify-center">Loading chessboard...</div>
})

const planningConcepts = [
  {
    id: "evaluate-position",
    title: "Positional Evaluation",
    description: "Before creating a plan, you need to objectively evaluate the current position.",
    steps: [
      "Assess pawn structure (weaknesses, strengths, islands)",
      "Evaluate piece activity and coordination",
      "Consider king safety for both sides",
      "Look for open files, diagonals, and potential outposts",
      "Identify which side has a space advantage"
    ],
    positions: [
      {
        fen: "r1bqk2r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 1",
        title: "Evaluation Example",
        description: "White has better development and the bishop pair. Black has a solid position but less space."
      },
      {
        fen: "r2qk2r/ppp1bppp/2np1n2/4p3/4P1b1/2PP1N1P/PPB2PP1/RNBQR1K1 b kq - 0 1",
        title: "Identifying Weaknesses",
        description: "Black should note White's potential weakening of the kingside with h3, which creates potential tactical opportunities."
      }
    ],
    example: "In a position with an isolated queen's pawn for your opponent, your plan might revolve around blockading and attacking this weakness."
  },
  {
    id: "identify-advantages",
    title: "Identify Your Advantages",
    description: "Every position has certain characteristics favoring one side. Identify yours to leverage them.",
    steps: [
      "Material advantage (having more or better pieces)",
      "Better pawn structure (fewer weaknesses)",
      "Superior piece coordination or activity",
      "Control of key squares or lines",
      "Development lead or initiative"
    ],
    positions: [
      {
        fen: "r2qkb1r/pp2pppp/2n2n2/3p1b2/3P4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 1",
        title: "Identifying Advantages",
        description: "White has more central space and slightly better development. A plan based on expanding in the center would be logical."
      },
      {
        fen: "r1bqk2r/pp2bppp/2n1pn2/3p4/3P4/2NBP3/PP3PPP/R1BQK1NR w KQkq - 0 1",
        title: "Bishop Pair Advantage",
        description: "White has the bishop pair in an open position. The plan should involve keeping the position fluid to maximize this advantage."
      }
    ],
    example: "If you have a bishop pair in an open position, your plan might involve keeping the position fluid and using your bishops' long-range power."
  },
  {
    id: "target-weaknesses",
    title: "Identify Opponent's Weaknesses",
    description: "Successful plans often target specific weaknesses in your opponent's position.",
    steps: [
      "Look for weak pawns or squares",
      "Identify poorly placed pieces",
      "Check for king safety issues",
      "Notice any overloaded pieces",
      "Consider structural weaknesses like doubled or isolated pawns"
    ],
    positions: [
      {
        fen: "r1bq1rk1/pp3ppp/2nbpn2/3p4/3P4/1P1BPN2/P1P2PPP/RN1Q1RK1 w - - 0 1",
        title: "Weak Square",
        description: "Black has a weakness on e6. White should plan to target this square, potentially with a knight maneuver to f4."
      },
      {
        fen: "r2qk2r/pp1nbppp/4pn2/3p4/3P1B2/2NB4/PP3PPP/R2QK2R w KQkq - 0 1",
        title: "Backward Pawn",
        description: "Black has a backward e-pawn. White's plan could involve increasing pressure on this weakness."
      }
    ],
    example: "If your opponent has weakened kingside pawn structure, you might plan for piece sacrifice on h7 or g7 to expose their king."
  },
  {
    id: "prophylaxis",
    title: "Prophylaxis",
    description: "Sometimes the best plan is to prevent your opponent's plan.",
    steps: [
      "Ask yourself: 'What does my opponent want to do next?'",
      "Identify ways to prevent or complicate their ideal plan",
      "Secure key squares before your opponent can use them",
      "Eliminate potential counterplay",
      "Force your opponent into a passive defensive stance"
    ],
    positions: [
      {
        fen: "rnbqk2r/pp3ppp/4pn2/2pp4/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 1",
        title: "Preventing Activity",
        description: "White should play a3, preventing Black's bishop from retreating to a5 and maintaining pressure on it."
      },
      {
        fen: "r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1PN2/PP1B1PPP/R1BQK2R w KQ - 0 1",
        title: "Securing Key Squares",
        description: "White should consider Nb5 to secure the d6 outpost before Black can play c6 to prevent it."
      }
    ],
    example: "If you notice your opponent is preparing a knight outpost on d5, you might plan to control that square with pawns or pieces first."
  },
  {
    id: "improve-worst-piece",
    title: "Improve Your Worst Piece",
    description: "A chain is only as strong as its weakest link. Identify and improve your least active piece.",
    steps: [
      "Identify which of your pieces is contributing least",
      "Find a better square for that piece",
      "Create a plan to reposition it",
      "Ensure other pieces support this reorganization",
      "Don't weaken your position just to improve one piece"
    ],
    positions: [
      {
        fen: "r1bqr1k1/pp3ppp/2n2n2/8/1b1NN3/4B3/PP3PPP/R2Q1RK1 w - - 0 1",
        title: "Improving a Knight",
        description: "White's knight on d4 is well placed, but the one on e4 could be improved by moving to c5 or f6."
      },
      {
        fen: "r4rk1/1bq1bppp/pp2pn2/8/P1BP4/2P1BN2/5PPP/R2Q1RK1 b - - 0 1",
        title: "Rook Activation",
        description: "Black's worst piece is the a8 rook. A plan involving ...a5 followed by ...Ra7-d7 would improve it."
      }
    ],
    example: "If you have a knight on a5 that has no good squares to go to, your plan might be to maneuver it via c6 to e5 where it's more centralized."
  }
];

export default function PlanningPage() {
  const [selectedConcept, setSelectedConcept] = useState(planningConcepts[0]);
  const [positionIndex, setPositionIndex] = useState(0);
  
  // Reset position index when concept changes
  useEffect(() => {
    setPositionIndex(0);
  }, [selectedConcept]);

  const nextPosition = () => {
    setPositionIndex((prev) => 
      prev < selectedConcept.positions.length - 1 ? prev + 1 : 0
    );
  };

  const prevPosition = () => {
    setPositionIndex((prev) => 
      prev > 0 ? prev - 1 : selectedConcept.positions.length - 1
    );
  };

  const currentPosition = selectedConcept.positions[positionIndex];

  return (
    <div className="container py-8 space-y-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/learn">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Strategic Planning</h1>
      </div>
      
      <Card className="p-6 mb-8">
        <CardContent className="p-0">
          <CardDescription className="text-lg">
            Strategic planning is a fundamental skill that separates intermediate players from beginners. 
            Instead of making moves that just look good, you'll learn to create coherent plans based on positional understanding.
          </CardDescription>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Planning Concepts</h2>
          <div className="flex flex-col space-y-2">
            {planningConcepts.map((concept) => (
              <Button 
                key={concept.id}
                variant={selectedConcept.id === concept.id ? "default" : "outline"} 
                className="justify-start"
                onClick={() => setSelectedConcept(concept)}
              >
                <Target className={`mr-2 h-4 w-4 ${selectedConcept.id === concept.id ? "text-primary-foreground" : "text-primary"}`} />
                {concept.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <motion.div 
            key={selectedConcept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">{selectedConcept.title}</h3>
                <p className="text-lg mb-6">{selectedConcept.description}</p>
                
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`${selectedConcept.id}-${positionIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <div className="aspect-square max-w-md mx-auto mb-4 border border-muted rounded">
                        <Chessboard 
                          position={currentPosition.fen}
                          boardSize={400}
                          showNotation
                          darkSquareColor="#3182ce"
                          lightSquareColor="#FFFFFF"
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold">{currentPosition.title}</h3>
                        <p>{currentPosition.description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={prevPosition}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm">
                      {positionIndex + 1} of {selectedConcept.positions.length}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={nextPosition}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Steps to Apply This Concept:</h4>
                  <ul className="space-y-2">
                    {selectedConcept.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                <div>
                  <h4 className="font-semibold mb-1">Example:</h4>
                  <p>{selectedConcept.example}</p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Planning Process</h2>
          <p className="mb-6">
            Effective planning in chess follows a logical process. Here's a framework you can use in your games:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-center p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-center mb-2">Evaluate the Position</h3>
              <p className="text-sm text-muted-foreground text-center">
                Analyze pawn structure, piece activity, king safety, and control of key squares.
              </p>
            </Card>
            <Card className="p-4">
              <div className="text-center p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-center mb-2">Identify Imbalances</h3>
              <p className="text-sm text-muted-foreground text-center">
                Recognize what advantages and disadvantages each side has in the position.
              </p>
            </Card>
            <Card className="p-4">
              <div className="text-center p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-center mb-2">Formulate Plans</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create specific plans based on the imbalances and characteristics of the position.
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  )
}
