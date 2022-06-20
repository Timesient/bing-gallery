import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry, setCurrentCountry } from '../store/countrySlice';
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
  const currentCountry = useSelector(selectCurrentCountry);
  const dispatch = useDispatch();
  const router = useRouter();


  // init global data for display & load data when tab changes
  useEffect(() => {
    (async () => {
      const data = currentCountry === 'global' ? globalData : await axios.get(`/api/images?mode=all&cc=${currentCountry}`).then(res => res.data.data);
      setImageContents(data);
    })();
  }, [currentCountry, globalData]);


  // update filtered image contents
  useEffect(() => {
    if (!imageContents || !unmergedGlobalData) return;

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

    setFilteredImageContents(filteredData);
  }, [searchValue, imageContents, currentCountry, unmergedGlobalData]);

  
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
            filteredImageContents.map((content, index) => (
              <div key={`${content.id}-${index}`} className={styles.imageCardWrapper}>
                <ImageCard content={content} onClick={handleCardClicked}/>
              </div>
            ))
          }
        </div>

        <ToTopButton />

        {
          filteredImageContents &&
          <p className={styles.bottomText}>
            {
              filteredImageContents.length > 0
              ? 'All images are loaded.'
              : 'No image found.'
            }
          </p>
        }

        { imageViewerContent && <ImageViewer content={imageViewerContent} onClose={() => setImageViewerContent(null)} /> }

      </main>
    </Layout>
  )
}
