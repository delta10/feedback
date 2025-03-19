import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { useForm } from 'react-hook-form'
import { type ReactElement, useState } from 'react'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'

interface CommentFormValues {
  content: string
}

interface ForumPostCommentFormProps {
  addComment: (content: string, author: string) => Promise<void>
}

export const ForumPostCommentForm = ({
  addComment,
}: ForumPostCommentFormProps): ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>()
  const [postComment, setPostComment] = useState<boolean>(false)
  const user = useStore(authUser)

  const onSubmit = async (data: CommentFormValues) => {
    if (!user) return

    try {
      await addComment(data.content, user.id)
      reset()
    } catch (error) {
      console.error('Failed to add comment', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {postComment && user && (
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
        {postComment && user && (
          <Button className="mr-1 hover:cursor-pointer">
            Plaats commentaar
          </Button>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type="button">
              <Button
                variant={postComment ? 'outline' : 'default'}
                onClick={() => setPostComment(!postComment)}
                className="mb-3 hover:cursor-pointer"
                type="button"
                disabled={!user}
              >
                Plaats {postComment && 'geen '} commentaar
              </Button>
            </TooltipTrigger>
            {!user && (
              <TooltipContent>
                <p>Log in om commentaar te plaatsen</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  )
}
