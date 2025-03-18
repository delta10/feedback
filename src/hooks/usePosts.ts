import useSWR from 'swr'
import pb from '@/utils/pocketbase.ts'
import type { RecordModel } from 'pocketbase'

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

const postsFetcher = async (): Promise<Post[]> => {
  const posts = await pb
    .collection('forum_posts')
    .getFullList({ sort: '-created' })
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
  console.log(post)
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

export const usePosts = () => {
  const { data: posts, error } = useSWR('forum_posts', postsFetcher)

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
  const { mutate } = useSWR('forum_posts', postsFetcher)

  const createPost = async (
    title: string,
    description: string,
    author: string
  ) => {
    const newPost = { title, description, author: author }

    try {
      await mutate(async (): Promise<Post[]> => {
        const createdPost = await pb
          .collection('forum_posts')
          .create<Post<string>>(newPost, {
            headers: {
              Authorization: `Bearer ${pb.authStore.token}`, // Use token instead of cookies
              'Content-Type': 'application/json',
            },
          })
        const createdPostAuthor: Author = await pb
          .collection('authors')
          .getOne(createdPost.author)

        // Fetch new list after creation and include all author data
        return [
          { ...createdPost, author: createdPostAuthor },
          ...(await postsFetcher()),
        ]
      })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return { createPost }
}
