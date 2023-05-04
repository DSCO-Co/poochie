// Document.tsx
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Script
            id="ze-snippet"
            type="text/javascript"
            src="https://static.zdassets.com/ekr/snippet.js?key=5526ab38-c934-45d0-8bce-8fce9c7738fe"
            strategy="beforeInteractive"
          />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
