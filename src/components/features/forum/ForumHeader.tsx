import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ForumCreateDialog } from '@/components/features/forum/ForumCreateDialog.tsx'
import { Logout } from '@/components/auth/Logout.tsx'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'

export const ForumHeader = () => {
  const [open, setOpen] = useState(false)
  const user = useStore(authUser)

  return (
    <div className="my-5">
      <div className="flex justify-between">
        <Button
          disabled={!user}
          onClick={() => setOpen(true)}
          className="disabled:bg-gray-400 disabled:cursor-default"
        >
          Plaats Feedback
        </Button>

        {user ? (
          <Logout />
        ) : (
          <Button asChild>
            <a href="/login">Log in</a>
          </Button>
        )}
      </div>

      <ForumCreateDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
