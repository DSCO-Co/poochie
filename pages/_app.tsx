import '@assets/chrome-bug.css'
import '@assets/main.css'
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import algoliasearch from 'algoliasearch/lite'
import 'keen-slider/keen-slider.min.css'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'

// import { pageViewed } from '@lib/Segment/segmentAnalytics'
// import { SegmentComponent } from '@components/SegmentComponent'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { CookieProvider } from '@lib/contexts'
import * as snippet from '@segment/snippet'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { FC, ReactNode, useEffect } from 'react'

import * as gtag from '@lib/gtag'
import { Analytics } from '@vercel/analytics/react'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
);
const WRITE_KEY = "cJJ8wJPlI33vsvDvFxzlOG3NPwdd7NzQ";




export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  const router = useRouter();

  function renderSnippet() {
    const opts = {
      apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    }

    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }

  useEffect(() => {
    document.body.classList?.remove('loading')
    if (window !== undefined) {
      // @ts-ignore
      window.analytics.page()
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      // pageViewed();
      console.log("FIRED HANDLE ROUTE CHANGE");
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head />
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      />
      <CommerceProvider locale={"en-US"}>
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
      </CommerceProvider>
    </>
  )
}
