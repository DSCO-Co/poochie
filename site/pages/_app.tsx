import '@assets/chrome-bug.css'
import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import algoliasearch from 'algoliasearch/lite'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'

import { pageViewed } from '@lib/Segment/segmentAnalytics'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { CookieProvider } from '@lib/contexts'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'
import * as gtag from '@lib/gtag'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      // pageViewed();
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head />
      <CookieProvider>
        <ManagedUIContext>
          <InstantSearch searchClient={searchClient} indexName="Products">
            <Configure />
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
          </InstantSearch>
        </ManagedUIContext>
      </CookieProvider>
    </>
  )
}
