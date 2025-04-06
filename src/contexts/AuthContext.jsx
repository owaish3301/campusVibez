"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useToast } from "../hooks/use-toast"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [sessionTimeout, setSessionTimeout] = useState(null)
  const { toast } = useToast()
  const auth = getAuth()

  // Set session persistence to local (survives browser restarts)
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Error setting persistence:", error)
      setAuthError("Failed to set up session persistence")
    })
  }, [auth])

  // Session timeout handling (auto logout after 2 hours of inactivity)
  useEffect(() => {
    if (currentUser) {
      const timeoutId = setTimeout(
        () => {
          signOut()
          toast({
            title: "Session expired",
            description: "You've been logged out due to inactivity",
            variant: "default",
          })
        },
        2 * 60 * 60 * 1000,
      ) // 2 hours

      setSessionTimeout(timeoutId)

      // Reset timeout on user activity
      const resetTimeout = () => {
        clearTimeout(sessionTimeout)
        setSessionTimeout(timeoutId)
      }

      window.addEventListener("click", resetTimeout)
      window.addEventListener("keypress", resetTimeout)
      window.addEventListener("scroll", resetTimeout)
      window.addEventListener("mousemove", resetTimeout)

      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener("click", resetTimeout)
        window.removeEventListener("keypress", resetTimeout)
        window.removeEventListener("scroll", resetTimeout)
        window.removeEventListener("mousemove", resetTimeout)
      }
    }
  }, [currentUser, sessionTimeout, toast])

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        try {
          // Update last login timestamp
          const userRef = doc(db, "users", user.uid)
          await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true })

          // Fetch user profile
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            setUserProfile(userDoc.data())
          } else {
            setUserProfile(null)
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
          setAuthError("Failed to fetch user profile")
          toast({
            title: "Error",
            description: "Failed to fetch your profile data",
            variant: "destructive",
          })
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [auth, toast])

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      toast({
        title: "Signed out",
        description: "You've been successfully signed out",
        variant: "default",
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Google sign in with rate limiting
  const signInWithGoogle = async () => {
    try {
      // Check for rate limiting (stored in localStorage)
      const lastAttempt = localStorage.getItem("lastAuthAttempt")
      const attemptCount = Number.parseInt(localStorage.getItem("authAttemptCount") || "0")
      const now = Date.now()

      if (lastAttempt && attemptCount >= 5 && now - Number.parseInt(lastAttempt) < 15 * 60 * 1000) {
        // Rate limited: 5 attempts within 15 minutes
        const minutesLeft = Math.ceil((Number.parseInt(lastAttempt) + 15 * 60 * 1000 - now) / (60 * 1000))
        toast({
          title: "Too many attempts",
          description: `Please try again after ${minutesLeft} minutes`,
          variant: "destructive",
        })
        return
      }

      // Update rate limiting counters
      localStorage.setItem("lastAuthAttempt", now.toString())
      localStorage.setItem(
        "authAttemptCount",
        lastAttempt && now - Number.parseInt(lastAttempt) < 60 * 60 * 1000 ? (attemptCount + 1).toString() : "1",
      )

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Reset rate limiting after successful login
      localStorage.removeItem("authAttemptCount")

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))

      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          needsOnboarding: true,
        })
      }

      toast({
        title: "Welcome!",
        description: "You've successfully signed in",
        variant: "default",
      })
    } catch (err) {
      console.error("Google sign in error:", err)
      setAuthError(err.message)
      toast({
        title: "Authentication failed",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  // Send email verification
  const sendVerificationEmail = async () => {
    if (!currentUser) return

    try {
      await sendEmailVerification(currentUser)
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and verify your email",
        variant: "default",
      })
    } catch (error) {
      console.error("Error sending verification email:", error)
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const value = {
    currentUser,
    userProfile,
    loading,
    authError,
    signOut,
    signInWithGoogle,
    sendVerificationEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

