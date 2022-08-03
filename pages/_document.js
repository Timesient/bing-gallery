import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Bing Gallery - Collect wallpapers from Bing everyday" />
        <link rel="icon" type='image/png' href="/images/favicon.png" />
        <link rel="stylesheet" href="https://fonts.loli.net/css2?family=Nunito+Sans&family=Noto+Sans+SC&family=JetBrains+Mono&display=swap"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}