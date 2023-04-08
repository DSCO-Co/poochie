import { useUI } from '@components/ui/context'
import { useEffect } from 'react'

export const useUserAvatar = (name = 'userAvatar') => {
  const { userAvatar, setUserAvatar } = useUI()

  useEffect(() => {
    const storedAvatar: string | null = localStorage.getItem(name)
    if (storedAvatar && storedAvatar.endsWith('.png')) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(storedAvatar)
    }
    // In useUserAvatar hookc
    if (localStorage.getItem(name)) {
      // Avatar not set locally, using the image and setting localStorage and context to persist.
      const randomPuppy = Math.floor(Math.random() * 12) + 1 // Generates a random number between 1 and 12
      const value = `/puppies/puppy_icon_${randomPuppy}.png`
      localStorage.setItem(name, value)
      setUserAvatar(value)
    }
  }, [name, setUserAvatar, userAvatar])

  return {
    userAvatar,
    setUserAvatar,
  }
}
