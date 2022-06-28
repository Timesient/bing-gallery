import { getGlobalData } from "../../lib/getImageData";

export default async function handler(req, res) {
  const globalData = getGlobalData();

  res.status(200).json({ data: globalData });
}