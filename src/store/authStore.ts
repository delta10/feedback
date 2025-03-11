import { atom } from 'nanostores'
import pb from '@/utils/pocketbase.ts'

// Auth store: Holds the current authenticated user record
export const authUser = atom(pb.authStore.record)

// Sync store when auth state changes
pb.authStore.onChange(() => {
  authUser.set(pb.authStore.record)
})

export const login = async (identity: string, password: string) => {
  try {
    const authData = await pb
      .collection('users')
      .authWithPassword(identity, password)

    authUser.set(authData.record)
    window.location.href = '/'
  } catch (error) {
    console.error('Login failed:', error)
  }
}

export const logout = () => {
  pb.authStore.clear()
  authUser.set(null)
}

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    await pb.collection('users').create({
      name: username,
      email,
      password,
      passwordConfirm: password,
    })
    await login(email, password)
  } catch (error) {
    console.error('Signup failed:', error)
  }
}
