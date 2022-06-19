import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDateString } from '../../lib/preset';
import styles from './ImageCard.module.css';

export default function ImageCard({ content, index, onClick }) {
  const [needHighResThumbnail, setNeedHighResThumbnail] = useState(false);

  // check if high resolution thumbnail is needed
  useEffect(() => {
    if (window.devicePixelRatio > 1 && window.screen.width * window.devicePixelRatio > 640) setNeedHighResThumbnail(true);
  }, []);

  function handleCardClicked(e) {
    e.preventDefault();
    onClick(e.currentTarget.dataset.index);
  }

  return (
    <a
      href={`/detail/${content.id}`}
      className={styles.container}
      onClick={handleCardClicked}
      data-index={index}
    >
      <Image
        src={`${content.urls[needHighResThumbnail ? '1280x720' : '640x360']}`}
        width={360}
        height={240}
        placeholder="blur"
        blurDataURL={`${content.urls['640x360']}`}
        alt={content.id}
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