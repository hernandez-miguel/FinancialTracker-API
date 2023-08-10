require('dotenv').config()

if (!process.env.MONGO_URI || !process.env.PORT) {
  throw new Error("Couldn't find environment variables!");
}

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: parseInt(process.env.PORT),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
}