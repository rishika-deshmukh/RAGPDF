const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
});

async function splitTextIntoChunks(text) {
  const chunks = await textSplitter.splitText(text);

  return chunks;
}

module.exports = {
  splitTextIntoChunks
};