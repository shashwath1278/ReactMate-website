"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { ChevronLeft, LayoutGrid, Check, ArrowRight, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Chess } from "chess.js"
import dynamic from "next/dynamic"

// Import the Chessboard component dynamically to avoid SSR issues
const Chessboard = dynamic(() => import('@/components/chess/Chessboard'), { 
  ssr: false,
  loading: () => <div className="w-full aspect-square bg-muted/30 flex items-center justify-center">Loading chessboard...</div>
})

const positionalConcepts = [
  {
    id: "pawn-structure",
    name: "Pawn Structure",
    description: "How your pawns are arranged significantly affects your position's strength and potential.",
    keyPoints: [
      "Doubled pawns are generally weaker as they cannot defend each other",
      "Isolated pawns lack pawn support and can become targets",
      "Backward pawns cannot be advanced safely and are difficult to defend",
      "Pawn chains can provide strong defense but may limit piece mobility",
      "Passed pawns have no enemy pawns preventing them from promotion"
    ],
    positions: [
      {
        fen: "8/8/8/8/3pP3/4P3/8/4K2k w - - 0 1",
        title: "Doubled Pawns",
        description: "White's doubled e-pawns are a structural weakness because they can't defend each other and control fewer squares."
      },
      {
        fen: "8/8/8/3p4/8/8/8/4K2k w - - 0 1",
        title: "Isolated Pawn",
        description: "This d-pawn is isolated with no friendly pawns on adjacent files, making it vulnerable to attack."
      },
      {
        fen: "8/8/8/2ppp3/3p4/4PP2/5P2/4K2k w - - 0 1",
        title: "Pawn Chain",
        description: "The pawns form a chain where each defends the one in front, creating a solid structure but limiting mobility."
      },
      {
        fen: "8/8/8/8/3P4/8/8/4K2k w - - 0 1",
        title: "Passed Pawn",
        description: "This pawn is 'passed' with no enemy pawns in front of it or on adjacent files to stop its advance to promotion."
      }
    ]
  },
  {
    id: "piece-placement",
    name: "Piece Placement",
    description: "Where you place your pieces determines their effectiveness and influence on the board.",
    keyPoints: [
      "Knights are strongest when centralized and weakest near the edges",
      "Bishops need open diagonals to be effective",
      "Rooks belong on open files or behind passed pawns",
      "Queens combine the power of rooks and bishops but are vulnerable to attacks",
      "Kings should be protected in the opening and middlegame but active in endgames"
    ],
    positions: [
      {
        fen: "8/8/8/4N3/8/8/8/4K2k w - - 0 1",
        title: "Centralized Knight",
        description: "A knight in the center controls 8 squares - its maximum possible influence."
      },
      {
        fen: "8/8/8/8/8/8/8/4K2N b - - 0 1",
        title: "Knight on the Edge",
        description: "A knight on the edge controls only 2 squares - significantly reducing its power."
      },
      {
        fen: "8/8/8/8/3B4/8/8/4K2k w - - 0 1",
        title: "Bishop on Open Diagonal",
        description: "With open diagonals, a bishop can exert long-range influence across the board."
      },
      {
        fen: "8/3p1p2/4p3/8/3B4/8/8/4K2k w - - 0 1",
        title: "Bad Bishop",
        description: "A bishop restricted by its own pawns is considered 'bad' as its mobility is limited."
      }
    ]
  },
  {
    id: "outposts",
    name: "Outposts",
    description: "An outpost is a square that cannot be attacked by enemy pawns and is ideally protected by your own pawns.",
    keyPoints: [
      "Knights benefit most from outposts due to their limited range",
      "An ideal outpost is deep in enemy territory, often on rank 5 or 6",
      "Outposts near the center are particularly valuable",
      "Pieces on outposts exert pressure and restrict enemy movement",
      "Creating and using outposts is a key middlegame strategy"
    ],
    positions: [
      {
        fen: "8/8/8/3Np3/8/8/8/4K2k w - - 0 1",
        title: "Knight Outpost",
        description: "White's knight is on a strong outpost on d5, protected by a pawn and can't be attacked by enemy pawns."
      },
      {
        fen: "8/p1p3p1/1p3p2/3N4/8/8/8/4K2k w - - 0 1",
        title: "Strong Central Outpost",
        description: "The knight on d5 can't be challenged by any pawn and dominates the position from its central outpost."
      },
      {
        fen: "8/8/8/3p4/2p1p3/8/PP3P2/4K2k w - - 0 1",
        title: "Creating Outposts",
        description: "White's pawn structure creates a potential knight outpost on d5, while Black has one on e4."
      }
    ]
  },
  {
    id: "space-advantage",
    name: "Space Advantage",
    description: "Having more space means your pieces have more mobility while restricting your opponent's options.",
    keyPoints: [
      "Advanced pawns claim territory and restrict enemy piece movement",
      "More space allows for easier piece coordination and tactical opportunities",
      "The side with less space must look for pawn breaks to release tension",
      "Space advantage is most valuable in the center and on the side where you're attacking",
      "Over-extension can create weaknesses that your opponent can exploit"
    ],
    positions: [
      {
        fen: "4k3/pppppppp/8/8/PPPPPPPP/8/8/4K3 w - - 0 1",
        title: "Space Advantage",
        description: "White has advanced pawns controlling more territory, restricting Black's piece mobility."
      },
      {
        fen: "4k3/pp3ppp/2p5/2Pp4/3P1P2/8/PP4PP/4K3 w - - 0 1",
        title: "Central Space Advantage",
        description: "White's central pawns control more territory in the crucial central area of the board."
      },
      {
        fen: "4k3/pp3ppp/8/2ppp3/2PPP3/8/PP3PPP/4K3 w - - 0 1",
        title: "Pawn Break Opportunity",
        description: "Black can consider the c5-c4 pawn break to challenge White's space advantage."
      }
    ]
  },
  {
    id: "weak-squares",
    name: "Weak Squares",
    description: "Squares that cannot be defended by pawns often become targets for piece occupation.",
    keyPoints: [
      "A hole in the pawn structure creates potential weak squares",
      "Dark-squared bishops can't defend dark squares, making them potential weaknesses",
      "Knights are excellent at exploiting weak squares, especially if they can't be challenged",
      "Identifying and occupying weak squares in your opponent's camp is a key skill",
      "Preventing weak squares in your own position requires careful pawn movement"
    ],
    positions: [
      {
        fen: "4k3/pp3ppp/8/2p1p3/4N3/8/PPP2PPP/4K3 w - - 0 1",
        title: "Knight on Weak Square",
        description: "White's knight occupies the d6 square that Black's pawns can't defend - a permanent weakness."
      },
      {
        fen: "4k3/pp1p1ppp/8/8/8/8/PPP1PPPP/4K3 w - - 0 1",
        title: "Holes in Pawn Structure",
        description: "The c6 and e6 squares are weak as they can't be defended by Black's pawns."
      },
      {
        fen: "4k3/pp1p1p1p/6p1/8/5N2/8/PPP1PPPP/4K3 w - - 0 1",
        title: "Weak Dark Squares",
        description: "Black's pawn structure has created weak dark squares that White's knight can exploit."
      }
    ]
  }
];

