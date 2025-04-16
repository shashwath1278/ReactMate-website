"use client"

import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard as ReactChessboard } from 'react-chessboard'

interface ChessboardProps {
  position?: string  // FEN string
  boardSize?: number
  showNotation?: boolean
  darkSquareColor?: string
  lightSquareColor?: string
  isDraggable?: boolean
  onPieceDrop?: (source: string, target: string) => boolean
}

export default function Chessboard({
  position = 'start',
  boardSize = 400,
  showNotation = true,
  darkSquareColor = '#779952',
  lightSquareColor = '#edeed1',
  isDraggable = false,
  onPieceDrop
}: ChessboardProps) {
  const [game, setGame] = useState<Chess>(new Chess())
  
  useEffect(() => {
    try {
      const chess = new Chess()
      // If position is 'start', leave it at initial position
      if (position !== 'start') {
        chess.load(position)
      }
      setGame(chess)
    } catch (error) {
      console.error("Invalid FEN or position:", error)
      setGame(new Chess()) // Default to starting position if invalid
    }
  }, [position])

  const handlePieceDrop = (source: string, target: string) => {
    if (onPieceDrop) {
      return onPieceDrop(source, target)
    }
    
    if (!isDraggable) return false
    
    try {
      const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to queen for simplicity
      })
      
      if (move === null) return false
      
      setGame(new Chess(game.fen()))
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: boardSize, margin: '0 auto' }}>
      <ReactChessboard 
        position={game.fen()}
        boardWidth={boardSize}
        areArrowsAllowed={true}
        showBoardNotation={showNotation}
        customDarkSquareStyle={{ backgroundColor: darkSquareColor }}
        customLightSquareStyle={{ backgroundColor: lightSquareColor }}
        isDraggablePiece={() => isDraggable}
        onPieceDrop={handlePieceDrop}
      />
    </div>
  )
}
