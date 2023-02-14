import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Bing Gallery - Collect wallpapers from Bing everyday" />
        <link rel="icon" type='image/png' href="/images/favicon.png" />
        <link rel='preload' as='font' crossOrigin='crossorigin' type='font/ttf' href='/fonts/NunitoSans-Regular.ttf'/>
        <link rel='preload' as='font' crossOrigin='crossorigin' type='font/ttf' href='/fonts/JetBrainsMono-Regular.ttf'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}