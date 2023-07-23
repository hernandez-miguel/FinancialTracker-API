const express = require('express');
const mongoose = require('mongoose');
const expenseRouter = require('./routes/expenses.route');
const balanceRouter = require('./routes/balances.route');

const app = express();

const PORT = 3001;
const uri = 'mongodb+srv://expensetrackerapp:mxli4eTPPnQRNUyo@expense-tracker-app.g1wsfoi.mongodb.net/Expense-Tracker-API?retryWrites=true&w=majority'

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Sucessfully connected to database')
  } catch(error) {
    console.error(error)
  }
}

app.use(express.json());
app.use('/api', expenseRouter);
app.use('/api', balanceRouter)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ name: err.name, msg: err.message });
});

connect();

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`)
})