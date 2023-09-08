import Harmony from "@iyashasgowda/color-harmony";

export const possibleSentiments = [
  "Paixão",
  "Energia",
  "Calma",
  "Confiança",
  "Felicidade",
  "Otimismo",
  "Crescimento",
  "Equilíbrio",
  "Criatividade",
  "Luxo",
];

export function chooseColorBasedOnSentiment(sentiment) {
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

export const generatePalette = (color) => {
  const rgb = {
    r: 126,
    g: 87,
    b: 43,
  };

  const harmony = new Harmony(rgb);
  console.log(harmony.complement());
  /** returns = [
     { r: 42, g: 81, b: 125 }
 ] */

  console.log(harmony.splitComplement());
  /** returns = [
     { r: 42, g: 122, b: 125 }, 
     { r: 45, g: 42, b: 125 } 
 ] */

  console.log(harmony.analogous());
  /** returns = [
     { r: 122, g: 125, b: 42 }, 
     { r: 81, g: 125, b: 42 }
] */

  console.log(harmony.triadic());
  /** returns = [
   { r: 42, g: 125, b: 86 },
   { r: 86, g: 42, b: 125 },
] */

  console.log(harmony.tetradic());
  /** returns = [
   { r: 42, g: 125, b: 45 },
   { r: 42, g: 81, b: 125 },
   { r: 125, g: 42, b: 122 },
] */
};
