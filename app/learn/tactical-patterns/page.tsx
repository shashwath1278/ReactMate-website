"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { ChevronLeft, Info, Zap, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Import the Chessboard component dynamically to avoid SSR issues
const Chessboard = dynamic(() => import('@/components/chess/Chessboard'), { 
  ssr: false,
  loading: () => <div className="w-full aspect-square bg-muted/30 flex items-center justify-center">Loading chessboard...</div>
})

const advancedTactics = [
  {
    id: "deflection",
    name: "Deflection",
    description: "A deflection tactic forces an enemy piece to abandon a defensive duty, creating tactical opportunities.",
    positions: [
      {
        fen: "r1bqkb1r/ppp2ppp/2n2n2/3p4/3P4/2NQB3/PPP1PPPP/R3KBNR w KQkq - 0 6",
        title: "Basic Deflection",
        description: "White can play Qb5 to deflect Black's knight from defending the d5 pawn, winning material."
      },
      {
        fen: "r3k2r/pb1p1ppp/1pn1pn2/2p5/2PPQ3/P4NP1/1P2PPBP/R3K2R w KQkq - 0 11",
        title: "Deflection from Defense",
        description: "White can play Qxc6, deflecting the knight from defending the bishop on b7."
      }
    ],
    explanation: "Deflection is often combined with other tactics like pins or discovered attacks. By sacrificing material, you force a piece to move away from a crucial defensive position, opening the way for a stronger attack."
  },
  {
    id: "overloading",
    name: "Overloading",
    description: "Overloading occurs when a defensive piece has too many responsibilities and cannot handle all of them simultaneously.",
    positions: [
      {
        fen: "r1bqkb1r/ppp2ppp/5n2/3p4/3Pn3/3B4/PPP1NPPP/RNBQK2R w KQkq - 0 6",
        title: "Overloaded Defender",
        description: "The knight on e4 is overloaded - it defends both d6 and f6. Taking the knight exposes both vulnerabilities."
      },
      {
        fen: "r1b1k2r/1pp2ppp/p1p2n2/4p3/4P1q1/2N5/PPPQ1PPP/2KR1B1R w kq - 0 11",
        title: "Complex Overloading",
        description: "Black's queen is overloaded, defending both e5 and g7. White can exploit this with Nxe5."
      }
    ],
    explanation: "Unlike deflection which forces a piece to move, overloading exploits a piece that's already trying to defend multiple threats. Creating an additional threat forces the defender to abandon one of its defensive duties."
  },
  {
    id: "interference",
    name: "Interference",
    description: "Interference involves blocking the line of operation between two enemy pieces, disrupting their coordination.",
    positions: [
      {
        fen: "r1b1k2r/ppp2ppp/2n2n2/1B1pq3/3P4/2N5/PPP2PPP/R2QKB1R w KQkq - 2 8",
        title: "Interfering with Defense",
        description: "White can play Bxc6+, interfering with the connection between Black's queen and the d5 pawn."
      },
      {
        fen: "r2qkb1r/pp3ppp/2p1pn2/3p4/3P1B2/2PBP3/PP3PPP/RN1QK2R b KQkq - 0 8",
        title: "Blocking Communication",
        description: "Black can play Ne4, interfering with the white bishop's defense of the f2 pawn."
      }
    ],
    explanation: "By placing a piece in the path between two enemy pieces (often between a piece and the square it's defending), you can create tactical opportunities. This is frequently used to cut off defenders from the king to enable checkmate."
  },
  {
    id: "clearance",
    name: "Clearance Sacrifice",
    description: "A clearance sacrifice removes a piece (often your own) from a square to make way for another piece or tactic.",
    positions: [
      {
        fen: "1rb1kb1r/p1qn1ppp/2p1p3/1p6/3P4/2N1PN2/PPP1BPPP/R2QK2R w KQk - 0 10",
        title: "Clearing a Square",
        description: "White can sacrifice the bishop with Bxb5, clearing the e2 square for the queen to deliver a check."
      },
      {
        fen: "r3kb1r/ppp2ppp/8/4P3/1n1P2q1/2N5/PPP2PPP/R1BQK2R w KQkq - 0 11",
        title: "Removing a Defender",
        description: "White can sacrifice the knight with Nxb4, clearing the c3 square for the queen to attack g7."
      }
    ],
    explanation: "Unlike most sacrifices that are made directly for material or positional gain, clearance sacrifices are made to vacate a square for another piece, often leading to a decisive advantage or checkmate pattern."
  },
  {
    id: "attraction",
    name: "Attraction",
    description: "Attraction forces an enemy piece (often the king) to move to an unfavorable square where it becomes vulnerable to further tactics.",
    positions: [
      {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5",
        title: "Queen Sacrifice",
        description: "White can sacrifice the queen with Qh5+, forcing g6, then placing the queen on h4 for a discovered attack."
      },
      {
        fen: "r1bqk2r/ppp2ppp/2n2n2/2bpp3/2PP4/2N1PN2/PP3PPP/R1BQK2R w KQkq - 0 6",
        title: "King Attraction",
        description: "White can play Bxf7+, forcing the king to recapture and become vulnerable to a knight fork on e5."
      }
    ],
    explanation: "By offering a sacrifice, you can lure an opponent's piece to a square where it becomes vulnerable to a follow-up tactic. This is particularly powerful when combined with other tactical themes like discovered attacks."
  },
  {
    id: "demolition",
    name: "Defensive Demolition",
    description: "Demolition involves sacrificing material to destroy a defensive structure protecting the opponent's king.",
    positions: [
      {
        fen: "r1bqkb1r/ppp3pp/2n2p2/3np3/2BP4/2N1PN2/PPP2PPP/R1BQK2R w KQkq - 0 7",
        title: "Pawn Shield Destruction",
        description: "White can sacrifice the bishop with Bxf7+, demolishing Black's king's pawn shield to start an attack."
      },
      {
        fen: "r1bqk2r/ppp1bppp/2n5/3p4/3Pn3/3B1N2/PPP1BPPP/RN1QK2R w KQkq - 4 7",
        title: "Breaking Through",
        description: "White can sacrifice the bishop with Bxe4, demolishing Black's defensive piece to expose the king."
      }
    ],
    explanation: "This advanced tactic often involves multiple sacrifices to break through a well-defended king position. After demolishing the defensive structure, a final combination can deliver checkmate or decisive material advantage."
  }
];

