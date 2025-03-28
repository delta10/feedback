import React, { useCallback, useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'
import { ForumRow } from '@/components/forum/ForumRow.tsx'
import { ForumHeader } from '@/components/forum/ForumHeader.tsx'

export const Forum = () => {
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const { posts, error, isLoading } = usePosts(search)

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value)
  }, [])

  // Debounce the search update
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
    }, 400) // Debounce delay

    return () => clearTimeout(timeout) // Cleanup on unmount
  }, [searchInput])

  if (error) {
    console.error(error)
    return <p>Er ging iets fout bij het laden van de posts...</p>
  }

  if (!posts || isLoading)
    return <Skeleton className="mt-4 md:mt-10 w-full h-80 mb-1" />

  return (
    <div className="border border-gray-200 rounded-sm my-4 md:my-10">
      <ForumHeader search={searchInput} setSearch={handleSearchChange} />
      {posts.map((post) => (
        <ForumRow key={post.id} post={post} />
      ))}
    </div>
  )
}
