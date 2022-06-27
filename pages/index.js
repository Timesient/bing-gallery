import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCountry, setCurrentCountry } from '../store/countrySlice';
import { selectImageData, setImageData } from '../store/imageDataSlice';
import { getGlobalImageData } from '../lib/getImageData';
import Layout from '../components/Layout/Layout';
import CountrySelect from '../components/CountrySelect/CountrySelect';
import Search from '../components/Search/Search';
import ImageCardContainer from '../components/ImageCardContainer/ImageCardContainer';
import ImageViewer from '../components/ImageViewer/ImageViewer';
import ToTopButton from '../components/ToTopButton/ToTopButton';
import styles from '../styles/Home.module.css';

export async function getStaticProps(context) {
  const globalDataSlice = getGlobalImageData().slice(0, 9);

  return {
    props: {
      globalDataSlice,
    },
    revalidate: 60 // 60 seconds
  }
}

export default function Home({ globalDataSlice }) {
  const [searchValue, setSearchValue] = useState('');
  const [filteredImageContents, setFilteredImageContents] = useState(null);
  const [imageViewerContent, setImageViewerContent] = useState(null);
  const storeImageData = useSelector(selectImageData);
  const currentCountry = useSelector(selectCurrentCountry);
  const dispatch = useDispatch();
  const router = useRouter();


  // init & update filtered image contents
  useEffect(() => {
    (async () => {
      let filteredData;

      if (currentCountry === 'global') {
        let unmergedGlobalData = storeImageData['global-unmerged'];
        if (!unmergedGlobalData) {
          unmergedGlobalData = await axios.get(`/api/unmergedGlobalData`).then(res => res.data.data);
          dispatch(setImageData({ key: 'global-unmerged', value: unmergedGlobalData }));
        }

        filteredData = Object
          .values(unmergedGlobalData)
          .reduce((acc, cur) => {
            const matchedDatasets = searchFilter(cur);
            matchedDatasets.length !== 0 && acc.push(matchedDatasets.sort((a, b) => b.timestamp - a.timestamp)[0]);

            return acc;
          }, [])
          .sort((a, b) => b.timestamp - a.timestamp);
      } else {
        let countryData = storeImageData[currentCountry];
        if (!countryData) {
          countryData = await axios.get(`/api/images?mode=all&cc=${currentCountry}`).then(res => res.data.data);
          dispatch(setImageData({ key: currentCountry, value: countryData }));
        }

        filteredData = searchFilter(countryData);
      }

      setFilteredImageContents(filteredData);
    })();

    // filter by search value
    function searchFilter(contents) {
      return contents.filter(content => {
        const targets = [content.headline, content.title, content.copyright, content.description, content.quickFact, content.id];
        return targets.some(target => target.toString().toLowerCase().includes(searchValue.trim().toLowerCase()))
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCountry, searchValue]);

  
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
        
        <ImageCardContainer
          contents={filteredImageContents || globalDataSlice}
          handleCardClicked={handleCardClicked}
        />

        <ToTopButton />

        { imageViewerContent && <ImageViewer content={imageViewerContent} onClose={() => setImageViewerContent(null)} /> }

      </main>
    </Layout>
  )
}
