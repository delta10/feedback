import { useComments } from '@/hooks/useComments.ts'
import { type ReactElement, useState } from 'react'
import { timeAgo } from '@/utils/dateFormatting.ts'
import { Button } from '@/components/ui/button.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { useForm } from 'react-hook-form'
import { authUser } from '@/store/authStore.ts'
import { useStore } from '@nanostores/react'

type ForumPostCommentsProps = {
  postId: string
}

interface CommentFormValues {
  content: string
}

export const ForumPostComments = ({
  postId,
}: ForumPostCommentsProps): ReactElement => {
  const { comments, error, isLoading, addComment } = useComments(postId)
  const [postComment, setPostComment] = useState<boolean>(false)
  const user = useStore(authUser)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>()

  const onSubmit = async (data: CommentFormValues) => {
    if (!user) return

    try {
      await addComment(data.content, user.id)
      reset()
    } catch (error) {
      console.error('Failed to add comment', error)
    }
  }

  if (error) {
    console.error(error)
    return <p>Er ging iets fout bij het laden van het commentaar...</p>
  }
  if (!comments || isLoading) return <p>Commentaar laden...</p>

  return (
    <div className="my-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        {postComment && (
          <>
            <Textarea
              placeholder="Schrijf hier uw commentaar..."
              className="mb-1"
              {...register('content', {
                required: 'Commentaar mag niet leeg zijn',
              })}
            ></Textarea>
            {errors.content && (
              <p className="text-red-500 text-sm mb-0.5">
                {errors.content.message}
              </p>
            )}
          </>
        )}
        <div>
          {postComment && <Button className="mr-1">Plaats commentaar</Button>}
          <Button
            variant={postComment ? 'outline' : 'default'}
            onClick={() => setPostComment(!postComment)}
            className="mb-3"
            type="button"
          >
            Plaats {postComment && 'geen '} commentaar
          </Button>
        </div>
      </form>
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
