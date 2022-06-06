import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../styles/Detail.module.css';
import { setCurrentCountry } from '../../store/countrySlice';
import { getCertainImageData } from '../../lib/getImageData';
import { resolutionConfig, countryConfig } from '../../lib/preset';

export async function getServerSideProps(context) {
  const id = context.query.id;
  const languageCode = id.split('_')[1].match(/(.*)\d{10}/)[1];
  const countryCode = Object.keys(countryConfig).filter(countryCode => countryConfig[countryCode].languageCode === languageCode)[0];
  const imageContent = getCertainImageData(id, resolutionConfig, countryCode);

  return {
    props: {
      countryCode,
      imageContent,
    }
  }
}

export default function Detail({ countryCode, imageContent })  {
  const [showDownloadList, setShowDownloadList] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(setCurrentCountry(countryCode));
  }, [dispatch, countryCode]);

  function handleContainerClicked(e) {
    if (showDownloadList) {
      setShowDownloadList(false);
    }
  }

  function handleResolutionClicked(e) {
    const res = e.target.dataset.res;
    const url = imageContent.urls[res];
    saveAs(url, `${imageContent.id}_${res}.jpg`);
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(https://www.bing.com/th?id=${id}_1920x1080.jpg)` }}
      onClick={handleContainerClicked}
    >
      <Head>
        <title>{'Bing Gallery' + (imageContent ? ` - ${imageContent.title}` : '')}</title>
      </Head>

      <div className={styles.buttonGroup}>
        <Link href="/">
          <span className={`${styles.returnButton} material-symbols-outlined`}>chevron_left</span>
        </Link>
        <span className={`${styles.downloadButton} material-symbols-outlined`} onClick={() => setShowDownloadList(!showDownloadList)}>file_download</span>
      </div>

      <div className={styles.detailContainer}>
        <span>{imageContent.title} {imageContent.copyright}</span>
        <span className={styles.descriptionText}>
          {imageContent.description}&nbsp;
          <a className={styles.knowMoreLink} href={imageContent.knowMoreURL} target="_blank" rel="noopener noreferrer">Know More</a>
        </span>
      </div>

      {
        showDownloadList && (
          <div className={styles.downloadListContainer}>
            <span>Resolution:</span>
            <div className={styles.downloadList}>
              {
                Object
                  .keys(imageContent.urls)
                  .filter(res => ['UHD', '1920x1080', '1366x768', '1280x768', '1024x768', '800x600', '640x480'].includes(res))
                  .map(res => (
                    <span
                      key={res}
                      data-res={res}
                      className={styles.resText}
                      onClick={handleResolutionClicked}
                    >
                      {res}
                    </span>
                  ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}