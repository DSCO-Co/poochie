import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import * as gtag from '@lib/Analytics/gtag'

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
