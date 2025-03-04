import React, { useState } from 'react'
import { ForumPostDialog } from '@/components/features/forum/ForumPostDialog.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { ForumHeader } from '@/components/features/forum/ForumHeader.tsx'
import usePosts, { type Post } from '@/hooks/usePosts.ts'
import { timeAgo } from '@/utils/dateFormatting.ts'

export const FeedbackForum = () => {
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const { posts, error } = usePosts()

  if (error) return <p>Error loading posts.</p>
  if (!posts) return <Skeleton />

  const handleOpen = (post: Post) => {
    setSelectedPost(post)
    setOpen(true)
  }

  return (
    <div>
      <ForumHeader />
      {posts ? (
        posts.map((post) => (
          <button
            type="button"
            key={post.id}
            className="flex text-left w-full justify-between p-5 pl-0 hover:bg-gray-100 hover:cursor-pointer transition rounded-md"
            onClick={() => handleOpen(post)}
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
          </button>
        ))
      ) : (
        <Skeleton />
      )}

      <ForumPostDialog open={open} onOpenChange={setOpen} post={selectedPost} />
    </div>
  )
}
