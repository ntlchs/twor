import fs from "fs/promises";
import slugify from "slugify";
import { addColorSquares } from "./addSquaresToHtml.mjs";
import { createSpecs } from "./prompt2spec.mjs";
import { spec2config } from "./spec2config.mjs";

function createSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
  });
}

async function getPrompt() {
  const filePath = process.argv[2];

  if (!filePath || !filePath.endsWith(".txt")) {
    console.error("Por favor, forneça um arquivo com extensão .txt.");
    process.exit(1);
  }

  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
    process.exit(1);
  }
}

const writeJson = async (jsonOutput) => {
  if (jsonOutput === undefined) {
    console.error("O jsonOutput está indefinido.");
    return;
  }

  const slug = createSlug(`ColorSentimentAnalysis_${Math.random()}`);
  const filePath = `./${slug}.json`;

  try {
    await fs.writeFile(filePath, JSON.stringify(jsonOutput, null, 2));
    console.log(`Arquivo salvo com sucesso em ${filePath}`);
  } catch (err) {
    console.error("Ocorreu um erro ao salvar o arquivo:", err);
  }
};

async function main() {
  try {
    const prompt = await getPrompt();
    const jsonSpecs = await createSpecs(prompt);
    const formattedPalette = await spec2config(jsonSpecs);
    console.log(formattedPalette);
    await addColorSquares(
      formattedPalette,
      prompt,
      jsonSpecs.identifiedSentiment
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
