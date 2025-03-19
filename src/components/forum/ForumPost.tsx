import React from 'react'
import { formatDate, formatTime } from '@/utils/dateFormatting.ts'
import { Button } from '@/components/ui/button.tsx'
import { usePost } from '@/hooks/usePosts.ts'
import { useLikes } from '@/hooks/useLikes.ts'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'
import { ForumPostComments } from '@/components/forum/ForumPostComments.tsx'
import { ChevronLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton.tsx'

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
        <Skeleton className="w-full h-16 mb-2 mt-5" />
        <Skeleton className="w-full h-20 mb-2 mt-2" />
        <Skeleton className="w-full h-40 mb-2 mt-2" />
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <a
          href="/"
          className="flex text-gray-500 transition hover:text-gray-400"
        >
          <ChevronLeft />
          Terug
        </a>
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

      <h1 className="text-2xl font-medium mt-3">{post.title}</h1>
      <p className="mt-1">{post.description}</p>
      <span className="block text-gray-500 mt-3">
        Geplaatst door: {post.author.name}
      </span>
      <span className="block text-gray-500" suppressHydrationWarning={true}>
        Geplaatst op: {formatDate(new Date(post.created))}{' '}
        {formatTime(new Date(post.created))}
      </span>
      <span className="block text-gray-500">
        {likes == 1
          ? `${likes} gebruiker wilt dit ook`
          : `${likes} gebruikers willen dit ook`}
      </span>
      <ForumPostComments postId={post.id} />
    </>
  )
}
