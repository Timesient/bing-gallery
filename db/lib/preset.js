const resolutionConfig = [
  "UHD",
  "1920x1200",
  "1920x1080",
  "1366x768",
  "1280x768",
  "1024x768",
  "800x600",
  "800x480",
  "768x1280",
  "720x1280",
  "640x480",
  "480x800",
  "400x240",
  "320x240",
  "240x320"
];

const countryConfig = [
  'au',
  'ca',
  'cn',
  'de',
  'fr',
  'in',
  'jp',
  'es',
  'gb',
  'us',
  'it',
];

Object.freeze(resolutionConfig);
Object.freeze(countryConfig);

module.exports = { resolutionConfig, countryConfig };