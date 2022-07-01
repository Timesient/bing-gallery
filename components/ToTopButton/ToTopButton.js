import { useEffect, useState } from 'react';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
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
    <div className={`${styles.toTopButton} ${distanceToTop === 0 ? styles.toTopButtonHidden : ''}`}>
      <MaterialIcon onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>arrow_upward</MaterialIcon>
    </div>
  )
}