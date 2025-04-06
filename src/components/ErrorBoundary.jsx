"use client"

import { Component } from "react"
import { Button } from "./ui/button"
import { RefreshCw, AlertTriangle } from "lucide-react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })

    // You could send this to a logging service like Sentry
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-6">We're sorry, but an error occurred while rendering this page.</p>

              {process.env.NODE_ENV !== "production" && (
                <div className="bg-gray-100 p-4 rounded-md text-left w-full mb-6 overflow-auto max-h-40">
                  <p className="text-sm font-mono text-red-600">{this.state.error?.toString()}</p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-sm cursor-pointer">Stack trace</summary>
                      <p className="text-xs font-mono text-gray-700 mt-1 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </p>
                    </details>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={this.handleReset}
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
                </Button>
                <Button onClick={() => (window.location.href = "/")} variant="outline">
                  Go to home
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // If no error, render children normally
    return this.props.children
  }
}

export default ErrorBoundary

