const resolutionConfig = [
  "UHD",
  "1920x1200",
  "1920x1080",
  "1366x768",
  "1280x768",
  "1280x720",
  "1024x768",
  "800x600",
  "800x480",
  "768x1280",
  "720x1280",
  "640x480",
  "640x360",
  "480x800",
  "400x240",
  "320x240",
  "240x320"
];

const countryConfig = {
  'au': { fullname: 'Australia', timezone: -7, languageCode: 'ROW' },
  'ca': { fullname: 'Canada', timezone: -4, languageCode: 'EN-CA' },
  'cn': { fullname: 'China', timezone: 8, languageCode: 'ZH-CN' },
  'de': { fullname: 'Germany', timezone: 2, languageCode: 'DE-DE' },
  'fr': { fullname: 'France', timezone: 2, languageCode: 'FR-FR' },
  'in': { fullname: 'India', timezone: 4, languageCode: 'EN-IN' },
  'jp': { fullname: 'Japan', timezone: 9, languageCode: 'JA-JP' },
  'es': { fullname: 'Spain', timezone: 2, languageCode: 'ES-ES' },
  'gb': { fullname: 'United Kingdom', timezone: 1, languageCode: 'EN-GB' },
  'us': { fullname: 'United States', timezone: -7, languageCode: 'EN-US' },
  'it': { fullname: 'Italy', timezone: 2, languageCode: 'IT-IT' },
  'br': { fullname: 'Brazil', timezone: 4, languageCode: 'PT-BR' },
}

Object.freeze(resolutionConfig);
Object.freeze(countryConfig);

function getCountryCodeByID(id) {
  try {
    const languageCode = id.match(/_(?<languageCode>[A-Z-]*)\d{10}/).groups.languageCode;
    return Object.keys(countryConfig).filter(countryCode => countryConfig[countryCode].languageCode === languageCode)[0];
  } catch (error) {
    console.log('Error occured within function getCountryCodeByID: ' + error);
  }  
}

// generate date string for cards
function getDateString(id, timestamp) {
  const countryCode = getCountryCodeByID(id);
  const time = new Date(timestamp + countryConfig[countryCode].timezone * 60 * 60 * 1000);
  const year = time.getUTCFullYear();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getUTCMonth()];
  const date = time.getUTCDate();
  return `${month} ${date}, ${year}`;
}

export { resolutionConfig, countryConfig, getCountryCodeByID, getDateString };