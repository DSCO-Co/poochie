import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const gtmHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://ss.poochie.co/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M8JXSN5')`

const noScriptGTMOld = `<iframe src="https://ss.poochie.co/ns.html?id=GTM-M8JXSN5"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Script id="Segment-Script" strategy="afterInteractive">
            {`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="cJJ8wJPlI33vsvDvFxzlOG3NPwdd7NzQ";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("cJJ8wJPlI33vsvDvFxzlOG3NPwdd7NzQ");
  analytics.page();
  }}(); `}
          </Script>
          {/* GTM server container script with custom subdomain for stape.io container more info : https://morganfeeney.com/guides/how-to-integrate-google-tag-manager-with-nextjs */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M8JXSN5');`,
            }}
          /> */}
          {/* <link rel="icon" href="/bc_favicon.ico" /> */}
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <body className="loading">
          <Main />
          <NextScript />
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M8JXSN5"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          /> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
