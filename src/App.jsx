"use client"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import AuthPage from "./pages/AuthPage"
import OnboardingWizard from "./components/onboarding/OnboardingWizard"
import HomePage from "./pages/HomePage"

function AppContent() {
  const { currentUser, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    )
  }

  // Not logged in
  if (!currentUser) {
    return <AuthPage />
  }

  // Logged in but needs onboarding
  if (!userProfile || userProfile.needsOnboarding) {
    return <OnboardingWizard user={currentUser} />
  }

  // Fully authenticated and onboarded
  return <HomePage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

