import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry, setCurrentCountry } from '../store/countrySlice';
import { selectImageData, setImageData } from '../store/imageDataSlice';
import { getGlobalImageData, getUnmergedGlobalImageData } from '../lib/getImageData';
import Layout from '../components/Layout/Layout';
import CountrySelect from '../components/CountrySelect/CountrySelect';
import Search from '../components/Search/Search';
import ImageCard from '../components/ImageCard/ImageCard';
import ImageViewer from '../components/ImageViewer/ImageViewer';
import ToTopButton from '../components/ToTopButton/ToTopButton';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const globalData = getGlobalImageData();
  const unmergedGlobalData = getUnmergedGlobalImageData();

  return {
    props: {
      globalData,
      unmergedGlobalData
    }
  }
}

export default function Home({ globalData, unmergedGlobalData }) {
  const [imageContents, setImageContents] = useState(null);
  const [imageViewerContent, setImageViewerContent] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredImageContents, setFilteredImageContents] = useState(null);
  const [chunkCounter, setChunkCounter] = useState(0);
  const bottomTextRef = useRef(null);
  const storeImageData = useSelector(selectImageData);
  const currentCountry = useSelector(selectCurrentCountry);
  const dispatch = useDispatch();
  const router = useRouter();


  // init store with merged global data & update image contents when tab changes
  useEffect(() => {
    (async () => {
      let data;
      if (currentCountry === 'global') data = globalData;
      else data = storeImageData[currentCountry] || await axios.get(`/api/images?mode=all&cc=${currentCountry}`).then(res => res.data.data);
      
      if (!(currentCountry in storeImageData)) dispatch(setImageData({ key: currentCountry, value: data }));
     
      setImageContents(data);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCountry]);


  // update filtered image contents & reset chunkCounter
  useEffect(() => {
    if (!imageContents) return;

    function searchFilter(contents) {
      return contents.filter(content => {
        const targets = [content.headline, content.title, content.copyright, content.description, content.quickFact, content.id];
        return targets.some(target => target.toString().toLowerCase().includes(searchValue.trim().toLowerCase()))
      });
    }

    let filteredData;
    if (currentCountry === 'global') {
      filteredData = Object
        .values(unmergedGlobalData)
        .reduce((acc, cur) => {    
          const matchedDatasets = searchFilter(cur);
          matchedDatasets.length !== 0 && acc.push(matchedDatasets.sort((a, b) => b.timestamp - a.timestamp)[0]);

          return acc;
        }, [])
        .sort((a, b) => b.timestamp - a.timestamp);
    } else {
      filteredData = searchFilter(imageContents);
    }

    setChunkCounter(0);
    setFilteredImageContents(filteredData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, imageContents]);


  // setup intersection observer for bottom-text-element
  useEffect(() => {
    if (!filteredImageContents || chunkCounter * 3 >= filteredImageContents.length) return;

    function observeCallback(entries) {
      entries[0].isIntersecting && setChunkCounter(chunkCounter + 1);
    }

    const options = {
      rootMargin: "0px 0px 0px 0px"
    }

    const io = new IntersectionObserver(observeCallback, options);
    io.observe(bottomTextRef.current);

    return () => {
      io.disconnect();
    }
  }, [chunkCounter, filteredImageContents]);

  
  // handle country select changes
  function handleSelectChanged(value) {
    dispatch(setCurrentCountry(value))
  }

  // handle search input value changes
  function handleSearchChanged(value) {
    setSearchValue(value);
  }

  // click card and show image viewer
  function handleCardClicked(id) {
    router.push(`/#${id}`);
    const content = filteredImageContents.filter(content => content.id === id)[0];
    setImageViewerContent(content);
  }

  return (
    <Layout location="Home">
      <main className={styles.container}>
        <Head>
          <title>Bing Gallery</title>
        </Head>

        <div className={styles.controlPanel}>
          <div className={styles.locationSelectContainer}>
            <span className={styles.locationSelectLabel}>Location: </span>
            <CountrySelect onChange={handleSelectChanged} />
          </div>
          <div className={styles.searchContainer}>
            <Search onChange={handleSearchChanged}/>
          </div>
        </div>
        
        <div className={styles.cardContainer}>
          {
            filteredImageContents &&
            filteredImageContents
              .slice(0, chunkCounter * 3)
              .map((content, index) => (
                <div key={`${content.id}-${index}`} className={styles.imageCardWrapper}>
                  <ImageCard content={content} onClick={handleCardClicked}/>
                </div>
              ))
          }
        </div>

        <ToTopButton />

        <p className={styles.bottomText} ref={bottomTextRef}>
          {
            filteredImageContents && filteredImageContents.length > 0
            ? 'All images are loaded.'
            : 'No image found.'
          }
        </p>

        { imageViewerContent && <ImageViewer content={imageViewerContent} onClose={() => setImageViewerContent(null)} /> }

      </main>
    </Layout>
  )
}
