import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog.tsx'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useForm } from 'react-hook-form'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'
import { type Post, useCreatePost } from '@/hooks/usePosts.ts'
import { type ReactNode, useEffect } from 'react'

interface ForumCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ForumCreateDialog = ({
  open,
  onOpenChange,
}: ForumCreateDialogProps): ReactNode => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>()
  const user = useStore(authUser)
  const { createPost } = useCreatePost()

  const onSubmit = (post: Post) => {
    if (user) createPost(post.title, post.description, user.id)
    reset()
    onOpenChange(false)
  }

  if (!user) onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className="text-lg font-bold">
            Nieuwe feedback of suggestie
          </DialogTitle>
          <DialogDescription>
            <Input
              type="text"
              placeholder="Titel van uw feedback of suggestie..."
              className="font-normal mb-2 mt-3 text-black"
              {...register('title', {
                required: 'Uw feedback of suggestie moet een titel bevatten',
              })}
            />
            {errors.title?.message && (
              <p className="text-red-500 text-sm mb-1">
                {errors.title?.message}
              </p>
            )}
            <Textarea
              placeholder="Schrijf hier uw feedback of suggestie..."
              className="mb-2 text-black"
              {...register('description', {
                required:
                  'Uw feedback of suggestie moet een omschrijving bevatten',
              })}
            />
            {errors.description?.message && (
              <p className="text-red-500 text-sm mb-1">
                {errors.description?.message}
              </p>
            )}
          </DialogDescription>
          <Button>Plaats Feedback</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
