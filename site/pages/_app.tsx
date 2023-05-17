import '@assets/chrome-bug.css';
import '@assets/main.css';
import 'keen-slider/keen-slider.min.css';

import searchClient from "@components/common/AlgoliaSearchClient";
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';

import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';
import fbq from '@lib/Analytics/fpixel';
import { pageViewed } from '@lib/Analytics/tracker';
import { CookieProvider } from '@lib/contexts';
import * as snippet from '@segment/snippet';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { FC, ReactNode, useEffect } from 'react';

const WRITE_KEY = "cJJ8wJPlI33vsvDvFxzlOG3NPwdd7NzQ";


const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>


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
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    // fbq.pageview()
    const handleRouteChange = (url) => {
      pageViewed(url)
      // fbq.pageview()

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
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
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
