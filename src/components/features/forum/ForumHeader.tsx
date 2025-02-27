import React, { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ForumCreateDialog } from '@/components/features/forum/ForumCreateDialog.tsx'

export const ForumHeader = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-5">
      <Button onClick={() => setOpen(true)}>Plaats Feedback</Button>

      <ForumCreateDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
