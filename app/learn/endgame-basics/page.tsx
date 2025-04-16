"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { ChevronLeft, Crown, Info, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Import the Chessboard component dynamically to avoid SSR issues
const Chessboard = dynamic(() => import('@/components/chess/Chessboard'), {
  ssr: false,
  loading: () => <div className="w-full aspect-square bg-muted/30 flex items-center justify-center">Loading chessboard...</div>
})

const endgameTypes = [
  {
    id: "king-pawn",
    title: "King and Pawn Endgames",
    description: "These are the most fundamental endgames. Understanding key concepts like opposition, the square rule, and king activity is essential.",
    keyPoints: [
      "Opposition: Kings facing each other with one square between - the player not to move is at disadvantage",
      "Square rule: If the king can move within the square of an advancing pawn, it can catch it",
      "King activity: In endgames, the king becomes a strong piece and should be centralized",
      "Passed pawns: These are valuable assets that must be pushed or blockaded",
      "Creating passed pawns often decides the endgame"
    ],
    positions: [
      {
        fen: "8/8/8/3k4/8/8/3P4/3K4 w - - 0 1",
        title: "Opposition",
        description: "White to move gains the opposition by playing Kd3, forcing Black's king to move away."
      },
      {
        fen: "8/8/8/8/8/8/3P4/K6k w - - 0 1",
        title: "Square Rule",
        description: "Black's king is outside the square of White's pawn, so cannot catch it before promotion."
      },
      {
        fen: "8/8/8/5k2/8/3K4/4P3/8 w - - 0 1",
        title: "King Activity",
        description: "White's centralized king supports the pawn's advance while restricting Black's king."
      }
    ]
  },
  {
    id: "rook-endings",
    title: "Rook Endgames",
    description: "Rook endgames are the most common type at higher levels. They require precision and understanding of key principles.",
    keyPoints: [
      "Rooks belong behind passed pawns (yours or the opponent's)",
      "The Lucena position is a winning position with a rook and pawn vs rook",
      "The Philidor position is a drawing position for the defender with a rook vs rook and pawn",
      "Cut off the enemy king vertically when possible",
      "Avoid passive rook placement as it limits your options"
    ],
    positions: [
      {
        fen: "3r4/8/8/8/8/5K2/4P3/4R3 w - - 0 1",
        title: "Rooks Behind Pawns",
        description: "White's rook is ideally placed behind its passed pawn, ready to support its advance."
      },
      {
        fen: "8/8/8/8/3k4/8/3P4/3K1R2 w - - 0 1",
        title: "Lucena Position",
        description: "This is the famous Lucena position. White can win by building a 'bridge' for their king."
      },
      {
        fen: "8/8/8/8/3k4/8/3P4/R3K3 b - - 0 1",
        title: "Philidor Defense",
        description: "Black can draw by keeping their rook on the 3rd rank, using the Philidor defense technique."
      }
    ]
  },
  {
    id: "minor-piece",
    title: "Minor Piece Endgames",
    description: "Understanding the strengths and weaknesses of bishops and knights in the endgame is crucial.",
    keyPoints: [
      "Bishop pair advantage increases in open positions",
      "Knight vs bishop outcomes depend on pawn structure",
      "Knights are better with pawns on both sides of the board",
      "Bishops are stronger in open positions with pawns on opposite sides",
      "A bishop can control the promotion square of a pawn of the opposite color"
    ],
    positions: [
      {
        fen: "8/8/8/5k2/8/8/5P2/4KB2 w - - 0 1",
        title: "Bishop vs Knight Endgame",
        description: "With pawns on one side, the bishop is generally stronger than a knight."
      },
      {
        fen: "8/8/8/8/3Bk3/8/4P3/4K3 w - - 0 1",
        title: "Bishop Controlling Promotion Square",
        description: "The bishop controls the promotion square, allowing the king to capture the pawn safely."
      },
      {
        fen: "8/8/8/3N4/2k1K3/8/8/8 w - - 0 1",
        title: "Knight Outpost",
        description: "A centralized knight can control important squares and restrict the enemy king's movement."
      }
    ]
  },
  {
    id: "queen-endings",
    title: "Queen Endgames",
    description: "Queen endgames are complex but follow certain principles that can help navigate their complications.",
    keyPoints: [
      "Queens are powerful but can be vulnerable to checks from minor pieces",
      "A queen cannot stop a passed pawn supported by its king without giving perpetual check",
      "Queen vs pawn on 7th rank often leads to a draw by stalemate or perpetual check",
      "When ahead in material, trading queens often simplifies to a winning position",
      "When behind, keeping queens on the board increases practical chances"
    ],
    positions: [
      {
        fen: "8/8/8/8/8/5k2/4p3/4K1Q1 w - - 0 1",
        title: "Queen vs Pawn",
        description: "White can draw against the advanced pawn by giving perpetual check to Black's king."
      },
      {
        fen: "8/8/8/8/8/3k4/3p4/3K1Q2 b - - 0 1",
        title: "Stalemate Potential",
        description: "Black to move can advance to d1 promoting with stalemate, securing a draw."
      },
      {
        fen: "8/8/8/2k5/8/2K5/4P3/8 w - - 0 1",
        title: "King and Pawn vs King",
        description: "After trading queens, this position is winning for White due to the opposition advantage."
      }
    ]
  }
];

