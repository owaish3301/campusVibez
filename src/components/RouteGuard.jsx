"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"

const RouteGuard = ({ children }) => {
  const { currentUser, userProfile, loading } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if the route requires authentication
    const publicPaths = ["/login", "/signup", "/forgot-password", "/reset-password"]
    const requiresAuth = !publicPaths.includes(location.pathname)

    // Check if the route requires onboarding
    const requiresOnboarding = location.pathname !== "/onboarding"

    if (!loading) {
      if (requiresAuth && !currentUser) {
        // Not logged in, redirect to login
        navigate("/login", { state: { from: location.pathname } })
      } else if (currentUser && userProfile?.needsOnboarding && requiresOnboarding) {
        // Needs onboarding, redirect to onboarding
        navigate("/onboarding")
      } else if (currentUser && publicPaths.includes(location.pathname)) {
        // Already logged in and trying to access public page, redirect to home
        navigate("/")
      } else {
        // Authorized
        setIsAuthorized(true)
      }
    }
  }, [currentUser, userProfile, loading, navigate, location.pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-violet-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthorized ? children : null
}

export default RouteGuard

