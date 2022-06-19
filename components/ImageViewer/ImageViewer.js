import Head from 'next/head';
import { saveAs } from 'file-saver';
import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './ImageViewer.module.css';

export default function ImageViewer({ imageContent, onClose }) {
  const backgroundImageRef = useRef(null);
  const [showDownloadList, setShowDownloadList] = useState(false);
  const [isScreenWidthLow, setIsScreenWidthLow] = useState(false);
  const [isDetailFolded, setIsDetailFolded] = useState(false);

  const imageURLs = useMemo(() => ({
    '640x360': `https://www.bing.com/th?id=${imageContent.id}_640x360.jpg`,
    '1920x1080': `https://www.bing.com/th?id=${imageContent.id}_1920x1080.jpg`
  }), [imageContent.id]);

  // check screen width
  useEffect(() => {
    window.screen.width < 600 && setIsScreenWidthLow(true);
  }, []);


  // load 1080p image and modify background image
  useEffect(() => {
    const backgroundImage = document.createElement('img');
    backgroundImage.onload = () => {
      backgroundImageRef.current.style.backgroundImage = `url(${imageURLs['1920x1080']}), url(${imageURLs['640x360']})`;
    }
    backgroundImage.src = imageURLs['1920x1080'];
  }, [imageURLs]);

  function handleResolutionClicked(e) {
    const res = e.target.dataset.res;
    const url = imageContent.urls[res];
    saveAs(url, `${imageContent.id}_${res}.jpg`);
  }

  return (
    <div
      className={styles.container}
      onClick={() => showDownloadList && setShowDownloadList(false)}
    >
      <Head>
        <title>{'Bing Gallery' + ` - ${imageContent.title}`}</title>
      </Head>

      <div
        ref={backgroundImageRef}
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${imageURLs['640x360']})` }}
      />

      <div className={styles.buttonGroup}>
        <span className={`${styles.closeButton} material-symbols-outlined`} onClick={onClose}>close</span>
        <span className={`${styles.downloadButton} material-symbols-outlined`} onClick={() => setShowDownloadList(!showDownloadList)}>file_download</span>
      </div>

      <div className={styles.detailContainer} onClick={() => isScreenWidthLow && setIsDetailFolded(!isDetailFolded)}>
        <div className={styles.detailTitleContainer}>
          <span>{imageContent.title} {imageContent.copyright}</span>
          <span className={`${styles.expandDetailButton} material-symbols-outlined`}>{ isDetailFolded ? 'expand_less' : 'expand_more' }</span>
        </div>
        <span className={`${styles.descriptionText} ${isDetailFolded ? styles.hiddenDescriptionText : ''}`}>
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
                      { res === 'UHD' ? '4K UHD' : res }
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

