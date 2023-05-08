import React, { createContext } from 'react'
import { Cookie } from '../dscookies/Cookie'

export interface CookieContextProps {
  // cookie: Cookie;
  children: React.ReactElement<any>
}

export const CookieContext = createContext<Cookie | undefined>(undefined)

export const CookieProvider: React.FC<CookieContextProps> = ({ children }) => {
  const cookie = new Cookie()
  return (
    <CookieContext.Provider value={cookie}>{children}</CookieContext.Provider>
  )
}
