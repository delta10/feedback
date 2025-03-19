import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ForumCreateDialog } from '@/components/forum/ForumCreateDialog.tsx'
import { Logout } from '@/components/auth/Logout.tsx'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'

export const ForumHeader = () => {
  const [open, setOpen] = useState(false)
  const user = useStore(authUser)

  return (
    <div className="mb-5">
      <Button
        disabled={!user}
        onClick={() => setOpen(true)}
        className="cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
      >
        Plaats Feedback
      </Button>

      <ForumCreateDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
