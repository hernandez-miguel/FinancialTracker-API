require('dotenv').config()

var corsOptions = {
  origin: process.env.FRONTEND,
  credentials: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions;