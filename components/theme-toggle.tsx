"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <div className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <div className="relative h-5 w-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            scale: theme === "light" ? 1 : 0.5,
            rotate: theme === "light" ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {/* White Pawn */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path
              d="M12 2c-1.5 0-2.7 1.2-2.7 2.7 0 0.4 0.1 0.8 0.3 1.1-1.5 0.8-2.6 2.4-2.6 4.2 0 2 1.3 3.8 3.1 4.5 0 0.1-0.1 0.1-0.1 0.2-0.4 0.8-1.8 1.3-3 1.9-1.5 0.7-3 1.8-3 3.4v2h16v-2c0-1.6-1.5-2.7-3-3.4-1.2-0.6-2.6-1.1-3-1.9 0-0.1-0.1-0.1-0.1-0.2 1.8-0.7 3.1-2.5 3.1-4.5 0-1.8-1.1-3.4-2.6-4.2 0.2-0.3 0.3-0.7 0.3-1.1 0-1.5-1.2-2.7-2.7-2.7z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0.5,
            rotate: theme === "dark" ? 0 : 180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {/* Black Pawn */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path
              d="M12 2c-1.5 0-2.7 1.2-2.7 2.7 0 0.4 0.1 0.8 0.3 1.1-1.5 0.8-2.6 2.4-2.6 4.2 0 2 1.3 3.8 3.1 4.5 0 0.1-0.1 0.1-0.1 0.2-0.4 0.8-1.8 1.3-3 1.9-1.5 0.7-3 1.8-3 3.4v2h16v-2c0-1.6-1.5-2.7-3-3.4-1.2-0.6-2.6-1.1-3-1.9 0-0.1-0.1-0.1-0.1-0.2 1.8-0.7 3.1-2.5 3.1-4.5 0-1.8-1.1-3.4-2.6-4.2 0.2-0.3 0.3-0.7 0.3-1.1 0-1.5-1.2-2.7-2.7-2.7z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

