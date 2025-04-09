"use client"

import type React from "react"

import { Inter } from "next/font/google"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <AnimatePresence mode="wait">
              <PageTransition key={pathname}>
                <main className="flex-1">{children}</main>
              </PageTransition>
            </AnimatePresence>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

