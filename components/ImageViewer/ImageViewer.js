import Head from 'next/head';
import { useRouter } from 'next/router';
import { saveAs } from 'file-saver';
import { useState, useRef, useEffect } from 'react';
import styles from './ImageViewer.module.css';

export default function ImageViewer({ content, onClose }) {
  const backgroundImageRef = useRef(null);
  const [showDownloadList, setShowDownloadList] = useState(false);
  const [isLowWidthScreen, setIsLowWidthScreen] = useState(false);
  const [isDetailFolded, setIsDetailFolded] = useState(false);
  const router = useRouter();

  // handle navigator back button clicked
  useEffect(() => {
    function handleHashChange(e) {
      onClose();
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    }
  }, [onClose]);

  // check screen width
  useEffect(() => {
    window.screen.width < 600 && setIsLowWidthScreen(true);
  }, []);

  // disable body scroll
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  // load 1080p image and modify background image
  useEffect(() => {
    const imageURLs = {
      '640x360': `https://www.bing.com/th?id=${content.id}_640x360.jpg`,
      '1920x1080': `https://www.bing.com/th?id=${content.id}_1920x1080.jpg`
    }

    // initial background image
    backgroundImageRef.current.style.backgroundImage = `url(${imageURLs['640x360']})`

    const backgroundImage = document.createElement('img');
    backgroundImage.onload = () => {
      // update background image
      backgroundImageRef.current.style.backgroundImage = `url(${imageURLs['1920x1080']}), url(${imageURLs['640x360']})`;
    }
    backgroundImage.src = imageURLs['1920x1080'];
  }, [content.id]);

  function handleCloseButtonClicked() {
    router.back();
    onClose();
  }

  function handleResolutionClicked(e) {
    const res = e.target.dataset.res;
    const url = content.urls[res];
    saveAs(url, `${content.id}_${res}.jpg`);
  }

  return (
    <div
      className={styles.container}
      onClick={() => showDownloadList && setShowDownloadList(false)}
    >
      <Head>
        <title>{'Bing Gallery' + ` - ${content.title}`}</title>
      </Head>

      <div ref={backgroundImageRef} className={styles.backgroundImage} />

      <div className={styles.buttonGroup}>
        <span className={`${styles.closeButton} material-symbols-outlined`} onClick={handleCloseButtonClicked}>close</span>
        <span className={`${styles.downloadButton} material-symbols-outlined`} onClick={() => setShowDownloadList(!showDownloadList)}>file_download</span>
      </div>

      <div className={styles.detailContainer} onClick={() => isLowWidthScreen && setIsDetailFolded(!isDetailFolded)}>
        <div className={styles.detailTitleContainer}>
          <span>{content.title} {content.copyright}</span>
          <span className={`${styles.expandDetailButton} material-symbols-outlined`}>{ isDetailFolded ? 'expand_less' : 'expand_more' }</span>
        </div>
        <span className={`${styles.descriptionText} ${isDetailFolded ? styles.hiddenDescriptionText : ''}`}>
          {content.description}&nbsp;
          <a className={styles.knowMoreLink} href={content.knowMoreURL} target="_blank" rel="noopener noreferrer">Know More</a>
        </span>
      </div>

      {
        showDownloadList && (
          <div className={styles.downloadListContainer}>
            <span>Resolution:</span>
            <div className={styles.downloadList}>
              {
                Object
                  .keys(content.urls)
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

