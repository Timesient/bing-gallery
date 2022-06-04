import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Bing Gallery - About</title>
      </Head>

      <div className={styles.container}>
        Bing Gallery
      </div>
    </Layout>
  )
}