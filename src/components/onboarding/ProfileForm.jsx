import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button"; // Corrected path alias
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // Corrected path alias
import { Input } from "../ui/input"; // Corrected path alias
import { db } from '../../firebaseConfig';
import BasicInfoSection from './sections/BasicInfoSection';
import PreferencesSection from './sections/PreferencesSection';
import PersonalDetailsSection from './sections/PersonalDetailsSection';
import { doc, setDoc } from "firebase/firestore";

// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select your gender." }),
  interestedIn: z.enum(["male", "female", "everyone"], { required_error: "Please select who you are interested in." }),
  relationshipGoals: z.enum(["casual", "long-term", "friendship"], { required_error: "Please select your relationship goal." }),
  interests: z.array(z.string()).nonempty({ message: "Please select at least one interest." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  height: z.number().min(50, { message: "Height must be at least 50 cm." }).max(250, { message: "Height must be less than 250 cm." }),
  languages: z.array(z.string()).nonempty({ message: "Please select at least one language." }),
  pets: z.enum(["yes", "no"], { required_error: "Please specify if you have pets." }),
  favorites: z.object({
    songs: z.string().optional(),
    movies: z.string().optional(),
  }),
});

function ProfileForm({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || "", // Pre-fill name from Google if available
      gender: undefined,
      interestedIn: undefined,
      height: 170, // Default height in cm
      interests: [],
      languages: [],
      favorites: {
        songs: "",
        movies: ""
      }
    },
  });

  // Handle form submission
  async function onSubmit(values) {
    if (!user) {
      setError("User not authenticated.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    console.log("Submitting onboarding data:", values);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        // Basic user info at root level
        uid: user.uid,
        email: user.email,
        name: values.name,
        gender: values.gender,
        interestedIn: values.interestedIn,
        createdAt: new Date(),
        
        // Extended profile details in a separate object
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
          }
        }
      });
      console.log("User profile saved successfully to Firestore for UID:", user.uid);
      // No need to manually set needsOnboarding to false here.
      // The onAuthStateChanged listener in App.jsx will re-check Firestore
      // after the component potentially unmounts/remounts or state changes trigger a re-render cycle where the check runs again.
    } catch (err) {
      console.error("Error saving user profile to Firestore:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 border rounded shadow-md mt-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Complete Your Profile</h2>
      <p className="text-center mb-6">Welcome! Let's get you set up.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Sections */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <BasicInfoSection form={form} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preferences</h3>
              <PreferencesSection form={form} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Details</h3>
              <PersonalDetailsSection form={form} />
            </div>
          </div>


          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : "Save Profile & Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
