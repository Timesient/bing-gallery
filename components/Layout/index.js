import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/Link';
import Select from 'react-select';
import styles from './Layout.module.css';
import { countryConfig } from '../../lib/preset';
import { useDispatch } from 'react-redux';
import { setCurrentCountry } from '../../store/countrySlice';
import { useEffect, useState } from 'react';

export default function Layout({ location, children }) {
  const dispatch = useDispatch();

  const options = Object.keys(countryConfig).map(cc => ({
    value: cc,
    label: (
      <div className={styles.option}>
        <Image
          src={`/images/${cc}.png`}
          width={24}
          height={24}
          alt={cc}
        />
        <span className={styles.optionLabel}>{countryConfig[cc].fullname}</span>
      </div>
    )
  }));

  const defaultOption = options.filter(option => option.value === 'cn')[0];

  function handleSelectChanged(option) {
    dispatch(setCurrentCountry(option.value))
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
            className={styles.select}
            classNamePrefix='Select'
            onChange={handleSelectChanged}
            isSearchable={false}
            defaultValue={defaultOption}
            options={options}
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