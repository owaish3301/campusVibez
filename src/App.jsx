"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./hooks/use-toast"
import ErrorBoundary from "./components/ErrorBoundary"
import RouteGuard from "./components/RouteGuard"
import OfflineIndicator from "./components/OfflineIndicator"
import AuthPage from "./pages/AuthPage"
import OnboardingWizard from "./components/onboarding/OnboardingWizard"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <OfflineIndicator />
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage isSignUp={true} />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <RouteGuard>
                      <HomePage />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/onboarding"
                  element={
                    <RouteGuard>
                      <OnboardingWizard />
                    </RouteGuard>
                  }
                />

                {/* Error routes */}
                <Route path="/404" element={<ErrorPage statusCode={404} />} />
                <Route
                  path="/500"
                  element={
                    <ErrorPage
                      statusCode={500}
                      title="Server error"
                      message="Something went wrong on our servers. Please try again later."
                    />
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </AnimatePresence>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App

