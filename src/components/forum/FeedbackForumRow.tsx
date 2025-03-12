import { timeAgo } from '@/utils/dateFormatting.ts'
import React from 'react'
import type { Post } from '@/hooks/usePosts.ts'
import { useLikes } from '@/hooks/useLikes.ts'
import { Skeleton } from '@/components/ui/skeleton.tsx'

interface FeedbackForumRowProps {
  post: Post
}

export const FeedbackForumRow: React.FC<FeedbackForumRowProps> = ({ post }) => {
  const { likes } = useLikes(post.id)

  if (!post.author) return <Skeleton />

  return (
    <a
      className="flex text-left w-full justify-between p-5 pl-0 hover:bg-gray-100 hover:cursor-pointer transition rounded-md"
      href={'/posts/' + post.id}
    >
      <span className="flex-1 flex items-center justify-center">{likes}</span>
      <div className="flex-12 min-w-0">
        <h2 className="text-lg font-medium flex justify-between">
          {post.title}{' '}
          <span className="text-sm text-gray-500">
            {timeAgo(new Date(post.created))}
          </span>
        </h2>
        <p className="truncate">{post.description}</p>
        <span className="text-gray-500 italic">{post.author.name}</span>
      </div>
    </a>
  )
}
