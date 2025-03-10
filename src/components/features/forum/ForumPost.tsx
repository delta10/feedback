import React from 'react'
import { formatDate, formatTime } from '@/utils/dateFormatting.ts'
import { Button } from '@/components/ui/button.tsx'
import { usePost } from '@/hooks/usePosts.ts'

interface ForumPostProps {
  postId: string
}

export const ForumPost: React.FC<ForumPostProps> = ({ postId }) => {
  const { post, error } = usePost(postId)

  if (error) {
    console.error(error)
    return <p>Error loading post...</p>
  }

  if (!post) {
    return <p>Loading posts...</p>
  }

  return (
    <>
      <h1 className="text-2xl font-medium mt-5">{post.title}</h1>
      <p className="mt-1">{post.description}</p>
      <span className="block text-gray-500 mt-3">
        Geplaatst door: {post.author}
      </span>
      <span className="block text-gray-500" suppressHydrationWarning={true}>
        Geplaatst op: {formatDate(new Date(post.created))}{' '}
        {formatTime(new Date(post.created))}
      </span>
      <Button className="mt-3" asChild>
        <a href="/">Terug</a>
      </Button>
    </>
  )
}
