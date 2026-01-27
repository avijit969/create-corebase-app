import { SignupFormSchema, LoginFormSchema, FormState } from '@/lib/definitions'
import { signup as authSignup, login as authLogin } from '@/corebase/auth'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { data, error } = await authSignup(validatedFields.data.email, validatedFields.data.password, validatedFields.data.name)
    console.log(data, error)
    if (!error) {
        redirect('/login')
    }
    return {
        success: false,
        message: error?.message || 'Something went wrong',
    }

}

export async function login(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { data, error } = await authLogin(validatedFields.data.email, validatedFields.data.password)

    if (!error) {
        // 5. Redirect user
        await createSession(data)
        redirect('/')
    }

    return {
        success: false,
        message: error?.message || 'Invalid credentials',
    }
}