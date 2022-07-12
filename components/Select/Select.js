import { useEffect, useRef, useState } from 'react';
import OcticonWrapper from '../OcticonWrapper/OcticonWrapper';
import { ChevronDownIcon } from '@primer/octicons-react'
import styles from './Select.module.css';

export default function Select({extraClassNames, options, selectedOption, onChange }) {
  const [isExpand, setIsExpand] = useState(false);
  const [currentSelectedOption, setCurrentSelectedOption] = useState(selectedOption);
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

    setCurrentSelectedOption(options.filter(option => option.value === value)[0]);
    setIsExpand(false);
  }

  return (
    <div className={`${styles.container} ${extraClassNames?.join() || ''}`} ref={containerRef}>
      <div
        className={`${styles.selectedOption} ${isExpand ? styles.selectedOptionExpanded : ''}`}
        onClick={handleStartSelecting}
      >
        <div className={styles.selectedOptionLabel}>{ currentSelectedOption?.label }</div>
        <OcticonWrapper
          className={styles.expandIcon}
          Icon={ChevronDownIcon}
          size={18}
          fill="#333"
        />
      </div>
      {
        <div className={`${styles.optionList} ${isExpand ? '' : styles.optionListHidden}`}>
          {
            options.map((option, index) =>(
              <div
                className={styles.optionWrapper}
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