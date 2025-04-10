"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Update to use proper ChessPiece type similar to ChessPieceLesson
type ChessPiece = {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
};

// Define position type with proper piece objects
type Position = {
  id: string;
  title: string;
  description: string;
  board: (ChessPiece | null)[][];
  solution: string;
}

export default function CheckCheckmateLesson() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  
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

  // Sample check and checkmate positions with updated piece objects
  const positions: Position[] = [
    {
      id: "simple-check",
      title: "Simple Check",
      description: "White queen gives check to the black king",
      board: Array(8).fill(0).map((_, row) => 
        Array(8).fill(0).map((_, col) => {
          if (row === 0 && col === 4) return { type: "king", color: "black" };
          if (row === 3 && col === 4) return { type: "queen", color: "white" };
          return null;
        })
      ),
      solution: "The black king must move, capture the queen, or block the check."
    },
    {
      id: "double-check",
      title: "Double Check",
      description: "Both the bishop and knight are checking the king",
      board: Array(8).fill(0).map((_, row) => 
        Array(8).fill(0).map((_, col) => {
          if (row === 0 && col === 5) return { type: "king", color: "black" }; // King moved to e8
          if (row === 2 && col === 3) return { type: "bishop", color: "white" }; // Bishop checking from c6
          if (row === 2 && col === 6) return { type: "knight", color: "white" }; // Knight checking from f6
          return null;
        })
      ),
      solution: "In double check, the king must move as it's impossible to block or capture both attacking pieces at once."
    },
    {
      id: "scholars-mate",
      title: "Scholar's Mate",
      description: "A quick checkmate in just four moves",
      board: Array(8).fill(0).map((_, row) => 
        Array(8).fill(0).map((_, col) => {
          // Black pieces in starting position
          if (row === 0) {
            if (col === 0 || col === 7) return { type: "rook", color: "black" };
            if (col === 1 || col === 6) return { type: "knight", color: "black" };
            if (col === 2 || col === 5) return { type: "bishop", color: "black" };
            if (col === 3) return { type: "queen", color: "black" };
            if (col === 4) return { type: "king", color: "black" };
          }
          
          // Black pawns in their original positions (except the moved ones)
          if (row === 1) {
            // All black pawns except those that moved
            if (col !== 4 && col !== 5 && col !== 7) return { type: "pawn", color: "black" };
          }
          
          // Moved black pawns
          if (row === 3 && col === 4) return { type: "pawn", color: "black" }; // Black e-pawn moved
          if (row === 2 && col === 7) return { type: "pawn", color: "black" }; // Black h-pawn moved
          
          // White pieces in starting positions
          if (row === 7) {
            if (col === 0 || col === 7) return { type: "rook", color: "white" };
            if (col === 1 || col === 6) return { type: "knight", color: "white" };
            if (col === 2 || col === 5) return { type: "bishop", color: "white" };
            if (col === 4) return { type: "king", color: "white" };
          }
          
          // White pieces that moved
          if (row === 1 && col === 5) return { type: "queen", color: "white" }; // Queen delivering checkmate
          if (row === 4 && col === 2) return { type: "bishop", color: "white" }; // Bishop supporting attack
          
          // White pawns (except those that moved)
          if (row === 6) {
            if (col !== 4) return { type: "pawn", color: "white" };
          }
          
          // Moved white pawn
          if (row === 4 && col === 4) return { type: "pawn", color: "white" }; // White e-pawn moved
          
          return null;
        })
      ),
      solution: "This is checkmate! The white queen delivers mate by moving to f7, attacking the black king. The bishop supports the queen's attack, and the black king has no legal way to escape."
    },
    {
      id: "back-rank-mate",
      title: "Back Rank Mate",
      description: "Rook delivers checkmate on the back rank",
      board: Array(8).fill(0).map((_, row) => 
        Array(8).fill(0).map((_, col) => {
          if (row === 0 && col === 7) return { type: "king", color: "black" };
          if (row === 1 && col === 5) return { type: "pawn", color: "black" };
          if (row === 1 && col === 6) return { type: "pawn", color: "black" };
          if (row === 1 && col === 7) return { type: "pawn", color: "black" };
          if (row === 0 && col === 0) return { type: "rook", color: "white" }; // Rook delivering mate
          return null;
        })
      ),
      solution: "This is checkmate. The black king is trapped by its own pawns, and the rook delivers check along the back rank."
    },
    // ...other positions
  ];

  // Render the chess board with proper pieces
  const renderBoard = (board: (ChessPiece | null)[][]) => {
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${getSquareColor(rowIndex, colIndex)} flex items-center justify-center`}
                style={{ width: `${100 / 8}%`, height: '100%' }}
              >
                {piece && (
                  <motion.div
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

  const handlePositionClick = (position: Position) => {
    setSelectedPosition(position);
    setShowSolution(false);
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
        <h1 className="text-3xl font-bold">Check & Checkmate</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedPosition ? selectedPosition.title : "Understanding Check and Checkmate"}
        </h2>
        
        {!selectedPosition ? (
          <div className="space-y-6">
            <p>
              A <strong>check</strong> occurs when a king is under attack by an opponent's piece. 
              The player whose king is in check must address this situation immediately by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Moving the king to a safe square</li>
              <li>Blocking the check with another piece</li>
              <li>Capturing the piece that's giving check</li>
            </ul>
            
            <p>
              <strong>Checkmate</strong> occurs when a king is in check and there is no legal move to get out of check.
              This ends the game immediately with a win for the player who delivered checkmate.
            </p>
            
            <h3 className="text-lg font-medium mt-6">Select a position to study:</h3>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {positions.map((pos) => (
                <motion.button
                  key={pos.id}
                  onClick={() => handlePositionClick(pos)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-left p-4 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <h4 className="font-medium">{pos.title}</h4>
                  <p className="text-sm text-muted-foreground">{pos.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setSelectedPosition(null)} className="self-start">
                ← Back to Positions
              </Button>
              <div>
                <h3 className="text-lg font-medium">{selectedPosition.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedPosition.description}</p>
              </div>
            </div>
            
            {renderBoard(selectedPosition.board)}
            
            <div className="space-y-4 mt-6">
              <Button 
                onClick={() => setShowSolution(!showSolution)}
                className="w-full"
              >
                {showSolution ? "Hide Solution" : "Show Solution"}
              </Button>
              
              {showSolution && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-md bg-muted/30"
                >
                  <p className="font-medium">Solution:</p>
                  <p>{selectedPosition.solution}</p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
