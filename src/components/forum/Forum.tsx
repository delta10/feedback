import React from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'
import { ForumRow } from '@/components/forum/ForumRow.tsx'

export const Forum = () => {
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
    <div className="border border-gray-200 rounded-sm">
      <div className="w-full h-10 bg-gray-100"></div>
      {posts.map((post) => (
        <ForumRow key={post.id} post={post} />
      ))}
    </div>
  )
}
