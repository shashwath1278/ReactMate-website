"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Define the position type
type Position = {
  id: string;
  title: string;
  description: string;
  fen: string;
  solution: string;
}

export default function CheckCheckmateLesson() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  // Sample check and checkmate positions
  const positions: Position[] = [
    {
      id: "simple-check",
      title: "Simple Check",
      description: "White queen gives check to the black king",
      fen: "rnb1k1nr/pppp1ppp/8/4p3/1b1P4/2N1P3/PPP2PPP/R1BQKBNR w KQkq - 0 1",
      solution: "The black king must move, capture the queen, or block the check."
    },
    {
      id: "double-check",
      title: "Double Check",
      description: "Both the bishop and knight are checking the king",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/3P4/4P3/PPP2PPP/RNBQKBNR w KQkq - 0 1",
      solution: "In double check, the king must move as it's impossible to block or capture both attacking pieces at once."
    },
    {
      id: "scholars-mate",
      title: "Scholar's Mate",
      description: "A common beginner's checkmate",
      fen: "rnb1kbnr/pppp1ppp/8/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
      solution: "This is checkmate. The queen attacks the king, and there's no way to escape, block, or capture."
    },
    {
      id: "back-rank-mate",
      title: "Back Rank Mate",
      description: "Rook delivers checkmate on the back rank",
      fen: "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1",
      solution: "This is checkmate. The black king is trapped by its own pawns, and the rook delivers check."
    },
    {
      id: "smothered-mate",
      title: "Smothered Mate",
      description: "Knight delivers checkmate to a king surrounded by its own pieces",
      fen: "6rk/5Npp/8/8/8/8/8/7K w - - 0 1",
      solution: "This is checkmate. The black king is surrounded by its own pieces and can't escape the knight's check."
    },
    {
      id: "arabian-mate",
      title: "Arabian Mate",
      description: "Rook and knight work together for checkmate",
      fen: "5rk1/5ppp/8/8/8/6N1/8/6RK w - - 0 1",
      solution: "This is checkmate. The knight controls the escape squares while the rook delivers check."
    }
  ];

  // Convert FEN string to a board visualization (simplified)
  const renderBoard = (fen: string) => {
    // Parse FEN
    const [position] = fen.split(' ');
    const rows = position.split('/');
    
    return (
      <div className="w-full aspect-square max-w-md mx-auto border-2 border-gray-800">
        {rows.map((row, rowIndex) => {
          const squares = [];
          let colIndex = 0;
          
          for (let i = 0; i < row.length; i++) {
            const char = row.charAt(i);
            
            if (isNaN(parseInt(char))) {
              // It's a piece
              squares.push(
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${(rowIndex + colIndex) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'} flex items-center justify-center`}
                  style={{ width: `${100 / 8}%`, height: '100%' }}
                >
                  <span className="text-lg font-bold">{char}</span>
                </div>
              );
              colIndex++;
            } else {
              // It's a number, representing empty squares
              const emptySquares = parseInt(char);
              for (let j = 0; j < emptySquares; j++) {
                squares.push(
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${(rowIndex + colIndex) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'}`}
                    style={{ width: `${100 / 8}%`, height: '100%' }}
                  />
                );
                colIndex++;
              }
            }
          }
          
          return (
            <div key={rowIndex} className="flex w-full" style={{ height: `${100 / 8}%` }}>
              {squares}
            </div>
          );
        })}
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
            
            {renderBoard(selectedPosition.fen)}
            
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
