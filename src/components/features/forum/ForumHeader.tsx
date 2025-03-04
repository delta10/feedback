import React, { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ForumCreateDialog } from '@/components/features/forum/ForumCreateDialog.tsx'
import { Logout } from '@/components/auth/Logout.tsx'

export const ForumHeader = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-5">
      <div className="flex justify-between">
        <Button onClick={() => setOpen(true)}>Plaats Feedback</Button>
        <Logout />
      </div>

      <ForumCreateDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
