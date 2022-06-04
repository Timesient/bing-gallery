import { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css';

export default function Select({extraClassNames, options, selectedOption, onChange }) {
  const [isExpand, setIsExpand] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    function mouseDownHandler(e) {
      if (isExpand && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpand(false);
      }
    }

    document.addEventListener('click', mouseDownHandler);
    
    return () => {
      document.removeEventListener('click', mouseDownHandler);
    }
  }, [isExpand]);


  function handleStartSelecting(e) {
    setIsExpand(true);
  }

  function handleOptionClicked(e) {
    const value = e.currentTarget.dataset.value;
    onChange(value);
    setIsExpand(false);
  }

  return (
    <div className={`${styles.container} ${extraClassNames?.join() || ''}`} ref={containerRef}>
      <div
        className={`${styles.selectedOption} ${isExpand ? styles.selectedOptionExpanded : ''}`}
        onClick={handleStartSelecting}
      >
        <div className={styles.selectedOptionLabel}>{ selectedOption?.label }</div>
        <span className={`${styles.expandIcon} material-symbols-outlined`}>expand_more</span>
      </div>
      {
        <div className={`${styles.optionList} ${isExpand ? '' : styles.optionListHidden}`}>
          {
            options.map((option, index) =>(
              <div
                className={styles.option}
                key={`${option.value}-${index}`}
                data-value={option.value}
                onClick={handleOptionClicked}
              >
                {option.label}
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}