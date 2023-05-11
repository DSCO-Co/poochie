import '@assets/chrome-bug.css'
import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import searchClient from "@components/common/AlgoliaSearchClient";
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'

import { pageViewed } from '@lib/Analytics/tracker'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { CookieProvider } from '@lib/contexts'
import * as snippet from '@segment/snippet'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { FC, ReactNode, useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

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
      // @ts-ignore
      window.comet('init');
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageViewed(url)

      // @ts-ignore
      window.comet('init');
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