export default function PositionalPlayPage() {
  const [activeTab, setActiveTab] = useState("concepts");
  const [selectedConcept, setSelectedConcept] = useState(positionalConcepts[0]);
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
        <h1 className="text-3xl font-bold">Positional Play</h1>
      </div>
      
      <Card className="p-6">
        <CardContent className="p-0">
          <CardDescription className="text-lg">
            Positional play in chess focuses on long-term advantages rather than immediate tactical gains. 
            It involves understanding pawn structures, piece placement, and strategic planning.
          </CardDescription>
        </CardContent>
      </Card>

      <Tabs defaultValue="concepts" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
          <TabsTrigger value="concepts">
            <LayoutGrid className="mr-2 h-4 w-4" />
            <span>Key Concepts</span>
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Check className="mr-2 h-4 w-4" />
            <span>Practice</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar with concept selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select a concept:</h3>
              <div className="space-y-2">
                {positionalConcepts.map((concept) => (
                  <Button
                    key={concept.id}
                    variant={selectedConcept.id === concept.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedConcept(concept)}
                  >
                    {concept.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Main content area with chess board */}
            <div className="md:col-span-2">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedConcept.name}</h2>
                <p className="text-muted-foreground mb-6">{selectedConcept.description}</p>

                {/* Chess board animation */}
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
                          darkSquareColor="#3182ce"  // Standard green color for dark squares
                          lightSquareColor="#FFFFFF" // Standard light beige for light squares
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

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Key Points:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedConcept.keyPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4 py-8">
                <h2 className="text-2xl font-bold">Positional Assessment Practice</h2>
                <p>
                  Practicing positional assessment helps you recognize strengths and weaknesses in any position.
                  In this interactive exercise, you'll evaluate different positions and identify the key positional elements.
                </p>
                <Button className="mt-4" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Famous Positional Games</h2>
          <p className="mb-6">
            Study these classic games where positional mastery led to victory. Each game highlights different 
            positional concepts you can apply in your own play.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-4 h-full transition-all hover:shadow-md">
                <h3 className="font-semibold">Capablanca vs. Tartakower, 1924</h3>
                <p className="text-sm text-muted-foreground mb-4">A masterclass in exploiting weak squares and outposts</p>
                <Button variant="outline" size="sm">View Game</Button>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-4 h-full transition-all hover:shadow-md">
                <h3 className="font-semibold">Karpov vs. Kasparov, 1984</h3>
                <p className="text-sm text-muted-foreground mb-4">Strategic pawn play and piece coordination</p>
                <Button variant="outline" size="sm">View Game</Button>
              </Card>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  )
}
