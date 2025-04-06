"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getAuth, signOut } from "firebase/auth"
import { Home, User, MessageCircle, LogOut, Send, Tag } from "lucide-react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import ProfilePage from "./ProfilePage"
import ChatPage from "./ChatPage"

// Dummy data for question cards
const dummyQuestions = [
  {
    id: "q1",
    authorId: "user1",
    text: "If you could travel anywhere in the world right now, where would you go and why?",
    tags: ["Travel", "Dreams"],
    createdAt: new Date("2025-04-05T10:30:00"),
    authorGender: "female",
  },
  {
    id: "q2",
    authorId: "user2",
    text: "What's a book or movie that changed your perspective on life?",
    tags: ["Deep", "Movies", "Books"],
    createdAt: new Date("2025-04-05T09:15:00"),
    authorGender: "male",
  },
  {
    id: "q3",
    authorId: "user3",
    text: "If you could have dinner with any historical figure, who would it be and what would you ask them?",
    tags: ["Hypothetical", "History"],
    createdAt: new Date("2025-04-04T22:45:00"),
    authorGender: "female",
  },
  {
    id: "q4",
    authorId: "user4",
    text: "What's your favorite way to spend a rainy day?",
    tags: ["Casual", "Lifestyle"],
    createdAt: new Date("2025-04-04T18:20:00"),
    authorGender: "male",
  },
  {
    id: "q5",
    authorId: "user5",
    text: "What's something you're passionate about that most people don't know?",
    tags: ["Personal", "Passions"],
    createdAt: new Date("2025-04-04T15:10:00"),
    authorGender: "female",
  },
]

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home")
  const [newQuestion, setNewQuestion] = useState("")
  const [newQuestionTags, setNewQuestionTags] = useState("")
  const [answers, setAnswers] = useState({})
  const auth = getAuth()

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error)
    })
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmitAnswer = (questionId) => {
    console.log(`Submitting answer for question ${questionId}:`, answers[questionId])
    // Clear the answer field after submission
    setAnswers((prev) => ({
      ...prev,
      [questionId]: "",
    }))
    // Here you would typically send the answer to Firebase
  }

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return

    console.log("Submitting new question:", {
      text: newQuestion,
      tags: newQuestionTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    })

    // Clear the form after submission
    setNewQuestion("")
    setNewQuestionTags("")
    // Here you would typically send the question to Firebase
  }

  const formatDate = (date) => {
    const now = new Date()
    const diff = now - date

    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000)
      if (hours < 1) return "Just now"
      return `${hours}h ago`
    }

    // Less than a week
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000)
      return `${days}d ago`
    }

    // Otherwise return the date
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            CampusVibe
          </h1>
          <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-20">
        <Tabs defaultValue="home" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Ask Question Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Ask a Question</CardTitle>
                  <CardDescription>
                    Share something interesting to connect with others. You can ask one question per day.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="What would you like to ask?"
                    className="min-h-[100px] border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Add tags (comma separated)"
                      className="flex-1 border-none bg-transparent text-sm focus:outline-none focus:ring-0"
                      value={newQuestionTags}
                      onChange={(e) => setNewQuestionTags(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end">
                  <Button
                    onClick={handleSubmitQuestion}
                    disabled={!newQuestion.trim()}
                    className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                  >
                    Post Question
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Question Feed */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Today's Questions</h2>

              <AnimatePresence>
                {dummyQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm overflow-hidden">
                      {/* Decorative element based on author gender */}
                      <div
                        className={`absolute top-0 left-0 w-1 h-full ${
                          question.authorGender === "female" ? "bg-pink-400" : "bg-blue-400"
                        }`}
                      />

                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium">{question.text}</CardTitle>
                          <span className="text-xs text-gray-500">{formatDate(question.createdAt)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-violet-100 text-violet-800 hover:bg-violet-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-4 border-t border-gray-100 pt-4">
                          <Textarea
                            placeholder="Write your answer..."
                            className="min-h-[80px] border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                            value={answers[question.id] || ""}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {question.authorGender === "female" ? "Asked by a woman" : "Asked by a man"}
                        </div>
                        <Button
                          onClick={() => handleSubmitAnswer(question.id)}
                          disabled={!answers[question.id]?.trim()}
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send Answer
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfilePage />
          </TabsContent>

          <TabsContent value="chat">
            <ChatPage />
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center ${
              activeTab === "home" ? "text-violet-600" : "text-gray-500"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center justify-center ${
              activeTab === "profile" ? "text-violet-600" : "text-gray-500"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex flex-col items-center justify-center ${
              activeTab === "chat" ? "text-violet-600" : "text-gray-500"
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs mt-1">Chat</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

