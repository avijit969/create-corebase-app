"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { deleteSession } from '@/lib/session'
import { useRouter } from "next/navigation"

type User = {
    id: string
    name: string
    email: string
}

export function Navbar({ user }: { user: User }) {
    const router = useRouter()

    async function logout() {
        await deleteSession()
        router.push('/login')
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex items-center gap-2 font-bold text-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    CB
                </div>
                <span>CoreBase</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
                    {user.name || user.email}
                </span>
                <ThemeToggle />
                <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                </Button>
            </div>
        </header>
    )
}
