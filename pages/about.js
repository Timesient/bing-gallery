import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import styles from '../styles/About.module.css';
import { countryConfig } from '../lib/preset';
import { useEffect, useState } from 'react';

export default function About() {
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Bing Gallery - About</title>
      </Head>

      <div className={styles.container}>
        <span className={styles.title}>Bing Gallery</span>
        <span className={styles.introduce}>
          Collect wallpapers from Bing homepage everyday, inspired by:
          <ul className={styles.list}>
            <li><a className={styles.link} href='https://peapix.com/' target='_blank' rel='noopener noreferrer'>peapix.com</a></li>
            <li><a className={styles.link} href='https://bing.ioliu.cn/' target='_blank' rel='noopener noreferrer'>bing.ioliu.cn</a></li>
            <li><a className={styles.link} href='https://github.com/TimothyYe/bing-wallpaper' target='_blank' rel='noopener noreferrer'>TimothyYe/bing-wallpaper</a></li>
          </ul>
        </span>
        <span>Check <a className={styles.link} href='https://github.com/Timesient/bing-gallery' target='_blank' rel='noopener noreferrer'>github repo</a> of this website for more detail.</span>

        <div style={{ borderTop: '1px dashed #aaaaaa', margin: '1rem 0' }} />

        <span className={styles.sectionTitle}>API</span>
        <ul className={styles.list}>
          <li>Endpoint: <code>https://bing.dd1969.xyz/api/images</code></li>
          <li>Method: <code>HTTP GET</code></li>
        </ul>

        <span className={styles.sectionTitle}>Parameters</span>
        <ul className={styles.list}>
          <li>
            <code>mode</code>: <span className={styles.requiredLabel}>required</span>, must be one of:
            <ul>
              <li><code>latest</code>: get the latest set of data</li>
              <li><code>random</code>: get one set of data randomly from database</li>
              <li><code>all</code>: get all data from database</li>
            </ul>
          </li>

          <li>
            <code>cc</code>: <span className={styles.requiredLabel}>required</span>, means country code, must be one of:
            <ul>
              {
                Object.keys(countryConfig).map((cc, index) => (
                  <li key={`${cc}-${index}`}><code>{cc}</code>: {countryConfig[cc].fullname}</li>
                )) 
              }
            </ul>
          </li>

          <li>
            <code>format</code>: <span className={styles.requiredLabel}>required if <code>mode</code> is <code>latest</code> or <code>random</code></span>, must be one of:
            <ul>
              <li><code>json</code>: the response type is json</li>
              <li><code>image</code>: will redirect to the image, can be used in <code>{`<img src='...'>`}</code>, <code>{`background-image: url(...)`}</code>, etc.</li>
            </ul>
          </li>

          <li>
            <code>resolution</code>: <span className={styles.requiredLabel}>required if <code>format</code> is <code>image</code></span>, must be one of:
            <ul>
              <li><code>1920x1080</code>: the image resolution is 1920x1080</li>
              <li><code>UHD</code>: the image resolution is over 4K </li>
            </ul>
          </li>
        </ul>

        <span className={styles.sectionTitle}>Request Example</span>
        <ul className={styles.list}>
          {
            [
              `${origin}/api/images?mode=latest&cc=cn&format=json`,
              `${origin}/api/images?mode=random&cc=fr&format=image&resolution=1920x1080`,
              `${origin}/api/images?mode=all&cc=gb`
            ].map((link, index) => (
              <li key={index}>
                <code style={{ wordBreak: 'break-all' }}>{link}</code>
              </li>
            ))
          }
        </ul>

        <span className={styles.sectionTitle}>Response Example</span>
        <pre className={styles.codeBlock}>
          {
`{
  "data": {
    "headline": "A right royal tradition",
    "title": "Street party for the coronation of Queen Elizabeth II in 1953",
    "copyright": "© KGPA Ltd/Alamy",
    "description": "As the Queen’s Platinum Jubilee celebrations draw to a close, neighbours across the UK will sit down to tables festooned with bunting and laden with food for The Big Jubilee Lunch. Street parties have been thrown to celebrate major events for more than a century, with roots in earlier “street dressing” traditions. But it was the ‘peace teas’ arranged in 1919 for children to celebrate the end of WWI that began the tradition of street parties as we know them. More followed in 1935, for the Jubilee of King George V, in 1937 for the coronation of George VI, and for VE and VJ days at the end of World War Two.",
    "quickFact": "An estimated 27m people in the UK watched the 1953 coronation on TV - for many, the first time they had watched a televised event.",
    "knowMoreURL": "https://www.bing.com/search?q=queen+Elizabeth+II+platinum+jubilee&form=hpcapt&filters=HpDate:\"20220604_2300\"",
    "timestamp": 1654383600000,
    "id": "OHR.JubileeParty_EN-GB9608177289",
    "urls": {
      "UHD": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_UHD.jpg",
      "1920x1200": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1920x1200.jpg",
      "1920x1080": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1920x1080.jpg",
      "1366x768": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1366x768.jpg",
      "1280x768": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1280x768.jpg",
      "1024x768": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1024x768.jpg",
      "800x600": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_800x600.jpg",
      "800x480": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_800x480.jpg",
      "768x1280": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_768x1280.jpg",
      "720x1280": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_720x1280.jpg",
      "640x480": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_640x480.jpg",
      "480x800": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_480x800.jpg",
      "400x240": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_400x240.jpg",
      "320x240": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_320x240.jpg",
      "240x320": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_240x320.jpg"
    }
  }
}`
          }
        </pre>
      </div>
    </Layout>
  )
}