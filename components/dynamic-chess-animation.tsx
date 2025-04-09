"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Chess piece SVG paths
const piecePaths = {
  pawn: "M22 9c0 1.1-.9 2-2 2h-2.7c-.2 1.1-.7 2.3-1.5 3.5-1.1 1.6-2.8 2.5-4.8 2.5s-3.7-.9-4.8-2.5c-.8-1.2-1.3-2.4-1.5-3.5H2c-1.1 0-2-.9-2-2s.9-2 2-2h2.2c.4-1.1 1.2-2.1 2.3-3 1.1-.9 2.3-1.4 3.5-1.4v-.6c0-1.1.9-2 2-2s2 .9 2 2V3c1.2 0 2.4.5 3.5 1.4 1.1.9 1.9 1.9 2.3 3H22c1.1 0 2 .9 2 2zm-4.5 0c-.4-1-1-1.9-1.9-2.6-.9-.7-1.9-1.1-3-1.1-.5 0-1 .1-1.4.3-.6.2-1.2.5-1.7 1-.5.4-.9 1-1.1 1.5-.3.5-.4 1.1-.4 1.9 0 .7.1 1.2.4 1.7.3.5.6 1 1.1 1.5.5.5 1 .9 1.7 1.2.6.3 1.3.5 2 .5.6 0 1.3-.2 2-.5.6-.3 1.2-.7 1.7-1.2.5-.5.8-1 1.1-1.5.3-.5.4-1 .4-1.7 0-.8-.1-1.4-.4-1.9-.2-.5-.3-.8-.5-1.1z",
  knight:
    "M8 1c-.55 0-1 .45-1 1s.45 1 1 1h1v1.08c-1.22.42-2.42.97-3.5 1.92-1.1.95-2 2.25-2 4v2c0 1.1.9 2 2 2h2v3H6c-1.1 0-2 .9-2 2v2h16v-2c0-1.1-.9-2-2-2h-1.5v-3h2c1.1 0 2-.9 2-2v-2c0-1.75-.9-3.05-2-4-.5-.45-1.06-.78-1.64-1.06L16 3h1c.55 0 1-.45 1-1s-.45-1-1-1H8zm2 2h2.5l.9 3.28c.1.34.38.61.73.71.35.1.73.01 1-.23.52-.44 1.07-.82 1.62-1.08.55-.26 1.1-.42 1.75-.42.5 0 1 .1 1.5.5.5.4 1 1.1 1 2.5v1.5h-2.5c-.55 0-1 .45-1 1s.45 1 1 1H18v3h-1.5c-1.1 0-2 .9-2 2v1H9.5v-1c0-1.1-.9-2-2-2H6v-3h2.5c.55 0 1-.45 1-1s-.45-1-1-1H6V8.25c0-.87.45-1.55 1.25-2.25.8-.7 1.98-1.22 3.25-1.55.55-.15.93-.66.93-1.23V3H10z",
  bishop:
    "M10 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 18c-.55 0-1 .45-1 1h12c0-.55-.45-1-1-1h-1v-2h-2v-2h-2v-2h-2v-2h-2V8c0-1.1.9-2 2-2h2V4h-2c-2.21 0-4 1.79-4 4v4H8v2H6v2H4v2H2v2H1c-.55 0-1 .45-1 1h10zm10-17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 2h-1v2h-2c-2.21 0-4 1.79-4 4v4h-2v2H9v2H7v2H5v2H4c-.55 0-1 .45-1 1h12c0-.55-.45-1-1-1h-1v-2h-2v-2h-2v-2h-2V8c0-1.1.9-2 2-2h2V4h2V3h-2z",
  rook: "M5 21c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1H5v1zm14-10v-2h-2V7h-2V5h-2V3H7v2H5v2H3v2H1v2h2v8h14v-8h2zm-2 0H7v-2h10v2zm-2-4V5h-2V3H9v2H7v2h8z",
  queen: "M12 2L9.2 7 3 7.2 7.2 11 6 17l6-3 6 3-1.2-6 4.2-3.8-6.2-.2z",
  king: "M12 2c-.55 0-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1h-2V3c0-.55-.45-1-1-1zm-7 6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5h1c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-1c0 1.66-1.34 3-3 3h-6c-1.66 0-3-1.34-3-3H5zm2 5h10v5c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-5z",
}

