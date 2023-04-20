import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";


const MyDocument = () => {
  return (
    <Html>
      <Head>
        <Script id="Segment-Script" strategy="afterInteractive">
          {`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="cJJ8wJPlI33vsvDvFxzlOG3NPwdd7NzQ";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("cJJ8wJPlI33vsvDvFxzlOG3NPwdd7NzQ");
  analytics.page();
  }}(); `}
        </Script>
        <Script
          id="ze-snippet"
          type='text/javascript'
          src='https://static.zdassets.com/ekr/snippet.js?key=5526ab38-c934-45d0-8bce-8fce9c7738fe'
          strategy='beforeInteractive'
        />

      </Head>
      <body className="loading">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
