import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useToggleTheme = () => {
  const { theme, themes, setTheme } = useTheme()
  const [themeValue, setThemeValue] = useState<string>('system')

  // @ts-ignore
  useEffect(() => setThemeValue(theme), [theme])

  return { theme: themeValue, setTheme, themes }
}
