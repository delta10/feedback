import { useComments } from '@/hooks/useComments.ts'
import { type ReactElement } from 'react'
import { formatDate, formatTime, timeAgo } from '@/utils/dateFormatting.ts'
import { ForumPostCommentForm } from '@/components/forum/ForumPostCommentForm.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

type ForumPostCommentsProps = {
  postId: string
}

export const ForumPostComments = ({
  postId,
}: ForumPostCommentsProps): ReactElement => {
  const { comments, error, isLoading, addComment } = useComments(postId)

  if (error) {
    console.error(error)
    return <p>Er ging iets fout bij het laden van het commentaar...</p>
  }
  if (!comments || isLoading)
    return (
      <>
        <Skeleton className="w-full h-10 mt-3 mb-1" />
        <Skeleton className="w-full h-10 mb-1" />
        <Skeleton className="w-full h-10" />
      </>
    )

  return (
    <div className="mt-8">
      <div className="flex items-center mb-3">
        <h2 className="text-lg mr-1">Reacties</h2>{' '}
        <span className="text-gray-500">({comments.length})</span>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-3">
          <span className="font-bold">{comment.author.name}</span>
          <span className="block text-sm text-gray-500">
            {formatDate(new Date(comment.created))}
            {', '}
            {formatTime(new Date(comment.created))}
          </span>
          <p>{comment.content}</p>
        </div>
      ))}

      <ForumPostCommentForm addComment={addComment} />
    </div>
  )
}
