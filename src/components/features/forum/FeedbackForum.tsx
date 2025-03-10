import React from 'react'
import { timeAgo } from '@/utils/dateFormatting.ts'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'

export const FeedbackForum = () => {
  const { posts, error } = usePosts()

  if (error) return <p>Error loading posts.</p>
  if (!posts) return <Skeleton />

  return (
    <div>
      {posts.map((post) => (
        <a
          key={post.id}
          className="flex text-left w-full justify-between p-5 pl-0 hover:bg-gray-100 hover:cursor-pointer transition rounded-md"
          href={'/posts/' + post.id}
        >
          <span className="flex-1 flex items-center justify-center">
            {post.likes}
          </span>
          <div className="flex-12 min-w-0">
            <h2 className="text-lg font-medium flex justify-between">
              {post.title}{' '}
              <span className="text-sm text-gray-500">
                {timeAgo(new Date(post.created))}
              </span>
            </h2>
            <p className="truncate">{post.description}</p>
            <span className="text-gray-500 italic">{post.author}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
