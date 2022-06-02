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

const countryConfig = {
  'au': { fullname: 'Australia', timezone: -7 },
  'ca': { fullname: 'Canada', timezone: -4 },
  'cn': { fullname: 'China', timezone: 8 },
  'de': { fullname: 'Germany', timezone: 2 },
  'fr': { fullname: 'France', timezone: 2 },
  'in': { fullname: 'India', timezone: 4 },
  'jp': { fullname: 'Japan', timezone: 9 },
  'es': { fullname: 'Spain', timezone: 2 },
  'gb': { fullname: 'United Kingdom', timezone: 1 },
  'us': { fullname: 'United States', timezone: -7 },
  'it': { fullname: 'Italy', timezone: 2 },
}

Object.freeze(resolutionConfig);
Object.freeze(countryConfig);

export { resolutionConfig, countryConfig };