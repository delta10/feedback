import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ForumCreateDialog } from '@/components/forum/ForumCreateDialog.tsx'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'

export const ForumHeader = () => {
  const [open, setOpen] = useState(false)
  const user = useStore(authUser)

  return (
    <div className="mb-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={!user}
              onClick={() => setOpen(true)}
              className="cursor-pointer disabled:cursor-default"
            >
              Plaats Feedback
            </Button>
          </TooltipTrigger>
          {!user && (
            <TooltipContent>
              <p>Log in om feedback of suggesties te plaatsen</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <ForumCreateDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
