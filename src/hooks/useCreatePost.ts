import { cache } from 'swr/_internal'
import { mutate } from 'swr'
import pb from '@/utils/pocketbase.ts'
import type { Author, Post } from '@/hooks/usePosts.ts'

export const useCreatePost = () => {
  const createPost = async (
    title: string,
    description: string,
    author: string
  ) => {
    const tempId = Date.now().toString()
    const optimisticPost = {
      id: tempId, // Temporary ID
      title,
      description,
      author: { id: author, name: 'laden...', avatar: '' }, // Placeholder author data
      likes: 0,
      createdAt: new Date().toISOString(),
      collectionId: 'temp-collection', // Placeholder value
      collectionName: 'forum_posts', // Placeholder value
    }

    // Optimistically update all related SWR cache keys
    const updateCache = (
      updateFn: (posts: Post<Author>[]) => Post<Author>[]
    ) => {
      Array.from(cache.keys())
        .filter((key) => key.startsWith('forum_posts'))
        .forEach((key) =>
          mutate(
            key,
            (currentPosts?: Post<Author>[]) => updateFn(currentPosts || []),
            false
          )
        )
    }

    updateCache((posts) => [optimisticPost, ...posts]) // Show post immediately

    try {
      const createdPost = await pb
        .collection('forum_posts')
        .create<
          Post<string>
        >({ title, description, author }, { headers: { Authorization: `Bearer ${pb.authStore.token}`, 'Content-Type': 'application/json' } })
      const createdPostAuthor: Author = await pb
        .collection('authors')
        .getOne(createdPost.author)

      updateCache((posts) => [
        { ...createdPost, author: createdPostAuthor },
        ...posts.filter((p) => p.id !== tempId),
      ])
    } catch (error) {
      console.error('Error creating post:', error)
      updateCache((posts) => posts.filter((p) => p.id !== tempId)) // Rollback on error
    }
  }

  return { createPost }
}
