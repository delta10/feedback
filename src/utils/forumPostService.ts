import pb from '@/utils/pocketbase.ts'
import type { RecordModel } from 'pocketbase'

export interface Post extends RecordModel {
  id: string
  title: string
  description: string
  likes: number
  author: string
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    return await pb
      .collection('forum_posts')
      .getFullList<Post>({ sort: '-created' })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const createPost = async (
  title: string,
  description: string,
  author: string
) => {
  const newPost = { title, description, likes: 0, author }

  try {
    return await pb.collection('forum_posts').create<Post>(newPost)
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}
