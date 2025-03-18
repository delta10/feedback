import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useStore } from '@nanostores/react'
import { authUser } from '@/store/authStore.ts'
import pb from '@/utils/pocketbase.ts'
import type { RecordModel } from 'pocketbase'

const fetchLikes = async (postId: string) => {
  if (!postId) return { count: 0, likeId: null, liked: false } // Avoid errors

  try {
    const res = await pb.collection('forum_likes').getList(1, 9999, {
      filter: `post="${postId}"`,
      requestKey: postId,
    })

    const userLike = res.items.find(
      (like) => like.user === pb.authStore.model?.id
    )

    return {
      count: res.totalItems,
      likeId: userLike ? userLike.id : null,
      liked: !!userLike,
    }
  } catch (error) {
    console.error('Error fetching likes:', error)
    return { count: 0, likeId: null, liked: false }
  }
}

export function useLikes(postId: string) {
  const user = useStore(authUser)
  const { data, mutate } = useSWR(`forum_likes/${postId}`, () =>
    fetchLikes(postId)
  )
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (subscribed) return
    setSubscribed(true)

    let unsubscribe: (() => void) | null = null

    const subscribeToLikes = async () => {
      unsubscribe = await pb.collection('forum_likes').subscribe('*', (e) => {
        if (e.record.post === postId) mutate()
      })
    }

    subscribeToLikes()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [postId, mutate, subscribed])

  const toggleLike = async () => {
    if (!data) return

    if (data.liked && data.likeId) {
      await pb.collection('forum_likes').delete(data.likeId)
    } else {
      await pb.collection('forum_likes').create(
        { user: user?.id, post: postId },
        {
          headers: {
            Authorization: `Bearer ${pb.authStore.token}`, // Use token instead of cookies
            'Content-Type': 'application/json',
          },
        }
      )
    }

    mutate()
  }

  return { likes: data?.count || 0, liked: data?.liked || false, toggleLike }
}
