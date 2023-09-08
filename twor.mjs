import fs from "fs/promises";
import slugify from "slugify";
import { createSpecs } from "./prompt2spec.mjs";
import { createConfig } from "./spec2config.mjs";

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
    const { data } = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
    process.exit(1);
  }
}

const writeJson = (jsonOutput) => {
  const slug = createSlug(`ColorSentimentAnalysis_${Math.random()}`);
  const filePath = `./${slug}.json`;

  fs.writeFile(filePath, JSON.stringify(jsonOutput, null, 2), (err) => {
    if (err) {
      console.error("Ocorreu um erro ao salvar o arquivo:", err);
    } else {
      console.log(`Arquivo salvo com sucesso em ${filePath}`);
    }
  });
};

async function main() {
  const prompt = await getPrompt();
  const jsonSpecs = await createSpecs(prompt);
  console.log(jsonSpecs);
  const palette = await createConfig(jsonSpecs);
  writeJson(palette);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
