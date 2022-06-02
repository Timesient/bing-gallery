import { getCertainImageData } from "../../lib/getImageData";
import { resolutionConfig } from "../../lib/preset";

export default async function handler(req, res) {
  const { id, cc } = req.query;

  const data = getCertainImageData(id, resolutionConfig, cc);

  res.status(200).json({ data });
}