export default function EndgameBasicsPage() {
  const [selectedEndgame, setSelectedEndgame] = useState(endgameTypes[0]);
  const [positionIndex, setPositionIndex] = useState(0);
  
  // Reset position index when endgame type changes
  useEffect(() => {
    setPositionIndex(0);
  }, [selectedEndgame]);

  const nextPosition = () => {
    setPositionIndex((prev) => 
      prev < selectedEndgame.positions.length - 1 ? prev + 1 : 0
    );
  };

  const prevPosition = () => {
    setPositionIndex((prev) => 
      prev > 0 ? prev - 1 : selectedEndgame.positions.length - 1
    );
  };

  const currentPosition = selectedEndgame.positions[positionIndex];

  return (
    <div className="container py-8 space-y-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/learn">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Endgame Basics</h1>
      </div>
      
      <Card className="p-6">
        <CardContent className="p-0">
          <CardDescription className="text-lg">
            The endgame is the phase of the game when few pieces remain on the board. Mastering endgame principles 
            is essential for converting advantages into wins and saving difficult positions.
          </CardDescription>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Common Endgame Types</h2>
          <div className="flex flex-col space-y-2">
            {endgameTypes.map((endgame) => (
              <Button 
                key={endgame.id}
                variant={selectedEndgame.id === endgame.id ? "default" : "outline"} 
                className="justify-start"
                onClick={() => setSelectedEndgame(endgame)}
              >
                <Crown className={`mr-2 h-4 w-4 ${selectedEndgame.id === endgame.id ? "text-primary-foreground" : "text-primary"}`} />
                {endgame.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <motion.div 
            key={selectedEndgame.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-3">{selectedEndgame.title}</h3>
              <p className="text-lg mb-6">{selectedEndgame.description}</p>
              
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${selectedEndgame.id}-${positionIndex}`}
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
                    {positionIndex + 1} of {selectedEndgame.positions.length}
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
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Key Principles:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedEndgame.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Fundamental Endgame Skills</h2>
          <p className="mb-6">
            Regardless of the specific type of endgame, these fundamental skills will help you navigate 
            any endgame position more effectively.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold">Calculation</h3>
              <p className="text-sm text-muted-foreground">
                In endgames, precise calculation is critical as each move can be decisive.
                Practice calculating variations several moves deep.
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold">King Activation</h3>
              <p className="text-sm text-muted-foreground">
                Unlike in openings and middlegames, kings should be active in endgames and
                participate in the action, supporting pawns and controlling key squares.
              </p>
            </Card>
          </div>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Test Your Knowledge</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Ready to apply what you've learned? Try solving these endgame puzzles to practice
            the principles and techniques covered in this lesson.
          </p>
          <Button className="mx-auto">
            Start Endgame Practice
          </Button>
        </Card>
      </div>
    </div>
  )
}
