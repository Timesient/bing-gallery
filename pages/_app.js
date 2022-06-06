import '../styles/globals.css'
import App from "next/app";
import Head from 'next/head';
import { createWrapper } from "next-redux-wrapper";
import { makeStore } from '../store/store';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default createWrapper(makeStore).withRedux(MyApp);