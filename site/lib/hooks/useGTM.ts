import Router from 'next/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

export const useGTM = () => {
  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.GTM_ID || '',
      dataLayer: {},
    })
  }, [])
}

const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string
    page: string
  }

  const pageEvent: PageEventProps = {
    event: 'pageview',
    page: url,
  }
  //@ts-ignore
  window && window.dataLayer && window.dataLayer.push(pageEvent)
  return pageEvent
}

export const useGTMPageView = (url: string) => {
  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url)
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
}
