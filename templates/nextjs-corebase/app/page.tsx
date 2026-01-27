"use client"

import { useEffect, useState, useTransition } from 'react'
import { corebase } from '@/corebase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

type User = {
  id: string
  name: string
  email: string
}

export default function Home() {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: ""
  })

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const user = await corebase.auth.getSession()
      if (user) {
        setUser({
          id: user?.user.id,
          name: user?.user.name || "",
          email: user?.user.email
        })
      }
    })
  }, [])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 dark:bg-zinc-950">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 bg-muted rounded-full"></div>
          <div className="text-sm text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 dark:bg-zinc-950">
      <Navbar user={user} />

      <main className="p-4 sm:p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-3 border-b mb-4">
            <CardTitle className="text-2xl">Your Profile</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</span>
                <div className="font-medium text-lg">{user.name || "N/A"}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</span>
                <div className="font-medium text-lg">{user.email || "N/A"}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">User ID</span>
                <div className="font-mono text-xs text-muted-foreground bg-secondary p-2 rounded-md break-all">{user.id}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
