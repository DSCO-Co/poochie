import { useEffect } from 'react'
import { useUI } from '@components/ui/context'
import { getRandomPairOfColors } from '@lib/colors'

export const useUserAvatar = (name = 'userAvatar') => {
  const { userAvatar, setUserAvatar } = useUI()

  useEffect(() => {
    if (!userAvatar && localStorage.getItem(name) && localStorage.getItem(name)?.endsWith('.png')) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(localStorage.getItem(name))
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
