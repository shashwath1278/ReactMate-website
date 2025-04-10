"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Play, Pause, RotateCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Use the same piece type as in other chess lesson components
type ChessPiece = {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
};

export default function SpecialMovesLesson() {
  const [activeTab, setActiveTab] = useState("castling");
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Animation play/pause toggle
  const toggleAnimation = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (animationStep >= getMaxSteps()) {
        resetAnimation();
      } else {
        setIsPlaying(true);
      }
    }
  };
  
  // Reset animation to beginning
  const resetAnimation = () => {
    setAnimationStep(0);
    setIsPlaying(false);
  };
  
  // Advance animation steps
  const getMaxSteps = () => {
    switch(activeTab) {
      case "castling": return 2; // Updated for kingside castling
      case "enpassant": return 3;
      case "promotion": return 3;
      default: return 0;
    }
  };
  
  // Function to get piece image from Chess.com
  const pieceImagePath = (piece: ChessPiece) => {
    const colorPrefix = piece.color === "white" ? "w" : "b";
    let pieceCode: string;
    
    switch (piece.type) {
      case "pawn": pieceCode = "p"; break;
      case "rook": pieceCode = "r"; break;
      case "knight": pieceCode = "n"; break;
      case "bishop": pieceCode = "b"; break;
      case "queen": pieceCode = "q"; break;
      case "king": pieceCode = "k"; break;
      default: pieceCode = "p";
    }
    
    return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${colorPrefix}${pieceCode}.png`;
  };
  
  // Get square color based on position
  const getSquareColor = (row: number, col: number) => {
    return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-blue-600";
  };
  
  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setTimeout(() => {
      if (animationStep < getMaxSteps()) {
        setAnimationStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 1000); // Animation step every second
    
    return () => clearTimeout(timer);
  }, [isPlaying, animationStep]);
  
  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetAnimation();
  };
  
  // Render chess board for different special moves
  const renderChessboard = () => {
    switch(activeTab) {
      case "castling":
        return renderCastlingAnimation();
      case "enpassant":
        return renderEnPassantAnimation();
      case "promotion":
        return renderPromotionAnimation();
      default:
        return <div>Select a special move to learn</div>;
    }
  };
  
  // Castling animation
  const renderCastlingAnimation = () => {
    // Define initial position with piece objects
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position - on the left side
    initialBoard[7][3] = { type: "king", color: "white" };    // White king at d1
    initialBoard[7][0] = { type: "rook", color: "white" };    // White rook at a1
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // King moves two squares left (kingside castling step 1)
      currentBoard[7][3] = null;
      currentBoard[7][1] = { type: "king", color: "white" };    // King moves to b1
    }
    
    if (animationStep >= 2) {
      // Rook moves to c1 (kingside castling step 2)
      currentBoard[7][0] = null;
      currentBoard[7][2] = { type: "rook", color: "white" };    // Rook moves to c1
    }
    
    return renderBoard(currentBoard);
  };
  
  // En Passant animation
  const renderEnPassantAnimation = () => {
    // Define initial position
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position
    initialBoard[3][3] = { type: "pawn", color: "white" }; // White pawn at d5
    initialBoard[1][4] = { type: "pawn", color: "black" }; // Black pawn at e7
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Black pawn moves two squares (step 1)
      currentBoard[1][4] = null;
      currentBoard[3][4] = { type: "pawn", color: "black" }; // Black pawn now at e5
    }
    
    if (animationStep >= 2) {
      // White pawn captures en passant (step 2)
      currentBoard[3][3] = null;
      currentBoard[3][4] = null;
      currentBoard[2][4] = { type: "pawn", color: "white" }; // White pawn now at e6
    }
    
    return renderBoard(currentBoard);
  };
  
  // Pawn Promotion animation
  const renderPromotionAnimation = () => {
    // Define initial position
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position
    initialBoard[1][4] = { type: "pawn", color: "white" }; // White pawn about to promote
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Pawn moves to last rank
      currentBoard[1][4] = null;
      currentBoard[0][4] = { type: "pawn", color: "white" };
    }
    
    if (animationStep >= 2) {
      // Pawn promotes to queen
      currentBoard[0][4] = { type: "queen", color: "white" };
    }
    
    return renderBoard(currentBoard);
  };
  
  // Render the chess board with proper pieces
  const renderBoard = (board: (ChessPiece | null)[][]) => {
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}-${animationStep}`}
                className={`${getSquareColor(rowIndex, colIndex)} flex items-center justify-center`}
                style={{ width: `${100 / 8}%` }}
              >
                {piece && (
                  <motion.div
                    key={`piece-${rowIndex}-${colIndex}-${animationStep}`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-3/4 h-3/4 flex items-center justify-center"
                  >
                    <img 
                      src={pieceImagePath(piece)} 
                      alt={`${piece.color} ${piece.type}`} 
                      className="w-full h-full drop-shadow-md" 
                      style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/learn">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Special Moves in Chess</h1>
      </div>
      
      <Card className="p-6 mb-8">
        <Tabs defaultValue="castling" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="castling">Castling</TabsTrigger>
            <TabsTrigger value="enpassant">En Passant</TabsTrigger>
            <TabsTrigger value="promotion">Promotion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="castling" className="space-y-4">
            <h2 className="text-2xl font-semibold">Castling</h2>
            <p>
              Castling is a special move in chess where the king moves two squares towards a rook, and the rook moves to the square the king crossed.
              It's the only time in chess where you can move two pieces in a single turn.
            </p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                <span className="text-primary">Showing: Kingside Castling (on left side of board)</span>
              </div>
            </div>
            
            <div className="my-6">
              {renderChessboard()}
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="outline" onClick={toggleAnimation}>
                  {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play Animation"}
                </Button>
                <Button variant="outline" onClick={resetAnimation} disabled={animationStep === 0}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Castling Rules:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Neither the king nor rook has moved previously</li>
                <li>There are no pieces between the king and rook</li>
                <li>The king is not in check</li>
                <li>The king does not pass through or end up on a square attacked by an enemy piece</li>
                <li><strong>Kingside (Short) Castling:</strong> King moves 2 squares toward the h-file and rook moves to f-file</li>
                <li><strong>Queenside (Long) Castling:</strong> King moves 2 squares toward the a-file and rook moves to d-file</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="enpassant" className="space-y-4">
            <h2 className="text-2xl font-semibold">En Passant</h2>
            <p>
              En passant (French for "in passing") is a special pawn capture move in chess.
              It occurs when a pawn advances two squares on its first move, and the square passed over is attacked by an opponent's pawn.
            </p>
            
            <div className="my-6">
              {renderChessboard()}
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="outline" onClick={toggleAnimation}>
                  {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play Animation"}
                </Button>
                <Button variant="outline" onClick={resetAnimation} disabled={animationStep === 0}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">En Passant Rules:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only possible immediately after a pawn makes a double-step move</li>
                <li>The capturing pawn must be on its fifth rank</li>
                <li>The capture can only be made on the very next move</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="promotion" className="space-y-4">
            <h2 className="text-2xl font-semibold">Promotion</h2>
            <p>
              Promotion is a chess rule that allows a pawn that reaches the eighth rank to be replaced by a queen, rook, bishop, or knight of the same color.
              The choice is not limited to pieces that have been captured.
            </p>
            
            <div className="my-6">
              {renderChessboard()}
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="outline" onClick={toggleAnimation}>
                  {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play Animation"}
                </Button>
                <Button variant="outline" onClick={resetAnimation} disabled={animationStep === 0}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Promotion Rules:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>The pawn must reach the opposite end of the board</li>
                <li>The player can choose any piece except another king or pawn</li>
                <li>Promotion is mandatory - the pawn cannot remain a pawn</li>
                <li>It's possible to have multiple queens (or other pieces) of the same color</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
