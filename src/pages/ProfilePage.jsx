import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Your Profile</CardTitle>
          <CardDescription>
            This is a placeholder for the profile page. It will be implemented in a future phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Here you'll be able to view and edit your profile information, see your question history, and track your
            activity.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage

