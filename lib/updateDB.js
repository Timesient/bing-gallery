const fs = require('fs');
const path = require('path');
const axios = require('axios');
const schedule = require('node-schedule');
const { countryConfig } = require('./preset');

/**
 * * get image data from bing official API
 * @param {*} languageCode language code
 * @returns processd data from bing-official-api's response
 */
async function getImageData(languageCode) {
  const contents = await axios({
    method: 'GET',
    url: `https://www.bing.com/hp/api/model?mkt=${languageCode}`,
    headers: { cookie: '_UR=QS=0&cdxOff=1' }
  }).then(res => res.data.MediaContents)
    .catch(error => console.log(`Failed to get latest data from office API | mkt = ${languageCode} | ${new Date()}`))

  if (!contents) return;
  
  const digestedContents = contents.map(content => {
    const timestamp = (() => {
      const str = content.Ssd;
      const year = parseInt(str.split('_')[0].slice(0, 4));
      const month = parseInt(str.split('_')[0].slice(4, 6)) - 1;
      const date = parseInt(str.split('_')[0].slice(6, 8));
      const hour = parseInt(str.split('_')[1].slice(0, 2));
      return Date.UTC(year, month, date, hour);
    })();

    const bingURL = 'https://www.bing.com';
    const id = content.ImageContent.Image.Url.split('_').slice(0, 2).join('_').replace('/th?id=', '');

    return {
      headline: content.ImageContent.Headline,
      title: content.ImageContent.Title,
      copyright: content.ImageContent.Copyright,
      description: content.ImageContent.Description,
      quickFact: content.ImageContent.QuickFact.MainText,
      knowMoreURL: bingURL + content.ImageContent.BackstageUrl,
      timestamp,
      id
    }
  });

  return digestedContents;
}

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

/**
 * * update json file if there is new data
 * @param {*} countryCode 
 */
async function updateData(countryCode, languageCode) {
  const recentImageData = await getImageData(languageCode);

  if (!recentImageData) return;

  const dbData = readData(countryCode);
  const timestamps = Object.values(dbData).map(dataset => String(dataset.timestamp));

  recentImageData.forEach(newData => {
    if (!(newData.id in dbData) && !timestamps.includes(String(newData.timestamp))) {
      dbData[newData.id] = newData;
      console.log(`${countryCode}.json updated contents with id: ${newData.id}`);
    }
  });

  const filePath = path.join(process.cwd(), 'db', `${countryCode}.json`);
  fs.writeFileSync(filePath, JSON.stringify(dbData), 'utf8');
}

/**
 * * update all json files
 */
function updateAllCountryData() {
  for (const [key, value] of Object.entries(countryConfig)) {
    updateData(key, value.languageCode);
  }
}

/**
 * * start update schedule using node-schedule, and update json files every hour
 */
function startUpdateSchedule() {
  const rule = new schedule.RecurrenceRule();
  rule.minute = 5; // run at XX:05:00, 24 times a day
  rule.second = 0;

  schedule.scheduleJob(rule, () => {
    console.log(`Start updating all country data at ${new Date()}`);
    updateAllCountryData();
  });
}

module.exports = {
  updateAllCountryData,
  startUpdateSchedule,
};