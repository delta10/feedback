import React, { useState } from 'react'
import { ForumPostDialog } from '@/components/features/forum/ForumPostDialog.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { ForumHeader } from '@/components/features/forum/ForumHeader.tsx'
import usePosts, { type Post } from '@/components/hooks/usePosts.ts'

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
            className="flex text-left w-full justify-between p-4 hover:bg-gray-100 hover:cursor-pointer transition rounded-md"
            onClick={() => handleOpen(post)}
          >
            <div className="flex-8 min-w-0">
              <h2 className="text-lg font-medium">{post.title}</h2>
              <p className="truncate">{post.description}</p>
            </div>
            <span className="flex-1 flex items-center justify-center">
              {post.likes}
            </span>
          </button>
        ))
      ) : (
        <Skeleton />
      )}

      <ForumPostDialog open={open} onOpenChange={setOpen} post={selectedPost} />
    </div>
  )
}
