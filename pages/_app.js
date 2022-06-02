import '../styles/globals.css'
import App from "next/app";
import Head from 'next/head';
import { createWrapper } from "next-redux-wrapper";
import { makeStore } from '../store/store';
import Layout from '../components/Layout';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default createWrapper(makeStore).withRedux(MyApp);


/* 
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
*/