// Chess piece component with animation
const ChessPiece = ({
  type,
  color,
  x,
  y,
  scale = 1,
  rotate = 0,
  moveToX = null,
  moveToY = null,
  onMoveComplete = null,
}) => {
  const initialState = { opacity: 0, scale: 0 }
  const animateState = {
    opacity: 1,
    scale: scale,
    rotate: rotate,
    x: moveToX !== null ? moveToX : 0,
    y: moveToY !== null ? moveToY : 0,
  }

  return (
    <motion.svg
      width={40 * scale}
      height={40 * scale}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", left: x, top: y }}
      initial={initialState}
      animate={animateState}
      transition={{
        duration: moveToX !== null ? 0.5 : 0.8,
        delay: moveToX !== null ? 0 : Math.random() * 0.5,
        type: "tween",
        ease: "easeOut",
      }}
      onAnimationComplete={onMoveComplete}
    >
      <path d={piecePaths[type]} fill={color} stroke="#000" strokeWidth="1" strokeLinejoin="round" />
    </motion.svg>
  )
}

// Chess board square
const Square = ({ x, y, color, size }) => {
  return (
    <motion.div
      className={`absolute ${color === "light" ? "bg-amber-100" : "bg-amber-800"}`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: (x + y) * 0.01,
      }}
    />
  )
}

// Particle effect
const Particle = ({ initialX, initialY, finalX, finalY, size, delay, duration }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-primary"
      style={{ width: size, height: size }}
      initial={{ x: initialX, y: initialY, opacity: 1 }}
      animate={{
        x: finalX,
        y: finalY,
        opacity: 0,
      }}
      transition={{
        duration: duration,
        delay: delay,
        type: "tween",
        ease: "easeOut",
      }}
    />
  )
}

