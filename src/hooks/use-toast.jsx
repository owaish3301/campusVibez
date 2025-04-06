"use client"

import { createContext, useContext, useState } from "react"
import { X } from "lucide-react"
import { cn } from "../lib/utils"

const ToastContext = createContext({})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default", duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration }])

    // Auto dismiss
    setTimeout(() => {
      dismissToast(id)
    }, duration)

    return id
  }

  const dismissToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-0 right-0 z-50 p-4 flex flex-col gap-2 max-w-md w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "p-4 rounded-lg shadow-lg flex items-start gap-3 animate-in slide-in-from-right-full duration-300",
              toast.variant === "destructive"
                ? "bg-destructive text-white"
                : "bg-white text-gray-800 border border-gray-200",
            )}
          >
            <div className="flex-1">
              {toast.title && <h4 className="font-medium mb-1">{toast.title}</h4>}
              {toast.description && <p className="text-sm">{toast.description}</p>}
            </div>
            <button onClick={() => dismissToast(toast.id)} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

