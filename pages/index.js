import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry } from '../store/countrySlice';
import { selectYPosition, setYPosition } from '../store/scrollSlice';
import { countryConfig } from '../lib/preset';
import Layout from '../components/Layout/Layout';

export default function Home() {
  const [imageContents, setImageContents] = useState(null);
  const currentCountry = useSelector(selectCurrentCountry);
  const yPosition = useSelector(selectYPosition);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/images?mode=all&resolution=all&cc=${currentCountry}`).then(res => res.data.data);
      setImageContents(data);
      
      if (yPosition !== 0) {
        window.scrollTo(0, yPosition);
        dispatch(setYPosition(0));
      }
    })();
  }, [currentCountry, dispatch]);

  function getDateString(timestamp) {
    const time = new Date(timestamp + countryConfig[currentCountry].timezone * 60 * 60 * 1000);
    const year = time.getUTCFullYear();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getUTCMonth()];
    const date = time.getUTCDate();
    return `${month} ${date}, ${year}`;
  }

  function handleCardClicked(e) {
    e.preventDefault();

    const cardID = e.currentTarget.dataset.id;
    dispatch(setYPosition(window.scrollY));
    router.push(`/detail/${cardID}`);
  }

  return (
    <Layout location="Home">
      <main className={styles.container}>
        <Head>
          <title>Bing Gallery</title>
        </Head>

        <div className={styles.imageContainer}>
          {
            imageContents && imageContents.map((imageContent, index) => (
              <div key={`${imageContent.id}-${index}`} className={styles.imageContentCardWrapper}>
                  <a
                    href={`/detail/${imageContent.id}`}
                    className={styles.imageContentCard}
                    onClick={handleCardClicked}
                    data-id={imageContent.id}
                  >
                    <Image 
                      src={imageContent.urls['640x480']}
                      width={320}
                      height={240}
                      alt={imageContent.title}
                    />
                    <div className={styles.textContainer}>
                      <span className={styles.titleText}>{ imageContent.title }</span>
                      <span className={styles.copyrightText}>{ imageContent.copyright }</span>
                      <div className={styles.dateContainer}>
                        <span className={`${styles.dateIcon} material-symbols-outlined`}>calendar_month</span>
                        &nbsp;
                        <span className={styles.dateText}>{getDateString(imageContent.timestamp)}</span>
                      </div>
                    </div>
                  </a>
              </div>
            ))
          }
        </div>

        { imageContents && <p className={styles.bottomText}>All images are loaded.</p> }
      </main>
    </Layout>
  )
}
