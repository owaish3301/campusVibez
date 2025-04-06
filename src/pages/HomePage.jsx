"use client"
import { getAuth, signOut } from "firebase/auth"
import { Button } from "../components/ui/button"

const HomePage = () => {
  const auth = getAuth()

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error)
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-4 right-4">
        <Button onClick={handleSignOut} variant="outline" className="text-gray-600 hover:text-gray-800">
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default HomePage

