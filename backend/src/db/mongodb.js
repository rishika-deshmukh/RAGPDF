const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectMongoDB() {
  await client.connect();
  db = client.db("ragpdf");
  console.log("MongoDB connected successfully");
}

function getDB() {
  if (!db) {
    throw new Error("MongoDB is not connected");
  }

  return db;
}

module.exports = {
  connectMongoDB,
  getDB
};