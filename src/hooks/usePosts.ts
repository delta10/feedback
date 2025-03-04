import useSWR, { mutate } from 'swr'
import pb from '@/utils/pocketbase.ts'
import type { RecordModel } from 'pocketbase'

export interface Post extends RecordModel {
  id: string
  title: string
  description: string
  likes: number
  author: string
}

const fetcher = async (): Promise<Post[]> =>
  await pb.collection('forum_posts').getFullList<Post>({ sort: '-created' })

const usePosts = () => {
  const { data: posts, error } = useSWR<Post[]>('forum_posts', fetcher)

  const createPost = async (
    title: string,
    description: string,
    author: string
  ) => {
    const newPost = { title, description, likes: 0, author: author }

    try {
      await mutate(
        'forum_posts',
        async () => {
          const createdPost = await pb
            .collection('forum_posts')
            .create<Post>(newPost)
          return [createdPost, ...(posts || [])]
        },
        { revalidate: false }
      )
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return {
    posts,
    error,
    createPost,
    mutate,
  }
}

export default usePosts
