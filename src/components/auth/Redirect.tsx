import { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore'

export const Redirect = () => {
  const user = useStore(authUser)

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [user])

  return null
}
