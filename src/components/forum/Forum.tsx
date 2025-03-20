import React, { useCallback, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'
import { ForumRow } from '@/components/forum/ForumRow.tsx'
import { ForumHeader } from '@/components/forum/ForumHeader.tsx'

export const Forum = () => {
  const [search, setSearch] = useState('')
  const { posts, error, isLoading } = usePosts(search)

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

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
    <div className="border border-gray-200 rounded-sm my-4 md:my-10">
      <ForumHeader search={search} setSearch={handleSearchChange} />
      {posts.map((post) => (
        <ForumRow key={post.id} post={post} />
      ))}
    </div>
  )
}
