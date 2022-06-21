import { useState, useRef, useEffect } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageCardContainer.module.css';

export default function ImageCardContainer({ contents, handleCardClicked }) {
  const [chunkCounter, setChunkCounter] = useState(0);
  const bottomTextRef = useRef(null);


  // reset chunk counter when contents changes
  useEffect(() => {
    setChunkCounter(0);
  }, [contents])


  // setup intersection observer for bottom-text-element
  useEffect(() => {
    if (!contents || chunkCounter * 3 >= contents.length) return;

    function observeCallback(entries) {
      entries[0].isIntersecting && setChunkCounter(chunkCounter + 1);
    }

    const options = {
      rootMargin: "0px 0px 400px 0px"
    }

    const io = new IntersectionObserver(observeCallback, options);
    io.observe(bottomTextRef.current);

    return () => {
      io.disconnect();
    }
  }, [chunkCounter, contents]);


  return (
    <>
      <div className={styles.container}>
        {
          contents &&
          contents
            .slice(0, chunkCounter * 3)
            .map((content, index) => (
              <div key={`${content.id}-${index}`} className={styles.imageCardWrapper}>
                <ImageCard content={content} onClick={handleCardClicked}/>
              </div>
            ))
        }
      </div>

      <p className={styles.bottomText} ref={bottomTextRef}>
        {
          contents && contents.length > 0
          ? 'All images are loaded.'
          : 'No image found.'
        }
      </p>
    </>
  )
}