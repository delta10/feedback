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
import usePosts, { type Post } from '@/components/hooks/usePosts.ts'

interface ForumCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ForumCreateDialog = ({
  open,
  onOpenChange,
}: ForumCreateDialogProps) => {
  const { createPost } = usePosts()
  const { register, handleSubmit, reset } = useForm<Post>()

  const onSubmit = (post: Post) => {
    createPost(post.title, post.description)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className="text-lg font-bold">
            <Input
              type="text"
              placeholder="Titel van uw feedback of suggestie..."
              className="font-normal mb-2 mt-5"
              {...register('title', { required: true })}
            />
          </DialogTitle>
          <DialogDescription>
            <Textarea
              placeholder="Schrijf hier uw feedback of suggestie..."
              className="mb-2 text-black"
              {...register('description')}
            />
          </DialogDescription>
          <Button>Plaats Feedback</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
