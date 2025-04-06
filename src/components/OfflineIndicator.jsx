"use client"

import { useOffline } from "../hooks/use-offline"
import { WifiOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const OfflineIndicator = () => {
  const isOffline = useOffline()

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 bg-amber-500 text-white z-50 shadow-md"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-center">
            <WifiOff className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">You're offline. Some features may be unavailable.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfflineIndicator

