// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllImageData } from "../../lib/getImageData";
import { resolutionConfig, countryConfig } from "../../lib/preset";

export default async function handler(req, res) {
  const query = req.query;

  // check mode
  let mode;
  switch (query.mode) {
    case undefined:
      mode = 'latest';
      break;
    case 'latest':
    case 'recent':
    case 'range':
    case 'all':
      mode = query.mode;
      break;
    default:
      res.status(400).json({ error: `mode ${query.mode} is not supported` });
      return;
  }


  // check resolution
  let resolution = [];
  if (query.resolution === undefined) resolution = ['1920x1080'];
  else if (query.resolution === 'all' || query.resolution?.includes('all')) resolution = resolutionConfig;
  else {
    if (typeof query.resolution === 'string') resolution = [query.resolution];
    if (typeof query.resolution === 'object') resolution = query.resolution;

    for (let i = 0, len = resolution.length; i < len; i++) {
      if (!resolutionConfig.includes(resolution[i])) {
        res.status(400).json({ error: `resolution ${resolution[i]} is not supported` });
        return;
      }
    }
  }

  // check country code
  let cc;
  if (query.cc === undefined) cc = 'cn';
  else if (Object.keys(countryConfig).includes(query.cc)) cc = query.cc;
  else {
    res.status(400).json({ error: `cc(country code) ${query.cc} is not supported` });
    return;
  }


  // add mode 'random?'

  // handle mode 'latest'
  if (mode === 'latest') {
    const data = await getLatestImageData(resolution, cc);
    res.status(200).json({ data });
  }

  // handle mode 'recent'
  if (mode === 'recent') {
    const data = await getRecentImageData(resolution, cc);
    res.status(200).json({ data });
  }

  if (mode === 'range') {
    res.status(500).json({ error: 'mode range is not supported now' });
  }

  // handle mode 'all'
  if (mode === 'all') {
    const data = getAllImageData(resolution, cc);
    res.status(200).json({ data });
  }
}
