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
  return getAllImageData(countryCode)[0];
}

export function getRandomImageData(countryCode) {
  const allData = getAllImageData(countryCode);
  
  return allData[Math.floor(Math.random() * allData.length)];
}

export function getAllImageData(countryCode) {
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

export function getOverallImageData() {
  const temp = Object.keys(countryConfig).reduce((acc, cur) => {
    const countryData = getAllImageData(cur);
    countryData.forEach(dataset => {
      const IDPart1 = dataset.id.split('_')[0];
      if (!(IDPart1 in acc)) {
        acc[IDPart1] = dataset;
      }
    })

    return acc;
  }, {});

  return Object
    .values(temp)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(content => {
      const urls = {};
      resolutionConfig.forEach(res => urls[res] = `https://www.bing.com/th?id=${content.id}_${res}.jpg`);

      return {
        ...content,
        urls
      }
    });
} 

export function getCertainImageData(id, resolution, countryCode) {
  const data = readData(countryCode)[id];

  const neededURLs = {};
  resolution.forEach(res => neededURLs[res] = `https://www.bing.com/th?id=${id}_${res}.jpg`);

  data.urls = neededURLs;

  return data;
}

