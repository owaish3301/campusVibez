"use client"

import { Loader2 } from "lucide-react"

const LoadingState = ({ message = "Loading...", fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-violet-500 animate-spin" />
          <p className="mt-4 text-gray-600">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingState

