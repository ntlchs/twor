import chroma from "chroma-js";

export const colorRgb = {
  RED: { r: 255, g: 0, b: 0 },
  ORANGE: { r: 255, g: 165, b: 0 },
  BLUE: { r: 0, g: 0, b: 255 },
  INDIGO: { r: 75, g: 0, b: 130 },
  YELLOW: { r: 255, g: 255, b: 0 },
  GREEN: { r: 0, g: 128, b: 0 },
  TEAL: { r: 0, g: 128, b: 128 },
  GRAY: { r: 128, g: 128, b: 128 },
  PURPLE: { r: 128, g: 0, b: 128 },
  ROSE: { r: 255, g: 0, b: 255 },
};

const identifyBaseShade = (hexColor) => {
  const luminance = chroma(hexColor).luminance();
  if (luminance > 0.8) return "100";
  if (luminance > 0.6) return "300";
  if (luminance > 0.4) return "500";
  if (luminance > 0.2) return "700";
  return "900";
};

export const generateShades = (hexColor) => {
  const baseShade = identifyBaseShade(hexColor);
  const shades = {};

  for (let i = 1; i <= 9; i++) {
    const shade = `${i}00`;
    if (shade === baseShade) {
      shades[shade] = hexColor;
      continue;
    }

    const diff = parseInt(baseShade) - parseInt(shade);
    const newColor = chroma(hexColor)
      .set("lab.l", "+", diff * 5)
      .hex();
    shades[shade] = newColor;
  }

  return {
    baseShade,
    shades,
  };
};

export const getRandomShade = (inputColorName) => {
  const colorShades = {};
  for (const [colorName, color] of Object.entries(colorRgb)) {
    colorShades[colorName] = generateShades(color).shades;
  }

  const shades = colorShades[inputColorName];

  if (!shades) {
    return null; // Return null if the color name is not found
  }

  const shadeKeys = Object.keys(shades);
  const randomIndex = Math.floor(Math.random() * shadeKeys.length);
  const randomShadeKey = shadeKeys[randomIndex];

  return shades[randomShadeKey];
};
