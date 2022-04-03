import Document, { Head, Html, NextScript, Main } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
            rel="stylesheet"
          />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
