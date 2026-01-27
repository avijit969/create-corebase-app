
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { User, Mail, Shield } from "lucide-react"

function App() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    navigate("/login")
    await signOut()
  }

  return (
    <div className="min-h-screen w-full bg-muted/40 dark:bg-zinc-950">
      {/* Navbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/50 backdrop-blur-md px-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            CB
          </div>
          CoreBase
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content - Profile Page */}
      <main className="container mx-auto max-w-2xl py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{user?.name || "User"}</CardTitle>
                <CardDescription>Personal Account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user?.email}
              </div>
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                User ID
              </label>
              <div className="flex items-center gap-3 rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                {user?.id}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Account created on {new Date().toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default App
