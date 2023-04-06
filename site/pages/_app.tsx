import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import {
  InstantSearch,
  Configure,
} from 'react-instantsearch-hooks-web'
import algoliasearch from 'algoliasearch/lite';

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

const ALGOLIA_APP_ID = "ULGMM9NZ0C";
const ALGOLIA_SEARCH_API_KEY = "9f9cfb8dddc404f45286e315c78b8127";
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

console.log(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <InstantSearch searchClient={searchClient} indexName="Products">
          <Configure />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </InstantSearch>
      </ManagedUIContext>
    </>
  )
}
