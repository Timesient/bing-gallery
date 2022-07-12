import { useEffect, useState } from 'react';
import OcticonWrapper from '../OcticonWrapper/OcticonWrapper';
import { ArrowUpIcon } from '@primer/octicons-react'
import styles from './ToTopButton.module.css';

export default function ToTopButton() {
  const [distanceToTop, setDistanceToTop] = useState(0);

  // for to-top button
  useEffect(() => {
    setDistanceToTop(window.scrollY);

    window.onscroll = () => {
      setDistanceToTop(window.scrollY);
    }

    return () => {
      window.onscroll = null;
    }
  }, []);

  return (
    <div
      className={`${styles.toTopButton} ${distanceToTop === 0 ? styles.toTopButtonHidden : ''}`}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      <OcticonWrapper
        Icon={ArrowUpIcon}
        size={20}
        fill="#FFF"
      />
    </div>
  )
}