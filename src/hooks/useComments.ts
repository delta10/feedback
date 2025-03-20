import useSWR from 'swr'
import { type RecordModel } from 'pocketbase'
import pb from '@/utils/pocketbase.ts'
import type { Author } from '@/hooks/usePosts.ts'

interface Comment<TAuthor = Author> extends RecordModel {
  id: string
  post: string
  content: string
  created: string
  author: TAuthor
}

const fetchComments = async (postId: string): Promise<Comment[]> => {
  const comments = await pb.collection('forum_comments').getFullList({
    filter: `post = "${postId}"`,
    sort: 'created',
  })
  const authors = await pb.collection('authors').getFullList()

  const authorMap = Object.fromEntries(
    authors.map((author) => [author.id, author])
  )

  // Replace author ID in posts with actual author object
  return comments.map((post) => ({
    ...post,
    author: authorMap[post.author]
      ? {
          id: authorMap[post.author].id,
          name: authorMap[post.author].name,
          avatar: authorMap[post.author].avatar,
        }
      : null, // Handle missing authors safely
  })) as Comment[]
}

const createComment = async (
  postId: string,
  content: string,
  author: string
) => {
  const newComment = await pb.collection('forum_comments').create({
    post: postId,
    content,
    author,
  })
  return newComment as Comment
}

export const useComments = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? ['forum_comments', postId] : null,
    () => fetchComments(postId)
  )

  const addComment = async (content: string, author: string) => {
    await createComment(postId, content, author)
    mutate() // Re-fetch comments after adding a new one
  }

  return { comments: data, error, isLoading, mutate, addComment }
}
