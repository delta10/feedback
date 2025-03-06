import React from 'react'
import type { Post } from '@/utils/forumPostService.ts'
import { formatDate, formatTime } from '@/utils/dateFormatting.ts'
import { Button } from '@/components/ui/button.tsx'

type ForumPostProps = {
  post: Post
}

export const ForumPost: React.FC<ForumPostProps> = ({ post }) => {
  return (
    <>
      <h1 className="text-2xl font-medium mt-5">{post.title}</h1>
      <p className="mt-1">{post.description}</p>
      <span className="block text-gray-500 mt-3">
        Geplaatst door: {post.author}
      </span>
      <span className="block text-gray-500">
        Geplaatst op: {formatDate(new Date(post.created))}{' '}
        {formatTime(new Date(post.created))}
      </span>
      <Button className="mt-3" asChild>
        <a href="/">Terug</a>
      </Button>
    </>
  )
}
