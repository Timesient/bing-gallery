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
        <span className={styles.title}>Bing Gallery</span>
        
        <span className={styles.sectionTitle}>Collect wallpapers from <a className={styles.link} href='https://bing.com/' target='_blank' rel='noopener noreferrer'>Bing</a> everyday, inspired by:</span>
        <ul className={styles.list}>
          <li><a className={styles.link} href='https://peapix.com/' target='_blank' rel='noopener noreferrer'>peapix.com</a></li>
          <li><a className={styles.link} href='https://bing.ioliu.cn/' target='_blank' rel='noopener noreferrer'>bing.ioliu.cn</a></li>
          <li><a className={styles.link} href='https://github.com/TimothyYe/bing-wallpaper' target='_blank' rel='noopener noreferrer'>TimothyYe/bing-wallpaper</a></li>
        </ul>
        
        <span className={styles.sectionTitle}>Features:</span>
        <ul className={styles.list}>
          <li>Collect different wallpapers from 11 countries.</li>
          <li>Provide variant resolutions to download, <code>4K UHD</code>, <code>1920x1080</code>, etc.</li>
          <li>Search images by keyword quick as a flash.</li>
          <li>Download all wallpapers in one click.</li>
          <li>Provide useful <code>API</code> for wallpaper data.</li>
        </ul>

        <span className={styles.sectionTitle}>API Request Examples:</span>
        <ul className={styles.list}>
          <li>
            Get latest wallpaper data in <code>JSON</code> format:
            <div className={styles.codeLine}>https://bing.dd1969.xyz/api/images?mode=latest&cc=cn&format=json</div>
          </li>
          <li>
            Get a wallpaper image randomly:
            <div className={styles.codeLine}>https://bing.dd1969.xyz/api/images?mode=random&cc=fr&format=image&resolution=1920x1080</div>
          </li>
          <li>
            Get all wallpaper data:
            <div className={styles.codeLine}>https://bing.dd1969.xyz/api/images?mode=all&cc=gb</div>
          </li>
        </ul>
        <span>Check <a className={styles.link} href='https://github.com/Timesient/bing-gallery' target='_blank' rel='noopener noreferrer'>Github Repository</a> of this project for more details.</span>

      </div>
    </Layout>
  )
}