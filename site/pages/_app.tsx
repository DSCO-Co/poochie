import '@assets/chrome-bug.css'
import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import algoliasearch from 'algoliasearch/lite'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'

import { pageViewed } from '@Segment/segmentAnalytics'
import { SegmentComponent } from '@components/SegmentComponent'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { CookieProvider } from '@lib/contexts'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'


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



  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageViewed();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head />

      <CookieProvider>
        <ManagedUIContext>
          <InstantSearch searchClient={searchClient} indexName="Products">
            <Configure />
            <Layout pageProps={pageProps}>
              <SegmentComponent writeKey={WRITE_KEY} />
              <Component {...pageProps} />
              <Analytics />
            </Layout>
          </InstantSearch>
        </ManagedUIContext>
      </CookieProvider>
    </>
  )
}
