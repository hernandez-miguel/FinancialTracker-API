const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const expenseRouter = require('./routes/expenses.route');
const balanceRouter = require('./routes/balances.route');
const userRouter = require('./routes/users.route');
const registerRouter = require('./routes/register.route');
const authRouter = require('./routes/auth.route');
const refreshRouter = require('./routes/refresh.route');
const logoutRouter = require('./routes/logout.router');

const errorMiddleware = require('./middleware/error.middleware');
const verifyJWT = require('./middleware/verifyJWT.middleware');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = config.port || 3001;
const MONGO_URI = config.mongoURI;

async function connect() {
  try {
    await mongoose.connect(MONGO_URI).then(() => {
      console.log('Sucessfully connected to database');
      app.listen(PORT, () => {
        console.log(`Running server on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());

app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(verifyJWT);
app.use('/api/expenses', expenseRouter);
app.use('/api/balances', balanceRouter);
app.use('/api/users', userRouter);
app.use(errorMiddleware);

connect();