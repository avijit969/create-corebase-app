'use client'
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signup } from "@/actions/auth"

export default function SignUp() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-6 md:p-10 dark:bg-zinc-950">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-bold text-xl">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        CB
                    </div>
                    CoreBase
                </a>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <form action={action}>
                        <CardContent className="grid gap-4">
                            {state?.message && state.success ? (
                                <div className="bg-success/15 text-success text-sm p-3 rounded-md">
                                    {state?.message}
                                </div>
                            ) : (
                                (state?.message && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {state?.message}
                                </div>)
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="disha@corebase.com"
                                    required
                                />
                            </div>
                            {state?.errors?.email && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {state?.errors?.email}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Disha"
                                    required
                                />
                            </div>
                            {state?.errors?.name && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {state?.errors?.name}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            {state?.errors?.password && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {state?.errors?.password}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full mt-4" type="submit" disabled={pending}>
                                {pending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                                    Login
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}