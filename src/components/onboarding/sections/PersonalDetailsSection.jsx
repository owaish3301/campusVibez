"use client"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { motion } from "framer-motion"

function PersonalDetailsSection({ form }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>

      {/* Bio */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  {...field}
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Height */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Height (in cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 170"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Pets */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <FormField
          control={form.control}
          name="pets"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Do you have pets?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="yes" className="text-violet-500" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="no" className="text-violet-500" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Favorites */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <FormField
          control={form.control}
          name="favorites.songs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Favorite Songs/Singers</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Shape of You, Blinding Lights"
                  {...field}
                  className="border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <FormField
          control={form.control}
          name="favorites.movies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Favorite Movies/Series</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Inception, Harry Potter"
                  {...field}
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

export default PersonalDetailsSection

