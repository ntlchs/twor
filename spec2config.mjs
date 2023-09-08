import {
  chooseColorBasedOnSentiment,
  colorRgb,
  generatePalette,
} from "./utils.mjs";

export async function createConfig(jsonSpecs) {
  const sentiment = jsonSpecs.identifiedSentiment;

  const color = chooseColorBasedOnSentiment(sentiment);

  const rgb = colorRgb[color];
  const palette = generatePalette(rgb);
  return palette;
}
