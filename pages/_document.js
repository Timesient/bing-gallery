import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Bing Gallery" />
        <link rel="icon" type='image/png' href="/images/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans&family=Noto+Sans+SC&display=swap"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}