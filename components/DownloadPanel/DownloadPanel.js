import { useEffect, useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ResolutionSelect from '../ResolutionSelect/ResolutionSelect';
import styles from './DownloadPanel.module.css';

export default function DownloadPanel({ content, isUsingSearch, onClose }) {
  const [resolution, setResolution] = useState('UHD');
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageContents, setImageContents] = useState([]);

  // disable scrolling
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => document.body.style.overflowY = 'auto';
  }, []);

  // if is downloading, get image content or pop up download prompt window
  useEffect(() => {
    if (!isDownloading) return;

    if (imageContents.length !== content.length) {
      getImageContent(imageContents.length);
    } else {
      const zip = JSZip();
      const folder = zip.folder('Bing-Wallpapers');
      imageContents.forEach(imageContent => folder.file(`${imageContent.title}.jpg`, imageContent.buffer));

      zip.generateAsync({ type: "blob" })
        .then(content => {
          saveAs(content, 'Bing-Wallpapers.zip');
          setIsDownloading(false);
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownloading, imageContents.length]);

  // get image content according to index
  async function getImageContent(index) {
    const imageContent = {
      title: `${content[index].title}_${content[index].id}_${resolution}`,
      url: `https://www.bing.com/th?id=${content[index].id}_${resolution}.jpg`,
    }

    await axios
      .get(imageContent.url, { responseType: 'arraybuffer' })
      .then(res => imageContent.buffer = res.data);

    setImageContents([...imageContents, imageContent]);
  }

  return (
    <div className={styles.mask}>
      <div className={styles.container}>
        <span className={styles.title}>Download Images</span>
        <div className={styles.configItem}>
          <span className={styles.configItemTitle}>From: </span>
          <span className={styles.configItemValue}>{isUsingSearch ? "Search Result" : "Current Location"}</span>
        </div>
        <div className={styles.configItem}>
          <span className={styles.configItemTitle}>Amount: </span>
          <span className={styles.configItemValue}>{content.length}</span>
        </div>
        <div className={styles.configItem}>
          <span className={styles.configItemTitle}>Resolution: </span>
          <ResolutionSelect
            onChange={(newResolution) => {
              setResolution(newResolution);
              setImageContents([]);
            }}
          />
        </div>
        <div className={styles.configItem}>
          <span className={styles.configItemTitle}>Progress: </span>
          <span className={styles.configItemValue}>( {imageContents.length} / {content.length} )</span>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.controlButton}
            onClick={() => {
              setIsDownloading(false);
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className={`${styles.controlButton} ${isDownloading ? styles.downloadingStartButton : ''}`}
            onClick={() => {
              if (content.length === 0 || isDownloading) return;
              setIsDownloading(true);
            }}
          >
            { isDownloading ? 'Downloading' : 'Start' }
          </button>
        </div>
      </div>
    </div>
  )
}