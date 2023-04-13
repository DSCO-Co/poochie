import Document, { Head, Html, Main, NextScript } from 'next/document'

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
          {/* GTM server container script with custom subdomain for stape.io container more info : https://morganfeeney.com/guides/how-to-integrate-google-tag-manager-with-nextjs */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(){"use strict";function e(e,t,o){return void 0===t&&(t=""),"cookie"===e?function(e){for(var t=0,o=document.cookie.split(";");t<o.length;t++){var r=o[t].split("=");if(r[0].trim()===e)return r[1]}}(t):"localStorage"===e?(r=t,localStorage.getItem(r)):"jsVariable"===e?window[t]:"cssSelector"===e?(n=t,i=o,a=document.querySelector(n),i?null==a?void 0:a.getAttribute(i):null==a?void 0:a.textContent):void console.warn("invalid uid source",e);var r,n,i,a}!function(t,o,r,n,i,a,c,l,s,u){var d,v,E,I;try{v=l&&(E=navigator.userAgent,(I=/Version\/([0-9\._]+)(.*Mobile)?.*Safari.*/.exec(E))&&parseFloat(I[1])>=16.4)?e(l,"user.id",""):void 0}catch(e){console.error(e)}var g=t;g[n]=g[n]||[],g[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=o.getElementsByTagName(r)[0],T=v?"&bi="+encodeURIComponent(v):"",_=o.createElement(r),f=v?"kp"+c:c;_.async=!0,_.src="https://load.ss.poochie.co/"+f+".js?id=GTM-WBX5PP5"+T,null===(d=m.parentNode)||void 0===d||d.insertBefore(_,m)}(window,document,"script","dataLayer",0,0,"aihvvwyu","jsVariable")}();`,
            }}
          />
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
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://load.ss.poochie.co/ns.html?id=GTM-WBX5PP5"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
