import * as gtag from '@lib/Analytics/gtag'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const MyDocument = () => {
  return (
    <Html>
      <Head>


        {/* Zendesk script init */}
        <Script
          id="ze-snippet"
          type="text/javascript"
          src="https://static.zdassets.com/ekr/snippet.js?key=5526ab38-c934-45d0-8bce-8fce9c7738fe"
          strategy="beforeInteractive"
        />

        {/* Cometly Tag */}
        <meta name="cometly-domain-verification" content="89ff378f-6d84-4756-9948-f401f111735c" />
        <Script
          id="cometlytrack"
          src="https://t.cometlytrack.com/e?uid=caf5e9-4503599627370554-b15e9c-s"
        />
        <Script
          id="cometlytrack-init"
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `comet('init');`,
          }}
        />


        {/* gtag.js script init */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
      </Head>
      <body className="loading">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
