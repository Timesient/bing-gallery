import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry, setCurrentCountry } from '../store/countrySlice';

import { getGlobalImageData } from '../lib/getImageData';
import Layout from '../components/Layout/Layout';
import CountrySelect from '../components/CountrySelect/CountrySelect';
import ImageViewer from '../components/ImageViewer/ImageViewer';
import ToTopButton from '../components/ToTopButton/ToTopButton';
import styles from '../styles/Home.module.css';
import ImageCard from '../components/ImageCard/ImageCard';

export async function getServerSideProps(context) {
  const globalData = getGlobalImageData();

  return {
    props: {
      globalData
    }
  }
}

export default function Home({ globalData }) {
  const [imageContents, setImageContents] = useState(null);
  const [imageViewerContent, setImageViewerContent] = useState(null);
  const currentCountry = useSelector(selectCurrentCountry);
  const dispatch = useDispatch();
  
  // init global data for display & load data when tab changes
  useEffect(() => {
    (async () => {
      const data = currentCountry === 'global' ? globalData : await axios.get(`/api/images?mode=all&cc=${currentCountry}`).then(res => res.data.data);
      setImageContents(data);
    })();
  }, [currentCountry, globalData])

  
  // handle country select changes
  function handleSelectChanged(value) {
    dispatch(setCurrentCountry(value))
  }

  // click card and show image viewer
  function handleCardClicked(index) {
    setImageViewerContent(imageContents[index]);
  }

  return (
    <Layout location="Home">
      <main className={styles.container}>
        <Head>
          <title>Bing Gallery</title>
        </Head>

        <div className={styles.controlPanel}>
          <div className={styles.locationSelectContainer}>
            <span className={styles.locationSelectLabel}>Location: </span>
            <CountrySelect onChange={handleSelectChanged} />
          </div>
        </div>
        
        <div className={styles.cardContainer}>
          {
            imageContents && imageContents.map((content, index) => (
              <div key={`${content.id}-${index}`} className={styles.imageCardWrapper}>
                <ImageCard content={content} index={index} onClick={handleCardClicked}/>
              </div>
            ))
          }
        </div>

        <ToTopButton />

        { imageContents && <p className={styles.bottomText}>All images are loaded.</p> }

        { imageViewerContent && <ImageViewer content={imageViewerContent} onClose={() => setImageViewerContent(null)} /> }

      </main>
    </Layout>
  )
}
