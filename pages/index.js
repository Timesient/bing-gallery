import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry, setCurrentCountry } from '../store/countrySlice';
import { selectYPosition, setYPosition } from '../store/scrollSlice';
import { countryConfig } from '../lib/preset';
import Layout from '../components/Layout/Layout';
import Select from '../components/Select/Select';

export default function Home() {
  const [imageContents, setImageContents] = useState(null);
  const [distanceToTop, setDistanceToTop] = useState(0);
  const [isRenderCompleted, setIsRenderCompleted] = useState(false);
  const currentCountry = useSelector(selectCurrentCountry);
  const yPosition = useSelector(selectYPosition);
  const dispatch = useDispatch();
  const router = useRouter();

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

  useEffect(() => {
    setDistanceToTop(window.scrollY);

    window.onscroll = () => {
      setDistanceToTop(window.scrollY);
    }

    return () => {
      window.onscroll = null;
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/images?mode=all&cc=${currentCountry}`).then(res => res.data.data);
      setImageContents(data);
      
      if (yPosition !== 0) {
        setTimeout(() => {
          window.scrollTo(0, yPosition);
          dispatch(setYPosition(0));
        }, 0);
      }

      setTimeout(() => {
        setIsRenderCompleted(true);
      }, 0);
    })();
  }, [currentCountry, dispatch]);

  function getDateString(timestamp) {
    const time = new Date(timestamp + countryConfig[currentCountry].timezone * 60 * 60 * 1000);
    const year = time.getUTCFullYear();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getUTCMonth()];
    const date = time.getUTCDate();
    return `${month} ${date}, ${year}`;
  }

  function handleSelectChanged(value) {
    dispatch(setCurrentCountry(value))
  }

  function handleCardClicked(e) {
    e.preventDefault();

    const cardID = e.currentTarget.dataset.id;
    dispatch(setYPosition(window.scrollY));
    router.push(`/detail/${cardID}`);
  }

  function handleToTopButtonClicked() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <Layout location="Home">

      <div className={[
        styles.loadingMask,
        isRenderCompleted ? styles.loadingMaskHidden : ''
      ].join(' ')} />

      <main className={styles.container}>
        <Head>
          <title>Bing Gallery</title>
        </Head>

        <div className={styles.countrySelectContainer}>
          <span className={styles.countrySelectLabel}>Current :</span>
          <Select
            extraClassNames={[styles.select]}
            options={options}
            selectedOption={selectedOption}
            onChange={handleSelectChanged}
          />
        </div>
        
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
                    src={imageContent.urls['800x480']}
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

        <span 
          className={[
            styles.toTopButton,
            'material-symbols-outlined',
            distanceToTop === 0 ? styles.toTopButtonHidden : ''
          ].join(' ')}
          onClick={handleToTopButtonClicked}
        >
          arrow_upward
        </span>
      </main>
    </Layout>
  )
}
