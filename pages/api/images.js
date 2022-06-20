// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getLatestImageData, getRandomImageData, getCountryImageData } from "../../lib/getImageData";
import { resolutionConfig, countryConfig } from "../../lib/preset";

export default async function handler(req, res) {
  const { mode, cc, format, resolution } = req.query;

  // check mode
  const checkModeResult = checkMode(mode);
  if (checkModeResult.error) {
    res.status(400).json({ error: checkModeResult.error });
    return;
  }

  // check cc
  const checkCountryCodeResult = checkCountryCode(cc);
  if (checkCountryCodeResult.error) {
    res.status(400).json({ error: checkCountryCodeResult.error });
    return;
  }

  // check format & resolution
  if (mode === 'latest' || mode === 'random') {
    const checkFormatResult = checkFormat(format);
    if (checkFormatResult.error) {
      res.status(400).json({ error: checkFormatResult.error });
      return;
    }

    if (format === 'image') {
      const checkResolutionResult = checkResolution(resolution);
      if (checkResolutionResult.error) {
        res.status(400).json({ error: checkResolutionResult.error });
        return;
      }
    }
  }

  // handle mode latest
  if (mode === 'latest') {
    if (format === 'image') {
      const data = getLatestImageData(cc);
      res.redirect(307, data.urls[resolution]);
    }

    if (format === 'json') {
      const data = getLatestImageData(cc);
      res.status(200).json({ data });
    }

    return;
  }

  // handle mode random
  if (mode === 'random') {
    if (format === 'image') {
      const data = getRandomImageData(cc);
      res.redirect(307, data.urls[resolution]);
    }

    if (format === 'json') {
      const data = getRandomImageData(cc);
      res.status(200).json({ data });
    }
    
    return;
  }

  // handle mode all
  if (mode === 'all') {
    const data = getCountryImageData(cc);
    res.status(200).json({ data });
  }
}


// check mode
function checkMode(mode) {
  switch (mode) {
    case 'latest':
    case 'random':
    case 'all':
      return { error: null }
    case undefined:
      return { error: "Missing query param 'mode'" }
    default:
      return { error: `Invalid value '${mode}' for param 'mode'` }
  }
}

// check country code
function checkCountryCode(countryCode) {
  if (countryCode === undefined) {
    return { error: "Missing query param 'cc'" }
  }

  if (!Object.keys(countryConfig).includes(countryCode)) {
    return { error: `Invalid value '${countryCode}' for param 'cc'` }
  }

  return { error: null }
}

// check format
function checkFormat(format) {
  switch (format) {
    case 'json':
    case 'image':
      return { error: null }
    case undefined:
      return { error: "Missing query param 'format'" }
    default:
      return { error: `Invalid value '${format}' for param 'format'` }
  }
}

// check resolution
function checkResolution(resolution) {
  switch (resolution) {
    case '1920x1080':
    case 'UHD':
      return { error: null }
    case undefined:
      return { error: "Missing query param 'resolution'" }
    default:
      return { error: `Invalid value '${resolution}' for param 'resolution'` }
  }
}