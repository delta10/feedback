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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex flex-col w-full" asChild>
              <div>
                <Textarea
                  placeholder="Schrijf hier uw reactie..."
                  className="mb-1 w-full h-20"
                  {...register('content', {
                    required: 'Reactie mag niet leeg zijn',
                  })}
                  disabled={!user}
                ></Textarea>
                {errors.content && (
                  <p className="text-red-500 text-sm mb-0.5">
                    {errors.content.message}
                  </p>
                )}
                <Button
                  className="mr-1 hover:cursor-pointer self-end mt-1.5"
                  disabled={!user}
                >
                  Reageren
                </Button>
              </div>
            </TooltipTrigger>
            {!user && (
              <TooltipContent>
                <p>Log in om een reactie te plaatsen</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  )
}
