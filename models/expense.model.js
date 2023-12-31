const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    merchant: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    note: {
      type: String,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }, 
  {
    timestamps: true
  }
)

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;