// Move highlight
const MoveHighlight = ({ x, y, size }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{
        left: x + size / 4,
        top: y + size / 4,
        width: size / 2,
        height: size / 2,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}

export default function DynamicChessAnimation() {
  const [particles, setParticles] = useState([])
  const [showBoard, setShowBoard] = useState(false)
  const [showPieces, setShowPieces] = useState(false)
  const [activePiece, setActivePiece] = useState(null)
  const [moveHighlights, setMoveHighlights] = useState([])
  const [moveSequence, setMoveSequence] = useState([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const animationRef = useRef(null)

  // Board dimensions
  const boardSize = 320
  const squareSize = boardSize / 8

  // Generate particles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 15) {
        const newParticle = {
          id: Math.random(),
          initialX: Math.random() * boardSize,
          initialY: Math.random() * boardSize,
          finalX: Math.random() * boardSize,
          finalY: Math.random() * boardSize,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 0.2,
          duration: Math.random() * 0.8 + 0.4,
        }
        setParticles((prev) => [...prev, newParticle])
      }
    }, 200)

    return () => clearInterval(interval)
  }, [particles, boardSize])

  // Remove particles after they animate
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (particles.length > 0) {
        setParticles((prev) => prev.slice(1))
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [particles])

  // Show board and pieces after initial delay
  useEffect(() => {
    const boardTimer = setTimeout(() => {
      setShowBoard(true)
    }, 500)

    const piecesTimer = setTimeout(() => {
      setShowPieces(true)
    }, 1500)

    return () => {
      clearTimeout(boardTimer)
      clearTimeout(piecesTimer)
    }
  }, [])

  // Define move sequence for animation
  useEffect(() => {
    if (showPieces) {
      // Define a sequence of moves to demonstrate gameplay
      const moves = [
        {
          from: { piece: "pawn", index: 12, x: squareSize * 3, y: squareSize },
          to: { x: squareSize * 3, y: squareSize * 3 },
        },
        {
          from: { piece: "pawn", index: 28, x: squareSize * 3, y: squareSize * 6 },
          to: { x: squareSize * 3, y: squareSize * 4 },
        },
        { from: { piece: "knight", index: 2, x: squareSize, y: 0 }, to: { x: squareSize * 2, y: squareSize * 2 } },
        {
          from: { piece: "pawn", index: 29, x: squareSize * 4, y: squareSize * 6 },
          to: { x: squareSize * 4, y: squareSize * 4 },
        },
        { from: { piece: "bishop", index: 3, x: squareSize * 2, y: 0 }, to: { x: squareSize * 5, y: squareSize * 3 } },
      ]

      setMoveSequence(moves)
    }
  }, [showPieces, squareSize])

  // Execute move sequence
  useEffect(() => {
    if (moveSequence.length > 0 && currentMoveIndex < moveSequence.length) {
      const timer = setTimeout(() => {
        const move = moveSequence[currentMoveIndex]
        setActivePiece({
          ...move.from,
          targetX: move.to.x,
          targetY: move.to.y,
        })

        // Show move highlights
        setMoveHighlights([
          {
            id: Math.random(),
            x: move.to.x,
            y: move.to.y,
          },
        ])

        // Generate particles at the target position
        for (let i = 0; i < 5; i++) {
          setParticles((prev) => [
            ...prev,
            {
              id: Math.random(),
              x: move.to.x + squareSize / 2,
              y: move.to.y + squareSize / 2,
            },
          ])
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [moveSequence, currentMoveIndex, squareSize])

  // Handle move completion
  const handleMoveComplete = () => {
    // Clear highlights after move
    setTimeout(() => {
      setMoveHighlights([])
      setActivePiece(null)

      // Move to next move in sequence
      setCurrentMoveIndex((prev) => {
        if (prev < moveSequence.length - 1) {
          return prev + 1
        } else {
          // Reset to beginning after a delay
          setTimeout(() => {
            setCurrentMoveIndex(0)
          }, 3000)
          return prev
        }
      })
    }, 500)
  }

  // Create chess board squares
  const squares = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0
      squares.push({
        id: `${row}-${col}`,
        x: col * squareSize,
        y: row * squareSize,
        color: isLight ? "light" : "dark",
      })
    }
  }

  // Chess pieces setup
  const pieces = [
    { id: 1, type: "rook", color: "#1e293b", x: 0, y: 0, scale: 1 },
    { id: 2, type: "knight", color: "#1e293b", x: squareSize, y: 0, scale: 1 },
    { id: 3, type: "bishop", color: "#1e293b", x: squareSize * 2, y: 0, scale: 1 },
    { id: 4, type: "queen", color: "#1e293b", x: squareSize * 3, y: 0, scale: 1 },
    { id: 5, type: "king", color: "#1e293b", x: squareSize * 4, y: 0, scale: 1 },
    { id: 6, type: "bishop", color: "#1e293b", x: squareSize * 5, y: 0, scale: 1 },
    { id: 7, type: "knight", color: "#1e293b", x: squareSize * 6, y: 0, scale: 1 },
    { id: 8, type: "rook", color: "#1e293b", x: squareSize * 7, y: 0, scale: 1 },

    { id: 9, type: "pawn", color: "#1e293b", x: 0, y: squareSize, scale: 0.9 },
    { id: 10, type: "pawn", color: "#1e293b", x: squareSize, y: squareSize, scale: 0.9 },
    { id: 11, type: "pawn", color: "#1e293b", x: squareSize * 2, y: squareSize, scale: 0.9 },
    { id: 12, type: "pawn", color: "#1e293b", x: squareSize * 3, y: squareSize, scale: 0.9 },
    { id: 13, type: "pawn", color: "#1e293b", x: squareSize * 4, y: squareSize, scale: 0.9 },
    { id: 14, type: "pawn", color: "#1e293b", x: squareSize * 5, y: squareSize, scale: 0.9 },
    { id: 15, type: "pawn", color: "#1e293b", x: squareSize * 6, y: squareSize, scale: 0.9 },
    { id: 16, type: "pawn", color: "#1e293b", x: squareSize * 7, y: squareSize, scale: 0.9 },

    { id: 17, type: "rook", color: "#f8fafc", x: 0, y: squareSize * 7, scale: 1 },
    { id: 18, type: "knight", color: "#f8fafc", x: squareSize, y: squareSize * 7, scale: 1 },
    { id: 19, type: "bishop", color: "#f8fafc", x: squareSize * 2, y: squareSize * 7, scale: 1 },
    { id: 20, type: "queen", color: "#f8fafc", x: squareSize * 3, y: squareSize * 7, scale: 1 },
    { id: 21, type: "king", color: "#f8fafc", x: squareSize * 4, y: squareSize * 7, scale: 1 },
    { id: 22, type: "bishop", color: "#f8fafc", x: squareSize * 5, y: squareSize * 7, scale: 1 },
    { id: 23, type: "knight", color: "#f8fafc", x: squareSize * 6, y: squareSize * 7, scale: 1 },
    { id: 24, type: "rook", color: "#f8fafc", x: squareSize * 7, y: squareSize * 7, scale: 1 },

    { id: 25, type: "pawn", color: "#f8fafc", x: 0, y: squareSize * 6, scale: 0.9 },
    { id: 26, type: "pawn", color: "#f8fafc", x: squareSize, y: squareSize * 6, scale: 0.9 },
    { id: 27, type: "pawn", color: "#f8fafc", x: squareSize * 2, y: squareSize * 6, scale: 0.9 },
    { id: 28, type: "pawn", color: "#f8fafc", x: squareSize * 3, y: squareSize * 6, scale: 0.9 },
    { id: 29, type: "pawn", color: "#f8fafc", x: squareSize * 4, y: squareSize * 6, scale: 0.9 },
    { id: 30, type: "pawn", color: "#f8fafc", x: squareSize * 5, y: squareSize * 6, scale: 0.9 },
    { id: 31, type: "pawn", color: "#f8fafc", x: squareSize * 6, y: squareSize * 6, scale: 0.9 },
    { id: 32, type: "pawn", color: "#f8fafc", x: squareSize * 7, y: squareSize * 6, scale: 0.9 },
  ]

  return (
    <div className="relative w-[320px] h-[320px] mx-auto">
      {/* Chess board */}
      {showBoard &&
        squares.map((square) => (
          <Square key={square.id} x={square.x} y={square.y} color={square.color} size={squareSize} />
        ))}

      {/* Move highlights */}
      <AnimatePresence>
        {moveHighlights.map((highlight) => (
          <MoveHighlight key={highlight.id} x={highlight.x} y={highlight.y} size={squareSize} />
        ))}
      </AnimatePresence>

      {/* Chess pieces */}
      {showPieces &&
        pieces.map((piece) => {
          // Check if this piece is currently being moved
          if (activePiece && activePiece.index === piece.id) {
            return (
              <ChessPiece
                key={piece.id}
                type={activePiece.piece}
                color={piece.color}
                x={activePiece.x}
                y={activePiece.y}
                scale={piece.scale}
                moveToX={activePiece.targetX - activePiece.x}
                moveToY={activePiece.targetY - activePiece.y}
                onMoveComplete={handleMoveComplete}
              />
            )
          }

          // Skip rendering pieces that are being moved
          if (
            activePiece &&
            moveSequence.some(
              (move) =>
                move.from.index === piece.id &&
                currentMoveIndex > moveSequence.findIndex((m) => m.from.index === piece.id),
            )
          ) {
            return null
          }

          return (
            <ChessPiece
              key={piece.id}
              type={piece.type}
              color={piece.color}
              x={piece.x}
              y={piece.y}
              scale={piece.scale}
            />
          )
        })}

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle 
            key={particle.id} 
            initialX={particle.initialX || particle.x}
            initialY={particle.initialY || particle.y}
            finalX={particle.finalX || particle.x + Math.random() * 20 - 10}
            finalY={particle.finalY || particle.y + Math.random() * 20 - 10}
            size={particle.size || 4}
            delay={particle.delay || 0}
            duration={particle.duration || 0.8}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

