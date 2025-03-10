import pb from '@/utils/pocketbase.ts'

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
