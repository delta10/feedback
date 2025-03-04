import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import type { Post } from '@/hooks/usePosts.ts'
import { formatDate, formatTime, timeAgo } from '@/utils/dateFormatting.ts'

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
            <span className="block text-gray-500 mt-3">{post.author}</span>
            <span className="block text-gray-500">
              Geplaatst op {formatDate(new Date(post.created))} om{' '}
              {formatTime(new Date(post.created))}
            </span>
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  )
}
