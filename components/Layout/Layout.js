import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout({ location, children }) {

  return (
    <div>
      <Head>
        <title>{ location }</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.logoContainer}>
            <Image
              src='/images/favicon.png'
              width={48}
              height={48}
              alt="logo"
            />
          </div>

          <Link href="/">
            <a className={styles.headerLabel}>Bing Gallery</a>
          </Link>

          <div className={styles.menu}>
            <Link href="/about">
              <a className={styles.link}>About</a>
            </Link>
          </div>
        </div>
      </header>

      { children }

      <footer className={styles.footer}>
        <span>@ 2022 bing.dd1969.xyz</span>
        <span>The images are provided for wallpaper use only.</span>
      </footer>
    </div>
  )
}