import { corebase } from "./client"

const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await corebase.auth.signUp({
        email,
        password,
        name,
    })
    return { data, error }
}

const login = async (email: string, password: string) => {
    const { data, error } = await corebase.auth.signIn({
        email,
        password,
    })
    return { data, error }
}

const logout = async () => {
    const { error } = await corebase.auth.signOut()
    if (!error) {
        return true
    }
    return false
}

const getUser = async () => {
    const { data, error } = await corebase.auth.getUser()
    if (!error) {
        return data?.user
    }
    return null
}

const getSession = async () => {
    const session = await corebase.auth.getSession()
    return session
}

export {
    signup,
    login,
    logout,
    getUser,
    getSession
}
