import { useCallback } from 'react';
import { getDateString } from '../../lib/preset';
import styles from './ImageCard.module.css';

export default function ImageCard({ content, onClick }) {
  const thumbnailRef = useCallback(node => {
    if (!node) return;

    const id = node.dataset.id;
    const isHighResScreen = window.devicePixelRatio > 1 && window.screen.width * window.devicePixelRatio > 640;
    const defaultThumbnailURL = `https://www.bing.com/th?id=${id}_640x360.jpg`;
    const highResThumbnailURL = `https://www.bing.com/th?id=${id}_1280x720.jpg`;

    const promises = [loadImage(defaultThumbnailURL)];
    isHighResScreen && promises.push(loadImage(highResThumbnailURL));

    Promise
      .all(promises)
      .then(() => {
        node.style.backgroundImage = `url(${isHighResScreen ? highResThumbnailURL : defaultThumbnailURL})`;
        node.style.opacity = 1;
      });

    function loadImage(url) {
      return new Promise(resolve => {
        const img = document.createElement('img');
        img.onload = resolve;
        img.src = url;
      });
    }
  }, []);

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
        data-id={content.id}
      />
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