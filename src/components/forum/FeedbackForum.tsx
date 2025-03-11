import React from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'
import { FeedbackForumRow } from '@/components/forum/FeedbackForumRow.tsx'

export const FeedbackForum = () => {
  const { posts, error } = usePosts()

  if (error) return <p>Error loading posts.</p>
  if (!posts) return <Skeleton />

  return (
    <div>
      {posts.map((post) => (
        <FeedbackForumRow key={post.id} post={post} />
      ))}
    </div>
  )
}
