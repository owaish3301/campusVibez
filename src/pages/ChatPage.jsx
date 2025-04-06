import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

const ChatPage = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Your Chats</CardTitle>
          <CardDescription>
            This is a placeholder for the chat page. It will be implemented in a future phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Here you'll be able to see your active chats, chat history, and manage your conversations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatPage

