"use client"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { MultiSelect } from "../../ui/multi-select"
import { motion } from "framer-motion"

function PreferencesSection({ form }) {
  const interestOptions = [
    { value: "anime", label: "Anime" },
    { value: "harry-potter", label: "Harry Potter" },
    { value: "travel", label: "Travel" },
    { value: "kpop", label: "K-pop" },
    { value: "gaming", label: "Gaming" },
    { value: "cooking", label: "Cooking" },
    { value: "reading", label: "Reading" },
    { value: "fitness", label: "Fitness" },
    { value: "music", label: "Music" },
    { value: "movies", label: "Movies" },
    { value: "art", label: "Art" },
    { value: "photography", label: "Photography" },
  ]

  const languageOptions = [
    { value: "oriya", label: "Oriya" },
    { value: "hindi", label: "Hindi" },
    { value: "french", label: "French" },
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "chinese", label: "Chinese" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Your Preferences</h2>

      {/* Relationship Goals */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <FormField
          control={form.control}
          name="relationshipGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">What are you looking for?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="casual" className="text-violet-500" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Casual</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="long-term" className="text-violet-500" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Long-term</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="friendship" className="text-violet-500" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Friendship</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Select your interests</FormLabel>
              <FormControl>
                <MultiSelect
                  multiple
                  options={interestOptions}
                  onChange={field.onChange}
                  value={field.value || []}
                  placeholder="Select your interests..."
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Languages Spoken</FormLabel>
              <FormControl>
                <MultiSelect
                  multiple
                  options={languageOptions}
                  onChange={field.onChange}
                  value={field.value || []}
                  placeholder="Select languages..."
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default PreferencesSection

