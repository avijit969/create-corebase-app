import { create } from 'zustand'
import { getSession, logout } from '../../corebase/auth'

interface User {
    id: string
    email: string
    [key: string]: any
}

interface Session {
    user: User
    access_token: string
    [key: string]: any
}

interface AuthState {
    user: User | null
    session: Session | null
    loading: boolean
    checkAuth: () => Promise<void>
    signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    loading: true,
    checkAuth: async () => {
        try {
            set({ loading: true })
            const session = await getSession()
            if (session) {
                set({ user: session.user, session: session, loading: false })
            } else {
                set({ user: null, session: null, loading: false })
            }
        } catch (error) {
            set({ user: null, session: null, loading: false })
        }
    },
    signOut: async () => {
        await logout()
        set({ user: null, session: null })
    },
}))

