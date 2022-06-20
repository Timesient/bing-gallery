import { useEffect, useRef } from 'react';
import { getDateString } from '../../lib/preset';
import styles from './ImageCard.module.css';

export default function ImageCard({ content, onClick }) {
  const thumbnailRef = useRef();

  // check if higher resolution thumbnail is needed
  useEffect(() => {
    if (window.devicePixelRatio > 1 && window.screen.width * window.devicePixelRatio > 640) {
      const higherResThumbnail = document.createElement('img');
      higherResThumbnail.onload = () => {
        thumbnailRef.current.style.backgroundImage = `url(${higherResThumbnail.src})`;
      }
      higherResThumbnail.src = content.urls['1280x720'];
    }
  }, [content.urls]);

  function handleCardClicked(e) {
    e.preventDefault();
    onClick(content.id);
  }

  return (
    <a
      href={`/detail/${content.id}`}
      className={styles.container}
      onClick={handleCardClicked}
    >
      <div 
        ref={thumbnailRef}
        className={styles.thumbnail}
        style={{
          backgroundImage: `url(${content.urls['640x360']})`
        }}
      >
      </div>
      <div className={styles.textContainer}>
        <span className={styles.titleText}>{ content.title }</span>
        <span className={styles.copyrightText}>{ content.copyright }</span>
        <div className={styles.dateContainer}>
          <span className={`${styles.dateIcon} material-symbols-outlined`}>calendar_month</span>
          &nbsp;
          <span className={styles.dateText}>{getDateString(content.id, content.timestamp)}</span>
        </div>
      </div>
    </a>
  )
}