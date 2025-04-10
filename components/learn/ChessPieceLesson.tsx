"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type ChessPiece = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";

const BOARD_SIZE = 8;

export default function ChessPieceLesson() {
  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<number[][]>([]);
  const [activeSquare, setActiveSquare] = useState<[number, number] | null>(null);
  const [animationActive, setAnimationActive] = useState(false);

  const pieceDescriptions = {
    pawn: "The pawn moves forward one square, but captures diagonally. On its first move, it can move two squares forward. When a pawn reaches the opposite end of the board, it promotes to another piece.",
    rook: "The rook moves horizontally or vertically through any number of unoccupied squares. It's valued at about 5 pawns.",
    knight: "The knight moves in an L-shape: two squares horizontally or vertically and then one square at a right angle. It's the only piece that can jump over other pieces. Worth about 3 pawns.",
    bishop: "The bishop moves diagonally through any number of unoccupied squares. It stays on its original color square throughout the game. Valued at about 3 pawns.",
    queen: "The queen combines the power of the rook and bishop, moving horizontally, vertically, or diagonally through any number of unoccupied squares. It's the most powerful piece, worth about 9 pawns.",
    king: "The king moves one square horizontally, vertically, or diagonally. It cannot move into check. Protecting the king is the ultimate goal of chess."
  };

  const getPieceMoves = (piece: ChessPiece, row: number, col: number) => {
    const moves: number[][] = [];
    
    switch(piece) {
      case "pawn":
        if (row > 0) moves.push([row - 1, col]);
        if (row === 6) moves.push([row - 2, col]);
        break;
      
      case "rook":
        for (let i = 0; i < BOARD_SIZE; i++) {
          if (i !== row) moves.push([i, col]);
          if (i !== col) moves.push([row, i]);
        }
        break;
      
      case "knight":
        const knightMoves = [
          [row - 2, col - 1], [row - 2, col + 1],
          [row - 1, col - 2], [row - 1, col + 2],
          [row + 1, col - 2], [row + 1, col + 2],
          [row + 2, col - 1], [row + 2, col + 1],
        ];
        knightMoves.forEach(([r, c]) => {
          if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            moves.push([r, c]);
          }
        });
        break;
      
      case "bishop":
        for (let i = 1; i < BOARD_SIZE; i++) {
          if (row + i < BOARD_SIZE && col + i < BOARD_SIZE) moves.push([row + i, col + i]);
          if (row + i < BOARD_SIZE && col - i >= 0) moves.push([row + i, col - i]);
          if (row - i >= 0 && col + i < BOARD_SIZE) moves.push([row - i, col + i]);
          if (row - i >= 0 && col - i >= 0) moves.push([row - i, col - i]);
        }
        break;
      
      case "queen":
        for (let i = 0; i < BOARD_SIZE; i++) {
          if (i !== row) moves.push([i, col]);
          if (i !== col) moves.push([row, i]);
        }
        for (let i = 1; i < BOARD_SIZE; i++) {
          if (row + i < BOARD_SIZE && col + i < BOARD_SIZE) moves.push([row + i, col + i]);
          if (row + i < BOARD_SIZE && col - i >= 0) moves.push([row + i, col - i]);
          if (row - i >= 0 && col + i < BOARD_SIZE) moves.push([row - i, col + i]);
          if (row - i >= 0 && col - i >= 0) moves.push([row - i, col - i]);
        }
        break;
      
      case "king":
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && (r !== row || c !== col)) {
              moves.push([r, c]);
            }
          }
        }
        break;
    }
    
    return moves;
  };

  const handlePieceSelect = (piece: ChessPiece) => {
    setSelectedPiece(piece);
    setActiveSquare([3, 3]);
    setHighlightedSquares(getPieceMoves(piece, 3, 3));
    setAnimationActive(true);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!selectedPiece) return;
    
    setActiveSquare([row, col]);
    setHighlightedSquares(getPieceMoves(selectedPiece, row, col));
    setAnimationActive(true);
  };

  useEffect(() => {
    if (animationActive) {
      const timer = setTimeout(() => {
        setAnimationActive(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animationActive]);

  const getSquareColor = (row: number, col: number) => {
    return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-blue-600";
  };

  const isHighlightedSquare = (row: number, col: number) => {
    return highlightedSquares.some(([r, c]) => r === row && c === col);
  };

  const isActiveSquare = (row: number, col: number) => {
    return activeSquare && activeSquare[0] === row && activeSquare[1] === col;
  };

  const pieceImagePath = (piece: ChessPiece) => {
    switch (piece) {
      case "pawn": return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png";
      case "rook": return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png";
      case "knight": return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png";
      case "bishop": return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png";
      case "queen": return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png";
      case "king": return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png";
      default: return "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png";
    }
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
        <h1 className="text-3xl font-bold">Learning Chess Pieces</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedPiece ? `The ${selectedPiece.charAt(0).toUpperCase() + selectedPiece.slice(1)}` : "Select a Piece to Learn"}
        </h2>
        
        {selectedPiece && (
          <div className="mb-4">
            <p className="mb-4">
              {pieceDescriptions[selectedPiece]}
            </p>
            <p className="text-sm text-muted-foreground">
              Click on any square to see where this piece can move from that position.
            </p>
          </div>
        )}
        
        <div className="w-full aspect-square max-w-lg mx-auto mb-8 border-2 border-gray-800">
          {Array(BOARD_SIZE).fill(0).map((_, row) => (
            <div key={row} className="flex w-full" style={{ height: `${100 / BOARD_SIZE}%` }}>
              {Array(BOARD_SIZE).fill(0).map((_, col) => (
                <div 
                  key={col} 
                  className={`${getSquareColor(row, col)} flex items-center justify-center cursor-pointer relative`}
                  style={{ width: `${100 / BOARD_SIZE}%` }}
                  onClick={() => handleSquareClick(row, col)}
                >
                  {isHighlightedSquare(row, col) && (
                    <div className="absolute w-1/3 h-1/3 rounded-full bg-green-400 opacity-80 z-10" />
                  )}
                  
                  {isActiveSquare(row, col) && selectedPiece && (
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="w-3/4 h-3/4 flex items-center justify-center z-20 relative"
                    >
                      <div className="absolute w-full h-full rounded-full bg-green-700 opacity-60" />
                      <img 
                        src={pieceImagePath(selectedPiece)} 
                        alt={selectedPiece} 
                        className="w-full h-full relative z-10" 
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {(["pawn", "rook", "knight", "bishop", "queen", "king"] as ChessPiece[]).map((piece) => (
            <Button
              key={piece}
              variant={selectedPiece === piece ? "default" : "outline"}
              onClick={() => handlePieceSelect(piece)}
              className="w-20 h-20 p-2"
            >
              <div className="flex flex-col items-center justify-center">
                <img 
                  src={pieceImagePath(piece)} 
                  alt={piece} 
                  className="w-10 h-10 mb-1 drop-shadow-md" 
                  style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
                />
                <span className="text-xs capitalize">{piece}</span>
              </div>
            </Button>
          ))}
        </div>

        {selectedPiece && (
          <motion.div 
            className="mt-6 p-4 border rounded-md bg-muted/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedPiece}
          >
            <h3 className="font-medium mb-2">Tips for using the {selectedPiece}</h3>
            <ul className="list-disc pl-6 space-y-1">
              {selectedPiece === "pawn" && (
                <>
                  <li>Control the center with your pawns in the opening</li>
                  <li>Create pawn chains to protect each other</li>
                  <li>Avoid creating isolated or doubled pawns when possible</li>
                  <li>Push pawns to create passed pawns in the endgame</li>
                </>
              )}
              {selectedPiece === "knight" && (
                <>
                  <li>Knights are stronger in closed positions</li>
                  <li>A knight on the rim is dim (knights work best centralized)</li>
                  <li>Knights can jump over pieces, making them excellent in crowded positions</li>
                  <li>Look for knight forks that attack multiple pieces simultaneously</li>
                </>
              )}
              {selectedPiece === "bishop" && (
                <>
                  <li>Bishops are stronger in open positions</li>
                  <li>The bishop pair (having both bishops) is a significant advantage</li>
                  <li>Avoid blocking your bishops with your own pawns</li>
                  <li>Place bishops on long diagonals for maximum effectiveness</li>
                </>
              )}
              {selectedPiece === "rook" && (
                <>
                  <li>Rooks belong on open files (columns)</li>
                  <li>Connect your rooks to double their power</li>
                  <li>Place rooks on the 7th rank to attack enemy pawns</li>
                  <li>Activate your rooks in the middlegame and endgame</li>
                </>
              )}
              {selectedPiece === "queen" && (
                <>
                  <li>Don't bring your queen out too early in the opening</li>
                  <li>Avoid trading your queen for less valuable pieces</li>
                  <li>Use your queen in coordination with other pieces</li>
                  <li>Be careful of queen forks and pins</li>
                </>
              )}
              {selectedPiece === "king" && (
                <>
                  <li>Castle early to protect your king</li>
                  <li>Keep pawns in front of your castled king for protection</li>
                  <li>In the endgame, activate your king as an attacking piece</li>
                  <li>The king is a strong piece in the endgame - use it actively</li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
