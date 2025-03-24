import { type ReactElement, useEffect, useRef, useState } from 'react'
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
import { PlusIcon, SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input.tsx'

interface ForumHeaderProps {
  setSearch: (search: string) => void
  search: string
}

export const ForumHeader = ({
  setSearch,
  search = '',
}: ForumHeaderProps): ReactElement => {
  const [open, setOpen] = useState(false)
  const user = useStore(authUser)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="w-full bg-secondary-background py-4 px-2 flex justify-between ">
      <div className="relative w-1/2 md:w-1/3">
        <SearchIcon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <Input
          ref={inputRef}
          placeholder="Zoeken"
          className="pl-10 bg-white rounded-sm py-6 md:py-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                disabled={!user}
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              >
                <PlusIcon />
                Plaats Feedback
              </Button>
            </div>
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
