import useSWR, { mutate } from 'swr'
import pb from '@/utils/pocketbase.ts'
import type { RecordModel } from 'pocketbase'

export interface Post extends RecordModel {
  id: string
  title: string
  description: string
  likes: number
}

const fetchPosts = async (): Promise<Post[]> =>
  await pb.collection('forum_posts').getFullList<Post>({ sort: '-created' })

const fetchPost = async (postId: string): Promise<Post> =>
  await pb.collection('forum_posts').getOne<Post>(postId)

export const usePosts = () => {
  const { data: posts, error } = useSWR<Post[]>('forum_posts', fetchPosts)

  return { posts, error }
}

export const usePost = (postId: string | null) => {
  const { data: post, error } = useSWR<Post>(
    postId ? `forum_posts/${postId}` : null,
    () => fetchPost(postId!)
  )

  return { post, error }
}

export const useCreatePost = () => {
  const { mutate } = useSWR<Post[]>('forum_posts', fetchPosts)

  const createPost = async (
    title: string,
    description: string,
    author: string
  ) => {
    const newPost = { title, description, likes: 0, author: author }

    try {
      await mutate(
        async () => {
          const createdPost = await pb
            .collection('forum_posts')
            .create<Post>(newPost)
          return [createdPost, ...(await fetchPosts())] // Fetch new list after creation
        },
        { revalidate: false }
      )
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return { createPost }
}
