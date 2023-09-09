import Harmony from "@iyashasgowda/color-harmony";
import rbgHex from "rgb-hex";
import { generateShades, getRandomShade } from "./randomColors.mjs";
import { colorRgb } from "./utils.mjs";

const generatePalette = (color) => {
  const harmony = new Harmony(color);

  const palette = [color, ...harmony.tetradic()];
  return palette;
};

const sentimentMap = {
  Paixão: "PASSION",
  Energia: "ENERGY",
  Calma: "CALM",
  Confiança: "TRUST",
  Felicidade: "HAPPINESS",
  Otimismo: "OPTIMISM",
  Crescimento: "GROWTH",
  Equilíbrio: "BALANCE",
  Criatividade: "CREATIVITY",
  Luxo: "LUXURY",
};

function chooseColorBasedOnSentiment(sentiment) {
  const colorMap = {
    PASSION: "red",
    ENERGY: "orange",
    CALM: "blue",
    TRUST: "indigo",
    HAPPINESS: "yellow",
    OPTIMISM: "green",
    GROWTH: "teal",
    BALANCE: "gray",
    CREATIVITY: "purple",
    LUXURY: "rose",
  };

  return colorMap[sentiment] || "unknown";
}

function formatRgb(rgb) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function createPalette(jsonSpecs) {
  const sentimento = jsonSpecs.identifiedSentiment;
  const sentiment = sentimentMap[sentimento];
  const color = chooseColorBasedOnSentiment(sentiment);
  // Example output: { color: 'red' }

  const randomRgbFromColor = getRandomShade(color.toUpperCase());
  // Example output: { randomRgbFromColor: { r: 255, g: 165, b: 0 }

  // Log the random shade for debugging

  // If a random shade is found, use it as the base for generating the palette
  const baseColorForPalette = randomRgbFromColor
    ? randomRgbFromColor
    : colorRgb[color.toUpperCase()];

  const palette = generatePalette(baseColorForPalette);
  // Example output: [ { r: 255, g: 165, b: 0 }, { r: 0, g: 255, b: 0 }, ... ]

  return palette;
}

// async function fetchColorShades(color, hexValue) {
//   try {
//     const url = `https://www.tints.dev/api/${color}/${hexValue}`;
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching color shades: ${error}`);
//     return null;
//   }
// }

function rgbToHex(rgb) {
  const hex = rbgHex(rgb);
  return `#${hex}`;
}

export async function spec2config(jsonSpecs) {
  const palette = createPalette(jsonSpecs);
  const formattedPalette = [];
  for (const rgb of palette) {
    const formattedRgb = formatRgb(rgb);
    const hex = rgbToHex(formattedRgb);
    formattedPalette.push(hex);
  }
  // Example output: [ '#ffa500', '#00ff00', ... ]

  const colorShades = [];

  for (let hexColor of formattedPalette) {
    const shades = generateShades(hexColor);
    console.log({ hexColor, shades });
    // const hexValue = color.replace("#", "");
    // const shades = await fetchColorShades("color", hexValue);
    colorShades.push(shades);
  }

  return colorShades;
  //  const hexPalette = formattedPalette.map((rgb) => rgbToHex(rgb));
  // return hexPalette;
}
