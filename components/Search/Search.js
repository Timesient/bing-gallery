import { useState, useRef, useEffect } from 'react';
import styles from './Search.module.css';
import OcticonWrapper from '../OcticonWrapper/OcticonWrapper';
import { SearchIcon, XIcon } from '@primer/octicons-react'

export default function Search({ onChange }) {
  const [value, setValue] = useState('');
  const [isExpand, setIsExpand] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // run callback when value changes
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  // check if it is need to fold
  useEffect(() => {
    function mouseDownHandler(e) {
      if (value === '' && isExpand && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpand(false);
      }
    }

    document.addEventListener('click', mouseDownHandler);
    
    return () => {
      document.removeEventListener('click', mouseDownHandler);
    }
  }, [value, isExpand]);

  function handleSearchIconClicked() {
    setIsExpand(true);
    inputRef.current.focus();
  }

  function handleClearIconClicked() {
    setValue('');
    inputRef.current.focus();
  }
  
  return (
    <div className={styles.container} ref={containerRef}>
      <OcticonWrapper
        className={styles.searchIcon}
        Icon={SearchIcon}
        size={24}
        fill="#333"
        onClick={handleSearchIconClicked}
      />
      <div className={styles.searchInputWrapper}>
        <input
          className={`${styles.searchInput} ${isExpand ? '' : styles.hiddenSearchInput}`}
          type="text"
          value={value}
          placeholder='search in current location'
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
        />
      </div>
      { 
        isExpand && 
        <OcticonWrapper
          className={styles.clearIcon}
          Icon={XIcon}
          size={24}
          fill="#aaa"
          fillOnHover="#333"
          onClick={handleClearIconClicked}
        />
      } 
    </div>
  )
}