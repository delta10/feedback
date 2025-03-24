import useSWR, { mutate } from 'swr'
import pb from '@/utils/pocketbase.ts'
import type { RecordModel } from 'pocketbase'
import { cache } from 'swr/_internal'

export type Author = {
  id: string
  name: string
  avatar: string
}

export interface Post<TAuthor = Author> extends RecordModel {
  id: string
  title: string
  description: string
  author: TAuthor
  likes: number
}

const postsFetcher = async (search: string = ''): Promise<Post[]> => {
  const filterQuery = search
    ? `title ~ "${search}" || description ~ "${search}"`
    : ''

  const posts = await pb
    .collection('forum_posts')
    .getFullList({ sort: '-created', filter: filterQuery })
  const authors = await pb.collection('authors').getFullList()
  const likes = await pb.collection('forum_likes').getFullList()

  // Create a lookup map for authors (id -> author data)
  const authorMap = Object.fromEntries(
    authors.map((author) => [author.id, author])
  )

  // Replace author ID in posts with actual author object
  return posts.map((post) => ({
    ...post,
    author: authorMap[post.author]
      ? {
          id: authorMap[post.author].id,
          name: authorMap[post.author].name, // Ensure correct key
          avatar: authorMap[post.author].avatar,
        }
      : null, // Handle missing authors safely
    likes: likes.filter((like) => like.post === post.id).length, // calculate amount of likes
  })) as Post[]
}

const postFetcher = async (postId: string): Promise<Post> => {
  const post: Post<string> = await pb.collection('forum_posts').getOne(postId)
  const author = await pb.collection('authors').getOne(post.author)

  return {
    ...post,
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
    },
  }
}

export const usePosts = (search: string = '') => {
  const { data: posts, error } = useSWR(['forum_posts', search], () =>
    postsFetcher(search)
  )

  if (!posts) return { posts: null, isLoading: true, error }

  return { posts: posts, error: null, isLoading: false }
}

export const usePost = (postId: string) => {
  const { data: post, error } = useSWR<Post>('forum_posts', () =>
    postFetcher(postId)
  )

  if (!post) return { post: null, error: error, isLoading: true }

  return { post, error: null, isLoading: false }
}

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
