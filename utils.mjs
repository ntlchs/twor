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
    LUXURY: "gold",
  };

  return colorMap[sentiment] || "unknown";
}
