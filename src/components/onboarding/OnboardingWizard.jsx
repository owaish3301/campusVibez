"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import BasicInfoSection from "./sections/BasicInfoSection"
import PreferencesSection from "./sections/PreferencesSection"
import PersonalDetailsSection from "./sections/PersonalDetailsSection"
import { CheckCircle } from "lucide-react"

// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select your gender." }),
  interestedIn: z.enum(["male", "female", "everyone"], { required_error: "Please select who you are interested in." }),
  relationshipGoals: z.enum(["casual", "long-term", "friendship"], {
    required_error: "Please select your relationship goal.",
  }),
  interests: z.array(z.string()).nonempty({ message: "Please select at least one interest." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  height: z
    .number()
    .min(50, { message: "Height must be at least 50 cm." })
    .max(250, { message: "Height must be less than 250 cm." }),
  languages: z.array(z.string()).nonempty({ message: "Please select at least one language." }),
  pets: z.enum(["yes", "no"], { required_error: "Please specify if you have pets." }),
  favorites: z.object({
    songs: z.string().optional(),
    movies: z.string().optional(),
  }),
})

const steps = [
  { id: "basic", title: "Basic Info" },
  { id: "preferences", title: "Preferences" },
  { id: "personal", title: "Personal Details" },
]

export default function OnboardingWizard({ user, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || "",
      gender: undefined,
      interestedIn: undefined,
      height: 170,
      interests: [],
      languages: [],
      favorites: {
        songs: "",
        movies: "",
      },
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    const fieldsToValidate = {
      0: ["name", "gender", "interestedIn"],
      1: ["relationshipGoals", "interests", "languages"],
      2: ["bio", "height", "pets", "favorites.songs", "favorites.movies"],
    }

    const result = await form.trigger(fieldsToValidate[currentStep])
    if (result) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        form.handleSubmit(onSubmit)()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  async function onSubmit(values) {
    if (!user) {
      setError("User not authenticated.")
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      const userDocRef = doc(db, "users", user.uid)
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        name: values.name,
        gender: values.gender,
        interestedIn: values.interestedIn,
        createdAt: new Date(),
        needsOnboarding: false,

        profileDetails: {
          relationshipGoals: values.relationshipGoals,
          interests: values.interests,
          bio: values.bio,
          height: values.height,
          languages: values.languages,
          pets: values.pets,
          favorites: {
            songs: values.favorites?.songs || "",
            movies: values.favorites?.movies || "",
          },
        },
      })

      if (onComplete) {
        onComplete()
      }
    } catch (err) {
      console.error("Error saving user profile to Firestore:", err)
      setError("Failed to save profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoSection form={form} />
      case 1:
        return <PreferencesSection form={form} />
      case 2:
        return <PersonalDetailsSection form={form} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 mt-2">Let's get to know you better so we can find your perfect match</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? "bg-violet-500 text-white"
                        : index === currentStep
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <span
                    className={`text-sm mt-2 ${index <= currentStep ? "text-gray-800 font-medium" : "text-gray-500"}`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {error && <p className="text-sm font-medium text-red-500">{error}</p>}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0 || isSubmitting}
                  className="border-gray-300"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                >
                  {currentStep === steps.length - 1 ? (isSubmitting ? "Saving..." : "Complete Profile") : "Next Step"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}
