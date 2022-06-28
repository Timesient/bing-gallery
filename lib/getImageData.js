import fs from 'fs';
import path from 'path';
import { resolutionConfig, countryConfig } from './preset';

/**
 * * read data from local .json file according to country code
 * @param {*} countryCode 
 * @returns data read from [countryCode].json in json format
 */
function readData(countryCode) {
  const filePath = path.join(process.cwd(), 'db', `${countryCode}.json`);

  let data;
  try {
    const buffer = fs.readFileSync(filePath);
    data = JSON.parse(buffer);
  } catch (error) {
    if (String(error).includes('no such file')) {
      data = {};
      fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    } else {
      console.log(error);
    }
  }

  return data;
}

export function getLatestImageData(countryCode) {
  return getCountryImageData(countryCode)[0];
}

export function getRandomImageData(countryCode) {
  const allData = getCountryImageData(countryCode);
  
  return allData[Math.floor(Math.random() * allData.length)];
}

export function getCountryImageData(countryCode) {
  const data = readData(countryCode);

  return Object
    .values(data)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(content => {
      const urls = {};
      resolutionConfig.forEach(res => urls[res] = `https://www.bing.com/th?id=${content.id}_${res}.jpg`);

      return {
        ...content,
        urls
      }
    })
}

// for global search 
export function getGlobalData() {
  return Object.keys(countryConfig).reduce((acc, cur) => {
    const countryData = getCountryImageData(cur);
    countryData.forEach(dataset => {
      delete dataset.urls;
      const IDPart1 = dataset.id.split('_')[0];
      if (IDPart1 in acc) {
        acc[IDPart1].push(dataset);
      } else {
        acc[IDPart1] = [dataset];
      }
    })

    return acc;
  }, {});
}

// for home html & init display
export function getGlobalDataSlice() {
  const globalData = getGlobalData();

  return Object
    .values(globalData)
    .reduce((acc, cur) => {
      acc.push(cur.sort((a, b) => b.timestamp - a.timestamp)[0]);
      return acc;
    }, [])
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 9);
}

// for detail page
export function getCertainImageData(id, countryCode) {
  return readData(countryCode)[id];
}