import { chooseColorBasedOnSentiment } from "./utils.mjs";

const fs = require("fs").promises;

async function readSentimentFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.identifiedSentiment;
  } catch (err) {
    console.error("Error reading the file:", err);
    process.exit(1);
  }
}

async function main() {
  const sentimentFilePath = process.argv[2];
  const outputFilePath = process.argv[3];

  if (!sentimentFilePath || !outputFilePath) {
    console.error("Please provide the input and output file paths.");
    process.exit(1);
  }

  const sentiment = await readSentimentFromFile(sentimentFilePath);
  const color = chooseColorBasedOnSentiment(sentiment);
  await writeColorToFile(color, outputFilePath);
}

main();
