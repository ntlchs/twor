import { config } from "dotenv";
import fs from "fs/promises"; // Import promises API
import fetch from "node-fetch"; // Import fetch if you are using it
import { OpenAI } from "openai";
import slugify from "slugify";

config();

async function getEnv() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const OPENAI_ORG_ID = process.env.OPENAI_ORG_ID;

  if (!OPENAI_API_KEY || !OPENAI_ORG_ID) {
    console.error(
      "Missing OPENAI_API_KEY or OPENAI_ORG_ID environment variables inside env"
    );
    process.exit(1);
  }

  return {
    OPENAI_API_KEY,
    OPENAI_ORG_ID,
  };
}

function createSlug(title) {
  return slugify(title, {
    lower: true, // convert to lower case
    strict: true, // remove characters that could result in unexpected behavior, such as spaces
  });
}

async function getPrompt() {
  const filePath = process.argv[2]; // Pega o primeiro argumento após o nome do script

  if (!filePath || !filePath.endsWith(".txt")) {
    console.error("Por favor, forneça um arquivo com extensão .txt.");
    process.exit(1);
  }

  try {
    const data = fs.readFile(filePath, "utf8");
    return (await data).trim();
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
    process.exit(1);
  }
}

async function createSpecs() {
  const { OPENAI_API_KEY, OPENAI_ORG_ID } = await getEnv();

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    organization: OPENAI_ORG_ID,
    defaultHeaders: {
      "Content-Type": "application/json",
      "User-Agent": "OpenAI-Node-SDK",
    },
    fetch: fetch,
    baseURL: "https://api.openai.com/v1/",
  });

  const prePrompt = await getPrompt();
  const contentPrompt = `Dado o seguinte prompt: "${prePrompt}", por favor, analise e identifique o sentimento predominante relacionado à teoria das cores. Os sentimentos possíveis são: Paixão, Energia, Calma, Confiança, Felicidade, Otimismo, Crescimento, Equilíbrio, Criatividade, Luxo.`;
  console.log(contentPrompt);
  console.log("Aguarde enquanto o GPT-3 analisa o prompt...");
  const model = "gpt-3.5-turbo-0301";

  const contentCompletion = await openai.chat.completions.create({
    model: model,
    max_tokens: 15,
    messages: [{ role: "user", content: contentPrompt }],
  });

  const content = contentCompletion.choices[0]?.message?.content;

  const possibleSentiments = [
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
  let identifiedSentiment = "Não identificado";

  for (const sentiment of possibleSentiments) {
    if (content.toLowerCase().includes(sentiment.toLowerCase())) {
      identifiedSentiment = sentiment;
      break;
    }
  }

  const jsonOutput = {
    identifiedSentiment,
    analysis: content,
  };

  const title = `ColorSentimentAnalysis_${Math.random()}`;
  const slug = createSlug(title);
  const filePath = `./${slug}.json`;

  fs.writeFile(filePath, JSON.stringify(jsonOutput, null, 2), (err) => {
    if (err) {
      console.error("Ocorreu um erro ao salvar o arquivo:", err);
    } else {
      console.log(`Arquivo salvo com sucesso em ${filePath}`);
    }
  });
}

async function main() {
  createSpecs();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
