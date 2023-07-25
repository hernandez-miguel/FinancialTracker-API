const express = require('express');
const mongoose = require('mongoose');
const expenseRouter = require('./routes/expenses.route');
const balanceRouter = require('./routes/balances.route');
const userRouter = require('./routes/users.router')

const app = express();

const PORT = 3001;
const uri = 'mongodb+srv://expensetrackerapp:mxli4eTPPnQRNUyo@expense-tracker-app.g1wsfoi.mongodb.net/Expense-Tracker-API?retryWrites=true&w=majority'

async function connect() {
  try {
    await mongoose.connect(uri)
    .then(() => {
        console.log('Sucessfully connected to database')
        app.listen(PORT, () => {
          console.log(`Running server on port ${PORT}`)
        })
      });
  } catch(error) {
    console.error(error)
  }
}

app.use(express.json());
app.use('/api/expenses', expenseRouter);
app.use('/api/balances', balanceRouter);
app.use('/api/Users', userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ name: err.name, msg: err.message });
});

connect();