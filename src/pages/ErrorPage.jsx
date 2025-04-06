"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { AlertTriangle, Home, ArrowLeft } from "lucide-react"

const ErrorPage = ({
  statusCode = 404,
  title = "Page not found",
  message = "The page you're looking for doesn't exist or has been moved.",
  canReturn = true,
}) => {
  const navigate = useNavigate()

  // Log the error for analytics
  useEffect(() => {
    // In a real app, you might want to log this to an analytics service
    console.error(`Error ${statusCode}: ${title} - ${message}`)
  }, [statusCode, title, message])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">{statusCode}</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to home
            </Button>

            {canReturn && (
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage

