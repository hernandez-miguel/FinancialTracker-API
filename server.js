const express = require('express');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello API');
})

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`)
})