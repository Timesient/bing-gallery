import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry, setCurrentCountry } from '../store/countrySlice';
import { countryConfig, getCountryCodeByID } from '../lib/preset';
import { getGlobalImageData } from '../lib/getImageData';
import Layout from '../components/Layout/Layout';
import Select from '../components/Select/Select';
import ImageViewer from '../components/ImageViewer/ImageViewer';
import styles from '../styles/Home.module.css';

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
  const [isGlobal, setIsGlobal] = useState(true);
  const [imageViewerContent, setImageViewerContent] = useState(null);
  const [distanceToTop, setDistanceToTop] = useState(0);
  const currentCountry = useSelector(selectCurrentCountry);
  const dispatch = useDispatch();

  // prepare options for country select
  const options = Object.keys(countryConfig).map(cc => ({
    value: cc,
    label: (
      <div className={styles.option}>
        <Image
          src={`/images/${cc}.png`}
          width={24}
          height={24}
          alt={cc}
          layout="fixed"
        />
        <span className={styles.optionLabel}>{countryConfig[cc].fullname}</span>
      </div>
    )
  }));

  const selectedOption = options.filter(option => option.value === currentCountry)[0];

  // init global data for display & load data when tab changes
  useEffect(() => {
    (async () => {
      const data = isGlobal ? globalData : await axios.get(`/api/images?mode=all&cc=${currentCountry}`).then(res => res.data.data);
      setImageContents(data);
    })();
  }, [isGlobal, globalData, currentCountry])

  // for to-top button
  useEffect(() => {
    setDistanceToTop(window.scrollY);

    window.onscroll = () => {
      setDistanceToTop(window.scrollY);
    }

    return () => {
      window.onscroll = null;
    }
  }, []);

  // disable scroll when showing image viewer
  useEffect(() => {
    document.body.style.overflowY = imageViewerContent ? 'hidden' : 'auto';
  }, [imageViewerContent]);

  // generate date string for cards
  function getDateString({ id, timestamp }) {
    const countryCode = getCountryCodeByID(id);
    const time = new Date(timestamp + countryConfig[countryCode].timezone * 60 * 60 * 1000);
    const year = time.getUTCFullYear();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getUTCMonth()];
    const date = time.getUTCDate();
    return `${month} ${date}, ${year}`;
  }

  // handle country select changes
  function handleSelectChanged(value) {
    dispatch(setCurrentCountry(value))
  }

  // click card and show image viewer
  function handleCardClicked(e) {
    e.preventDefault();

    const imageContent = imageContents[e.currentTarget.dataset.index];
    setImageViewerContent(imageContent);
  }

  return (
    <Layout location="Home">
      <main className={styles.container}>
        <Head>
          <title>Bing Gallery</title>
        </Head>

        <div className={styles.controlPanel}>
          <div className={styles.tabSelectContainer}>
            <span className={isGlobal ? styles.selectedTab : styles.notSelectedTab} onClick={() => {setIsGlobal(true)}}>Global</span>
            <span className={isGlobal ? styles.notSelectedTab : styles.selectedTab} onClick={() => {setIsGlobal(false)}}>Country</span>
          </div>
          {
            !isGlobal && (
              <Select
                extraClassNames={[styles.select]}
                options={options}
                selectedOption={selectedOption}
                onChange={handleSelectChanged}
              />
            )
          }
        </div>
        
        <div className={styles.imageContainer}>
          {
            imageContents && imageContents.map((imageContent, index) => (
              <div key={`${imageContent.id}-${index}`} className={styles.imageContentCardWrapper}>
                <a
                  href={`/detail/${imageContent.id}`}
                  className={styles.imageContentCard}
                  onClick={handleCardClicked}
                  data-index={index}
                >
                  <div
                    className={styles.imageThumbnail}
                    style={{
                      backgroundImage: `url(${imageContent.urls['640x360']})`,
                    }}
                  />
                  <div className={styles.textContainer}>
                    <span className={styles.titleText}>{ imageContent.title }</span>
                    <span className={styles.copyrightText}>{ imageContent.copyright }</span>
                    <div className={styles.dateContainer}>
                      <span className={`${styles.dateIcon} material-symbols-outlined`}>calendar_month</span>
                      &nbsp;
                      <span className={styles.dateText}>{getDateString(imageContent)}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))
          }
        </div>

        { imageContents && <p className={styles.bottomText}>All images are loaded.</p> }

        <span 
          className={[
            styles.toTopButton,
            'material-symbols-outlined',
            distanceToTop === 0 ? styles.toTopButtonHidden : ''
          ].join(' ')}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        >
          arrow_upward
        </span>

        {
          imageViewerContent && <ImageViewer imageContent={imageViewerContent} onClose={() => setImageViewerContent(null)} />
        }

      </main>
    </Layout>
  )
}
