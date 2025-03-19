import { logout } from '@/store/authStore'
import { Button } from '@/components/ui/button.tsx'

export const Logout = () => {
  return (
    <Button onClick={logout} variant="outline" className="cursor-pointer">
      Log uit
    </Button>
  )
}
