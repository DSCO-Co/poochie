import '@assets/chrome-bug.css'
import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import algoliasearch from 'algoliasearch/lite'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web'

import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { CookieProvider } from '@lib/dscookies'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  // const Router = useRouter();
  // useGTM();
  // useGTMPageView(Router.asPath);
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      // const eventData = {
      //   msg: 'hi',
      //   url: url,
      // }

      // axios
      //   .post('/api/webhooks/stape', eventData)
      //   .then((response) => {
      //     console.log('Server response:', response.data)
      //   })
      //   .catch((error) => {
      //     console.error('Error sending event data:', error)
      //   })
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
            </Layout>
          </InstantSearch>
        </ManagedUIContext>
      </CookieProvider>
    </>
  )
}
