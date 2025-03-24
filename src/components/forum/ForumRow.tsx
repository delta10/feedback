import { timeAgo } from '@/utils/dateFormatting.ts'
import React from 'react'
import type { Post } from '@/hooks/usePosts.ts'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { ThumbsUpIcon } from 'lucide-react'

interface FeedbackForumRowProps {
  post: Post
}

export const ForumRow: React.FC<FeedbackForumRowProps> = ({ post }) => {
  if (!post.author) return <Skeleton className="w-full h-28 mb-1" />

  return (
    <a
      className="flex text-left w-full justify-between p-5 pl-0 hover:bg-secondary-background hover:cursor-pointer transition border border-gray-200"
      href={'/posts/' + post.id}
    >
      <span className="flex-1 flex flex-col gap-2 items-center justify-center px-4 md: px-0">
        <ThumbsUpIcon size={23} />
        {post.likes}
      </span>
      <div className="flex-12 min-w-0">
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <h2 className="text-lg font-medium">{post.title}</h2>
          <span className="text-sm text-gray-500">
            {timeAgo(new Date(post.created))}
          </span>
        </div>
        <p className="truncate">{post.description}</p>
        <span className="text-gray-500 italic">{post.author.name}</span>
      </div>
    </a>
  )
}
