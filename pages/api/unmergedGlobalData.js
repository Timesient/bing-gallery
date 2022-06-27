import { getUnmergedGlobalImageData } from "../../lib/getImageData";

export default async function handler(req, res) {
  const unmergedGlobalData = getUnmergedGlobalImageData();

  res.status(200).json({ data: unmergedGlobalData });
}