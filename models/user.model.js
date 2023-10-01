const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001
      },
      Admin: Number
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    balances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Balances'
      }
    ],
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expenses'
      }
    ],
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts'
      }
    ],
    balances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Balances'
      }
    ],
    refreshToken: String,
  }, {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User;