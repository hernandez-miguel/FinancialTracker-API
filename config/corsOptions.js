const whitelist = ['http://127.0.0.1:5173', 'http://localhost:3001', 'https://www.yoursite.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;