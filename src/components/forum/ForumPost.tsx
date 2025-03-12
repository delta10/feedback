import React from 'react'
import { formatDate, formatTime } from '@/utils/dateFormatting.ts'
import { Button } from '@/components/ui/button.tsx'
import { usePost } from '@/hooks/usePosts.ts'
import { useLikes } from '@/hooks/useLikes.ts'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'

interface ForumPostProps {
  postId: string
}

export const ForumPost: React.FC<ForumPostProps> = ({ postId }) => {
  const { post, error } = usePost(postId)
  const { likes, liked, toggleLike } = useLikes(postId)
  const user = useStore(authUser)

  if (error) {
    console.error(error)
    return <p>Error loading post...</p>
  }

  if (!post) {
    return <p>Loading posts...</p>
  }

  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-2xl font-medium">{post.title}</h1>
        {user && (
          <Button variant={liked ? 'default' : 'outline'} onClick={toggleLike}>
            Dit wil ik ook!
          </Button>
        )}
      </div>
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
      <Button className="mt-3" asChild>
        <a href="/">Terug</a>
      </Button>
    </>
  )
}
