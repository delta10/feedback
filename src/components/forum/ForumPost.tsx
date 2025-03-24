import React from 'react'
import { formatDate, formatTime } from '@/utils/dateFormatting.ts'
import { Button } from '@/components/ui/button.tsx'
import { usePost } from '@/hooks/usePosts.ts'
import { useLikes } from '@/hooks/useLikes.ts'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'
import { ForumPostComments } from '@/components/forum/ForumPostComments.tsx'
import { ArrowLeftIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Separator } from '@/components/ui/separator.tsx'

interface ForumPostProps {
  postId: string
}

export const ForumPost: React.FC<ForumPostProps> = ({ postId }) => {
  const { post, error, isLoading } = usePost(postId)
  const { likes, liked, toggleLike } = useLikes(postId)
  const user = useStore(authUser)

  if (error) {
    console.error(error)
    return <p>Er ging iets fout bij het laden van de feedback...</p>
  }

  if (!post || !post.author || isLoading) {
    return (
      <>
        <Skeleton className="mt-6 w-20 h-12 md:h-8 mb-2" />
        <Skeleton className="w-full h-40 mt-4" />
      </>
    )
  }

  return (
    <>
      <div className="mt-5 mb-3">
        <Button variant="outline" asChild>
          <a href="/" className="flex">
            <ArrowLeftIcon />
            Terug
          </a>
        </Button>
      </div>
      <div className="border border-gray-200 rounded-sm p-2 md:p-5">
        <div className="flex justify-between">
          <h1 className="text-xl mb-3 mr-4">{post.title}</h1>
          {user && (
            <Button
              variant={liked ? 'outline' : 'default'}
              onClick={toggleLike}
              className="hover:cursor-pointer"
            >
              Dit wil ik ook!
            </Button>
          )}
        </div>
        <div className="w-full md:w-3/4">
          <span className="block my-3 font-bold">{post.author.name}</span>
          <p className="mt-1 mb-2">{post.description}</p>
          <Separator />
          <div className="flex justify-between mt-1">
            <span className="text-gray-500 mr-3 whitespace-normal">
              {likes == 1
                ? `${likes} gebruiker wilt dit ook`
                : `${likes} gebruikers willen dit ook`}
            </span>
            <span
              className="text-gray-500 whitespace-nowrap"
              suppressHydrationWarning={true}
            >
              {formatDate(new Date(post.created))}
              {', '}
              {formatTime(new Date(post.created))}
            </span>
          </div>
          <ForumPostComments postId={post.id} />
        </div>
      </div>
    </>
  )
}
