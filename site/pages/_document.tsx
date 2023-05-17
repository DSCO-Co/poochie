import { FB_PIXEL_ID } from '@lib/Analytics/fpixel'
import * as gtag from '@lib/Analytics/gtag'
import { Footer, Head, Html, Main, NextScript } from 'next/document'
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
        <meta
          name="cometly-domain-verification"
          content="88012f3c-ab33-4aec-b52f-c10bcfc2d0fe"
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

        {/* fb pixel script init other part in _app */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>


      </Head>
      <body className="loading">
        <Main />
        <NextScript />
      </body>
      <Footer>
        {/* Hotjar Tracking Code for  */}
        <Script id="hotjar">
          {`
           (function(h,o,t,j,a,r){
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
          h._hjSettings={hjid:3495268,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
         `}
        </Script>
        <Script
          id="cometlytrack"
          src="https://t.cometlytrack.com/e?uid=caf5e9-4503599627370554-b15e9c-s"
        />
      </Footer>
    </Html>
  )
}

export default MyDocument
