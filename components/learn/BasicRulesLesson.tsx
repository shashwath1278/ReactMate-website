"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

type ChessPiece = {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
};

const BOARD_SIZE = 8;

export default function BasicRulesLesson() {
  const [activeTab, setActiveTab] = useState("setup");
  const [highlightedSquares, setHighlightedSquares] = useState<number[][]>([]);
  const [animationActive, setAnimationActive] = useState(false);

  const boardStates = {
    setup: Array(BOARD_SIZE).fill(0).map((_, row) => {
      return Array(BOARD_SIZE).fill(0).map((_, col) => {
        if (row === 0) {
          if (col === 0 || col === 7) return { type: "rook", color: "black" };
          if (col === 1 || col === 6) return { type: "knight", color: "black" };
          if (col === 2 || col === 5) return { type: "bishop", color: "black" };
          if (col === 3) return { type: "queen", color: "black" };
          if (col === 4) return { type: "king", color: "black" };
        } 
        else if (row === 1) {
          return { type: "pawn", color: "black" };
        }
        else if (row === 6) {
          return { type: "pawn", color: "white" };
        }
        else if (row === 7) {
          if (col === 0 || col === 7) return { type: "rook", color: "white" };
          if (col === 1 || col === 6) return { type: "knight", color: "white" };
          if (col === 2 || col === 5) return { type: "bishop", color: "white" };
          if (col === 3) return { type: "queen", color: "white" };
          if (col === 4) return { type: "king", color: "white" };
        }
        return null;
      });
    }),
    
    checkmate: Array(BOARD_SIZE).fill(0).map((_, row) => {
      return Array(BOARD_SIZE).fill(0).map((_, col) => {
        if (row === 0 && col === 7) return { type: "king", color: "black" };
        if (row === 1 && col === 5) return { type: "pawn", color: "black" };
        if (row === 1 && col === 6) return { type: "pawn", color: "black" };
        if (row === 1 && col === 7) return { type: "pawn", color: "black" };
        if (row === 0 && col === 0) return { type: "rook", color: "white" };
        if (row === 7 && col === 4) return { type: "king", color: "white" };
        return null;
      });
    }),
    
    movement: Array(BOARD_SIZE).fill(0).map((_, row) => {
      return Array(BOARD_SIZE).fill(0).map((_, col) => {
        if (row === 3 && col === 3) return { type: "queen", color: "white" };
        if (row === 2 && col === 5) return { type: "knight", color: "white" };
        if (row === 7 && col === 0) return { type: "king", color: "black" };
        if (row === 5 && col === 3) return { type: "pawn", color: "black" };
        return null;
      });
    })
  };

  useEffect(() => {
    updateHighlightsForTab(activeTab);
  }, [activeTab]);

  const updateHighlightsForTab = (tab: string) => {
    if (tab === "movement") {
      setHighlightedSquares([]);
    } 
    else if (tab === "checkmate") {
      const mateHighlights: number[][] = [];
      for (let c = 1; c < 8; c++) {
        mateHighlights.push([0, c]);
      }
      setHighlightedSquares(mateHighlights);
    } 
    else {
      setHighlightedSquares([]);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setAnimationActive(true);
    setHighlightedSquares([]);
    setTimeout(() => {
      updateHighlightsForTab(tab);
      setTimeout(() => setAnimationActive(false), 300);
    }, 100);
  };

  const isHighlightedSquare = (row: number, col: number) => {
    return highlightedSquares.some(([r, c]) => r === row && c === col);
  };

  const getSquareColor = (row: number, col: number) => {
    return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-blue-600";
  };

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

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/learn">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Basic Rules of Chess</h1>
      </div>

      <Card className="p-6 mb-8">
        <Tabs 
          defaultValue="setup" 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="setup">Board Setup</TabsTrigger>
            <TabsTrigger value="movement">Movement</TabsTrigger>
            <TabsTrigger value="checkmate">Checkmate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-4">
            <h2 className="text-2xl font-semibold">Initial Board Setup</h2>
            
            <p className="mb-4">
              This is how the chess pieces are arranged at the start of a game. White pieces are at the bottom rows (1-2), and black pieces are at the top rows (7-8).
            </p>
            
            <div className="w-full aspect-square max-w-lg mx-auto mb-8 border-2 border-gray-800">
              {Array(BOARD_SIZE).fill(0).map((_, row) => (
                <div key={row} className="flex w-full" style={{ height: `${100 / BOARD_SIZE}%` }}>
                  {Array(BOARD_SIZE).fill(0).map((_, col) => {
                    const piece = boardStates.setup[row][col];
                    
                    return (
                      <div 
                        key={col} 
                        className={`${getSquareColor(row, col)} flex items-center justify-center relative`}
                        style={{ width: `${100 / BOARD_SIZE}%` }}
                      >
                        {piece && (
                          <motion.div
                            initial={animationActive ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-3/4 h-3/4 flex items-center justify-center relative"
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
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Key Points:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>The board is set up with the white square in the bottom-right corner</li>
                <li>Queens are placed on their matching color square (white queen on white, black queen on black)</li>
                <li>The king is placed on the remaining center square</li>
                <li>Rooks go in the corners, knights next to them, followed by bishops</li>
                <li>Pawns occupy the entire second row for each side</li>
                <li>White always moves first</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="movement" className="space-y-4">
            <h2 className="text-2xl font-semibold">Piece Movement</h2>
            
            <p className="mb-4">
              Each chess piece moves in a unique way. Here are examples of common piece positions during a game.
            </p>
            
            <div className="w-full aspect-square max-w-lg mx-auto mb-8 border-2 border-gray-800">
              {Array(BOARD_SIZE).fill(0).map((_, row) => (
                <div key={row} className="flex w-full" style={{ height: `${100 / BOARD_SIZE}%` }}>
                  {Array(BOARD_SIZE).fill(0).map((_, col) => {
                    const piece = boardStates.movement[row][col];
                    
                    return (
                      <div 
                        key={col} 
                        className={`${getSquareColor(row, col)} flex items-center justify-center relative`}
                        style={{ width: `${100 / BOARD_SIZE}%` }}
                      >
                        {piece && (
                          <motion.div
                            initial={animationActive ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-3/4 h-3/4 flex items-center justify-center relative z-20"
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
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Basic Movement Rules:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Pawn:</strong> Moves forward one square (or two from starting position). Captures diagonally.</li>
                <li><strong>Rook:</strong> Moves horizontally or vertically any number of squares.</li>
                <li><strong>Knight:</strong> Moves in an L-shape: two squares horizontally or vertically and then one square at a right angle.</li>
                <li><strong>Bishop:</strong> Moves diagonally any number of squares.</li>
                <li><strong>Queen:</strong> Combines the power of rook and bishop, moving horizontally, vertically, or diagonally.</li>
                <li><strong>King:</strong> Moves one square in any direction.</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="checkmate" className="space-y-4">
            <h2 className="text-2xl font-semibold">Checkmate</h2>
            
            <p className="mb-4">
              This position shows a classic back-rank mate. The white rook on a8 delivers checkmate along the 8th rank, 
              attacking the black king. The black pawns prevent the king from escaping.
            </p>
            
            <div className="w-full aspect-square max-w-lg mx-auto mb-8 border-2 border-gray-800">
              {Array(BOARD_SIZE).fill(0).map((_, row) => (
                <div key={row} className="flex w-full" style={{ height: `${100 / BOARD_SIZE}%` }}>
                  {Array(BOARD_SIZE).fill(0).map((_, col) => {
                    const piece = boardStates.checkmate[row][col];
                    
                    return (
                      <div 
                        key={col} 
                        className={`${getSquareColor(row, col)} flex items-center justify-center relative`}
                        style={{ width: `${100 / BOARD_SIZE}%` }}
                      >
                        {isHighlightedSquare(row, col) && (
                          <div className="absolute w-full h-full bg-red-500 opacity-20 z-0" />
                        )}
                        
                        {piece && (
                          <motion.div
                            initial={animationActive ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`w-3/4 h-3/4 flex items-center justify-center relative z-10 
                              ${piece.type === "king" && piece.color === "black" ? "animate-pulse" : ""}`}
                          >
                            {piece.type === "king" && piece.color === "black" && (
                              <div className="absolute w-full h-full rounded-full bg-red-500 opacity-30" />
                            )}
                            <img 
                              src={pieceImagePath(piece)} 
                              alt={`${piece.color} ${piece.type}`} 
                              className="w-full h-full drop-shadow-md" 
                              style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
                            />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Understanding this Back-Rank Mate:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>The white rook on a8 attacks horizontally along the entire 8th rank</li>
                <li>The black king is in check from the rook</li>
                <li>The king can't move to the 7th rank because of its own pawns</li>
                <li>No piece can block the check or capture the rook</li>
                <li>This is checkmate - the king has no legal moves to escape the check</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
