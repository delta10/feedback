import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { usePosts } from '@/hooks/usePosts.ts'
import { ForumRow } from '@/components/forum/ForumRow.tsx'
import { ForumHeader } from '@/components/forum/ForumHeader.tsx'

const getSearchFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('search') || ''
}

export const Forum = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchInput, setSearchInput] = useState(getSearchFromUrl())
  const [search, setSearch] = useState(getSearchFromUrl())
  const { posts, error, isLoading } = usePosts(search)

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value)
  }, [])

  // Debounce search + update the URL
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
      const params = new URLSearchParams(window.location.search)

      if (searchInput) {
        params.set('search', searchInput)
      } else {
        params.delete('search')
      }
      window.history.replaceState(null, '', `?${params.toString()}`)
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchInput])

  if (error) {
    console.error(error)
    return <p>Er ging iets fout bij het laden van de posts...</p>
  }

  if (!posts || isLoading)
    return <Skeleton className="mt-4 md:mt-10 w-full h-80 mb-1" />

  return (
    <div className="border border-gray-200 rounded-sm my-4 md:my-10">
      <ForumHeader
        search={searchInput}
        setSearch={handleSearchChange}
        inputRef={inputRef}
      />
      {posts.map((post) => (
        <ForumRow key={post.id} post={post} />
      ))}
    </div>
  )
}
