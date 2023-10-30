require('dotenv').config()

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions;