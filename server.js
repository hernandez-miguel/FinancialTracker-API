const express = require('express');
const mongoose = require('mongoose');
const app = express();

//using middleware to help app understand json 
app.use(express.json());

const PORT = 3001;
const uri = 'mongodb+srv://expensetrackerapp:mxli4eTPPnQRNUyo@expense-tracker-app.g1wsfoi.mongodb.net/?retryWrites=true&w=majority'

// async bc we dont know how long it will take to connect
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Sucessfully connected to database')
  } catch(error) {
    console.error(error)
  }
}

connect();

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`)
})