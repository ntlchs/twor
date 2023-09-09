import { colorRgb } from "./utils.mjs";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const adjustColor = (color, minAmount, maxAmount) => {
  const amount = getRandomInt(minAmount, maxAmount);
  return {
    r: Math.min(255, Math.max(0, color.r + amount)),
    g: Math.min(255, Math.max(0, color.g + amount)),
    b: Math.min(255, Math.max(0, color.b + amount)),
  };
};

// Function to generate 5 shades for each color
const generateShades = (color) => {
  return [
    adjustColor(color, -50, -30),
    adjustColor(color, -29, -10),
    color,
    adjustColor(color, 10, 29),
    adjustColor(color, 30, 50),
  ];
};

// Create shades for each color in colorRgb
const colorShades = {};
for (const [colorName, color] of Object.entries(colorRgb)) {
  colorShades[colorName] = generateShades(color);
}

// Function to randomly select a shade based on the initial color name
export const getRandomShade = (colorName) => {
  const shades = colorShades[colorName];
  if (!shades) {
    return null; // Return null if the color name is not found
  }
  const randomIndex = Math.floor(Math.random() * shades.length);
  return shades[randomIndex];
};
