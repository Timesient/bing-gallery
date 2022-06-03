import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Select from '../Select/Select';
import styles from './Layout.module.css';
import { countryConfig } from '../../lib/preset';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCountry, selectCurrentCountry } from '../../store/countrySlice';


export default function Layout({ location, children }) {
  const dispatch = useDispatch();
  const currentCountry = useSelector(selectCurrentCountry);

  const options = Object.keys(countryConfig).map(cc => ({
    value: cc,
    label: (
      <div className={styles.option}>
        <Image
          src={`/images/${cc}.png`}
          width={24}
          height={24}
          alt={cc}
          layout="fixed"
        />
        <span className={styles.optionLabel}>{countryConfig[cc].fullname}</span>
      </div>
    )
  }));

  const selectedOption = options.filter(option => option.value === currentCountry)[0];

  function handleSelectChanged(value) {
    dispatch(setCurrentCountry(value))
  }

  return (
    <div>
      <Head>
        <title>{ location }</title>
      </Head>

      <header className={styles.header}>

        <div className={styles.logoContainer}>
          <Image
            src='/images/favicon.png'
            width={48}
            height={48}
            alt="logo"
          />
        </div>

        <Link href="/">
          <a className={styles.headerLabel}>Bing Gallery</a>
        </Link>

        <div className={styles.menu}>
          <Select
            extraClassNames={[styles.select]}
            options={options}
            selectedOption={selectedOption}
            onChange={handleSelectChanged}
          />
          <Link href="/about">
            <a className={styles.link}>About</a>
          </Link>
        </div>

      </header>

      { children }

      <footer className={styles.footer}>
        <span>@ 2022 bing.dd1969.xyz</span>
        <span>The images are provided for wallpaper use only.</span>
      </footer>
    </div>
  )
}