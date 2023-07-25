require('dotenv').config()

if (!process.env.MONGO_URI || !process.env.PORT) {
  throw Error("Couldn't find .env!");
}

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: parseInt(process.env.PORT),
}