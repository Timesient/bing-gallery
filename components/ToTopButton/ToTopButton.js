import { useEffect, useState } from 'react';
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
    <span 
      className={[
        styles.toTopButton,
        'material-symbols-outlined',
        distanceToTop === 0 ? styles.toTopButtonHidden : ''
      ].join(' ')}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      arrow_upward
    </span>
  )
}