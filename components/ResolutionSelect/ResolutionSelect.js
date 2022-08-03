import Select from '../Select/Select';
import styles from './ResolutionSelect.module.css';

const resolutionConfig = {
  '4K UHD': 'UHD',
  '1920x1080': '1920x1080',
  '1366x768': '1366x768',
  '1280x768': '1280x768',
  '1024x768': '1024x768',
  '800x600': '800x600',
  '640x480': '640x480',
};

const options = Object.entries(resolutionConfig).map(([ label, value ]) => ({
  value,
  label: (
    <div className={styles.option}>
      <span className={styles.optionLabel}>{label}</span>
    </div>
  )
}));

export default function ResolutionSelect({ onChange }) {
  return (
    <Select
      options={options}
      selectedOption={ options[0] }
      onChange={onChange}
    />
  )
}