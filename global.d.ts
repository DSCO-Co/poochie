// Declarations for modules without types
declare module 'next-themes'

interface Analytics {
  initialize: boolean
  invoked: boolean
  methods: string[]
  factory: (method: string) => (...args: any[]) => Analytics
  load: (writeKey: string) => void
  [method: string]: any
}

declare global {
  interface Window {
    analytics: Analytics | undefined
  }
}

export { Analytics, global }
