import { config } from "dotenv";
import fetch from "node-fetch";
import { OpenAI } from "openai";
import { possibleSentiments } from "./utils.mjs";

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

export async function createSpecs(prePrompt) {
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

  const contentPrompt = `Dado o seguinte prompt: "${prePrompt}", por favor, analise e identifique o sentimento predominante relacionado à teoria das cores. Os sentimentos possíveis são: Paixão, Energia, Calma, Confiança, Felicidade, Otimismo, Crescimento, Equilíbrio, Criatividade, Luxo.`;
  console.log(`Selected prompt: ${contentPrompt}\n`);
  const model = "gpt-3.5-turbo-0301";

  const contentCompletion = await openai.chat.completions.create({
    model: model,
    max_tokens: 75,
    messages: [{ role: "user", content: contentPrompt }],
  });

  const content = contentCompletion.choices[0]?.message?.content;

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

  return jsonOutput;
}
