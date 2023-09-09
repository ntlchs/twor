import { writeFileSync } from "fs";
import fs from "fs/promises";
import * as path from "path";
import slugify from "slugify";
import { addColorSquares } from "./addSquaresToHtml.mjs";
import { spec2config } from "./spec2config.mjs";

function createSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
  });
}

async function getPrompt(filePath) {
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

// async function main() {
//   try {
//     const filePath = process.argv[2];
//     const prompt = await getPrompt(filePath);
//     const jsonSpecs = await createSpecs(prompt);
//     const formattedPalette = await spec2config(jsonSpecs);
//     console.log({ jsonSpecs });
//     const parsedFilePath = path.parse(filePath);
//     writeFileSync(
//       `${parsedFilePath.name}.config.js`,
//       JSON.stringify(formattedPalette)
//     );
//     await addColorSquares(
//       formattedPalette,
//       prompt,
//       jsonSpecs.identifiedSentiment,
//       `${parsedFilePath.name}.html`
//     );
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

async function test() {
  const testJson = {
    identifiedSentiment: "Energia",
    analysis:
      "O sentimento predominante relacionado à teoria das cores para uma página de vendas de uma loja de artigos de esporte pode ser Energia. Cores brilhantes e saturadas, como vermelho, laranja e amarelo, são frequentemente usadas para evocar sentimentos de excitação e força fís",
  };
  try {
    const filePath = process.argv[2];
    const prompt = await getPrompt(filePath);
    const formattedPalette = await spec2config(testJson);
    const parsedFilePath = path.parse(filePath);
    writeFileSync(
      `${parsedFilePath.name}.config.js`,
      JSON.stringify(formattedPalette)
    );
    await addColorSquares(
      formattedPalette,
      prompt,
      testJson.identifiedSentiment,
      `${parsedFilePath.name}.html`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// main();
test();
