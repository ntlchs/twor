import { config } from "dotenv";
import fs from "fs";
import { OpenAI } from "openai";
import readline from "readline";
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
const { OPENAI_API_KEY, OPENAI_ORG_ID } = await getEnv();
const model = "gpt-3.5-turbo-0301";

function createSlug(title) {
  return slugify(title, {
    lower: true, // convert to lower case
    strict: true, // remove characters that could result in unexpected behavior, such as spaces
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

async function createSpecs() {
  const contentPrompt = ``;
  const contentCompletion = await openai.chat.completions.create({
    model: model,
    max_tokens: 80,
    messages: [{ role: "user", content: contentPrompt }],
  });

  const content = contentCompletion.choices[0]?.message?.content;

  const specs = `${content}`;

  const slug = createSlug(title);
  console.log(slug);

  const filePath = `/${slug}.json}`;

  fs.writeFile(filePath, specs, (err) => {
    if (err) {
      console.error("Ocorreu um erro ao salvar o arquivo:", err);
    } else {
      console.log(`Artigo salvo com sucesso em ${filePath}`);
    }
  });

  rl.close();
}

createSpecs();
