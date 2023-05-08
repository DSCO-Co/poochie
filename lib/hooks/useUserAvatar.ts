import { useUI } from '@components/ui/context'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useUserAvatar = (name = 'userAvatar') => {
  const { userAvatar, setUserAvatar } = useUI()
  const router = useRouter()
  const [randomPuppy, setRandomPuppy] = useState<number>(0)

  useEffect(() => {
    const storedAvatar: string | null = localStorage.getItem(name)
    if (storedAvatar && storedAvatar.endsWith('.png')) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(storedAvatar)
    } else {
      // Avatar not set locally, using the image and setting localStorage and context to persist.
      const value = `/api/image_proxy?source=${encodeURIComponent(
        `https://localhost:3000/puppies/puppy_icon_${randomPuppy}.png`
      )}` // Generates a random puppy image
      localStorage.setItem(name, value)
      setUserAvatar(value)
    }
  }, [name, setUserAvatar, randomPuppy, setUserAvatar])

  useEffect(() => {
    setRandomPuppy(Math.floor(Math.random() * 12) + 1) // Generates a random number between 1 and 12
  }, [])

  return {
    userAvatar,
    setUserAvatar,
  }
}
