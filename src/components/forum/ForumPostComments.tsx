import { useComments } from '@/hooks/useComments.ts'
import { type ReactElement } from 'react'
import { timeAgo } from '@/utils/dateFormatting.ts'
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
    <div className="my-3">
      <ForumPostCommentForm addComment={addComment} />
      {comments.map((comment) => (
        <div key={comment.id}>
          <span className="font-bold">{comment.author.name}</span>
          <span className="text-sm text-gray-500 italic ml-1.5">
            {timeAgo(new Date(comment.created))}
          </span>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
