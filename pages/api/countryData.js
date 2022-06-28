import { getCountryImageData } from "../../lib/getImageData";

export default async function handler(req, res) {
  const { cc } = req.query;

  const countryData = getCountryImageData(cc);
  countryData.forEach(dataset => {
    delete dataset.urls;
  })

  res.status(200).json({ data: countryData });
}