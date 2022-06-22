import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectCurrentCountry } from '../../store/countrySlice';
import { countryConfig } from '../../lib/preset';
import Select from '../Select/Select';
import styles from './CountrySelect.module.css';

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

const globalOption = {
  value: 'global',
  label: (
    <div className={styles.option}>
      <Image
        src={`/images/plane.png`}
        width={24}
        height={24}
        alt="global"
        layout="fixed"
      />
      <span className={styles.optionLabel}>Global</span>
    </div>
  )
}

options.splice(0, 0, globalOption);

export default function CountrySelect({ onChange }) {
  const currentCountry = useSelector(selectCurrentCountry);

  return (
    <Select
      options={options}
      selectedOption={ options.filter(option => option.value === currentCountry)[0] }
      onChange={onChange}
    />
  )
}