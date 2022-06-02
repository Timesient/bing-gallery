import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCountry } from '../store/countrySlice';
import { countryConfig } from '../lib/preset';


export default function Home() {
  const [imageContents, setImageContents] = useState(null);
  const currentCountry = useSelector(selectCurrentCountry);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/images?mode=all&resolution=all&cc=${currentCountry}`).then(res => res.data.data);
      console.log(data);
      setImageContents(data);
    })();
  }, [currentCountry]);

  return (
    <main className={styles.container}>
      <Head>
        <title>Bing Gallery</title>
      </Head>

      <div className={styles.imageContainer}>
        {
          imageContents && imageContents.map(imageContent => (
            <div key={imageContent.id} className={styles.imageContentCardWrapper}>
              <div className={styles.imageContentCard}>
                <Image 
                  src={imageContent.urls['640x480']}
                  width={320}
                  height={240}
                  alt={imageContent.title}
                />
                <div className={styles.textContainer}>
                  <span className={styles.titleText}>{ imageContent.title }</span>
                  <span className={styles.copyrightText}>{ imageContent.copyright }</span>
                  <span className={styles.dateText}>
                    {
                      (() => {
                        const time = new Date(imageContent.timestamp + countryConfig[currentCountry].timezone * 60 * 60 * 1000);
                        const year = time.getUTCFullYear();
                        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getUTCMonth()];
                        const date = time.getUTCDate();
                        // const hour = time.getUTCHours();
                        return `${month} ${date}, ${year}`;
                        // return `UTC: date ${date} hour ${hour}`;
                      })()
                    }
                  </span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      
    </main>
  )
}
