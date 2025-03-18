import React from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'
import { FeedbackForumRow } from '@/components/forum/FeedbackForumRow.tsx'

export const FeedbackForum = () => {
  const { posts, error, isLoading } = usePosts()

  if (error) {
    console.error(error)
    return <p>Er ging iets fout bij het laden van de posts...</p>
  }

  if (!posts || isLoading)
    return (
      <>
        <Skeleton className="w-full h-28 mb-1" />
        <Skeleton className="w-full h-28 mb-1" />
        <Skeleton className="w-full h-28 mb-1" />
      </>
    )

  return (
    <div>
      {posts.map((post) => (
        <FeedbackForumRow key={post.id} post={post} />
      ))}
    </div>
  )
}
