const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema(
  {
    account: {
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
    }
  }, 
  {
    timestamps: true
  }
)

const Balances = mongoose.model('Balances', balanceSchema);

module.exports = Balances;