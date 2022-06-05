import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Bing Gallery" />
        <link rel="icon" type='image/png' href="/images/favicon.png" />
        <link rel="stylesheet" href="https://fonts.loli.net/icon?family=Material+Icons"/>
        <link rel="stylesheet" href="https://fonts.loli.net/css?family=Nunito+Sans&family=Noto+Sans+SC&family=JetBrains+Mono&display=swap"/>
        <link rel="stylesheet" href="https://fonts.loli.net/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}