export default function TacticalPatternsPage() {
  const [selectedTactic, setSelectedTactic] = useState(advancedTactics[0]);
  const [positionIndex, setPositionIndex] = useState(0);
  
  // Reset position index when tactic changes
  useEffect(() => {
    setPositionIndex(0);
  }, [selectedTactic]);

  const nextPosition = () => {
    setPositionIndex((prev) => 
      prev < selectedTactic.positions.length - 1 ? prev + 1 : 0
    );
  };

  const prevPosition = () => {
    setPositionIndex((prev) => 
      prev > 0 ? prev - 1 : selectedTactic.positions.length - 1
    );
  };

  const currentPosition = selectedTactic.positions[positionIndex];

  return (
    <div className="container py-8 space-y-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/learn">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Advanced Tactical Patterns</h1>
      </div>
      
      <Card className="p-6">
        <CardContent className="p-0 space-y-4">
          <CardDescription className="text-lg">
            Building upon basic tactical motifs like pins and forks, these advanced tactical patterns 
            involve deeper calculation and often combine multiple tactical themes in sequence.
          </CardDescription>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Advanced Tactical Motifs</h2>
          <div className="flex flex-col space-y-2">
            {advancedTactics.map((tactic) => (
              <Button 
                key={tactic.id}
                variant={selectedTactic.id === tactic.id ? "default" : "outline"} 
                className="justify-start"
                onClick={() => setSelectedTactic(tactic)}
              >
                <Zap className={`mr-2 h-4 w-4 ${selectedTactic.id === tactic.id ? "text-primary-foreground" : "text-primary"}`} />
                {tactic.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <motion.div 
            key={`${selectedTactic.id}-${positionIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-3">{selectedTactic.name}</h3>
              <p className="text-lg mb-6">{selectedTactic.description}</p>
              
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${selectedTactic.id}-${positionIndex}`}
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
                    {positionIndex + 1} of {selectedTactic.positions.length}
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
              
              <div className="bg-muted p-4 rounded-lg flex">
                <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-500" />
                <p>{selectedTactic.explanation}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Pattern Recognition Training</h2>
          <p className="mb-6">
            At the intermediate level, tactical strength comes from efficiently recognizing patterns
            and calculating variations accurately. These exercises involve multiple tactical themes
            working together.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4">
              <h3 className="font-semibold">Combination Puzzles</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These puzzles require multiple tactical motifs to be applied in sequence to achieve the winning position.
              </p>
              <Button variant="outline" size="sm">Practice Combinations</Button>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold">Calculation Challenges</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Test your ability to calculate deep variations with these challenging positions.
              </p>
              <Button variant="outline" size="sm">Start Challenge</Button>
            </Card>
          </div>
          
          <Button>
            View All Tactical Exercises
          </Button>
        </Card>
      </div>
    </div>
  )
}
