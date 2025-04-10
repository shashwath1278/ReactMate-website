"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Play, Pause, RotateCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

type ChessPiece = {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
};

export default function BasicTacticsLesson() {
  const [activeTab, setActiveTab] = useState("pin");
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
      case "pin": return 3;
      case "fork": return 2;
      case "skewer": return 3;
      case "discovery": return 3;
      default: return 0;
    }
  };
  
  // Get piece image from Chess.com
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
    }, 1500); // Animation step every 1.5 seconds
    
    return () => clearTimeout(timer);
  }, [isPlaying, animationStep]);
  
  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetAnimation();
  };
  
  // Render chess board for different tactics
  const renderChessboard = () => {
    switch(activeTab) {
      case "pin":
        return renderPinAnimation();
      case "fork":
        return renderForkAnimation();
      case "skewer":
        return renderSkewerAnimation();
      case "discovery":
        return renderDiscoveryAnimation();
      default:
        return <div>Select a tactic to learn</div>;
    }
  };
  
  // Pin animation (absolute pin against king)
  const renderPinAnimation = () => {
    // Define initial position
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position
    initialBoard[0][7] = { type: "king", color: "black" };   // Black king
    initialBoard[0][3] = { type: "bishop", color: "black" }; // Black bishop (will be pinned)
    initialBoard[7][0] = { type: "rook", color: "white" }; // White bishop creating the pin
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    if (animationStep >= 1) {
      currentBoard[0][0] = { type: "rook", color: "white" }; 
      currentBoard[7][0] = null; 
    }
    if (animationStep >= 2) {

      currentBoard[0][0] = null;
      currentBoard[0][3] = { type: "rook", color: "white" };
    }
    
    return renderBoard(currentBoard, activeTab, animationStep);
  };
  
  // Fork animation (knight fork)
  const renderForkAnimation = () => {
    // Define initial position
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position
    initialBoard[0][4] = { type: "king", color: "black" };   // Black king
    initialBoard[0][0] = { type: "rook", color: "black" };   // Black rook
    initialBoard[3][3] = { type: "knight", color: "white" }; // White knight about to fork
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Knight moves to the forking square
      currentBoard[3][3] = null;
      currentBoard[1][2] = { type: "knight", color: "white" }; // Knight creates a fork
    }
    
    if (animationStep >= 2) {
      // Highlight pieces under attack by the fork
    }
    
    return renderBoard(currentBoard, activeTab, animationStep);
  };
  
  // Skewer animation
  const renderSkewerAnimation = () => {
    // Define initial position
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position
    initialBoard[2][4] = { type: "king", color: "black" };   // Black king
    initialBoard[0][4] = { type: "queen", color: "black" };  // Black queen
    initialBoard[4][6] = { type: "rook", color: "white" };   // White rook about to skewer
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      currentBoard[4][6] = null;
      currentBoard[7][4] = null;
      currentBoard[4][4] = { type: "rook", color: "white" };
    }
    
    if (animationStep >= 2) {
      // King must move out of check
      currentBoard[2][4] = null;
      currentBoard[2][3] = { type: "king", color: "black" };
    }
    
    if (animationStep >= 3) {
      // Rook captures the queen
      currentBoard[4][4] = null;
      currentBoard[0][4] = { type: "rook", color: "white" };
    }
    
    return renderBoard(currentBoard, activeTab, animationStep);
  };
  
  // Discovered attack animation
  const renderDiscoveryAnimation = () => {
    // Define initial position
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    
    // Set up initial board position
    initialBoard[2][0] = { type: "rook", color: "black" };   // Black rook (target)
    initialBoard[0][4] = { type: "king", color: "black" };   // Black king
    initialBoard[7][4] = { type: "rook", color: "white" }; // White bishop will be revealed
    initialBoard[4][4] = { type: "knight", color: "white" }; // White knight will move
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Knight moves away, revealing bishop's attack
      currentBoard[4][4] = null;
      currentBoard[3][2] = { type: "knight", color: "white" }; // Knight moves
    }
    
    
    if (animationStep >= 3) {
      currentBoard[3][2] = null;
      currentBoard[2][0] = { type: "knight", color: "white" };
    }
    
    return renderBoard(currentBoard, activeTab, animationStep);
  };
  
  // Render the chess board with proper pieces
  const renderBoard = (board: (ChessPiece | null)[][], tacticType: string, step: number) => {
    // Determine which squares to highlight based on the tactic and step
    const highlightedSquares: [number, number][] = [];
    
    if (tacticType === "pin" && step >= 2) {
      // Highlight the pin line
      highlightedSquares.push([0, 3],[0, 7]);
    }    
    if (tacticType === "fork" && step >= 2) {
      // Highlight forked pieces
      highlightedSquares.push([0, 0], [0, 4]);
    }
    
    if (tacticType === "skewer" && step >= 1) {
      // Highlight the skewer line
      highlightedSquares.push([0, 4], [1, 4], [2, 4], [3, 4], [4, 4]);
    }
    
    if (tacticType === "discovery" && step >= 2) {
      // Highlight the discovered attack line
      highlightedSquares.push([0, 4], [2, 0]);
    }
    
    const isHighlighted = (row: number, col: number) => {
      return highlightedSquares.some(([r, c]) => r === row && c === col);
    };
    
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}-${step}`}
                className={`${getSquareColor(rowIndex, colIndex)} flex items-center justify-center relative`}
                style={{ width: `${100 / 8}%` }}
              >
                {isHighlighted(rowIndex, colIndex) && (
                  <div className="absolute inset-0 bg-yellow-400 opacity-30 z-0" />
                )}
                
                {piece && (
                  <motion.div
                    key={`piece-${rowIndex}-${colIndex}-${step}`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-3/4 h-3/4 flex items-center justify-center relative z-10"
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
        <h1 className="text-3xl font-bold">Basic Chess Tactics</h1>
      </div>
      
      <Card className="p-6 mb-8">
        <Tabs defaultValue="pin" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="pin">Pin</TabsTrigger>
            <TabsTrigger value="fork">Fork</TabsTrigger>
            <TabsTrigger value="skewer">Skewer</TabsTrigger>
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pin" className="space-y-4">
            <h2 className="text-2xl font-semibold">Pin</h2>
            <p>
              A pin is a tactic where a piece is unable to move because moving would expose a more valuable piece behind it to attack.
              An absolute pin is when the piece behind is the king, making the pinned piece illegal to move.
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
              <h3 className="text-xl font-medium">Pin Strategy:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Look for opportunities to pin enemy pieces against their king or valuable pieces</li>
                <li>An absolute pin (against the king) means the pinned piece cannot legally move</li>
                <li>A relative pin means the piece can move, but doing so would lose material</li>
                <li>Long-range pieces like bishops, rooks, and queens are excellent at creating pins</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="fork" className="space-y-4">
            <h2 className="text-2xl font-semibold">Fork</h2>
            <p>
              A fork is a tactic where a single piece attacks two or more enemy pieces simultaneously.
              The opponent can only save one of the pieces, resulting in material gain.
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
              <h3 className="text-xl font-medium">Fork Strategy:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Knights excel at creating forks due to their unique movement pattern</li>
                <li>A royal fork targets the king and queen, forcing the king to move and losing the queen</li>
                <li>Pawns can create powerful forks by attacking two pieces diagonally</li>
                <li>Position your pieces to threaten multiple enemy targets simultaneously</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="skewer" className="space-y-4">
            <h2 className="text-2xl font-semibold">Skewer</h2>
            <p>
              A skewer is like a reversed pin. A long-range piece attacks a high-value piece that must move, 
              exposing a less valuable piece behind it to capture.
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
              <h3 className="text-xl font-medium">Skewer Strategy:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most powerful when the first piece is the king, forcing it to move</li>
                <li>Bishops, rooks and queens are the best pieces for executing skewers</li>
                <li>Look for opportunities to align your opponent's valuable pieces</li>
                <li>Skewers often lead to winning material or creating a decisive advantage</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="discovery" className="space-y-4">
            <h2 className="text-2xl font-semibold">Discovered Attack</h2>
            <p>
              A discovered attack occurs when moving one piece reveals an attack from another piece behind it.
              It's powerful because it creates two threats in a single move.
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
              <h3 className="text-xl font-medium">Discovered Attack Strategy:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most powerful when the piece being uncovered delivers check (discovered check)</li>
                <li>The moving piece can also attack something, creating a double attack</li>
                <li>Look for pieces that are aligned with your opponent's valuable pieces</li>
                <li>Setup discovered attacks by deliberately placing pieces in front of attacking pieces</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
