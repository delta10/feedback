import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import type { Post } from '@/components/hooks/usePosts.ts'

interface ForumPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
}

export const ForumPostDialog = ({
  open,
  onOpenChange,
  post,
}: ForumPostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {post && (
        <DialogContent>
          <DialogTitle className="text-lg font-bold">{post.title}</DialogTitle>
          <DialogDescription className="text-black">
            {post.description}
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  )
}
