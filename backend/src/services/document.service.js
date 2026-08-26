const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: fileBuffer
  });

  const result = await parser.getText();

  await parser.destroy();

  return {
    text: result.text,
    pages: result.total
  };
}

module.exports = {
  extractTextFromPDF
};