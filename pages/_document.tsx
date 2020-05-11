import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document<{}> {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="/css/style.css" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument