import Head from 'next/head';
import { saveAs } from 'file-saver';
import { useState, useRef, useEffect } from 'react';
import styles from './ImageViewer.module.css';

export default function ImageViewer({ imageContent, onClose }) {
  const backgroundImageRef = useRef(null);
  const [showDownloadList, setShowDownloadList] = useState(false);

  // load 1080p image and modify background image
  useEffect(() => {
    const backgroundImage = document.createElement('img');
    backgroundImage.onload = () => {
      backgroundImageRef.current.style.backgroundImage = `url(${backgroundImage.src}), url(https://www.bing.com/th?id=${imageContent.id}_640x360.jpg)`;
      backgroundImageRef.current.style.filter = 'blur(0)';
    }
    backgroundImage.src = `https://www.bing.com/th?id=${imageContent.id}_1920x1080.jpg`;
  }, [imageContent]);

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
        style={{ backgroundImage: `url(https://www.bing.com/th?id=${imageContent.id}_640x360.jpg)` }}
      />

      <div className={styles.buttonGroup}>
        <span className={`${styles.closeButton} material-symbols-outlined`} onClick={onClose}>close</span>
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

