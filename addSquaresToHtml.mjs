import * as fs from 'fs';

export const addColorSquares = async (colors, prompt, sentiment, outputPath) => {
  // Ler arquivo outputPath
  let htmlContent;
  if (fs.existsSync(outputPath)) {
    try {
      htmlContent = fs.readFileSync(outputPath, "utf8");
    } catch (err) {
      console.error(`Erro ao ler o arquivo ${outputPath}:`, err);
      return;
    }
  } else {
    htmlContent = ''
  }

  // Criar a nova div com os grupos de cores
  let newDiv = `\n<div id="color-container">`;
  colors.forEach((colorGroup, index) => {
    newDiv += `\n<div class="color-name">Group ${index + 1}</div>`;
    newDiv += `\n<div class="color-group">`;

    for (const [shade, hex] of Object.entries(colorGroup.color)) {
      newDiv += `\n<div class="color-box" style="background-color: ${hex};">${shade}</div>`;
    }

    newDiv += `</div>`;
  });
  newDiv += `${prompt} - ${sentiment} </div>`;

  // Inserir a nova div antes do fechamento do body
  htmlContent = htmlContent.replace("</body>", `${newDiv}\n</body>`);

  // Salvar o conteúdo modificado de volta no arquivo outputPath
  try {
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`Div com quadrados coloridos adicionada com sucesso em ${outputPath}.`);
  } catch (err) {
    console.error(`Erro ao salvar o arquivo ${outputPath}:`, err);
  }
};
