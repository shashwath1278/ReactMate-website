"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Play, Pause, RotateCw } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SpecialMovesLesson() {
  const [activeTab, setActiveTab] = useState("castling");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Reset animation when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsPlaying(false);
    setAnimationStep(0);
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && animationStep >= getMaxSteps()) {
      setAnimationStep(0);
    }
  };

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsPlaying(false);
  };

  // Advance animation steps
  const getMaxSteps = () => {
    switch(activeTab) {
      case "castling": return 4;
      case "enpassant": return 3;
      case "promotion": return 3;
      default: return 0;
    }
  };

  // Animation loop
  const handleAnimationFrame = () => {
    if (isPlaying) {
      if (animationStep < getMaxSteps()) {
        setAnimationStep(animationStep + 1);
      } else {
        setIsPlaying(false);
      }
    }
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
    // Define initial positions
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    initialBoard[7][4] = "K"; // King
    initialBoard[7][7] = "R"; // Rook for kingside castling
    initialBoard[7][0] = "R"; // Rook for queenside castling
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Kingside castling
      currentBoard[7][4] = null;
      currentBoard[7][6] = "K";
      currentBoard[7][7] = null;
      currentBoard[7][5] = "R";
    }
    
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800 mb-4">
        {currentBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
            {row.map((piece, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`${(rowIndex + colIndex) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'} flex items-center justify-center`}
                style={{ width: `${100 / 8}%` }}
              >
                {piece && (
                  <motion.div 
                    key={`piece-${rowIndex}-${colIndex}-${animationStep}`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-3/4 h-3/4 flex items-center justify-center font-bold text-xl"
                  >
                    {piece}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // En Passant animation
  const renderEnPassantAnimation = () => {
    // Define initial positions
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    initialBoard[4][3] = "P"; // White pawn
    initialBoard[4][4] = "p"; // Black pawn
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Black pawn moves two squares forward
      currentBoard[4][4] = null;
      currentBoard[6][4] = "p";
    }
    
    if (animationStep >= 2) {
      // White pawn captures en passant
      currentBoard[4][3] = null;
      currentBoard[5][4] = "P";
      currentBoard[6][4] = null;
    }
    
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800 mb-4">
        {currentBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
            {row.map((piece, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`${(rowIndex + colIndex) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'} flex items-center justify-center`}
                style={{ width: `${100 / 8}%` }}
              >
                {piece && (
                  <motion.div 
                    key={`piece-${rowIndex}-${colIndex}-${animationStep}`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-3/4 h-3/4 flex items-center justify-center font-bold text-xl"
                  >
                    {piece}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Pawn Promotion animation
  const renderPromotionAnimation = () => {
    // Define initial positions
    const initialBoard = Array(8).fill(0).map(() => Array(8).fill(null));
    initialBoard[1][4] = "P"; // White pawn about to be promoted
    
    // Apply animation steps
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    
    if (animationStep >= 1) {
      // Pawn moves to last rank
      currentBoard[1][4] = null;
      currentBoard[0][4] = "P";
    }
    
    if (animationStep >= 2) {
      // Pawn promotes to queen
      currentBoard[0][4] = "Q";
    }
    
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800 mb-4">
        {currentBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
            {row.map((piece, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`${(rowIndex + colIndex) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'} flex items-center justify-center`}
                style={{ width: `${100 / 8}%` }}
              >
                {piece && (
                  <motion.div 
                    key={`piece-${rowIndex}-${colIndex}-${animationStep}`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-3/4 h-3/4 flex items-center justify-center font-bold text-xl"
                  >
                    {piece}
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
            <h2 className="text-2xl font-semibold">Pawn Promotion</h2>
            
            <p>
              When a pawn reaches the eighth rank (the opposite end of the board), it is promoted to another piece of the player's choice:
              queen, rook, bishop, or knight of the same color. Most commonly, players choose to promote to a queen as it's the most powerful piece.
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
