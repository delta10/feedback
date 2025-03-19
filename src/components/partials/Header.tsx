import { Logout } from '@/components/auth/Logout.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'

export const Header = () => {
  const user = useStore(authUser)

  return (
    <div className="w-full px-3 md:px-12 p-5 flex justify-between">
      <a href="/">
        <img alt="Delta10 logo" src="/logo.png" className="w-40" />
      </a>
      {user ? (
        <Logout />
      ) : (
        <Button asChild>
          <a href="/login">Log in</a>
        </Button>
      )}
    </div>
  )
}
